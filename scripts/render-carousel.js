/* Strategy → Ship — LinkedIn document carousel renderer.
 * Reads a carousel.json (the exact contract emitted by the distribute skill) and renders
 * a 1080×1350 multi-page PDF + a cover PNG in the Warm Signal brand.
 *
 * Usage:  node scripts/render-carousel.js <path/to/carousel.json>
 * Output: <same dir>/carousel.pdf  and  <same dir>/carousel-cover.png
 *
 * Schema:
 *   { slug, kicker, sourceCredit,
 *     cover:{ headline, stamp },
 *     slides:[{ n, heading, body }],
 *     sources:[{ claim, source }],
 *     cta:{ headline, subhead } }
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { logoInk, logoWhite } = require('./_fds-logo');

const jsonPath = process.argv[2];
if (!jsonPath) { console.error('Usage: node scripts/render-carousel.js <carousel.json>'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const outDir = path.dirname(path.resolve(jsonPath));

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // keep an em-arrow if authors typed it
  .replace(/-&gt;/g, '&rarr;');

const total = 2 + data.slides.length + (data.sources && data.sources.length ? 1 : 0); // cover + slides + sources + cta
let pageNo = 0;
const pager = () => { pageNo += 1; return `${String(pageNo).padStart(2, '0')} / ${String(total).padStart(2, '0')}`; };

const foot = (rightText) => `
  <footer>
    <span class="enso">${data.theme === 'dark' ? logoWhite(38) : logoInk(38)}</span>
    <span class="fr fm">${rightText || 'Powered by Enso Labs'}</span>
  </footer>`;

// ---- COVER ----
const cover = `
  <section class="slide cover"><svg class="glyph" viewBox="0 0 600 600"><circle cx="290" cy="300" r="270"/><circle cx="328" cy="300" r="232"/><circle cx="364" cy="300" r="196"/><circle cx="398" cy="300" r="162"/><circle cx="430" cy="300" r="130"/><circle cx="460" cy="300" r="100"/><circle cx="488" cy="300" r="72"/><circle cx="512" cy="300" r="48"/><circle cx="532" cy="300" r="28"/></svg>
    <div class="top">
      <p class="kick fm">${esc(data.kicker || 'STRATEGY → SHIP')}</p>
      ${data.cover.stamp ? `<span class="stamp fm">${esc(data.cover.stamp)}</span>` : ''}
    </div>
    <h1 class="fd">${esc(data.cover.headline)}</h1>
    <div class="rule"></div>
    ${foot('Powered by Enso Labs')}
    ${(pageNo += 1, '')}
  </section>`;

// ---- CONTENT SLIDES ----
const slides = data.slides.map((s) => `
  <section class="slide">
    <p class="snum fm">${String(s.n).padStart(2, '0')}</p>
    <h2 class="fd">${esc(s.heading)}</h2>
    <p class="body">${esc(s.body)}</p>
    ${foot()}
    <span class="pg fm">${pager()}</span>
  </section>`).join('');

// ---- SOURCES ----
const sources = (data.sources && data.sources.length) ? `
  <section class="slide sources">
    <p class="snum fm">SOURCES</p>
    <h2 class="fd">Receipts.</h2>
    <ul class="srclist">
      ${data.sources.map((s) => `<li><span class="src fm">${esc(s.source)}</span><span class="claim">${esc(s.claim)}</span></li>`).join('')}
    </ul>
    ${foot()}
    <span class="pg fm">${pager()}</span>
  </section>` : '';

// ---- CTA ----
const cta = `
  <section class="slide cta"><svg class="glyph" viewBox="0 0 600 600"><circle cx="290" cy="300" r="270"/><circle cx="328" cy="300" r="232"/><circle cx="364" cy="300" r="196"/><circle cx="398" cy="300" r="162"/><circle cx="430" cy="300" r="130"/><circle cx="460" cy="300" r="100"/><circle cx="488" cy="300" r="72"/><circle cx="512" cy="300" r="48"/><circle cx="532" cy="300" r="28"/></svg>
    <p class="kick fm">${esc(data.kicker || 'STRATEGY → SHIP')}</p>
    <h1 class="fd">${esc(data.cta.headline)}</h1>
    <p class="subhead">${esc(data.cta.subhead)}</p>
    <div class="rule"></div>
    ${foot()}
    <span class="pg fm">${pager()}</span>
  </section>`;

const html = `
<!DOCTYPE html><html><head><meta charset="utf-8"><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --ground:#F7F1E6; --fg:#1E1813; --fg-strong:#16110B; --mute:#79705F;
    --rule:#DDD2BC; --pg:#B3A98F; --claim:#6B5E42; --coral:#F0512E; --amber:#E0A23C;
    --sweep:rgba(255,253,249,0.42); --sweep2:rgba(224,162,60,0.10); --bloom:rgba(240,81,46,0.07);
  }
  [data-theme="dark"] {
    --ground:#1E1813; --fg:#F7F1E6; --fg-strong:#FFFFFF; --mute:#A2947E;
    --rule:#3A2E24; --pg:#6E6152; --claim:#B7A992;
    --sweep:rgba(247,241,230,0.10); --sweep2:rgba(224,162,60,0.20); --bloom:rgba(240,81,46,0.22);
  }
  html, body { background:var(--ground); }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  .slide {
    position:relative; width:1080px; height:1350px; color:var(--fg);
    background:
      radial-gradient(60% 45% at 86% 90%, var(--bloom) 0%, rgba(0,0,0,0) 70%),
      linear-gradient(158deg, var(--sweep) 0%, rgba(0,0,0,0) 46%),
      linear-gradient(200deg, var(--sweep2) 0%, rgba(0,0,0,0) 55%),
      var(--ground);
    font-family:'Inter Tight',sans-serif; padding:104px 96px 96px; overflow:hidden;
    page-break-after:always; break-after:page; display:flex; flex-direction:column;
  }
  .slide:last-child { page-break-after:auto; break-after:auto; }
  .kick { font-size:26px; text-transform:uppercase; letter-spacing:0.22em; color:var(--coral); font-weight:700; max-width:680px; }
  .top { display:flex; align-items:center; justify-content:space-between; }
  .stamp { align-self:flex-start; font-size:22px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;
           color:#FFF; background:var(--coral); padding:10px 18px; border-radius:4px; }

  /* cover */
  .cover h1 { margin-top:auto; font-size:118px; line-height:1.02; letter-spacing:-0.02em; font-weight:500; color:var(--fg-strong); }
  .cover .rule { height:8px; width:200px; background:var(--coral); border-radius:4px; margin-top:44px; margin-bottom:auto; }

  /* content */
  .snum { font-size:30px; font-weight:700; letter-spacing:0.14em; color:var(--coral); }
  .slide h2 { margin-top:28px; font-size:74px; line-height:1.05; letter-spacing:-0.015em; font-weight:500; color:var(--fg-strong); }
  .slide .body { margin-top:40px; font-size:44px; line-height:1.42; font-weight:300; color:var(--fg); max-width:900px; }

  /* sources */
  .sources h2 { margin-top:20px; font-size:64px; }
  .srclist { list-style:none; margin-top:48px; display:flex; flex-direction:column; gap:34px; }
  .srclist li { display:flex; flex-direction:column; gap:8px; border-left:5px solid var(--amber); padding-left:26px; }
  .srclist .src { font-size:28px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--fg-strong); }
  .srclist .claim { font-size:29px; font-weight:300; line-height:1.34; color:var(--claim); }

  /* cta */
  .cta h1 { margin-top:auto; font-size:96px; line-height:1.06; letter-spacing:-0.02em; font-weight:500; color:var(--fg-strong); }
  .cta .cta, .cta .subhead { }
  .cta .subhead { margin-top:40px; font-size:42px; font-weight:400; line-height:1.4; color:var(--mute); }
  .cta .rule { height:8px; width:200px; background:var(--coral); border-radius:4px; margin-top:44px; margin-bottom:auto; }

  footer { margin-top:auto; display:flex; align-items:center; justify-content:space-between;
           padding-top:34px; border-top:2px solid var(--rule); }
  .enso svg { height:38px; width:auto; display:block; }
  .fr { font-size:20px; text-transform:uppercase; letter-spacing:0.14em; color:var(--mute); }
  .pg { position:absolute; top:104px; right:96px; font-size:22px; color:var(--pg); letter-spacing:0.1em; }
  .cover .pg, .cta .pg { color:var(--pg); }

  /* Hero moments — coral flood, oversized ring glyph bleeding off-canvas. */
  .cover, .cta { background:var(--coral) !important; color:#16110B; }
  .cover .glyph, .cta .glyph {
    position:absolute; top:-180px; right:-320px; width:1180px; height:1180px;
    opacity:0.26; pointer-events:none;
  }
  .cover .glyph circle, .cta .glyph circle { fill:none; stroke:#F2EDE4; stroke-width:14; }
  .cover .kick, .cta .kick { color:#2A1109; position:relative; }
  .cover h1, .cta h1 { color:#16110B; position:relative; }
  .cover .rule, .cta .rule { background:#F2EDE4; position:relative; }
  .cta .subhead { color:#FFF3EE; position:relative; }
  .cover .stamp, .cta .stamp { background:#16110B; color:#F7F1E6; position:relative; }
  .cover footer, .cta footer { border-top-color:rgba(22,17,11,0.28); position:relative; }
  .cover .fr, .cta .fr { color:#3A1B11; }
  .cover .pg, .cta .pg { color:#7A3B2A; }
  .cover .enso svg path, .cta .enso svg path { fill:#16110B; }
</style></head><body data-theme="${data.theme === 'dark' ? 'dark' : 'light'}">
  ${cover}
  ${slides}
  ${sources}
  ${cta}
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));

  // cover PNG (first slide only)
  const coverEl = await page.$('.slide.cover');
  await coverEl.screenshot({ path: path.join(outDir, 'carousel-cover.png'), type: 'png' });

  // per-slide PNGs (usable as a native LinkedIn image carousel)
  const slidesDir = path.join(outDir, 'carousel-slides');
  fs.mkdirSync(slidesDir, { recursive: true });
  const els = await page.$$('.slide');
  for (let i = 0; i < els.length; i++) {
    await els[i].screenshot({ path: path.join(slidesDir, String(i + 1).padStart(2, '0') + '.png'), type: 'png' });
  }

  // full PDF, one 1080×1350 page per slide
  await page.pdf({
    path: path.join(outDir, 'carousel.pdf'),
    width: '1080px', height: '1350px',
    printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: '', preferCSSPageSize: false,
  });
  await browser.close();
  console.log(`carousel.pdf (${total} pages) + carousel-cover.png -> ${outDir}`);
})();
