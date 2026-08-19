/* Forward Deployed Strategist — Part 1, Fig. 2: the methodology diagram.
 * "One discovery method, two eras" — classic agency/consulting strategy mapped to forward-deployed AI.
 * Warm Signal brand, 2800x1760. */
const puppeteer = require('puppeteer');
const path = require('path');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const phases = [
  { n: '01', name: 'Discover', then: 'Stakeholder interviews · C-suite alignment · immersion', now: 'Technical + business discovery on your real systems and data' },
  { n: '02', name: 'Frame', then: 'MECE problem structuring · consumer & market insight', now: 'Map the workflow · scope where the model fits and breaks' },
  { n: '03', name: 'The Brief', then: 'The creative brief · the proposition · permitted claims', now: 'System prompt · guardrails · permissions · success metric' },
  { n: '04', name: 'Deploy', then: 'Campaign rollout across channels', now: 'Build & ship the agent · harness · evals · human-in-the-loop' },
  { n: '05', name: 'Measure', then: 'Brand & performance measurement · optimization', now: 'Observability · evals · outcome measurement · tuning' },
];

const cols = phases.map((p, i) => `
  <div class="col">
    <div class="col-head">
      <span class="pn fm">Phase ${p.n}</span>
      <span class="pname fd">${p.name}</span>
      ${i < phases.length - 1 ? '<span class="arrow fd">&rarr;</span>' : ''}
    </div>
    <div class="cell then">
      <span class="tag fm">Then · agency + consulting</span>
      <p class="txt">${p.then}</p>
    </div>
    <div class="cell now">
      <span class="tag fm signal">Now · forward-deployed AI</span>
      <p class="txt">${p.now}</p>
    </div>
  </div>`).join('');

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2800px; height:1760px; background:#F7F1E6; color:#1E1813; font-family:'Inter Tight',sans-serif; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  header { display:flex; align-items:flex-start; justify-content:space-between; padding:110px 150px 0; }
  .kicker { font-size:36px; font-weight:700; text-transform:uppercase; color:#F0512E; letter-spacing:0.22em; }
  .credit { font-size:28px; text-transform:uppercase; color:#79705F; letter-spacing:0.2em; }
  h1 { padding:56px 150px 0; font-size:96px; line-height:1.03; letter-spacing:-0.015em; color:#16110B; font-weight:500; }
  h1 em { font-style:italic; color:#F0512E; }
  .grid { padding:70px 150px 0; display:grid; grid-template-columns:repeat(5,1fr); gap:22px; }
  .col { display:flex; flex-direction:column; gap:22px; }
  .col-head { position:relative; padding-bottom:22px; border-bottom:3px solid #DDD2BC; }
  .pn { font-size:22px; text-transform:uppercase; letter-spacing:0.16em; color:#79705F; }
  .pname { display:block; margin-top:8px; font-size:52px; color:#16110B; font-weight:500; }
  .arrow { position:absolute; right:-26px; top:34px; font-size:52px; color:#F0512E; }
  .cell { padding:34px 30px; min-height:250px; }
  .cell.then { background:#EEE5D3; border:2px solid #DDD2BC; }
  .cell.now { background:#FBF6EC; border:3px solid #F0512E; }
  .tag { font-size:20px; text-transform:uppercase; letter-spacing:0.12em; color:#79705F; }
  .tag.signal { color:#F0512E; }
  .txt { margin-top:20px; font-size:33px; line-height:1.34; font-weight:300; color:#1E1813; }
  footer { position:absolute; bottom:0; left:0; right:0; margin:0 150px 92px; display:flex; align-items:center; justify-content:space-between; padding-top:40px; border-top:2px solid #DDD2BC; }
  .foot-line { font-size:32px; font-weight:300; color:#79705F; } .foot-line b { color:#1E1813; font-weight:500; }
  .foot-fig { font-size:26px; text-transform:uppercase; letter-spacing:0.2em; color:#79705F; }
</style></head><body>
  <header><p class="kicker fm">The Method Never Changed</p><p class="credit fm">Strategy to Ship — Enso Labs</p></header>
  <h1 class="fd">One discovery method. <em>Two eras.</em></h1>
  <div class="grid">${cols}</div>
  <footer>${logoInk(46)}<p class="foot-line">From the creative brief to the <b>system prompt</b> — the strategist's method, applied to AI.</p><p class="foot-fig fm">Fig. 2 — Discovery to deployment</p></footer>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 2800, height: 1760, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'images', 'insights', 'forward-deployed-strategist-method.png'), type: 'png' });
  console.log('Method figure -> public/images/insights/forward-deployed-strategist-method.png');
  await browser.close();
})();
