const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'videos');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating Video 1: Sunset & Forts (video-sunset.mp4)...');
// 40 seconds, vertical 720x1280 or 1080x1920 with golden hour gradient, sun, forts, and animated text
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=#C97A3E:s=720x1280:d=40" \
    -f lavfi -i "sine=frequency=432:duration=40" \
    -filter_complex "\
      [0:v]drawbox=y=ih*0.55:color=#4A1E14:width=iw:height=ih*0.45:t=fill,\
      drawbox=y=ih*0.40:color=#785542:width=iw:height=ih*0.18:t=fill,\
      drawbox=y=ih*0.45:x=iw*0.1:color=#4FA3D1@0.85:width=iw*0.8:height=ih*0.12:t=fill,\
      drawbox=y=ih*0.25:x=iw*0.55:color=#FFF3C4@0.9:width=90:height=90:t=fill,\
      drawtext=text='Libertelle Bhor - Sunset Over Forts':fontcolor=white:fontsize=32:x=(w-text_w)/2:y=100:box=1:boxcolor=black@0.6:boxborderw=8,\
      drawtext=text='Bhatghar Dam Backwaters & 3 Historic Maratha Forts':fontcolor=#F5D061:fontsize=22:x=(w-text_w)/2:y=160:box=1:boxcolor=black@0.6:boxborderw=6,\
      drawtext=text='Kille Rajgad | Kille Sinhagad | Kille Purandar':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=h-220:box=1:boxcolor=black@0.6:boxborderw=6,\
      drawtext=text='178+ Acre Sahyadri Tableland, Bhor (Pune)':fontcolor=#7BE495:fontsize=20:x=(w-text_w)/2:y=h-160:box=1:boxcolor=black@0.6:boxborderw=6[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-sunset.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 1', e);
}

console.log('Generating Video 2: 4K Drone Flyover (video-drone.mp4)...');
// 61 seconds, horizontal 1280x720 with lake, green mountains, drone perspective
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=#3E5448:s=1280x720:d=60" \
    -f lavfi -i "sine=frequency=528:duration=60" \
    -filter_complex "\
      [0:v]drawbox=y=0:color=#8D9CA8:width=iw:height=ih*0.45:t=fill,\
      drawbox=y=ih*0.35:color=#326B88:width=iw:height=ih*0.25:t=fill,\
      drawbox=y=ih*0.50:color=#2E5A36:width=iw:height=ih*0.50:t=fill,\
      drawbox=y=ih*0.62:x=iw*0.2:color=#B24C38:width=iw*0.6:height=35:t=fill,\
      drawtext=text='4K Drone Flyover - Bhatghar Dam Basin':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=80:box=1:boxcolor=black@0.6:boxborderw=10,\
      drawtext=text='180 Degree Reservoir Shoreline & Monsoon Sahyadri Hills':fontcolor=#F5D061:fontsize=24:x=(w-text_w)/2:y=140:box=1:boxcolor=black@0.6:boxborderw=8,\
      drawtext=text='Lush Green Plateau Plots & Winding Access Road':fontcolor=#7BE495:fontsize=22:x=(w-text_w)/2:y=h-120:box=1:boxcolor=black@0.6:boxborderw=8[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-drone.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 2', e);
}

console.log('Generating Video 3: Gate & Concrete Road (video-gate-road.mp4)...');
// 26 seconds, vertical 720x1280 with gated entrance, concrete road, storm drainage
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=#64748B:s=720x1280:d=26" \
    -f lavfi -i "sine=frequency=396:duration=26" \
    -filter_complex "\
      [0:v]drawbox=y=ih*0.35:color=#335839:width=iw:height=ih*0.65:t=fill,\
      drawbox=y=ih*0.48:x=iw*0.15:color=#BDBDBD:width=iw*0.7:height=ih*0.52:t=fill,\
      drawbox=y=ih*0.45:x=iw*0.05:color=#3E2723:width=iw*0.15:height=ih*0.55:t=fill,\
      drawtext=text='Gated Security & Concrete Internal Roads':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=100:box=1:boxcolor=black@0.6:boxborderw=8,\
      drawtext=text='Heavy Steel Gate | Solid RCC Paved Road | Storm Drainage':fontcolor=#F5D061:fontsize=20:x=(w-text_w)/2:y=160:box=1:boxcolor=black@0.6:boxborderw=6,\
      drawtext=text='All-Weather Infrastructure at Libertelle Bhor':fontcolor=#7BE495:fontsize=22:x=(w-text_w)/2:y=h-180:box=1:boxcolor=black@0.6:boxborderw=6[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-gate-road.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 3', e);
}

console.log('Generating Video 4: Clifftop Lake Walk (video-clifftop.mp4)...');
// 26 seconds, vertical 720x1280 with clifftop walk, lake panorama, red soil cutting
try {
  execSync(`ffmpeg -y -f lavfi -i "color=c=#556B7D:s=720x1280:d=26" \
    -f lavfi -i "sine=frequency=432:duration=26" \
    -filter_complex "\
      [0:v]drawbox=y=ih*0.30:color=#3F524B:width=iw:height=ih*0.70:t=fill,\
      drawbox=y=ih*0.38:x=iw*0.1:color=#4FA3D1@0.8:width=iw*0.8:height=ih*0.18:t=fill,\
      drawbox=y=ih*0.50:x=0:color=#752B1E:width=iw*0.4:height=ih*0.5:t=fill,\
      drawbox=y=ih*0.54:x=iw*0.35:color=#A8A29E:width=iw*0.65:height=ih*0.46:t=fill,\
      drawtext=text='Clifftop Lake Viewpoint & Valley Panorama':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=100:box=1:boxcolor=black@0.6:boxborderw=8,\
      drawtext=text='Natural Laterite Rock Cuttings & Perennial Lake View':fontcolor=#F5D061:fontsize=20:x=(w-text_w)/2:y=160:box=1:boxcolor=black@0.6:boxborderw=6,\
      drawtext=text='Velvand, Bhor - 45 Mins From Pune':fontcolor=#7BE495:fontsize=22:x=(w-text_w)/2:y=h-180:box=1:boxcolor=black@0.6:boxborderw=6[v];\
      [1:a]volume=0.15[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${path.join(outputDir, 'video-clifftop.mp4')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('Error creating video 4', e);
}

console.log('All 4 video files generated successfully in public/videos/');
