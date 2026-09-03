/* Shared template: Enso Labs "signature photography" OG/hero card.
 * Per brand/strategy-to-ship/../brand-principles.md §9 (Imagery):
 *   "Photography (human): warm-graded documentary photography — real people
 *   in real rooms. Treatment: slight warm grade, deep contrast, paper-toned.
 *   Decisive crops; type may sit over the image."
 * Hard NEVER: stock "AI" imagery, glowing brains, robots, neural-net clipart.
 *
 * This is the reusable generator for every article's primary OG/social image
 * going forward — one config object per article, this module does the render.
 * Source photos are committed under public/images/photography/ (never
 * hot-linked from a CDN at build/generation time — see CLAUDE.md's OG rule).
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const GRADES = {
  // Default: brand-principles.md §9 — slight warm grade, deep contrast, paper-toned.
  documentary: {
    filter: 'sepia(0.18) saturate(1.08) contrast(1.12) brightness(0.92)',
    scrim: `linear-gradient(180deg,
           rgba(20,15,10,0.12) 0%,
           rgba(20,15,10,0.20) 38%,
           rgba(17,13,10,0.72) 72%,
           rgba(13,10,8,0.93) 100%)`,
    vignette: 'none',
  },
  // Cinematic: deeper shadow, stronger amber push, vignette — for atmospheric/
  // silhouette shots (mood over documentation). Same type system, heavier grade.
  cinematic: {
    filter: 'sepia(0.32) saturate(1.15) contrast(1.28) brightness(0.72)',
    scrim: `linear-gradient(180deg,
           rgba(15,9,4,0.30) 0%,
           rgba(15,9,4,0.18) 35%,
           rgba(13,8,4,0.62) 68%,
           rgba(10,6,3,0.94) 100%)`,
    vignette: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,5,2,0.55) 100%)',
  },
};

function buildHtml({ photoDataUri, kicker, headlineLines, dek, width, height, grade = 'documentary', objectPosition = 'center 35%' }) {
  const g = GRADES[grade] || GRADES.documentary;
  return `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${width}px;height:${height}px;position:relative;overflow:hidden;
       font-family:'Inter Tight',sans-serif;background:#0D1321}
  .photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
         object-position:${objectPosition};
         filter:${g.filter};}
  .grain{position:absolute;inset:0;
         background-image:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px);}
  .vignette{position:absolute;inset:0;background:${g.vignette};}
  .scrim{position:absolute;inset:0;
         background:${g.scrim};}
  .content{position:absolute;left:0;right:0;bottom:0;padding:48px 56px 44px;}
  .kicker{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;
          text-transform:uppercase;letter-spacing:0.18em;color:#F0512E;margin-bottom:16px}
  h1{font-family:'Lora',Georgia,serif;font-weight:600;font-size:46px;line-height:1.14;
     color:#F7F1E6;max-width:920px}
  .dek{margin-top:16px;font-size:18px;line-height:1.45;color:#D8CFC0;max-width:760px}
  .brand{position:absolute;top:40px;right:56px;font-family:'JetBrains Mono',monospace;
         font-size:13px;letter-spacing:0.05em;color:#F7F1E6;opacity:0.9}
  .brand .arrow{color:#F0512E}
</style></head><body>
  <img class="photo" src="${photoDataUri}">
  <div class="grain"></div>
  <div class="vignette"></div>
  <div class="scrim"></div>
  <div class="brand">STRATEGY <span class="arrow">&rarr;</span> SHIP</div>
  <div class="content">
    <div class="kicker">${kicker}</div>
    <h1>${headlineLines.join('<br>')}</h1>
    ${dek ? `<div class="dek">${dek}</div>` : ''}
  </div>
</body></html>`;
}

async function renderPhotoOg({ photoPath, kicker, headlineLines, dek, outPath, width = 1200, height = 630, grade = 'documentary', objectPosition }) {
  const photoBuffer = fs.readFileSync(photoPath);
  const ext = path.extname(photoPath).slice(1).replace('jpg', 'jpeg');
  const photoDataUri = `data:image/${ext};base64,${photoBuffer.toString('base64')}`;
  const html = buildHtml({ photoDataUri, kicker, headlineLines, dek, width, height, grade, ...(objectPosition ? { objectPosition } : {}) });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 700));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  // Photographic content compresses far better as JPEG than lossless PNG.
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 86 });
  await browser.close();
  console.log('photo OG ->', outPath);
}

module.exports = { renderPhotoOg };
