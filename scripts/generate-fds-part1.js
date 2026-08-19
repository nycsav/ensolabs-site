/* Forward Deployed Strategist — Part 1 assets.
 * Hero in-body figure (Warm Signal, 2800x1760) + site OG (navy/teal, 1200x630).
 * Mirrors scripts/generate-og-berkeley-demand-side-gap.js conventions. */
const puppeteer = require('puppeteer');
const path = require('path');
const { logoInk, logoWhite } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const heroHtml = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2800px; height:1760px; background:#F7F1E6; color:#1E1813; font-family:'Inter Tight',sans-serif; position:relative; overflow:hidden; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  header { display:flex; align-items:flex-start; justify-content:space-between; padding:120px 150px 0; }
  .kicker { font-size:38px; font-weight:700; text-transform:uppercase; color:#F0512E; letter-spacing:0.22em; }
  .credit { font-size:30px; text-transform:uppercase; color:#79705F; letter-spacing:0.2em; }
  h1 { padding:74px 150px 0; font-size:112px; line-height:1.04; letter-spacing:-0.015em; color:#16110B; font-weight:500; }
  h1 em { font-style:italic; color:#F0512E; }
  .seats { padding:80px 150px 0; display:grid; grid-template-columns:1fr 1fr; gap:48px; }
  .seat { padding:52px 56px; border:2px solid #DDD2BC; background:#F3ECDD; }
  .seat.signal { border:3px solid #F0512E; background:#FBF6EC; }
  .seat-tag { font-size:26px; text-transform:uppercase; letter-spacing:0.18em; color:#79705F; }
  .seat.signal .seat-tag { color:#F0512E; }
  .seat-name { margin-top:18px; font-size:66px; line-height:1.05; color:#16110B; font-weight:500; }
  .seat-does { margin-top:20px; font-size:40px; font-weight:300; color:#1E1813; }
  .seat-sub { margin-top:30px; font-size:30px; font-weight:400; color:#79705F; line-height:1.5; }
  .lineage { margin:56px 150px 0; padding:34px 44px; background:#EEE5D3; border:2px solid #DDD2BC; display:flex; align-items:center; gap:34px; }
  .lineage-lbl { font-size:26px; text-transform:uppercase; letter-spacing:0.16em; color:#79705F; white-space:nowrap; }
  .lineage-items { font-size:38px; color:#16110B; } .lineage-items b { color:#F0512E; font-weight:600; }
  .stats { padding:64px 150px 0; display:grid; grid-template-columns:repeat(4,1fr); }
  .stat { display:flex; flex-direction:column; padding:0 52px; } .stat:first-child { padding-left:0; } .stat:last-child { padding-right:0; }
  .stat + .stat { border-left:2px solid #DDD2BC; }
  .stat-fig { font-size:150px; line-height:0.9; letter-spacing:-0.03em; color:#16110B; } .stat-fig.signal { color:#F0512E; }
  .stat-label { margin-top:30px; max-width:520px; font-size:32px; font-weight:300; line-height:1.3; color:#1E1813; }
  .stat-source { margin-top:22px; font-size:22px; text-transform:uppercase; letter-spacing:0.14em; color:#79705F; }
  footer { position:absolute; bottom:0; left:0; right:0; margin:0 150px 96px; display:flex; align-items:center; justify-content:space-between; padding-top:40px; border-top:2px solid #DDD2BC; }
  .foot-line { font-size:32px; font-weight:300; color:#79705F; } .foot-fig { font-size:26px; text-transform:uppercase; letter-spacing:0.2em; color:#79705F; }
</style></head><body>
  <header><p class="kicker fm">The Two Seats</p><p class="credit fm">Strategy to Ship — Enso Labs</p></header>
  <h1 class="fd">Forward deployment always sent <em>two.</em></h1>
  <div class="seats">
    <div class="seat">
      <p class="seat-tag fm">Seat one · technical</p>
      <p class="seat-name fd">Forward Deployed Engineer</p>
      <p class="seat-does">Writes the code.</p>
      <p class="seat-sub fm">integration · RAG · evals · MCP · observability</p>
    </div>
    <div class="seat signal">
      <p class="seat-tag fm">Seat two · business</p>
      <p class="seat-name fd">Deployment Strategist</p>
      <p class="seat-does">Defines the outcome.</p>
      <p class="seat-sub fm">scope the problem · align the C-suite · own adoption</p>
    </div>
  </div>
  <div class="lineage">
    <span class="lineage-lbl fm">The strategist seat comes from</span>
    <span class="lineage-items fd">brand &amp; advertising · digital · CX · <b>data strategy</b></span>
  </div>
  <div class="stats">
    <div class="stat"><p class="stat-fig fd signal">35%</p><p class="stat-label">of FDE postings are now in New York — past SF's 11%</p><p class="stat-source fm">Bloomberry / Paraform · 2026</p></div>
    <div class="stat"><p class="stat-fig fd">10x</p><p class="stat-label">growth in forward-deployed demand in 18 months</p><p class="stat-source fm">Paraform · 2026</p></div>
    <div class="stat"><p class="stat-fig fd">$300–600K</p><p class="stat-label">total comp for the role, and climbing</p><p class="stat-source fm">Recruiting from Scratch · 2026</p></div>
    <div class="stat"><p class="stat-fig fd">2%</p><p class="stat-label">McKinsey revenue growth — the advisory pyramid is contracting</p><p class="stat-source fm">2026</p></div>
  </div>
  <footer>${logoInk(46)}<p class="foot-line">Palantir always sent two. The market only talks about one.</p><p class="foot-fig fm">Fig. 1 — The two seats of forward deployment</p></footer>
</body></html>`;

const ogHtml = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:linear-gradient(135deg,#0d1321 0%,#131b2e 60%,#0d1321 100%); color:#EAF2F0; font-family:'Inter Tight',sans-serif; padding:72px 80px; display:flex; flex-direction:column; justify-content:space-between; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  .kick { font-size:20px; text-transform:uppercase; letter-spacing:0.2em; color:#5ce0d2; }
  h1 { margin-top:26px; font-size:60px; line-height:1.07; letter-spacing:-0.02em; color:#F4F8F7; font-weight:500; max-width:1040px; }
  .sub { margin-top:22px; font-size:28px; font-weight:300; color:#9fb1ad; }
  .rule { height:4px; width:180px; background:#5ce0d2; margin-top:10px; }
  footer { display:flex; align-items:center; justify-content:space-between; }
  .mark { font-family:'Lora',Georgia,serif; font-size:30px; color:#F4F8F7; }
  .mark .arrow { color:#F0512E; } .foot-r { font-size:20px; text-transform:uppercase; letter-spacing:0.16em; color:#79879f; }
</style></head><body>
  <div>
    <p class="kick fm">Part 1 · The Forward Deployed Strategist</p>
    <h1 class="fd">The best Forward Deployed Engineers have been forward deployed all along.</h1>
    <p class="sub">Why the strategist was always the engineer.</p>
  </div>
  <div class="rule"></div>
  <footer>
    ${logoWhite(42)}
    <span class="foot-r fm">Strategy &rarr; Ship · Powered by Enso Labs</span>
  </footer>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setViewport({ width: 2800, height: 1760, deviceScaleFactor: 1 });
  await page.setContent(heroHtml, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'images', 'insights', 'forward-deployed-strategist-part1.png'), type: 'png' });
  console.log('Hero figure -> public/images/insights/forward-deployed-strategist-part1.png');

  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(ogHtml, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og', 'og-forward-deployed-strategist-part1.png'), type: 'png' });
  console.log('Site OG -> public/og/og-forward-deployed-strategist-part1.png');

  await browser.close();
})();
