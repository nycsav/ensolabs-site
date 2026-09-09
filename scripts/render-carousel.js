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

const jsonPath = process.argv[2];
if (!jsonPath) { console.error('Usage: node scripts/render-carousel.js <carousel.json>'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const outDir = path.dirname(path.resolve(jsonPath));

const FONTS = `https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
// Brand lock 2026-09-09: display = Space Mono 700; cover/CTA = Ink-Deep ground (never a coral flood).
// Canonical reference: brand/strategy-to-ship/reference/36-point-gap-modules.dc.html
const RIBBON = `<svg viewBox="0 0 50 32" style="height:.6em"><path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill="#F0512E"></path></svg>`;
const WORDMARK = `<span class="wm">Strategy${RIBBON}Ship</span>`;

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // keep an em-arrow if authors typed it
  .replace(/-&gt;/g, '&rarr;');

// The wordmark lives in the footer lockup; strip any 'STRATEGY → SHIP ·' prefix authors put in the kicker.
const kicker = esc(String(data.kicker || '').replace(/^\s*STRATEGY\s*(→|->|▸|-)\s*SHIP\s*[·|-]?\s*/i, '')) || 'ADVERTISING × AI';
const total = 2 + data.slides.length + (data.sources && data.sources.length ? 1 : 0); // cover + slides + sources + cta
let pageNo = 0;
const pager = () => { pageNo += 1; return `${String(pageNo).padStart(2, '0')} / ${String(total).padStart(2, '0')}`; };

const foot = (rightText) => `
  <footer>
    <span class="lock">${WORDMARK}<i class="hair"></i><span class="from fm">FROM ENSO LABS</span></span>
    <span class="fr fm">${rightText || 'ENSOLABS.AI/INSIGHTS'}</span>
  </footer>`;

// ---- COVER ----
const cover = `
  <section class="slide cover"><svg class="glyph" viewBox="0 0 600 600"><circle cx="290" cy="300" r="270"/><circle cx="328" cy="300" r="232"/><circle cx="364" cy="300" r="196"/><circle cx="398" cy="300" r="162"/><circle cx="430" cy="300" r="130"/><circle cx="460" cy="300" r="100"/><circle cx="488" cy="300" r="72"/><circle cx="512" cy="300" r="48"/><circle cx="532" cy="300" r="28"/></svg>
    <div class="top">
      <p class="kick fm">${kicker}</p>
      ${data.cover.stamp ? `<span class="stamp fm">${esc(data.cover.stamp)}</span>` : ''}
    </div>
    <h1 class="fd">${esc(data.cover.headline)}</h1>
    <div class="rule"></div>
    ${foot()}
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
    <p class="kick fm">${kicker}</p>
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
  .fd { font-family:'Space Mono',monospace; font-weight:700; letter-spacing:-0.035em; } .fm { font-family:'JetBrains Mono',monospace; }
  .wm { font-family:'Space Mono',monospace; font-weight:700; font-size:34px; letter-spacing:-0.035em; display:inline-flex; align-items:center; gap:.28em; color:var(--fg-strong); }
  .lock { display:inline-flex; align-items:center; gap:18px; } .hair { width:26px; height:2px; background:#79705F; display:inline-block; }
  .from { font-size:20px; letter-spacing:0.16em; color:#5CE0D2; }
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
  .kick { display:flex; align-items:center; gap:18px; font-size:26px; text-transform:uppercase; letter-spacing:0.16em; color:var(--fg); font-weight:500; max-width:560px; }
  .kick::before { content:''; width:18px; height:18px; background:var(--amber); flex:none; }
  .top { display:flex; align-items:center; justify-content:space-between; }
  .stamp { align-self:flex-start; font-size:22px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;
           color:#FFF; background:var(--coral); padding:10px 18px; border-radius:4px; }

  /* cover */
  .cover h1 { margin-top:auto; font-size:92px; line-height:1.0; letter-spacing:-0.035em; font-weight:700; color:var(--fg-strong); }
  .cover .rule { height:8px; width:200px; background:var(--coral); border-radius:4px; margin-top:44px; margin-bottom:auto; }

  /* content */
  .snum { font-size:30px; font-weight:700; letter-spacing:0.14em; color:var(--coral); }
  .slide h2 { margin-top:28px; font-size:68px; line-height:1.0; letter-spacing:-0.035em; font-weight:700; color:var(--fg-strong); }
  .slide .body { margin-top:40px; font-size:44px; line-height:1.42; font-weight:300; color:var(--fg); max-width:900px; }

  /* sources */
  .sources h2 { margin-top:20px; font-size:64px; }
  .srclist { list-style:none; margin-top:48px; display:flex; flex-direction:column; gap:34px; }
  .srclist li { display:flex; flex-direction:column; gap:8px; border-left:5px solid var(--amber); padding-left:26px; }
  .srclist .src { font-size:28px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--fg-strong); }
  .srclist .claim { font-size:29px; font-weight:300; line-height:1.34; color:var(--claim); }

  /* cta */
  .cta h1 { margin-top:auto; font-size:88px; line-height:1.0; letter-spacing:-0.035em; font-weight:700; color:var(--fg-strong); }
  .cta .cta, .cta .subhead { }
  .cta .subhead { margin-top:40px; font-size:42px; font-weight:400; line-height:1.4; color:var(--mute); }
  .cta .rule { height:8px; width:200px; background:var(--coral); border-radius:4px; margin-top:44px; margin-bottom:auto; }

  footer { margin-top:auto; display:flex; align-items:center; justify-content:space-between;
           padding-top:34px; border-top:2px solid var(--rule); }
  .enso svg { height:38px; width:auto; display:block; }
  .fr { font-size:20px; text-transform:uppercase; letter-spacing:0.14em; color:var(--mute); }
  .pg { position:absolute; top:104px; right:96px; font-size:22px; color:var(--pg); letter-spacing:0.1em; }
  .cover .pg, .cta .pg { color:var(--pg); }

  /* Hero moments — Ink-Deep ground (card system). Coral stays ≤10%: the ribbon, the stamp, the rule. */
  .cover, .cta { background:#16110B !important; color:#F7F1E6; }
  .cover .glyph, .cta .glyph {
    position:absolute; top:-180px; right:-320px; width:1180px; height:1180px;
    opacity:0.10; pointer-events:none;
  }
  .cover .glyph circle, .cta .glyph circle { fill:none; stroke:#F7F1E6; stroke-width:14; }
  .cover .kick, .cta .kick { color:#F7F1E6; position:relative; }
  .cover h1, .cta h1 { color:#F7F1E6; position:relative; }
  .cover .rule, .cta .rule { background:var(--coral); position:relative; }
  .cta .subhead { color:#CFC3A7; position:relative; }
  .cover .stamp, .cta .stamp { background:var(--coral); color:#FFF; position:relative; }
  .cover footer, .cta footer { border-top-color:rgba(247,241,230,0.22); position:relative; }
  .cover .fr, .cta .fr { color:#9B8F78; }
  .cover .pg, .cta .pg { color:#6E6152; }
  .cover .wm, .cta .wm { color:#F7F1E6; }
  .cover .srclist .src, .cta .srclist .src { color:#F7F1E6; }
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
