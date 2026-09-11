// Persistent client-side IndexedDB & LocalStorage manager for 4K site videos

const DB_NAME = 'PlotBazaar_Media_DB';
const STORE_NAME = 'project_videos';
const DB_VERSION = 1;
const STORAGE_PREFIX = 'plotbazaar_video_url_';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves an uploaded Video File/Blob directly into the browser's IndexedDB.
 * Returns a live Object URL for immediate zero-latency playback.
 */
export async function saveVideoBlob(trackId: string, file: File | Blob, originalName?: string): Promise<string> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record = {
      id: trackId,
      blob: file,
      name: originalName || (file instanceof File ? file.name : `${trackId}.mp4`),
      type: file.type || 'video/mp4',
      size: file.size,
      savedAt: Date.now(),
    };

    const req = store.put(record);
    req.onsuccess = () => {
      const objectUrl = URL.createObjectURL(file);
      resolve(objectUrl);
    };
    req.onerror = () => reject(req.error);
  });
}

/**
 * Retrieves all stored videos from IndexedDB and generates Object URLs.
 */
export async function loadAllStoredVideos(): Promise<{ [trackId: string]: { url: string; name: string; size: number } }> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const result: { [trackId: string]: { url: string; name: string; size: number } } = {};
        const items = req.result as Array<{ id: string; blob: Blob; name: string; size: number }>;
        if (items && Array.isArray(items)) {
          items.forEach((item) => {
            if (item && item.blob) {
              result[item.id] = {
                url: URL.createObjectURL(item.blob),
                name: item.name || item.id,
                size: item.size || item.blob.size,
              };
            }
          });
        }
        resolve(result);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Could not read from IndexedDB:', e);
    return {};
  }
}

/**
 * Removes a specific video from IndexedDB.
 */
export async function removeVideoBlob(trackId: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(trackId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * External URL storage in LocalStorage (e.g. AWS S3, Cloudflare, YouTube, Direct CDN).
 */
export function saveExternalVideoUrl(trackId: string, url: string): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${trackId}`, url.trim());
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export function getAllExternalVideoUrls(): { [trackId: string]: string } {
  const urls: { [trackId: string]: string } = {};
  const trackIds = ['sunset-forts', 'monsoon-drone', 'drone-aerial', 'infra-concrete', 'infra-road', 'clifftop-walk'];
  try {
    trackIds.forEach((id) => {
      const val = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
      if (val) urls[id] = val;
    });
  } catch {}
  return urls;
}

export function getExternalVideoUrl(trackId: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${trackId}`);
  } catch {
    return null;
  }
}

export interface ParsedMediaSource {
  type: 'gdrive' | 'youtube' | 'direct' | 'blob' | 'local';
  url: string;
  embedUrl?: string;
  fileId?: string;
}

/**
 * Parses any user-provided URL (Google Drive, YouTube, Vimeo, direct MP4)
 * into a high-performance streamable or embeddable format.
 */
export function parseVideoMediaSource(rawUrl: string): ParsedMediaSource {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { type: 'local', url: '' };
  }

  const trimmed = rawUrl.trim();

  if (trimmed.startsWith('blob:')) {
    return { type: 'blob', url: trimmed };
  }

  // Google Drive URLs:
  // e.g. https://drive.google.com/file/d/1aBcDeFgHiJkLmNoP/view?usp=sharing
  // or https://drive.google.com/file/u/0/d/1aBcDeFgHiJkLmNoP/view
  // or https://drive.google.com/open?id=1aBcDeFgHiJkLmNoP
  // or https://drive.google.com/uc?id=1aBcDeFgHiJkLmNoP
  // or https://docs.google.com/file/d/1aBcDeFgHiJkLmNoP/edit
  const isGDrive = trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com');
  if (isGDrive) {
    const fileIdMatch = 
      trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return {
        type: 'gdrive',
        fileId,
        url: `https://drive.google.com/uc?export=download&id=${fileId}`,
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      };
    }
  }

  // YouTube URLs:
  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const ytId = ytMatch[1];
    return {
      type: 'youtube',
      fileId: ytId,
      url: `https://www.youtube.com/watch?v=${ytId}`,
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&playsinline=1&controls=1`,
    };
  }

  return {
    type: 'direct',
    url: trimmed,
  };
}
