/* Strategy → Ship — CANONICAL card renderer (locked 2026-09-09).
 *
 * Source of truth: the shipped 36-point-gap OG
 *   public/og/og-agency-orchestration-gap-36-points-v1.png
 * whose Claude Design source is kept verbatim at
 *   brand/strategy-to-ship/reference/36-point-gap-modules.dc.html  (#og block).
 * Tokens: brand/strategy-to-ship/tokens.ts (STS_CARD). Spec: docs/brand/STRATEGY-TO-SHIP-BRAND-LOCK.md §8.
 *
 * Every Strategy to Ship visual (OG, LinkedIn cover, X card, carousel cover)
 * renders through renderCard() so font, color, spacing and the endorsement
 * lockup are identical everywhere. One config object per asset.
 *
 *   renderCard({ photoPath, kicker, headline, dek, outPath, format })
 *   format: 'og' (1200×630) | 'linkedin-cover' (1200×627) | 'x' (1600×900) | 'carousel-cover' (1080×1350)
 *   grade:  'documentary' (default) | 'cinematic'  — photo grade only, per CLAUDE.md OG rule
 *
 * Landscape formats: photo breathes on the left, type in the right column.
 * Portrait (carousel-cover): photo on top, vertical gradient, type at the bottom.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const C = {
  paper: '#F7F1E6', inkDeep: '#16110B', coral: '#F0512E', amber: '#E0A23C',
  slate: '#79705F', slateOnDark: '#9B8F78', teal: '#5CE0D2', dek: '#CFC3A7',
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap';

const RIBBON = `<svg viewBox="0 0 50 32" style="height:.6em"><path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill="${C.coral}"></path></svg>`;

const GRADES = {
  documentary: 'sepia(0.18) saturate(1.08) contrast(1.12) brightness(0.92)',
  cinematic:   'sepia(0.32) saturate(1.15) contrast(1.28) brightness(0.72)',
};

// Scale factor relative to the 1200×630 master, so every format keeps the
// same proportions (padding 64/72, kicker 17, headline 76, dek 26, footer 13/22).
const FORMATS = {
  'og':             { w: 1200, h: 630,  s: 1,    portrait: false },
  'linkedin-cover': { w: 1200, h: 627,  s: 1,    portrait: false },
  'x':              { w: 1600, h: 900,  s: 1.33, portrait: false },
  'carousel-cover': { w: 1080, h: 1350, s: 1.15, portrait: true  },
};

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wordmark(px) {
  return `<span style="font-family:'Space Mono',monospace;font-weight:700;font-size:${px}px;letter-spacing:-.035em;display:inline-flex;align-items:center;gap:.28em;color:${C.paper}">Strategy${RIBBON}Ship</span>`;
}

function footer(s) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(247,241,230,.22);padding-top:${20 * s}px">
    <div style="display:flex;align-items:center;gap:${12 * s}px">${wordmark(22 * s)}<span style="width:${18 * s}px;height:1px;background:${C.slate}"></span><span style="font-family:'JetBrains Mono',monospace;font-size:${13 * s}px;letter-spacing:.16em;color:${C.teal};white-space:nowrap">FROM ENSO LABS</span></div>
    <span style="font-family:'JetBrains Mono',monospace;font-size:${13 * s}px;letter-spacing:.14em;color:${C.slateOnDark};white-space:nowrap">ENSOLABS.AI/INSIGHTS</span>
  </div>`;
}

function buildHtml({ photoDataUri, kicker, headline, dek, format, grade, objectPosition }) {
  const f = FORMATS[format];
  const s = f.s;
  const overlay = f.portrait
    ? `linear-gradient(180deg, rgba(22,17,11,0) 18%, rgba(22,17,11,.6) 42%, rgba(22,17,11,.94) 60%)`
    : `linear-gradient(90deg, rgba(22,17,11,0) 25%, rgba(22,17,11,.6) 50%, rgba(22,17,11,.94) 70%)`;
  const colW = f.portrait ? f.w - 2 * 72 * s : 560 * s;
  const headPx = f.portrait ? 84 * s : 76 * s;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${f.w}px;height:${f.h}px;position:relative;overflow:hidden;background:${C.inkDeep};color:${C.paper};font-family:'Inter Tight',sans-serif}
  .photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${objectPosition};filter:${GRADES[grade] || GRADES.documentary}}
  .overlay{position:absolute;inset:0;background:${overlay}}
  .frame{position:absolute;inset:0;padding:${64 * s}px ${72 * s}px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end}
  .kicker{display:flex;align-items:center;gap:${12 * s}px;font-family:'JetBrains Mono',monospace;font-size:${17 * s}px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}
  .kicker i{width:${12 * s}px;height:${12 * s}px;background:${C.amber};display:inline-block}
  .col{display:flex;flex-direction:column;gap:${22 * s}px;width:${colW}px}
  h1{font-family:'Space Mono',monospace;font-weight:700;font-size:${headPx}px;line-height:1.0;letter-spacing:-.035em}
  .dek{font-weight:500;font-size:${26 * s}px;line-height:1.32;color:${C.dek}}
</style></head><body>
  <img class="photo" src="${photoDataUri}">
  <div class="overlay"></div>
  <div class="frame">
    <div class="kicker"><i></i>${esc(kicker)}</div>
    <div class="col">
      <h1>${Array.isArray(headline) ? headline.map(esc).join('<br>') : esc(headline)}</h1>
      ${dek ? `<div class="dek">${esc(dek)}</div>` : ''}
      ${footer(s)}
    </div>
  </div>
</body></html>`;
}

async function renderCard({ photoPath, kicker, headline, dek, outPath, format = 'og', grade = 'documentary', objectPosition, type }) {
  if (!FORMATS[format]) throw new Error(`Unknown format "${format}". Use: ${Object.keys(FORMATS).join(', ')}`);
  const f = FORMATS[format];
  // Landscape photos cropped to portrait lose a centered subject — bias left (most
  // documentary shots place the person left, whiteboard/screen right). Override per photo.
  if (!objectPosition) objectPosition = f.portrait ? '22% 50%' : '50% 50%';
  const buf = fs.readFileSync(photoPath);
  const ext = path.extname(photoPath).slice(1).toLowerCase().replace('jpg', 'jpeg');
  const photoDataUri = `data:image/${ext};base64,${buf.toString('base64')}`;
  const html = buildHtml({ photoDataUri, kicker, headline, dek, format, grade, objectPosition });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: f.w, height: f.h });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 500));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const isJpeg = (type || path.extname(outPath).slice(1).toLowerCase()).replace('jpg', 'jpeg') === 'jpeg';
  await page.screenshot(isJpeg ? { path: outPath, type: 'jpeg', quality: 86 } : { path: outPath, type: 'png' });
  await browser.close();
  console.log(`card [${format}] ->`, outPath);
}

module.exports = { renderCard, buildHtml, FORMATS, COLORS: C, RIBBON };
