/* Forward Deployed Strategist — Part 1: data-visualization figure (v2, chart-driven + colorful).
 * Dark/light split, stacked bar (NY vs SF vs rest), 18-month growth curve, comp range, marquee hirers.
 * Strategy -> Ship brand + Ledger Amber as a second data color. 2800x1760. */
const puppeteer = require('puppeteer');
const path = require('path');
const { logoWhite } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const growthPath = () => {
  // ascending curve, 7 points, normalized to a 900x300 viewbox
  const pts = [10, 16, 26, 42, 66, 88, 100];
  const w = 900, h = 300;
  const step = w / (pts.length - 1);
  const coords = pts.map((p, i) => [Math.round(i * step), Math.round(h - (p / 100) * (h - 20) - 10)]);
  const line = coords.map((c, i) => (i === 0 ? `M${c[0]},${c[1]}` : `L${c[0]},${c[1]}`)).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  return { line, area, last: coords[coords.length - 1] };
};
const g = growthPath();

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2800px; height:1760px; display:flex; font-family:'Inter Tight',sans-serif; background:#F7F1E6; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  /* LEFT dark hero panel */
  .left { width:1120px; background:#16110B; color:#F7F1E6; padding:130px 110px; display:flex; flex-direction:column; }
  .l-kick { font-size:34px; text-transform:uppercase; letter-spacing:0.2em; color:#F0512E; font-weight:700; }
  .l-fig { font-family:'Lora',Georgia,serif; font-size:520px; line-height:0.82; letter-spacing:-0.03em; color:#F0512E; margin-top:40px; }
  .l-cap { font-size:52px; font-weight:400; line-height:1.2; color:#F7F1E6; margin-top:36px; max-width:840px; }
  .l-sub { font-size:34px; font-weight:300; color:#B9AE99; margin-top:28px; }
  .l-src { margin-top:auto; font-size:24px; text-transform:uppercase; letter-spacing:0.14em; color:#79705F; }
  /* RIGHT charts panel */
  .right { flex:1; padding:120px 110px 110px; display:flex; flex-direction:column; }
  .r-kick { font-size:32px; text-transform:uppercase; letter-spacing:0.2em; color:#79705F; }
  h2 { font-size:78px; line-height:1.02; letter-spacing:-0.015em; color:#16110B; font-weight:500; margin-top:14px; }
  .block { margin-top:58px; }
  .b-lbl { font-size:28px; text-transform:uppercase; letter-spacing:0.14em; color:#79705F; margin-bottom:22px; }
  .stack { display:flex; height:90px; border:2px solid #DDD2BC; }
  .seg { display:flex; align-items:center; padding:0 28px; color:#fff; font-size:34px; font-weight:600; }
  .seg.ny { background:#F0512E; } .seg.sf { background:#1E1813; } .seg.rest { background:#E0A23C; color:#3A2E12; }
  .stack-key { display:flex; gap:40px; margin-top:20px; font-size:28px; color:#1E1813; }
  .k { display:flex; align-items:center; gap:12px; } .dot { width:20px; height:20px; }
  .row2 { display:flex; gap:64px; margin-top:58px; }
  .col2 { flex:1; }
  .growth-fig { font-family:'Lora',Georgia,serif; font-size:130px; color:#16110B; line-height:0.9; }
  .growth-fig b { color:#F0512E; }
  .comp-scale { position:relative; height:74px; background:#EEE5D3; border:2px solid #DDD2BC; }
  .comp-fill { position:absolute; top:0; bottom:0; left:42.8%; width:42.9%; background:linear-gradient(90deg,#E0A23C,#F0512E); display:flex; align-items:center; justify-content:center; color:#fff; font-size:32px; font-weight:700; }
  .comp-ticks { display:flex; justify-content:space-between; margin-top:14px; font-size:24px; color:#79705F; }
  .hirers { margin-top:auto; padding-top:44px; border-top:2px solid #DDD2BC; }
  .hirers .b-lbl { margin-bottom:16px; }
  .hirers-row { font-family:'Lora',Georgia,serif; font-size:46px; color:#16110B; letter-spacing:-0.01em; }
  .hirers-row b { color:#F0512E; font-weight:600; }
</style></head><body>
  <div class="left">
    <p class="l-kick fm">The forward-deployed boom</p>
    <p class="l-fig">35%</p>
    <p class="l-cap fd">of U.S. forward-deployed roles are now in New York.</p>
    <p class="l-sub">It just passed San Francisco (11%) as the #1 hub — concentrated in fintech and regulated industries.</p>
    <div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;gap:24px">
      ${logoWhite(50)}
      <span class="l-src fm" style="margin-top:0">Bloomberry / Paraform · 2026</span>
    </div>
  </div>
  <div class="right">
    <p class="r-kick fm">By the numbers</p>
    <h2 class="fd">The market moved east — and up.</h2>

    <div class="block">
      <p class="b-lbl fm">Where forward-deployed roles are posted</p>
      <div class="stack">
        <div class="seg ny" style="width:35%">NY 35%</div>
        <div class="seg sf" style="width:11%">SF 11%</div>
        <div class="seg rest" style="width:54%">Rest of U.S. 54%</div>
      </div>
    </div>

    <div class="row2">
      <div class="col2">
        <p class="b-lbl fm">Demand, last 18 months</p>
        <p class="growth-fig fd"><b>10&times;</b></p>
        <svg width="100%" viewBox="0 0 900 300" preserveAspectRatio="none" style="margin-top:18px;height:220px">
          <path d="${g.area}" fill="#F0512E" opacity="0.14"></path>
          <path d="${g.line}" fill="none" stroke="#F0512E" stroke-width="7"></path>
          <circle cx="${g.last[0] - 4}" cy="${g.last[1]}" r="12" fill="#F0512E"></circle>
        </svg>
        <p class="comp-ticks fm"><span>Apr 2025</span><span>Apr 2026</span></p>
      </div>
      <div class="col2">
        <p class="b-lbl fm">Total compensation</p>
        <div class="comp-scale"><div class="comp-fill">$300K–$600K+</div></div>
        <p class="comp-ticks fm"><span>$0</span><span>$350K</span><span>$700K</span></p>
        <p class="growth-fig fd" style="font-size:64px;margin-top:34px;color:#79705F">and <b style="color:#F0512E">climbing</b></p>
      </div>
    </div>

    <div class="hirers">
      <p class="b-lbl fm">Who's hiring</p>
      <p class="hirers-row fd"><b>Palantir</b> · OpenAI · Anthropic · Google · Databricks · Scale AI</p>
    </div>
  </div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 2800, height: 1760, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'images', 'insights', 'forward-deployed-strategist-dataviz.png'), type: 'png' });
  console.log('Data-viz figure -> public/images/insights/forward-deployed-strategist-dataviz.png');
  await browser.close();
})();
