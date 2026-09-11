// Direct Vite asset imports - bundled and hashed directly into dist/assets/
// This guarantees 100% deployment reliability on Vercel, Netlify, and all CDNs
import droneVideo from '../assets/videos/video-drone.mp4';
import sunsetVideo from '../assets/videos/video-sunset.mp4';
import gateRoadVideo from '../assets/videos/video-gate-road.mp4';
import clifftopVideo from '../assets/videos/video-clifftop.mp4';

export const VIDEO_ASSETS: Record<string, string> = {
  // Drone flyover IDs
  'monsoon-drone': droneVideo,
  'drone-aerial': droneVideo,
  'drone': droneVideo,

  // Sunset panorama IDs
  'sunset-forts': sunsetVideo,
  'sunset-panorama': sunsetVideo,
  'sunset': sunsetVideo,

  // Infrastructure & road IDs
  'infra-road': gateRoadVideo,
  'infra-concrete': gateRoadVideo,
  'infra': gateRoadVideo,
  'road': gateRoadVideo,

  // Clifftop vista IDs
  'clifftop-walk': clifftopVideo,
  'clifftop-viewpoint': clifftopVideo,
  'clifftop': clifftopVideo,
};

// URL-based direct mapping as guaranteed fallback
export const VIDEO_URL_MAP: Record<string, string> = {
  '/videos/video-drone.mp4': droneVideo,
  '/videos/video-sunset.mp4': sunsetVideo,
  '/videos/video-gate-road.mp4': gateRoadVideo,
  '/videos/video-clifftop.mp4': clifftopVideo,
};

export const resolveVideoSource = (id?: string, fallbackPath?: string): string => {
  if (id && VIDEO_ASSETS[id]) return VIDEO_ASSETS[id];
  if (fallbackPath && VIDEO_URL_MAP[fallbackPath]) return VIDEO_URL_MAP[fallbackPath];
  return fallbackPath || droneVideo;
};

export const DEFAULT_VIDEOS = {
  drone: droneVideo,
  sunset: sunsetVideo,
  gateRoad: gateRoadVideo,
  clifftop: clifftopVideo,
};
