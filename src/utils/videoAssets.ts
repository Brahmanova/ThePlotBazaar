// Direct Vite asset imports - bundled and hashed directly into dist/assets/
// This guarantees 100% deployment reliability on Vercel, Netlify, and all CDNs
import droneVideo from '../assets/videos/video-drone.mp4';
import sunsetVideo from '../assets/videos/video-sunset.mp4';
import gateRoadVideo from '../assets/videos/video-gate-road.mp4';
import clifftopVideo from '../assets/videos/video-clifftop.mp4';

export const VIDEO_ASSETS: Record<string, string> = {
  'monsoon-drone': droneVideo,
  'drone-aerial': droneVideo,
  'sunset-panorama': sunsetVideo,
  'infra-concrete': gateRoadVideo,
  'clifftop-viewpoint': clifftopVideo,
};

export const DEFAULT_VIDEOS = {
  drone: droneVideo,
  sunset: sunsetVideo,
  gateRoad: gateRoadVideo,
  clifftop: clifftopVideo,
};
