// Strategy to Ship — LinkedIn carousel renderer (Phase 2 of the distribution engine).
//
// Turns a carousel content JSON into a brand-locked 1080x1350 multi-page PDF (LinkedIn
// document carousel — the highest-engagement format) plus a cover PNG preview.
//
//   node scripts/render-carousel.js [path/to/content.json]
//   (defaults to scripts/carousel-content/claude-managed-agents-strategy-to-ship.json)
//
// Brand: docs/brand/STRATEGY-TO-SHIP-BRAND-LOCK.md — Space Mono 700 headlines + the coral
// swept ribbon wordmark (NOT Lora / "→" / "S→S"), Inter Tight body, JetBrains Mono kickers,
// Ship Coral #F0512E as the one signal (<=10%, never a fill), "Powered by Enso Labs" close.
// Fonts are base64-embedded from lib/og/fonts so rendering is identical offline and in CI.
//
// This is a local/CI script, NOT a Vercel route — headless Puppeteer on serverless is the
// trap we avoided; the repo already renders OG PNGs this way (scripts/generate-og*.js).
// Drafts only: produces a file for the human to review + post. Never publishes.

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const FONT_DIR = path.join(ROOT, 'lib', 'og', 'fonts');
const ASSET_DIR = path.join(ROOT, 'lib', 'og', 'assets');
const OUT_DIR = path.join(ROOT, 'out', 'carousels');

const W = 1080, H = 1350; // LinkedIn document / portrait carousel
const pad = (n) => String(n).padStart(2, '0');

// Locked palette (brand lock §4)
const C = {
  paper: '#F7F1E6', paper2: '#EEE5D3', ink: '#1E1813', inkDeep: '#16110B',
  coral: '#F0512E', amber: '#E0A23C', slate: '#79705F', line: '#DDD2BC',
  paperOnDark: '#F3ECDD', slateOnDark: '#9B8F78', lineOnDark: '#2C2419',
};
// The swept ribbon — verbatim from the lock (§1). Coral on light, white on coral.
const RIBBON = 'M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z';

// Confidential clients must NEVER reach a public asset (brand lock §8). Defense-in-depth:
// the eval gate guards copy upstream, but the renderer refuses too. Gore -> "a Fortune 500 manufacturer".
const DENYLIST = [/\bGore\b/i, /\bW\.?\s?L\.?\s?Gore\b/i, /signal2noise/i, /signals\.ensolabs\.ai/i];

function fontFace(family, file, weight) {
  const data = fs.readFileSync(path.join(FONT_DIR, file)).toString('base64');
  return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;`
    + `src:url(data:font/ttf;base64,${data}) format('truetype');font-display:block}`;
}

// Base64-embed a PNG asset so the renderer is offline/CI-identical (no base URL on setContent).
function assetDataUri(file) {
  return `data:image/png;base64,${fs.readFileSync(path.join(ASSET_DIR, file)).toString('base64')}`;
}
// The Claude mark — editorial/nominative use, INTERIOR (content) slides only, kept small so the
// coral budget (<=10%) holds. The cover/CTA stay Strategy▸Ship + Enso only (no co-brand).
const CLAUDE_MARK = assetDataUri('claude-icon.png');

function ribbonSvg(h, fill) {
  return `<svg viewBox="0 0 50 32" style="height:${h};width:auto;vertical-align:middle">`
    + `<path d="${RIBBON}" fill="${fill}"></path></svg>`;
}

// Strategy [ribbon] Ship wordmark + "FROM ENSO LABS" endorsement (brand lock §1, §3)
function wordmark(onDark) {
  const fg = onDark ? C.paperOnDark : C.ink;
  const meta = onDark ? C.slateOnDark : C.slate;
  const ln = onDark ? C.lineOnDark : C.line;
  return `<div class="lockup">
    <div class="wm" style="color:${fg}">Strategy${ribbonSvg('0.62em', C.coral)}Ship</div>
    <span class="hair" style="background:${ln}"></span>
    <span class="from" style="color:${meta}">FROM ENSO LABS</span>
  </div>`;
}

function coverSlide(d, total) {
  return `<section class="slide cover">
    ${wordmark(true)}
    <div class="cover-body">
      <div class="kicker"><span class="dot"></span>${d.kicker || 'INSIGHTS'}</div>
      <h1 class="cover-h">${d.cover.headline}</h1>
    </div>
    <div class="cover-foot">
      ${d.cover.stamp ? `<span class="stamp">${d.cover.stamp}</span>` : '<span></span>'}
      <span class="prog">01 / ${String(total).padStart(2, '0')}</span>
    </div>
  </section>`;
}

function contentSlide(s, idx, total) {
  return `<section class="slide content">
    <img class="claude-mark" src="${CLAUDE_MARK}" alt="">
    <div class="num">${pad(s.n ?? idx)}</div>
    <div class="c-body">
      <h2 class="c-h">${s.heading}</h2>
      <p class="c-p">${s.body}</p>
    </div>
    <div class="c-foot">
      ${ribbonSvg('14px', C.coral)}
      <span class="prog dark">${pad(idx)} / ${pad(total)}</span>
    </div>
  </section>`;
}

// SOURCES slide — attributions only, NEVER links (it's a public LinkedIn asset). Fed by d.sources.
function sourcesSlide(d, idx, total) {
  const items = (d.sources || []).map((s) =>
    `<li><span class="src-name">${s.source}</span>`
    + `<span class="src-claim">${s.claim}</span></li>`).join('');
  return `<section class="slide sources">
    <div class="s-head">
      <div class="kicker"><span class="dot"></span>SOURCES</div>
      <h2 class="s-h">Every number traces to a primary source.</h2>
    </div>
    <ul class="src-list">${items}</ul>
    <div class="c-foot">
      ${ribbonSvg('14px', C.coral)}
      <span class="prog dark">${pad(idx)} / ${pad(total)}</span>
    </div>
  </section>`;
}

// CTA slide — native engagement, NO external link (LinkedIn throttles outbound traffic). The
// canonical ensolabs.ai/insights link lives on X / newsletter / Medium, never on the carousel.
function ctaSlide(d, total) {
  const cta = d.cta || {};
  return `<section class="slide cta">
    ${wordmark(true)}
    <div class="cta-body">
      <div class="kicker"><span class="dot"></span>YOUR MOVE</div>
      <h2 class="cta-h">${cta.headline || "The bottleneck moved to whoever can define 'good.'"}</h2>
      <div class="cta-engage">${cta.subhead || 'What is your Monday move? Tell us in the comments — and follow The Build Lens.'}</div>
    </div>
    <div class="cta-foot">
      <span class="powered">Powered by Enso Labs</span>
      <span class="prog">${pad(total)} / ${pad(total)}</span>
    </div>
  </section>`;
}

function buildHtml(d) {
  const slides = d.slides || [];
  const hasSources = Array.isArray(d.sources) && d.sources.length > 0;
  const total = 1 + slides.length + (hasSources ? 1 : 0) + 1; // cover + content + [sources] + CTA
  const fonts = [
    fontFace('Space Mono', 'SpaceMono-700.ttf', 700),
    fontFace('Inter Tight', 'InterTight-400.ttf', 400),
    fontFace('Inter Tight', 'InterTight-500.ttf', 500),
    fontFace('Inter Tight', 'InterTight-600.ttf', 600),
    fontFace('JetBrains Mono', 'JetBrainsMono-400.ttf', 400),
    fontFace('JetBrains Mono', 'JetBrainsMono-500.ttf', 500),
  ].join('');

  const parts = [coverSlide(d, total)];
  slides.forEach((s, i) => parts.push(contentSlide(s, i + 2, total))); // content pages are 2..k
  if (hasSources) parts.push(sourcesSlide(d, slides.length + 2, total)); // sources is the penultimate slide
  parts.push(ctaSlide(d, total));
  const body = parts.join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    ${fonts}
    *{margin:0;padding:0;box-sizing:border-box}
    @page{size:${W}px ${H}px;margin:0}
    html,body{width:${W}px;background:${C.paper}}
    .slide{width:${W}px;height:${H}px;padding:96px 92px;position:relative;overflow:hidden;
      display:flex;flex-direction:column;justify-content:space-between;break-after:page}
    .slide:last-child{break-after:auto}

    /* lockup (wordmark + FROM ENSO LABS) */
    .lockup{display:flex;align-items:center;gap:18px}
    .wm{font-family:'Space Mono';font-weight:700;letter-spacing:-.035em;font-size:34px;
      display:inline-flex;align-items:center;gap:.26em}
    .hair{width:1px;height:24px;display:inline-block}
    .from{font-family:'JetBrains Mono';font-weight:500;font-size:14px;letter-spacing:.16em}

    .kicker{font-family:'JetBrains Mono';font-weight:500;font-size:20px;letter-spacing:.14em;
      text-transform:uppercase;color:${C.coral};display:flex;align-items:center;gap:14px}
    .kicker .dot{width:12px;height:12px;background:${C.coral};display:inline-block}

    /* cover (ink-deep ground) */
    .cover{background:${C.inkDeep};color:${C.paperOnDark}}
    .cover-body{display:flex;flex-direction:column;gap:36px}
    .cover-h{font-family:'Space Mono';font-weight:700;letter-spacing:-.035em;line-height:1.08;
      font-size:74px;color:${C.paperOnDark};max-width:14ch}
    .cover-foot{display:flex;align-items:flex-end;justify-content:space-between}
    .stamp{font-family:'JetBrains Mono';font-weight:500;font-size:22px;letter-spacing:.12em;
      text-transform:uppercase;color:${C.coral};border:2.5px solid ${C.coral};border-radius:8px;
      padding:10px 20px;transform:rotate(-4deg);opacity:.94}
    .prog{font-family:'JetBrains Mono';font-weight:500;font-size:18px;letter-spacing:.08em;color:${C.slateOnDark}}
    .prog.dark{color:${C.slate}}

    /* content (paper ground) */
    .content{background:${C.paper}}
    .num{font-family:'Space Mono';font-weight:700;letter-spacing:-.04em;font-size:96px;
      line-height:1;color:${C.coral}}
    .c-body{display:flex;flex-direction:column;gap:30px;margin-top:-40px}
    .c-h{font-family:'Space Mono';font-weight:700;letter-spacing:-.03em;line-height:1.12;
      font-size:54px;color:${C.ink};max-width:17ch}
    .c-p{font-family:'Inter Tight';font-weight:400;font-size:32px;line-height:1.5;
      color:${C.ink};max-width:30ch}
    .c-foot{display:flex;align-items:center;justify-content:space-between;
      border-top:1px solid ${C.line};padding-top:28px}
    /* Claude mark — small, content slides only (nominative; keeps coral budget) */
    .claude-mark{position:absolute;top:92px;right:92px;width:46px;height:46px;opacity:.92}

    /* sources (paper ground) — attributions only, never links */
    .sources{background:${C.paper}}
    .s-head{display:flex;flex-direction:column;gap:24px}
    .s-h{font-family:'Space Mono';font-weight:700;letter-spacing:-.03em;line-height:1.14;
      font-size:46px;color:${C.ink};max-width:18ch}
    .src-list{list-style:none;display:flex;flex-direction:column;gap:24px}
    .src-list li{display:flex;flex-direction:column;gap:7px;border-left:3px solid ${C.coral};padding-left:22px}
    .src-name{font-family:'JetBrains Mono';font-weight:500;font-size:21px;letter-spacing:.06em;
      text-transform:uppercase;color:${C.ink}}
    .src-claim{font-family:'Inter Tight';font-weight:400;font-size:27px;line-height:1.4;color:${C.slate}}

    /* CTA (ink-deep ground) */
    .cta{background:${C.inkDeep};color:${C.paperOnDark}}
    .cta-body{display:flex;flex-direction:column;gap:30px}
    .cta-h{font-family:'Space Mono';font-weight:700;letter-spacing:-.03em;line-height:1.14;
      font-size:60px;color:${C.paperOnDark};max-width:16ch}
    .cta-engage{font-family:'Inter Tight';font-weight:500;font-size:30px;line-height:1.42;
      color:${C.paperOnDark};max-width:24ch}
    .cta-foot{display:flex;align-items:center;justify-content:space-between;
      border-top:1px solid ${C.lineOnDark};padding-top:28px}
    .powered{font-family:'JetBrains Mono';font-weight:500;font-size:20px;letter-spacing:.1em;color:${C.slateOnDark}}
  </style></head><body>${body}</body></html>`;
}

function guardConfidential(d) {
  const blob = JSON.stringify(d);
  const hit = DENYLIST.find((re) => re.test(blob));
  if (hit) {
    console.error(`\nREFUSED: carousel content matched a confidential/retired term (${hit}).`);
    console.error('Fix the copy (e.g. Gore -> "a Fortune 500 manufacturer") before rendering.\n');
    process.exit(2);
  }
}

async function main() {
  const arg = process.argv[2]
    || path.join(__dirname, 'carousel-content', 'claude-managed-agents-strategy-to-ship.json');
  const d = JSON.parse(fs.readFileSync(arg, 'utf8'));
  guardConfidential(d);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const slug = d.slug || 'carousel';

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.setContent(buildHtml(d), { waitUntil: 'networkidle0' });

  // PDF — one page per slide, real pixel size, backgrounds on (LinkedIn document upload).
  const pdfPath = path.join(OUT_DIR, `${slug}.pdf`);
  await page.pdf({ path: pdfPath, width: `${W}px`, height: `${H}px`, printBackground: true, pageRanges: '' });

  // Cover PNG preview (2x) for quick review / Slack approval thumbnail.
  const pngPath = path.join(OUT_DIR, `${slug}-cover.png`);
  await page.screenshot({ path: pngPath, type: 'png', clip: { x: 0, y: 0, width: W, height: H } });

  await browser.close();
  const slideCount = 1 + (d.slides || []).length + ((d.sources || []).length ? 1 : 0) + 1;
  console.log(`Wrote ${pdfPath} (${slideCount} slides, ${W}x${H})`);
  console.log(`Wrote ${pngPath} (cover preview)`);
}

// Exported so previews/tests can render slides without shelling out (buildHtml is pure).
module.exports = { buildHtml, guardConfidential };
if (require.main === module) main();
