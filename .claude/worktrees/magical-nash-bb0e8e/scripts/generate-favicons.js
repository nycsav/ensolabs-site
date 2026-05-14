const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TEAL = '#5ce0d2';
const NAVY = '#0d1321';

// Chevron paths extracted from logo-white.svg (path1, path3, path7) — the three teal shapes
// Original coordinates are in a 500x500 viewBox with scale(2.5)
// The chevron occupies roughly x:40-94, y:215-286 in the 500x500 space
// We'll use a tight viewBox around the chevron for the favicon
const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 200 80 100" width="SIZE" height="SIZE">
  <path fill="${TEAL}" transform="scale(2.5 2.5)" d="M32.9394 101.971L36.5888 102.372C36.0623 103.664 35.5152 104.536 34.5833 105.558L32.5901 107.071C32.5117 105.837 32.1667 102.915 32.9394 101.971Z"/>
  <path fill="${TEAL}" transform="scale(2.5 2.5)" d="M16.7764 102.101L30.5777 102.099C30.5506 104.161 30.986 107.411 30.3368 109.304C29.9817 110.339 29.1166 111.404 28.4905 112.3L26.5486 114.385L17.3808 104.119C16.8662 103.416 16.6245 102.971 16.7764 102.101Z"/>
  <path fill="${TEAL}" transform="scale(2.5 2.5)" d="M16.074 86.1907C20.2142 86.2592 24.3559 86.2275 28.4966 86.2393C31.4925 86.2477 34.47 86.1731 37.434 86.687L31.8065 92.6102L26.6631 98.496C24.83 96.6946 23.2043 94.7461 21.4684 92.8576C19.6005 90.8256 17.3016 88.6797 16.074 86.1907Z"/>
</svg>`;

async function generateFavicon(size, filename, bg) {
  const svg = CHEVRON_SVG.replace(/SIZE/g, String(size));
  let pipeline = sharp(Buffer.from(svg)).resize(size, size);
  if (bg) {
    pipeline = pipeline.flatten({ background: bg });
  }
  await pipeline.png().toFile(path.join('public', filename));
  console.log(`  ✓ ${filename} (${size}x${size})`);
}

async function generateIco() {
  const svg = CHEVRON_SVG.replace(/SIZE/g, '32');
  const pngBuf = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();

  // Minimal ICO: single 32x32 PNG entry
  const dir = Buffer.alloc(6 + 16);
  dir.writeUInt16LE(0, 0);     // reserved
  dir.writeUInt16LE(1, 2);     // ICO type
  dir.writeUInt16LE(1, 4);     // 1 image
  dir[6] = 32;                 // width
  dir[7] = 32;                 // height
  dir[8] = 0;                  // color palette
  dir[9] = 0;                  // reserved
  dir.writeUInt16LE(1, 10);    // color planes
  dir.writeUInt16LE(32, 12);   // bits per pixel
  dir.writeUInt32LE(pngBuf.length, 14); // size of image data
  dir.writeUInt32LE(22, 18);   // offset to image data

  fs.writeFileSync(path.join('public', 'favicon.ico'), Buffer.concat([dir, pngBuf]));
  console.log('  ✓ favicon.ico (32x32)');
}

async function main() {
  console.log('Generating favicons...');
  await generateFavicon(16, 'favicon-16x16.png', null);
  await generateFavicon(32, 'favicon-32x32.png', null);
  await generateFavicon(180, 'apple-touch-icon.png', NAVY);
  await generateIco();
  console.log('Done.');
}

main().catch(console.error);
