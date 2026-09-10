const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'videos');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating Video 1: Sunset & Forts (video-sunset.mp4)...');
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=0xC97A3E:s=720x1280:d=40:r=25" \
    -f lavfi -i "sine=frequency=432:duration=40" \
    -filter_complex "\
      [0:v]drawbox=y=ih*0.55:color=0x4A1E14:width=iw:height=ih*0.45:t=fill,\
      drawbox=y=ih*0.40:color=0x785542:width=iw:height=ih*0.18:t=fill,\
      drawbox=y=ih*0.45:x=iw*0.1:color=0x4FA3D1@0.85:width=iw*0.8:height=ih*0.12:t=fill,\
      drawbox=y=ih*0.25:x=iw*0.55:color=0xFFF3C4@0.9:width=90:height=90:t=fill[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-sunset.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 1', e);
}

console.log('Generating Video 2: 4K Drone Flyover (video-drone.mp4)...');
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=0x3E5448:s=1280x720:d=60:r=25" \
    -f lavfi -i "sine=frequency=528:duration=60" \
    -filter_complex "\
      [0:v]drawbox=y=0:color=0x8D9CA8:width=iw:height=ih*0.45:t=fill,\
      drawbox=y=ih*0.35:color=0x326B88:width=iw:height=ih*0.25:t=fill,\
      drawbox=y=ih*0.50:color=0x2E5A36:width=iw:height=ih*0.50:t=fill,\
      drawbox=y=ih*0.62:x=iw*0.2:color=0xB24C38:width=iw*0.6:height=35:t=fill[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-drone.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 2', e);
}

console.log('Generating Video 3: Gate & Concrete Road (video-gate-road.mp4)...');
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=0x64748B:s=720x1280:d=26:r=25" \
    -f lavfi -i "sine=frequency=396:duration=26" \
    -filter_complex "\
      [0:v]drawbox=y=ih*0.35:color=0x335839:width=iw:height=ih*0.65:t=fill,\
      drawbox=y=ih*0.48:x=iw*0.15:color=0xBDBDBD:width=iw*0.7:height=ih*0.52:t=fill,\
      drawbox=y=ih*0.45:x=iw*0.05:color=0x3E2723:width=iw*0.15:height=ih*0.55:t=fill[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-gate-road.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 3', e);
}

console.log('Generating Video 4: Clifftop Lake Walk (video-clifftop.mp4)...');
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=0x556B7D:s=720x1280:d=26:r=25" \
    -f lavfi -i "sine=frequency=432:duration=26" \
    -filter_complex "\
      [0:v]drawbox=y=ih*0.30:color=0x3F524B:width=iw:height=ih*0.70:t=fill,\
      drawbox=y=ih*0.38:x=iw*0.1:color=0x4FA3D1@0.8:width=iw*0.8:height=ih*0.18:t=fill,\
      drawbox=y=ih*0.50:x=0:color=0x752B1E:width=iw*0.4:height=ih*0.5:t=fill,\
      drawbox=y=ih*0.54:x=iw*0.35:color=0xA8A29E:width=iw*0.65:height=ih*0.46:t=fill[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-clifftop.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 4', e);
}

console.log('All 4 video files generated successfully in public/videos/');
