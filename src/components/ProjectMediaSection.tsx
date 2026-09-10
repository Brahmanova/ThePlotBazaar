import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Upload, 
  Compass, 
  Navigation,
  Video,
  Clock,
  Sun,
  Shield,
  Layers,
  ChevronRight,
  Maximize2,
  Film,
  Mountain,
  Eye,
  CheckCircle2,
  Share2,
  HardDrive,
  Settings2
} from 'lucide-react';
import { VideoManagerModal } from './VideoManagerModal';
import { 
  loadAllStoredVideos, 
  getAllExternalVideoUrls, 
  saveVideoBlob,
  parseVideoMediaSource
} from '../utils/videoStorage';

export interface ProjectVideoItem {
  id: string;
  title: string;
  marathiTitle: string;
  category: 'sunset' | 'drone' | 'infrastructure' | 'clifftop';
  categoryLabel: string;
  durationFormatted: string;
  durationSec: number;
  badge: string;
  videoSrc: string;
  thumbnailUrl: string;
  description: string;
  landmarks: {
    timeSec: number;
    timeFormatted: string;
    name: string;
    marathiLabel: string;
    tag: string;
    caption: string;
    historicalNote: string;
  }[];
}

export const PROJECT_VIDEOS: ProjectVideoItem[] = [
  {
    id: 'monsoon-drone',
    title: '4K Monsoon Aerial Drone Flyover',
    marathiTitle: 'ड्रोन एरियल व्ह्यू (भातघर धरण) 🛸',
    category: 'drone',
    categoryLabel: '4K Drone Aerial',
    durationFormatted: '1:00',
    durationSec: 60,
    badge: 'Cinematic Drone Flyover',
    videoSrc: '/videos/video-drone.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'Cinematic bird\'s eye flyover through rolling monsoon clouds, lush green Sahyadri hills, winding hill-cut red soil road, and serene reservoir shoreline.',
    landmarks: [
      {
        timeSec: 0,
        timeFormatted: '00:00',
        name: 'Bhatghar Water Horizon',
        marathiLabel: 'शांत जलाशय दृश्य 💧',
        tag: 'Aerial Flyover',
        caption: 'Gliding over the calm waters of Bhatghar Dam under dramatic monsoon clouds',
        historicalNote: 'Clear freshwater lake forming the backdrop of every single plot.',
      },
      {
        timeSec: 12,
        timeFormatted: '00:12',
        name: 'Lush Forest Canopy & Mist',
        marathiLabel: 'धुक्याची चादर व सह्याद्री ☁️',
        tag: 'Canopy View',
        caption: 'Descending through low-hanging monsoon fog revealing dense green hillside flora',
        historicalNote: 'Pure oxygen-rich microclimate nestled away from city pollution.',
      },
      {
        timeSec: 28,
        timeFormatted: '00:28',
        name: 'Winding Hill-Cut Access Road',
        marathiLabel: 'घाटातील लाल मातीचा रस्ता 🛣️',
        tag: 'Access Road',
        caption: 'Broad winding road carved through rich red laterite soil leading up to the estate',
        historicalNote: 'Engineered all-weather gradient road connecting to main Bhor highway.',
      },
      {
        timeSec: 46,
        timeFormatted: '00:46',
        name: 'Terraced Plateau Plots',
        marathiLabel: '178+ एकर विस्तीर्ण पठार 🏞️',
        tag: 'Estate Overview',
        caption: 'Gentle elevated terraces with panoramic 180° water & mountain lines',
        historicalNote: 'Natural contour plotting maximizing breeze and privacy for each farmhouse.',
      },
    ],
  },
  {
    id: 'sunset-forts',
    title: 'Sunset Panorama & 3 Historic Maratha Forts',
    marathiTitle: 'किल्ले दर्शन व सूर्यास्त 🚩',
    category: 'sunset',
    categoryLabel: 'Sunset & Heritage Tour',
    durationFormatted: '0:40',
    durationSec: 40,
    badge: 'Sunset Heritage Reel',
    videoSrc: '/videos/video-sunset.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Actual on-site capture at Libertellè (Bhor) featuring the golden sunset, Bhatghar Dam backwaters, and 3 legendary Maratha forts.',
    landmarks: [
      {
        timeSec: 0,
        timeFormatted: '00:00',
        name: 'Sunset & Sahyadri Plateau',
        marathiLabel: 'सह्याद्री सूर्यास्त 🌅',
        tag: 'Site Elevation',
        caption: '"So I am at Bhor right now, look at this beautiful view..."',
        historicalNote: '178+ Acre elevated tableland overlooking Bhatghar Dam with sunset reflections.',
      },
      {
        timeSec: 11,
        timeFormatted: '00:11',
        name: 'Kille Rajgad',
        marathiLabel: 'किल्ले राजगड 🚩',
        tag: '1st Capital of Swarajya',
        caption: 'किल्ले राजगड — The first capital of Swarajya',
        historicalNote: 'The royal seat of Chhatrapati Shivaji Maharaj for over 25 years.',
      },
      {
        timeSec: 20,
        timeFormatted: '00:20',
        name: 'Kille Sinhagad',
        marathiLabel: 'किल्ले सिंहगड 🚩',
        tag: 'Fortress of Valor',
        caption: 'किल्ले सिंहगड — Where Tanaji Malusare set an unmatched example of bravery and valor.',
        historicalNote: 'Historic fortress perched along the northern cliffline of Pune.',
      },
      {
        timeSec: 28,
        timeFormatted: '00:28',
        name: 'Kille Purandar',
        marathiLabel: 'किल्ले पुरंदर 🚩',
        tag: 'Birthplace of Sambhaji Maharaj',
        caption: 'किल्ले पुरंदर — Birthplace of Chhatrapati Sambhaji Maharaj, eternal symbol of Maratha pride.',
        historicalNote: 'Twin fortresses standing tall over the southern trade route.',
      },
      {
        timeSec: 38,
        timeFormatted: '00:38',
        name: 'Bhatghar Dam Backwaters',
        marathiLabel: 'भातघर धरण जलाशय 🌊',
        tag: '180° Water View',
        caption: 'Bhatghar Dam — 180° uninterrupted panoramic water horizon',
        historicalNote: 'Vast, serene water reservoir reflecting the sunset across the valley.',
      },
    ],
  },
  {
    id: 'infra-concrete',
    title: 'Gated Entrance & Concrete Internal Roads',
    marathiTitle: 'पक्के सिमेंट काँक्रीट रस्ते व मुख्य गेट 🚧',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure Tour',
    durationFormatted: '0:26',
    durationSec: 26,
    badge: 'On-Site Ground Tour',
    videoSrc: '/videos/video-gate-road.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?auto=format&fit=crop&w=800&q=80',
    description: 'Ground-level walk showing the heavy-duty perimeter gate, wide paved concrete road, red rock hill cutting, and cut-stone stormwater drainage.',
    landmarks: [
      {
        timeSec: 0,
        timeFormatted: '00:00',
        name: 'Gated Security Entrance',
        marathiLabel: 'मुख्य प्रवेशद्वार व कुंपण 🚪',
        tag: 'Gated Security',
        caption: 'Heavy-duty steel security gates & robust chain-link boundary fencing',
        historicalNote: 'Clear boundary demarcations with registered 7/12 land survey tags.',
      },
      {
        timeSec: 7,
        timeFormatted: '00:07',
        name: 'Paved Concrete Internal Road',
        marathiLabel: 'रुंद सिमेंट काँक्रीट रस्ता 🛣️',
        tag: 'Paved Roadway',
        caption: 'Solid concrete internal roads with non-slip grooved finish for all seasons',
        historicalNote: 'Built for longevity through heavy monsoon rains and smooth vehicle access.',
      },
      {
        timeSec: 14,
        timeFormatted: '00:14',
        name: 'Cut-Stone Stormwater Drainage',
        marathiLabel: 'पाण्याचा निचरा करणारी गटारे 🌧️',
        tag: 'Drainage Lines',
        caption: 'Cut-rock stone drainage channels along road curves preventing waterlogging',
        historicalNote: 'Natural gradient stormwater runoff design directing water to natural swales.',
      },
      {
        timeSec: 21,
        timeFormatted: '00:21',
        name: 'Plateau Ridge Horizon',
        marathiLabel: 'पठारावरील दृश्य 🏞️',
        tag: 'Scenic Ridge',
        caption: 'Reaching the plateau summit overlooking the surrounding Sahyadri ridgeline',
        historicalNote: 'Elevated vantage point offering year-round sunrise and sunset vistas.',
      },
    ],
  },
  {
    id: 'clifftop-walk',
    title: 'Clifftop Lake Viewpoint & Valley Panorama',
    marathiTitle: 'कड्यावरील लेक व्ह्यू पॉइंट 🌊',
    category: 'clifftop',
    categoryLabel: 'Clifftop Vista Tour',
    durationFormatted: '0:26',
    durationSec: 26,
    badge: 'Panoramic Vista',
    videoSrc: '/videos/video-clifftop.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    description: 'Walk along the curved cliffside road showing the red mud cut-faces, natural valley gradient, and sweeping view of the Bhatghar lake basin.',
    landmarks: [
      {
        timeSec: 0,
        timeFormatted: '00:00',
        name: 'Red Laterite Hill Cutting',
        marathiLabel: 'लाल मातीचा डोंगर कटिंग ⛰️',
        tag: 'Geology & Contour',
        caption: 'Natural red laterite rock face providing solid structural foundation',
        historicalNote: 'Rich, fertile soil ideal for organic cultivation and private orchards.',
      },
      {
        timeSec: 8,
        timeFormatted: '00:08',
        name: 'Valley & Village Panorama',
        marathiLabel: 'व्हॅली व गाव परिसर दृश्य 🏡',
        tag: 'Valley View',
        caption: 'Overlooking peaceful village settlements and agricultural terraces below',
        historicalNote: 'Preserved agrarian tranquility within 45 mins of Pune city fringe.',
      },
      {
        timeSec: 16,
        timeFormatted: '00:16',
        name: 'Bhatghar Dam Shoreline',
        marathiLabel: 'भातघर धरण किनारा 💧',
        tag: 'Lake Shoreline',
        caption: 'Wide expanse of water stretching across the horizon under monsoon clouds',
        historicalNote: 'Perennial water reservoir ensuring pleasant weather throughout the year.',
      },
      {
        timeSec: 22,
        timeFormatted: '00:22',
        name: 'Scenic Clifftop Lookout',
        marathiLabel: 'निसर्गरम्य कडा व्ह्यू 🌄',
        tag: 'Lookout Point',
        caption: 'Cool mountain breeze sweeping over the plateau viewpoint',
        historicalNote: 'Prime location designated for the central community clubhouse & deck.',
      },
    ],
  },
];

interface ProjectMediaSectionProps {
  onOpenSiteVisit?: (projectName?: string) => void;
}

export const ProjectMediaSection: React.FC<ProjectMediaSectionProps> = ({
  onOpenSiteVisit,
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDraggingOverPlayer, setIsDraggingOverPlayer] = useState(false);

  // IndexedDB Stored Videos & External URLs
  const [storedVideos, setStoredVideos] = useState<{ [trackId: string]: { url: string; name: string; size: number } }>({});
  const [externalUrls, setExternalUrls] = useState<{ [trackId: string]: string }>({});

  const refreshVideos = async () => {
    try {
      const stored = await loadAllStoredVideos();
      setStoredVideos(stored);
      const urls = getAllExternalVideoUrls();
      setExternalUrls(urls);
    } catch (e) {
      console.warn('Could not load videos:', e);
    }
  };

  useEffect(() => {
    refreshVideos();
  }, []);

  const activeVideo = PROJECT_VIDEOS[selectedVideoIndex];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Resolve active source: IndexedDB Blob URL > External CDN URL > Static Bundled File
  const getVideoSource = (video: ProjectVideoItem) => {
    if (storedVideos[video.id]?.url) return storedVideos[video.id].url;
    if (externalUrls[video.id]) return externalUrls[video.id];
    return video.videoSrc;
  };

  // Active landmark within active video
  const [activeLandmarkIdx, setActiveLandmarkIdx] = useState(0);

  useEffect(() => {
    let curr = 0;
    for (let i = 0; i < activeVideo.landmarks.length; i++) {
      if (currentTime >= activeVideo.landmarks[i].timeSec) {
        curr = i;
      }
    }
    setActiveLandmarkIdx(curr);
  }, [currentTime, activeVideo]);

  // Handle active video playback sync
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === selectedVideoIndex) {
        v.currentTime = 0;
        if (isPlaying) {
          v.play().catch(() => {});
        }
      } else {
        v.pause();
      }
    });
    setCurrentTime(0);
  }, [selectedVideoIndex, storedVideos, externalUrls]);

  // Handle Play/Pause toggling
  useEffect(() => {
    const currentVideoEl = videoRefs.current[selectedVideoIndex];
    if (currentVideoEl) {
      if (isPlaying) {
        currentVideoEl.play().catch(() => {});
      } else {
        currentVideoEl.pause();
      }
    }
  }, [isPlaying]);

  // Handle Mute toggling across all elements
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = isMuted;
    });
  }, [isMuted]);

  const handleSelectVideo = (index: number) => {
    setSelectedVideoIndex(index);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    const activeEl = videoRefs.current[selectedVideoIndex];
    if (activeEl) {
      activeEl.currentTime = time;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlayerDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverPlayer(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await saveVideoBlob(activeVideo.id, file, file.name);
      await refreshVideos();
      setIsPlaying(true);
    }
  };

  const currentLm = activeVideo.landmarks[activeLandmarkIdx] || activeVideo.landmarks[0];
  const hasCustomMedia = !!storedVideos[activeVideo.id] || !!externalUrls[activeVideo.id];

  return (
    <section id="media" className="py-24 bg-gradient-to-b from-[#0B2D24] via-[#071F19] to-[#0B2D24] relative border-t border-[#D4B06A]/20">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4B06A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-3">
              <Film className="w-3.5 h-3.5 text-[#D4B06A]" />
              <span>Project Media & Live Video Reels</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
              Live On-Site Video Experience
            </h2>

            <p className="text-[#FBF9F5]/80 text-sm sm:text-base mt-2">
              Explore authentic high-definition video footage recorded directly at <span className="text-[#E8C888] font-semibold">Libertellè (Bhor, Pune)</span> — from golden hour sunset fort horizons to 4K drone flyovers, heavy-duty gated entry, and clifftop backwater viewpoints.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            <button
              onClick={() => setIsManagerOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#123B31] hover:bg-[#1A4D40] border border-[#D4B06A]/40 text-xs font-semibold text-[#E8C888] transition-all flex items-center space-x-2 shadow-md"
              title="Attach your 4 raw .mp4 video files directly into the browser cache"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Attach Video Files</span>
              {Object.keys(storedVideos).length > 0 && (
                <span className="px-1.5 py-0.2 bg-[#52B788] text-[#0B2D24] text-[10px] font-bold rounded-full">
                  {Object.keys(storedVideos).length}/4
                </span>
              )}
            </button>

            {onOpenSiteVisit && (
              <button
                onClick={() => onOpenSiteVisit('Libertellè Bhor')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-lg flex items-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>Book Site Visit</span>
              </button>
            )}
          </div>
        </div>

        {/* Luxury Video Player Container */}
        <div className="rounded-3xl bg-gradient-to-b from-[#123B31]/90 via-[#0E3228] to-[#071F19] border border-[#D4B06A]/35 shadow-2xl p-4 sm:p-7 backdrop-blur-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Cols: Main Video Screen */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOverPlayer(true); }}
                onDragLeave={() => setIsDraggingOverPlayer(false)}
                onDrop={handlePlayerDrop}
                className={`relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#000] border transition-all shadow-2xl group ${
                  isDraggingOverPlayer ? 'border-[#D4B06A] ring-4 ring-[#D4B06A]/40' : 'border-[#D4B06A]/30'
                }`}
              >
                
                {/* Visual Fallback / Background Poster when buffering */}
                <div className="absolute inset-0 bg-[#071F19]">
                  <img
                    src={activeVideo.thumbnailUrl}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover opacity-60 filter blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071F19] via-transparent to-[#071F19]/40" />
                </div>

                {/* Active Video Display: Google Drive Embed, YouTube, or HTML5 Video */}
                {(() => {
                  const activeSrc = getVideoSource(activeVideo);
                  const parsedActive = parseVideoMediaSource(activeSrc);

                  if (parsedActive.type === 'gdrive' && parsedActive.embedUrl) {
                    return (
                      <iframe
                        key={`gdrive-${activeVideo.id}`}
                        src={parsedActive.embedUrl}
                        title={activeVideo.title}
                        className="absolute inset-0 w-full h-full border-0 z-0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                      />
                    );
                  }

                  if (parsedActive.type === 'youtube' && parsedActive.embedUrl) {
                    return (
                      <iframe
                        key={`yt-${activeVideo.id}`}
                        src={parsedActive.embedUrl}
                        title={activeVideo.title}
                        className="absolute inset-0 w-full h-full border-0 z-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }

                  return PROJECT_VIDEOS.map((video, idx) => {
                    const isCurrent = selectedVideoIndex === idx;
                    const src = getVideoSource(video);

                    return (
                      <video
                        key={video.id}
                        ref={(el) => { videoRefs.current[idx] = el; }}
                        src={src}
                        preload="auto"
                        autoPlay={isCurrent}
                        loop
                        muted={isMuted}
                        playsInline
                        onTimeUpdate={() => {
                          if (isCurrent && videoRefs.current[idx]) {
                            setCurrentTime(videoRefs.current[idx]!.currentTime);
                          }
                        }}
                        onEnded={() => {
                          if (isCurrent && videoRefs.current[idx]) {
                            videoRefs.current[idx]!.currentTime = 0;
                            videoRefs.current[idx]!.play().catch(() => {});
                          }
                        }}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          isCurrent ? 'opacity-100 z-0 block' : 'opacity-0 pointer-events-none -z-10'
                        }`}
                      />
                    );
                  });
                })()}

                {/* Drag Drop Overlay Prompt */}
                {isDraggingOverPlayer && (
                  <div className="absolute inset-0 z-20 bg-[#071F19]/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#D4B06A]">
                    <Upload className="w-12 h-12 text-[#E8C888] animate-bounce mb-2" />
                    <strong className="text-base text-[#FBF9F5]">Drop Video File Here</strong>
                    <span className="text-xs text-[#52B788]">Will be saved permanently to browser cache for: {activeVideo.title}</span>
                  </div>
                )}

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10">
                  <div className="flex flex-col space-y-1">
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#071F19]/90 backdrop-blur-md border border-[#D4B06A]/50 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-[#E8C888] animate-ping" />
                      <span className="font-serif-heading text-xs sm:text-sm font-bold text-[#E8C888]">
                        {currentLm.marathiLabel}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="px-2.5 py-0.5 rounded bg-[#071F19]/80 backdrop-blur-sm text-[11px] text-[#52B788] font-medium border border-[#52B788]/30 w-max">
                        {currentLm.tag}
                      </div>
                      {hasCustomMedia && (
                        <div className="px-2 py-0.5 rounded bg-[#123B31]/90 text-[10px] text-[#E8C888] font-bold border border-[#D4B06A]/40 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-[#52B788]" />
                          <span>4K Phone Stream</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="flex items-center space-x-2 pointer-events-auto">
                    <button
                      onClick={() => setIsManagerOpen(true)}
                      className="p-2.5 rounded-xl bg-[#071F19]/85 text-[#E8C888] hover:text-[#FBF9F5] border border-[#D4B06A]/30 backdrop-blur-md transition-colors shadow-lg"
                      title="Video Sources & Preloader Settings"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2.5 rounded-xl bg-[#071F19]/85 text-[#FBF9F5] hover:text-[#D4B06A] border border-[#D4B06A]/30 backdrop-blur-md transition-colors shadow-lg"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-[#FBF9F5]/70" /> : <Volume2 className="w-4 h-4 text-[#52B788]" />}
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="p-2.5 rounded-xl bg-[#071F19]/85 text-[#FBF9F5] hover:text-[#D4B06A] border border-[#D4B06A]/30 backdrop-blur-md transition-colors shadow-lg"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-[#D4B06A]" /> : <Play className="w-4 h-4 text-[#52B788]" />}
                    </button>
                  </div>
                </div>

                {/* Dynamic Captions */}
                <div className="absolute bottom-14 left-4 right-4 text-center pointer-events-none z-10">
                  <div className="inline-block px-4 py-2.5 rounded-xl bg-[#071F19]/90 backdrop-blur-md border border-[#D4B06A]/40 text-xs sm:text-sm font-medium text-[#FBF9F5] shadow-2xl max-w-xl mx-auto">
                    <span className="text-[#E8C888] font-bold block mb-0.5">{currentLm.caption}</span>
                    <span className="text-[11px] text-[#FBF9F5]/75">{currentLm.historicalNote}</span>
                  </div>
                </div>

                {/* Scrubber Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#071F19] to-transparent flex flex-col space-y-1 pointer-events-auto z-10">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-[#E8C888] font-mono w-8">
                      {Math.floor(currentTime)}s
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={activeVideo.durationSec}
                      step="0.1"
                      value={currentTime}
                      onChange={(e) => handleSeek(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[#123B31] rounded-lg appearance-none cursor-pointer accent-[#D4B06A]"
                    />
                    <span className="text-[10px] text-[#FBF9F5]/60 font-mono w-8">
                      {activeVideo.durationSec}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Timecoded Milestone Seek Buttons */}
              <div className="rounded-2xl bg-[#071F19]/90 border border-[#D4B06A]/25 p-3.5 sm:p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#D4B06A] flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Timecoded Video Keyframes:</span>
                  </span>
                  <span className="text-[11px] text-[#52B788] font-semibold">
                    {activeVideo.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {activeVideo.landmarks.map((lm, idx) => {
                    const isSelected = activeLandmarkIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSeek(lm.timeSec)}
                        className={`p-2 rounded-xl text-left transition-all border flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#D4B06A] text-[#0B2D24] border-[#D4B06A] shadow-md scale-[1.02]'
                            : 'bg-[#0B2D24] text-[#FBF9F5] border-[#D4B06A]/20 hover:border-[#D4B06A]/50 hover:bg-[#123B31]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#0B2D24]' : 'text-[#D4B06A]'}`}>
                            {lm.timeFormatted}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${isSelected ? 'bg-[#0B2D24]/20 text-[#0B2D24]' : 'bg-[#071F19] text-[#52B788]'}`}>
                            {lm.tag}
                          </span>
                        </div>
                        <span className="text-xs font-bold leading-tight line-clamp-1">
                          {lm.marathiLabel}
                        </span>
                        <span className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-[#0B2D24]/80' : 'text-[#FBF9F5]/60'}`}>
                          {lm.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Video Playlist & Information Drawer */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              
              <div className="rounded-2xl bg-[#071F19]/90 border border-[#D4B06A]/25 p-4 sm:p-5">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4B06A]/15">
                  <h4 className="font-serif-heading text-base font-bold text-[#FBF9F5] flex items-center space-x-2">
                    <Film className="w-4 h-4 text-[#D4B06A]" />
                    <span>Project Video Playlist</span>
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#123B31] text-[#E8C888] border border-[#D4B06A]/30">
                    4 Live Reels
                  </span>
                </div>

                <div className="flex flex-col space-y-2.5">
                  {PROJECT_VIDEOS.map((video, idx) => {
                    const isSelected = selectedVideoIndex === idx;
                    const isCustom = !!storedVideos[video.id];

                    return (
                      <div
                        key={video.id}
                        onClick={() => handleSelectVideo(idx)}
                        className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#123B31] border-[#D4B06A] shadow-lg ring-1 ring-[#D4B06A]/40'
                            : 'bg-[#0B2D24]/70 border-[#D4B06A]/15 hover:border-[#D4B06A]/40 hover:bg-[#123B31]/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-[#D4B06A] text-[#0B2D24]'
                              : 'bg-[#071F19] text-[#D4B06A] border border-[#D4B06A]/30'
                          }`}>
                            {idx + 1}
                          </div>

                          <div>
                            <span className="text-xs font-bold text-[#FBF9F5] block leading-snug line-clamp-1">
                              {video.title}
                            </span>
                            <div className="flex items-center space-x-2 mt-0.5">
                              <span className="text-[10px] text-[#52B788] font-medium">
                                {video.marathiTitle}
                              </span>
                              <span className="text-[10px] text-[#FBF9F5]/40">•</span>
                              <span className="text-[10px] text-[#E8C888] font-mono">
                                {video.durationFormatted}
                              </span>
                              {isCustom && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#52B788]/20 text-[#52B788] font-bold">
                                  4K
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#D4B06A]' : 'text-[#FBF9F5]/30'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Video Info Card */}
              <div className="rounded-2xl bg-[#071F19]/90 border border-[#D4B06A]/25 p-4 sm:p-5 flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#D4B06A]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4B06A]">
                    Reel Dossier: {activeVideo.badge}
                  </span>
                </div>

                <p className="text-xs text-[#FBF9F5]/80 leading-relaxed">
                  {activeVideo.description}
                </p>

                <div className="pt-2 border-t border-[#D4B06A]/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#FBF9F5]/70">
                    <span>Elevation & Region:</span>
                    <strong className="text-[#FBF9F5]">Velvand, Bhor (Pune)</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#FBF9F5]/70">
                    <span>Backwater Access:</span>
                    <strong className="text-[#52B788]">180° Bhatghar Dam Vista</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#FBF9F5]/70">
                    <span>Plotting Scale:</span>
                    <strong className="text-[#E8C888]">178+ Acre Masterplan</strong>
                  </div>
                </div>

                {onOpenSiteVisit && (
                  <button
                    onClick={() => onOpenSiteVisit(activeVideo.title)}
                    className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Experience This Plot In Person</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Video Preloader / Manager Modal */}
      <VideoManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        storedVideos={storedVideos}
        externalUrls={externalUrls}
        onVideosUpdated={refreshVideos}
        onPreviewTrack={(idx) => handleSelectVideo(idx)}
      />

    </section>
  );
};
