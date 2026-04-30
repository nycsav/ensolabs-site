const sharp = require('sharp');

const WIDTH = 1200;
const HEIGHT = 630;

async function generate() {
  const svg = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0d1321"/>
    <text x="600" y="270" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="#ffffff">ENSO LABS</text>
    <text x="600" y="330" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#5ce0d2">Strategy to Ship.</text>
    <text x="600" y="580" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#888888">ensolabs.ai</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/og-default.png');

  console.log('✓ public/og-default.png generated (1200×630)');
}

generate().catch(console.error);
