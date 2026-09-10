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
  CloudRain,
  Sun,
  Shield,
  Eye,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  loadAllStoredVideos, 
  getAllExternalVideoUrls, 
  parseVideoMediaSource 
} from '../utils/videoStorage';
import { VideoManagerModal } from './VideoManagerModal';

export interface VideoTrack {
  id: string;
  title: string;
  marathiTitle: string;
  category: 'drone' | 'sunset' | 'infrastructure' | 'monsoon';
  badge: string;
  videoSrc: string;
  duration: number; // in seconds
  description: string;
  landmarks: {
    name: string;
    timeSec: number;
    timeFormatted: string;
    marathiLabel: string;
    tag: string;
    caption: string;
    historicalNote: string;
  }[];
}

export const VIDEO_TRACKS: VideoTrack[] = [
  {
    id: 'drone-aerial',
    title: 'Monsoon Aerial Drone Flyover',
    marathiTitle: 'ड्रोन एरियल व्ह्यू (भातघर धरण) 🛸',
    category: 'drone',
    badge: '4K Drone Reel',
    videoSrc: '/videos/video-drone.mp4',
    duration: 60,
    description: 'Cinematic bird\'s eye flyover through rolling monsoon mist, emerald green Sahyadri hills, winding hill-cut access road and vast reservoir water.',
    landmarks: [
      {
        name: 'Bhatghar Water Horizon',
        timeSec: 0,
        timeFormatted: '00:00',
        marathiLabel: 'शांत जलाशय दृश्य 💧',
        tag: 'Aerial Flyover',
        caption: 'Gliding over the calm waters of Bhatghar Dam under dramatic monsoon clouds',
        historicalNote: 'Clear freshwater lake forming the backdrop of every single plot.',
      },
      {
        name: 'Lush Forest Canopy & Mist',
        timeSec: 8,
        timeFormatted: '00:08',
        marathiLabel: 'धुक्याची चादर व सह्याद्री ☁️',
        tag: 'Canopy View',
        caption: 'Descending through low-hanging monsoon fog revealing dense green hillside flora',
        historicalNote: 'Pure oxygen-rich microclimate nestled away from city pollution.',
      },
      {
        name: 'Winding Hill-Cut Access Road',
        timeSec: 25,
        timeFormatted: '00:25',
        marathiLabel: 'घाटातील लाल मातीचा रस्ता 🛣️',
        tag: 'Access Road',
        caption: 'Broad winding road carved through rich red laterite soil leading up to the estate',
        historicalNote: 'Engineered all-weather gradient road connecting to main Bhor highway.',
      },
      {
        name: 'Plateau Plots & Valley Vistas',
        timeSec: 42,
        timeFormatted: '00:42',
        marathiLabel: '178+ एकर विस्तीर्ण पठार 🏞️',
        tag: 'Estate Overview',
        caption: 'Gentle elevated terraces with panoramic 180° water & mountain lines',
        historicalNote: 'Natural contour plotting maximizing breeze and privacy for each farmhouse.',
      },
    ],
  },
  {
    id: 'sunset-forts',
    title: 'Sunset Panorama & 3 Historic Forts',
    marathiTitle: 'किल्ले दर्शन व सूर्यास्त 🚩',
    category: 'sunset',
    badge: 'Sunset Heritage Reel',
    videoSrc: '/videos/video-sunset.mp4',
    duration: 40,
    description: 'Actual on-site capture at Libertellè (Bhor) featuring golden sunset, Bhatghar Dam backwaters, Kille Rajgad, Sinhagad & Purandar.',
    landmarks: [
      {
        name: 'Sunset & Sahyadri Plateau',
        timeSec: 0,
        timeFormatted: '00:00',
        marathiLabel: 'सह्याद्री सूर्यास्त 🌅',
        tag: 'Site Elevation',
        caption: '"So I am at Bhor right now, look at this beautiful view..."',
        historicalNote: '178+ Acre elevated tableland overlooking Bhatghar Dam with sunset reflections.',
      },
      {
        name: 'Kille Rajgad',
        timeSec: 11,
        timeFormatted: '00:11',
        marathiLabel: 'किल्ले राजगड 🚩',
        tag: '1st Capital of Swarajya',
        caption: 'किल्ले राजगड — The first capital of Swarajya',
        historicalNote: 'Capital of Chhatrapati Shivaji Maharaj for over 25 glorious years.',
      },
      {
        name: 'Kille Sinhagad',
        timeSec: 20,
        timeFormatted: '00:20',
        marathiLabel: 'किल्ले सिंहगड 🚩',
        tag: 'Fortress of Valor',
        caption: 'किल्ले सिंहगड — Place where Tanaji Malusare set an unmatched example of bravery.',
        historicalNote: 'Iconic clifftop fort visible across the northern horizon.',
      },
      {
        name: 'Kille Purandar',
        timeSec: 28,
        timeFormatted: '00:28',
        marathiLabel: 'किल्ले पुरंदर 🚩',
        tag: 'Birthplace of Sambhaji Maharaj',
        caption: 'किल्ले पुरंदर — Birthplace of Chhatrapati Sambhaji Maharaj, symbol of Maratha pride.',
        historicalNote: 'Guard fortress standing sentinel over the southern trade route.',
      },
      {
        name: 'Bhatghar Dam Backwaters',
        timeSec: 38,
        timeFormatted: '00:38',
        marathiLabel: 'भातघर धरण जलाशय 🌊',
        tag: '180° Water View',
        caption: 'Bhatghar Dam — 180° uninterrupted water panorama',
        historicalNote: 'Calm water reservoir shoreline touching the estate foothills.',
      },
    ],
  },
  {
    id: 'infra-road',
    title: 'Internal Concrete Roads & Infrastructure Walk',
    marathiTitle: 'पक्के सिमेंट काँक्रीट रस्ते व गेट 🚧',
    category: 'infrastructure',
    badge: 'On-Site Ground Tour',
    videoSrc: '/videos/video-gate-road.mp4',
    duration: 25,
    description: 'Real on-ground walk showing broad concrete internal roads, stormwater drainage channels, red rock cuttings, gated entrance and plot demarcation.',
    landmarks: [
      {
        name: 'Gated Entrance & Perimeter',
        timeSec: 0,
        timeFormatted: '00:00',
        marathiLabel: 'मुख्य प्रवेशद्वार व कुंपण 🚪',
        tag: 'Gated Security',
        caption: 'Heavy-duty steel security gates & robust chain-link boundary fencing',
        historicalNote: 'Clear boundary demarcations with registered 7/12 land survey tags.',
      },
      {
        name: 'Wide Concrete Internal Road',
        timeSec: 5,
        timeFormatted: '00:05',
        marathiLabel: 'रुंद सिमेंट काँक्रीट रस्ता 🛣️',
        tag: 'Paved Infrastructure',
        caption: 'Solid concrete internal roads with non-slip grooved finish for all vehicles',
        historicalNote: 'Built for longevity through heavy monsoon rains and smooth vehicle access.',
      },
      {
        name: 'Engineered Stormwater Drainage',
        timeSec: 12,
        timeFormatted: '00:12',
        marathiLabel: 'पाण्याचा निचरा करणारी गटारे 🌧️',
        tag: 'Drainage Lines',
        caption: 'Cut-rock stone drainage channels along road curves preventing waterlogging',
        historicalNote: 'Natural gradient stormwater runoff design directing water to natural swales.',
      },
      {
        name: 'Clifftop Dam Viewpoint',
        timeSec: 18,
        timeFormatted: '00:18',
        marathiLabel: 'कड्यावरील लेक व्ह्यू पॉइंट 🌊',
        tag: 'Scenic Viewpoint',
        caption: 'Turn along the cliffside road revealing unobstructed views of the valley and lake',
        historicalNote: 'Elevated vantage point offering year-round sunrise and sunset vistas.',
      },
    ],
  },
  {
    id: 'clifftop-walk',
    title: 'Clifftop Ridge & Valley Panorama',
    marathiTitle: 'कड्यावरील लेक व्ह्यू पॉइंट 🌊',
    category: 'monsoon',
    badge: 'Panoramic Vista Tour',
    videoSrc: '/videos/video-clifftop.mp4',
    duration: 26,
    description: 'Scenic on-site capture along the cliff edge showcasing rich red laterite cuttings, valley settlements and wide Bhatghar water expanse.',
    landmarks: [
      {
        name: 'Red Laterite Hill Cutting',
        timeSec: 0,
        timeFormatted: '00:00',
        marathiLabel: 'लाल मातीचा डोंगर कटिंग ⛰️',
        tag: 'Geology & Contour',
        caption: 'Natural red laterite rock face providing solid structural foundation',
        historicalNote: 'Rich, fertile soil ideal for organic cultivation and private orchards.',
      },
      {
        name: 'Valley & Village Panorama',
        timeSec: 8,
        timeFormatted: '00:08',
        marathiLabel: 'व्हॅली व गाव परिसर दृश्य 🏡',
        tag: 'Valley View',
        caption: 'Overlooking peaceful village settlements and agricultural terraces below',
        historicalNote: 'Preserved agrarian tranquility within 45 mins of Pune city fringe.',
      },
      {
        name: 'Bhatghar Dam Shoreline',
        timeSec: 16,
        timeFormatted: '00:16',
        marathiLabel: 'भातघर धरण किनारा 💧',
        tag: 'Lake Shoreline',
        caption: 'Wide expanse of water stretching across the horizon under monsoon clouds',
        historicalNote: 'Perennial water reservoir ensuring pleasant weather throughout the year.',
      },
      {
        name: 'Scenic Clifftop Lookout',
        timeSec: 22,
        timeFormatted: '00:22',
        marathiLabel: 'निसर्गरम्य कडा व्ह्यू 🌄',
        tag: 'Lookout Point',
        caption: 'Cool mountain breeze sweeping over the plateau viewpoint',
        historicalNote: 'Prime location designated for the central community clubhouse & deck.',
      },
    ],
  },
];

interface SiteTourVideoPlayerProps {
  onBookVisit?: () => void;
}

export const SiteTourVideoPlayer: React.FC<SiteTourVideoPlayerProps> = ({
  onBookVisit,
}) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Dynamic storage resolution
  const [storedVideos, setStoredVideos] = useState<{ [trackId: string]: { url: string; name: string; size: number } }>({});
  const [externalUrls, setExternalUrls] = useState<{ [trackId: string]: string }>({});

  const refreshVideos = async () => {
    try {
      const stored = await loadAllStoredVideos();
      setStoredVideos(stored);
      const urls = getAllExternalVideoUrls();
      setExternalUrls(urls);
    } catch (e) {
      console.warn('SiteTour: could not load storage:', e);
    }
  };

  useEffect(() => {
    refreshVideos();
  }, []);

  const currentTrack = VIDEO_TRACKS[selectedTrackIndex];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Resolve active source
  const getTrackSource = (track: VideoTrack) => {
    if (storedVideos[track.id]?.url) return storedVideos[track.id].url;
    if (externalUrls[track.id]) return externalUrls[track.id];
    return track.videoSrc;
  };

  // Active landmark within current track based on currentTime
  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState(0);

  useEffect(() => {
    let currentIdx = 0;
    for (let i = 0; i < currentTrack.landmarks.length; i++) {
      if (currentTime >= currentTrack.landmarks[i].timeSec) {
        currentIdx = i;
      }
    }
    setActiveLandmarkIndex(currentIdx);
  }, [currentTime, currentTrack]);

  // Handle active video playback sync on track switch
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === selectedTrackIndex) {
        v.currentTime = 0;
        if (isPlaying) {
          v.play().catch(() => {});
        }
      } else {
        v.pause();
      }
    });
    setCurrentTime(0);
  }, [selectedTrackIndex, storedVideos, externalUrls]);

  // Handle Play/Pause toggling
  useEffect(() => {
    const currentVideoEl = videoRefs.current[selectedTrackIndex];
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

  const handleTrackChange = (index: number) => {
    setSelectedTrackIndex(index);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    const activeEl = videoRefs.current[selectedTrackIndex];
    if (activeEl) {
      activeEl.currentTime = time;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const activeLm = currentTrack.landmarks[activeLandmarkIndex] || currentTrack.landmarks[0];
  const activeSrc = getTrackSource(currentTrack);
  const parsedActive = parseVideoMediaSource(activeSrc);

  return (
    <div className="rounded-2xl bg-[#071F19] border-2 border-[#D4B06A]/40 overflow-hidden shadow-2xl">
      
      {/* Top Header with Video Track Selector */}
      <div className="p-4 sm:p-5 border-b border-[#D4B06A]/20 bg-gradient-to-r from-[#123B31] via-[#0E3228] to-[#071F19]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/50 flex items-center justify-center text-[#D4B06A] shadow-md shrink-0">
              <Video className="w-5 h-5 text-[#E8C888]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif-heading text-base sm:text-lg font-bold text-[#FBF9F5]">
                  Actual Site Footage & Video Tour Library
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/30">
                  4 Preloaded HD Reels
                </span>
              </div>
              <p className="text-xs text-[#FBF9F5]/75">
                Recorded live at Libertellè, Bhor overlooking Bhatghar Dam Backwaters & Maratha Forts
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsManagerOpen(true)}
            className="self-start lg:self-center px-3.5 py-1.5 rounded-xl bg-[#0B2D24] hover:bg-[#123B31] border border-[#D4B06A]/40 text-xs font-semibold text-[#E8C888] transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Manage Video Sources</span>
          </button>
        </div>

        {/* Video Mode Selection Tabs (Reels) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {VIDEO_TRACKS.map((track, idx) => {
            const isSelected = selectedTrackIndex === idx;
            return (
              <button
                key={track.id}
                onClick={() => handleTrackChange(idx)}
                className={`p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#D4B06A] text-[#0B2D24] border-[#D4B06A] shadow-lg font-bold ring-2 ring-[#D4B06A]/30'
                    : 'bg-[#071F19]/80 text-[#FBF9F5] border-[#D4B06A]/20 hover:border-[#D4B06A]/50 hover:bg-[#123B31]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#0B2D24] text-[#D4B06A]' : 'bg-[#123B31] text-[#E8C888]'}`}>
                    {track.category === 'sunset' && <Sun className="w-4 h-4" />}
                    {track.category === 'drone' && <Sparkles className="w-4 h-4" />}
                    {track.category === 'infrastructure' && <Shield className="w-4 h-4" />}
                    {track.category === 'monsoon' && <Eye className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight line-clamp-1">
                      {track.title}
                    </span>
                    <span className={`text-[10px] font-medium block mt-0.5 ${isSelected ? 'text-[#0B2D24]/80' : 'text-[#52B788]'}`}>
                      {track.marathiTitle}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#0B2D24]' : 'text-[#FBF9F5]/40'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Video Box Screen */}
      <div className="relative w-full aspect-video sm:aspect-[16/9] bg-[#000] overflow-hidden group">
        
        {/* Dynamic Source Rendering: Google Drive Embed, YouTube, or HTML5 Video */}
        {(() => {
          if (parsedActive.type === 'gdrive' && parsedActive.embedUrl) {
            return (
              <iframe
                key={`gdrive-tour-${currentTrack.id}`}
                src={parsedActive.embedUrl}
                title={currentTrack.title}
                className="absolute inset-0 w-full h-full border-0 z-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            );
          }

          if (parsedActive.type === 'youtube' && parsedActive.embedUrl) {
            return (
              <iframe
                key={`yt-tour-${currentTrack.id}`}
                src={parsedActive.embedUrl}
                title={currentTrack.title}
                className="absolute inset-0 w-full h-full border-0 z-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            );
          }

          return VIDEO_TRACKS.map((track, idx) => {
            const isCurrent = selectedTrackIndex === idx;
            const src = getTrackSource(track);

            return (
              <video
                key={track.id}
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

        {/* Live Top Overlay Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#071F19]/90 backdrop-blur-md border border-[#D4B06A]/50 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#E8C888] animate-ping" />
              <span className="font-serif-heading text-xs sm:text-sm font-bold text-[#E8C888]">
                {activeLm.marathiLabel}
              </span>
            </div>
            <div className="px-2.5 py-0.5 rounded bg-[#071F19]/80 backdrop-blur-sm text-[11px] text-[#52B788] font-medium border border-[#52B788]/30 w-max">
              {activeLm.tag}
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-[#071F19]/85 text-[#FBF9F5] hover:text-[#D4B06A] border border-[#D4B06A]/30 backdrop-blur-md transition-colors shadow-lg"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#FBF9F5]/70" /> : <Volume2 className="w-4 h-4 text-[#52B788]" />}
            </button>
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg bg-[#071F19]/85 text-[#FBF9F5] hover:text-[#D4B06A] border border-[#D4B06A]/30 backdrop-blur-md transition-colors shadow-lg"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#D4B06A]" /> : <Play className="w-4 h-4 text-[#52B788]" />}
            </button>
          </div>
        </div>

        {/* Dynamic Caption Card */}
        <div className="absolute bottom-12 left-4 right-4 text-center pointer-events-none">
          <div className="inline-block px-4 py-2 rounded-xl bg-[#071F19]/90 backdrop-blur-md border border-[#D4B06A]/40 text-xs sm:text-sm font-medium text-[#FBF9F5] shadow-2xl max-w-xl mx-auto">
            <span className="text-[#E8C888] font-bold block mb-0.5">{activeLm.caption}</span>
            <span className="text-[11px] text-[#FBF9F5]/75">{activeLm.historicalNote}</span>
          </div>
        </div>

        {/* Bottom Scrubber */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#071F19] to-transparent flex flex-col space-y-1 pointer-events-auto">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-[#E8C888] font-mono w-8">
              {Math.floor(currentTime)}s
            </span>
            <input
              type="range"
              min="0"
              max={currentTrack.duration}
              step="0.1"
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#123B31] rounded-lg appearance-none cursor-pointer accent-[#D4B06A]"
            />
            <span className="text-[10px] text-[#FBF9F5]/60 font-mono w-8">
              {currentTrack.duration}s
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Landmarks for Active Reel */}
      <div className="p-4 sm:p-5 bg-[#0E3228]/95 border-t border-[#D4B06A]/20">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider font-bold text-[#D4B06A] flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Key Video Landmarks & Highlights:</span>
          </span>
          <span className="text-[11px] text-[#52B788] font-semibold">
            {currentTrack.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentTrack.landmarks.map((lm, idx) => {
            const isSelected = activeLandmarkIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSeek(lm.timeSec)}
                className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#D4B06A] text-[#0B2D24] border-[#D4B06A] shadow-lg scale-[1.02]'
                    : 'bg-[#071F19] text-[#FBF9F5] border-[#D4B06A]/20 hover:border-[#D4B06A]/50 hover:bg-[#123B31]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#0B2D24]' : 'text-[#D4B06A]'}`}>
                    {lm.timeFormatted}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${isSelected ? 'bg-[#0B2D24]/20 text-[#0B2D24]' : 'bg-[#123B31] text-[#52B788]'}`}>
                    {lm.tag}
                  </span>
                </div>
                <span className="text-xs font-bold leading-snug line-clamp-1">
                  {lm.marathiLabel}
                </span>
                <span className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-[#0B2D24]/80' : 'text-[#FBF9F5]/60'}`}>
                  {lm.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-[#D4B06A]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#FBF9F5]/80">
            <Navigation className="w-4 h-4 text-[#52B788]" />
            <span>Site Elevation: <strong>Bhor Valley / Velvand (Pune)</strong></span>
          </div>

          {onBookVisit && (
            <button
              onClick={onBookVisit}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md flex items-center justify-center space-x-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Experience This View In-Person (Book Site Visit)</span>
            </button>
          )}
        </div>
      </div>

      {/* Video Manager / Sources Modal */}
      <VideoManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        storedVideos={storedVideos}
        externalUrls={externalUrls}
        onVideosUpdated={refreshVideos}
        onPreviewTrack={(idx) => {
          setSelectedTrackIndex(idx);
          setIsManagerOpen(false);
        }}
      />
    </div>
  );
};
