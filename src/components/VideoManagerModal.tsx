import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Film, 
  CheckCircle2, 
  Link as LinkIcon, 
  Trash2, 
  HardDrive, 
  Sparkles,
  Info,
  RefreshCw,
  Play
} from 'lucide-react';
import { 
  saveVideoBlob, 
  removeVideoBlob, 
  saveExternalVideoUrl,
  parseVideoMediaSource,
} from '../utils/videoStorage';

interface VideoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  storedVideos: { [trackId: string]: { url: string; name: string; size: number } };
  externalUrls: { [trackId: string]: string };
  onVideosUpdated: () => void;
  onPreviewTrack: (trackIdx: number) => void;
}

interface TrackConfig {
  id: string;
  aliasIds: string[];
  title: string;
  marathiTitle: string;
  category: string;
  hint: string;
  defaultSrc: string;
}

const TRACKS_CONFIG: TrackConfig[] = [
  {
    id: 'monsoon-drone',
    aliasIds: ['monsoon-drone', 'drone-aerial'],
    title: '4K Monsoon Aerial Drone Flyover',
    marathiTitle: 'ड्रोन एरियल व्ह्यू (भातघर धरण) 🛸',
    category: '4K Drone Reel',
    hint: 'Contains 1-minute bird\'s eye flyover through mist, lush green hills, winding red earth road and lake.',
    defaultSrc: '/videos/video-drone.mp4',
  },
  {
    id: 'sunset-forts',
    aliasIds: ['sunset-forts'],
    title: 'Sunset Over Sahyadri Forts & Bhatghar Dam',
    marathiTitle: 'किल्ले दर्शन व सूर्यास्त 🚩',
    category: 'Sunset Heritage Reel',
    hint: 'Contains golden hour sunset, "पाहू कसा रे..." Marathi music, Kille Rajgad, Sinhagad & Purandar.',
    defaultSrc: '/videos/video-sunset.mp4',
  },
  {
    id: 'infra-concrete',
    aliasIds: ['infra-concrete', 'infra-road'],
    title: 'Heavy Gate & Concrete Road Infrastructure',
    marathiTitle: 'पक्के सिमेंट काँक्रीट रस्ते व गेट 🚧',
    category: 'On-Site Ground Tour',
    hint: 'Contains heavy steel entrance gate opening in rain, wide concrete road and drainage.',
    defaultSrc: '/videos/video-gate-road.mp4',
  },
  {
    id: 'clifftop-walk',
    aliasIds: ['clifftop-walk'],
    title: 'Clifftop Lake Viewpoint & Ridge Walk',
    marathiTitle: 'कड्यावरील लेक व्ह्यू पॉइंट 🌊',
    category: 'Panoramic Vista',
    hint: 'Contains cliffside walking perspective along red cut rock wall overlooking the valley & lake.',
    defaultSrc: '/videos/video-clifftop.mp4',
  },
];

export const VideoManagerModal: React.FC<VideoManagerModalProps> = ({
  isOpen,
  onClose,
  storedVideos,
  externalUrls,
  onVideosUpdated,
  onPreviewTrack,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'links'>('upload');
  const [customUrls, setCustomUrls] = useState<{ [key: string]: string }>({ ...externalUrls });
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isBulkDragging, setIsBulkDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (trackConfig: TrackConfig, file: File) => {
    setIsSaving(true);
    try {
      // Save for main ID and aliases
      for (const id of trackConfig.aliasIds) {
        await saveVideoBlob(id, file, file.name);
      }
      setSuccessMsg(`"${file.name}" saved to browser cache for ${trackConfig.title}`);
      setTimeout(() => setSuccessMsg(null), 4000);
      onVideosUpdated();
    } catch (err) {
      console.error('Error saving video:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsBulkDragging(false);
    const rawFiles = Array.from(e.dataTransfer.files) as File[];
    const files: File[] = rawFiles.filter((f: File) => f.type.startsWith('video/') || f.name.endsWith('.mp4') || f.name.endsWith('.mov'));
    
    if (files.length === 0) return;

    setIsSaving(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const lower = file.name.toLowerCase();
        
        let targetTrack = TRACKS_CONFIG[i % TRACKS_CONFIG.length];
        if (lower.includes('sunset') || lower.includes('fort') || lower.includes('rajgad')) {
          targetTrack = TRACKS_CONFIG[0];
        } else if (lower.includes('drone') || lower.includes('aerial') || lower.includes('4k')) {
          targetTrack = TRACKS_CONFIG[1];
        } else if (lower.includes('gate') || lower.includes('road') || lower.includes('concrete')) {
          targetTrack = TRACKS_CONFIG[2];
        } else if (lower.includes('cliff') || lower.includes('lake') || lower.includes('view')) {
          targetTrack = TRACKS_CONFIG[3];
        }

        for (const id of targetTrack.aliasIds) {
          await saveVideoBlob(id, file, file.name);
        }
      }
      setSuccessMsg(`${files.length} video file(s) saved directly into browser IndexedDB storage!`);
      setTimeout(() => setSuccessMsg(null), 5000);
      onVideosUpdated();
    } catch (err) {
      console.error('Bulk drop error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async (trackConfig: TrackConfig) => {
    setIsSaving(true);
    try {
      for (const id of trackConfig.aliasIds) {
        await removeVideoBlob(id);
      }
      onVideosUpdated();
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveUrls = () => {
    TRACKS_CONFIG.forEach(track => {
      const url = customUrls[track.id] || '';
      track.aliasIds.forEach(id => {
        saveExternalVideoUrl(id, url);
      });
    });
    setSuccessMsg('Video stream URLs updated successfully!');
    setTimeout(() => setSuccessMsg(null), 4000);
    onVideosUpdated();
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 MB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#051410]/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#071F19] border border-[#D4B06A]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D4B06A]/20 bg-[#0B2D24] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4B06A]/15 border border-[#D4B06A]/40 flex items-center justify-center text-[#D4B06A]">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#FBF9F5]">
                Project Reel & Video Preloader Manager
              </h3>
              <p className="text-xs text-[#FBF9F5]/70">
                Load authentic on-site video clips for instant 4K playback across all sections
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#FBF9F5]/60 hover:text-[#FBF9F5] hover:bg-[#123B31] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 border-b border-[#D4B06A]/15 flex items-center justify-between bg-[#0B2D24]/50">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'upload'
                  ? 'border-[#D4B06A] text-[#D4B06A]'
                  : 'border-transparent text-[#FBF9F5]/60 hover:text-[#FBF9F5]'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Direct Device Upload (IndexedDB)</span>
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'links'
                  ? 'border-[#D4B06A] text-[#D4B06A]'
                  : 'border-transparent text-[#FBF9F5]/60 hover:text-[#FBF9F5]'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>CDN / Direct Video Links</span>
            </button>
          </div>

          <span className="text-[11px] text-[#52B788] hidden sm:flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Persists permanently in browser</span>
          </span>
        </div>

        {/* Banner info */}
        {successMsg && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-[#123B31] border border-[#52B788]/50 text-xs text-[#52B788] font-medium flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          
          {activeTab === 'upload' && (
            <>
              {/* Bulk Drag & Drop Box */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsBulkDragging(true); }}
                onDragLeave={() => setIsBulkDragging(false)}
                onDrop={handleBulkDrop}
                className={`p-5 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                  isBulkDragging
                    ? 'border-[#D4B06A] bg-[#D4B06A]/10 scale-[1.01]'
                    : 'border-[#D4B06A]/30 bg-[#0B2D24]/40 hover:border-[#D4B06A]/60'
                }`}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = 'video/*,.mp4,.mov';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      handleBulkDrop({
                        preventDefault: () => {},
                        dataTransfer: { files },
                      } as any);
                    }
                  };
                  input.click();
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#123B31] border border-[#D4B06A]/40 flex items-center justify-center text-[#E8C888] shadow-md">
                  <Upload className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <strong className="text-sm font-bold text-[#FBF9F5] block">
                    Drop All 4 On-Site Video Files Here (.mp4, .mov)
                  </strong>
                  <p className="text-xs text-[#FBF9F5]/70 mt-0.5">
                    Click to browse or drag & drop files from your computer or phone. They will be stored directly in high-speed browser IndexedDB cache.
                  </p>
                </div>
              </div>

              {/* 4 Tracks Itemized List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4B06A] block">
                  Individual Reel Slot Assignments:
                </span>

                {TRACKS_CONFIG.map((track, idx) => {
                  const stored = storedVideos[track.id];
                  const hasCustom = !!stored;

                  return (
                    <div
                      key={track.id}
                      onDragOver={(e) => { e.preventDefault(); setDragOverIndex(idx); }}
                      onDragLeave={() => setDragOverIndex(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverIndex(null);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileUpload(track, file);
                      }}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        dragOverIndex === idx
                          ? 'border-[#D4B06A] bg-[#D4B06A]/15'
                          : hasCustom
                          ? 'bg-[#123B31]/60 border-[#52B788]/40'
                          : 'bg-[#0B2D24]/70 border-[#D4B06A]/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          hasCustom ? 'bg-[#52B788] text-[#0B2D24]' : 'bg-[#071F19] text-[#D4B06A] border border-[#D4B06A]/30'
                        }`}>
                          {idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-[#FBF9F5]">
                              {track.title}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#071F19] text-[#E8C888] border border-[#D4B06A]/20">
                              {track.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#FBF9F5]/70 mt-0.5">
                            {track.hint}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {hasCustom ? (
                              <span className="text-[11px] text-[#52B788] font-semibold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Loaded: {stored.name} ({formatFileSize(stored.size)})</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#FBF9F5]/50 flex items-center space-x-1">
                                <Info className="w-3 h-3" />
                                <span>Using default project asset stream</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                        <input
                          type="file"
                          id={`file-input-${track.id}`}
                          accept="video/*,.mp4,.mov"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(track, f);
                          }}
                        />

                        {hasCustom && (
                          <button
                            onClick={() => {
                              onPreviewTrack(idx);
                              onClose();
                            }}
                            className="p-2 rounded-lg bg-[#071F19] hover:bg-[#123B31] text-[#E8C888] border border-[#D4B06A]/30 transition-colors text-xs flex items-center space-x-1"
                            title="Play this track in player"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Play</span>
                          </button>
                        )}

                        <button
                          onClick={() => document.getElementById(`file-input-${track.id}`)?.click()}
                          className="px-3 py-1.5 rounded-lg bg-[#123B31] hover:bg-[#1A4D40] text-xs font-semibold text-[#D4B06A] border border-[#D4B06A]/40 transition-colors flex items-center space-x-1 shadow-sm"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{hasCustom ? 'Replace' : 'Select .mp4'}</span>
                        </button>

                        {hasCustom && (
                          <button
                            onClick={() => handleRemove(track)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 border border-rose-900/40 transition-colors"
                            title="Reset to default stream"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#123B31]/80 border border-[#D4B06A]/30 text-xs space-y-1.5">
                <div className="flex items-center space-x-2 text-[#E8C888] font-bold">
                  <LinkIcon className="w-4 h-4" />
                  <span>Google Drive & Cloud Video Links Supported</span>
                </div>
                <p className="text-[#FBF9F5]/80 leading-relaxed">
                  Paste your public Google Drive share links (e.g. <code className="bg-[#071F19] px-1.5 py-0.5 rounded text-[#52B788]">https://drive.google.com/file/d/.../view</code>), YouTube embeds, or direct CDN MP4 links.
                </p>
                <p className="text-[11px] text-[#FBF9F5]/60">
                  ⚡ <em>Note for Google Drive: Ensure link sharing permission is set to <strong>"Anyone with the link can view"</strong>.</em>
                </p>
              </div>

              <div className="space-y-3">
                {TRACKS_CONFIG.map((track, idx) => {
                  const currentVal = customUrls[track.id] || '';
                  const parsed = parseVideoMediaSource(currentVal);

                  return (
                    <div key={track.id} className="p-3.5 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-[#123B31] border border-[#D4B06A]/40 text-[#E8C888] font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-[#FBF9F5]">
                            {track.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {currentVal && (
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              parsed.type === 'gdrive' 
                                ? 'bg-blue-900/60 text-blue-300 border border-blue-500/40' 
                                : parsed.type === 'youtube'
                                ? 'bg-red-900/60 text-red-300 border border-red-500/40'
                                : 'bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/30'
                            }`}>
                              {parsed.type === 'gdrive' ? 'Google Drive Link' : parsed.type === 'youtube' ? 'YouTube Stream' : 'Direct MP4/CDN'}
                            </span>
                          )}
                          <span className="text-[10px] text-[#E8C888] font-mono">
                            {track.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="url"
                          placeholder={
                            idx === 0
                              ? 'https://drive.google.com/file/d/.../view or direct .mp4'
                              : `https://your-cdn.com/${track.id}.mp4`
                          }
                          value={currentVal}
                          onChange={(e) => setCustomUrls({ ...customUrls, [track.id]: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#071F19] border border-[#D4B06A]/30 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D4B06A] font-mono placeholder:text-[#FBF9F5]/30"
                        />
                        {currentVal && (
                          <button
                            onClick={() => setCustomUrls({ ...customUrls, [track.id]: '' })}
                            className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40 border border-rose-900/30 transition-colors"
                            title="Clear URL"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#52B788] flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Streams live instantly on the website</span>
                </span>
                <button
                  onClick={handleSaveUrls}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-lg flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save & Connect Video Streams</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D4B06A]/20 bg-[#0B2D24] flex items-center justify-between text-xs text-[#FBF9F5]/70">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#52B788]" />
            <span>Files remain saved in your browser storage across all sessions.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#123B31] hover:bg-[#1A4D40] text-[#FBF9F5] font-semibold text-xs border border-[#D4B06A]/30 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
