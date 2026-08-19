/* Forward Deployed Strategist — Part 1, Fig. 2: the methodology diagram (v2, data-story).
 * Connected 5-phase pipeline with icons; muted THEN lane vs coral NOW lane; crux column spotlighted.
 * Applies storytelling-with-data: one intentional highlight, preattentive shape/color/position. 2800x1760. */
const puppeteer = require('puppeteer');
const path = require('path');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const icon = {
  discover: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></svg>`,
  frame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7.5" height="7.5" rx="1"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1"/></svg>`,
  brief: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 2.5h8L19.5 8v13.5H6z"/><path d="M14 2.5V8h5.5"/><line x1="9" y1="12.5" x2="16" y2="12.5"/><line x1="9" y1="16" x2="16" y2="16"/></svg>`,
  deploy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="2.5" y1="12" x2="19" y2="12"/><polyline points="13,5.5 20.5,12 13,18.5"/></svg>`,
  measure: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="21" x2="5" y2="13"/><line x1="12" y1="21" x2="12" y2="8"/><line x1="19" y1="21" x2="19" y2="4"/></svg>`,
};

const phases = [
  { name: 'Discover', ic: icon.discover, then: 'Stakeholder interviews · C-suite alignment', now: 'Technical + business discovery on real data' },
  { name: 'Frame', ic: icon.frame, then: 'MECE structuring · consumer insight', now: 'Map the workflow · where the model fits' },
  { name: 'The Brief', ic: icon.brief, then: 'The creative brief', now: 'The system prompt + guardrails', crux: true },
  { name: 'Deploy', ic: icon.deploy, then: 'Campaign rollout', now: 'Ship the agent · harness · human-in-the-loop' },
  { name: 'Measure', ic: icon.measure, then: 'Performance measurement', now: 'Evals · observability · outcome' },
];

const nodes = phases.map((p, i) => `
  <div class="node ${p.crux ? 'crux' : ''}">
    <div class="badge">${p.ic}</div>
    ${i < phases.length - 1 ? '<div class="conn"></div>' : ''}
    <div class="pname fd">${p.name}</div>
  </div>`).join('');

const thenCells = phases.map((p) => `<div class="cell then ${p.crux ? 'crux' : ''}"><p>${p.then}</p></div>`).join('');
const nowCells = phases.map((p) => `<div class="cell now ${p.crux ? 'crux' : ''}"><p>${p.now}</p></div>`).join('');

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2800px; height:1760px; background:#F7F1E6; color:#1E1813; font-family:'Inter Tight',sans-serif; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  header { display:flex; align-items:center; justify-content:space-between; padding:100px 150px 0; }
  .kicker { font-size:34px; font-weight:700; text-transform:uppercase; color:#F0512E; letter-spacing:0.22em; }
  .cred { display:flex; align-items:center; gap:28px; }
  .credit { font-size:26px; text-transform:uppercase; color:#79705F; letter-spacing:0.18em; }
  h1 { padding:44px 150px 0; font-size:100px; line-height:1.02; letter-spacing:-0.015em; color:#16110B; font-weight:500; }
  h1 em { font-style:italic; color:#F0512E; }

  /* pipeline */
  .pipe { padding:78px 150px 0; display:grid; grid-template-columns:repeat(5,1fr); }
  .node { position:relative; display:flex; flex-direction:column; align-items:center; }
  .badge { width:150px; height:150px; border-radius:50%; background:#FBF6EC; border:3px solid #F0512E; color:#F0512E; display:flex; align-items:center; justify-content:center; z-index:2; }
  .badge svg { width:74px; height:74px; }
  .node.crux .badge { background:#F0512E; color:#F7F1E6; box-shadow:0 0 0 12px rgba(240,81,46,0.14); }
  .conn { position:absolute; top:75px; left:50%; width:100%; height:4px; background:#E7C9A6; z-index:1; }
  .conn::after { content:'→'; position:absolute; right:-14px; top:-34px; font-family:'Lora',serif; font-size:52px; color:#E0A23C; }
  .pname { margin-top:30px; font-size:46px; color:#16110B; font-weight:500; }
  .node.crux .pname { color:#F0512E; }

  /* lanes */
  .lane { display:grid; grid-template-columns:260px repeat(5,1fr); align-items:stretch; margin:0 150px; }
  .lane.then { margin-top:70px; } .lane.now { margin-top:20px; }
  .lane-lbl { display:flex; flex-direction:column; justify-content:center; padding-right:34px; }
  .lane-lbl .t { font-size:36px; font-weight:600; letter-spacing:-0.01em; }
  .lane-lbl .s { font-size:24px; text-transform:uppercase; letter-spacing:0.12em; margin-top:6px; }
  .then .lane-lbl .t { color:#79705F; } .then .lane-lbl .s { color:#9B8F78; }
  .now .lane-lbl .t { color:#F0512E; } .now .lane-lbl .s { color:#C67A4F; }
  .cell { padding:34px 30px; display:flex; align-items:center; min-height:170px; margin-left:16px; }
  .cell p { font-size:33px; line-height:1.28; font-weight:300; }
  .cell.then { background:#EEE5D3; border-left:6px solid #E0A23C; color:#5A5245; }
  .cell.now { background:#FBF6EC; border-left:6px solid #F0512E; color:#1E1813; }
  .cell.now p { font-weight:400; }
  .cell.crux.then { background:#F6E7D6; }
  .cell.crux.now { background:#F0512E; border-left:6px solid #16110B; }
  .cell.crux.now p { color:#F7F1E6; font-weight:600; }

  footer { position:absolute; bottom:0; left:0; right:0; margin:0 150px 84px; display:flex; align-items:center; justify-content:space-between; padding-top:40px; border-top:2px solid #DDD2BC; }
  .foot-line { font-size:34px; font-weight:300; color:#1E1813; } .foot-line b { color:#F0512E; font-weight:600; }
  .foot-fig { font-size:26px; text-transform:uppercase; letter-spacing:0.2em; color:#79705F; }
</style></head><body>
  <header>
    <p class="kicker fm">The Method Never Changed</p>
    <div class="cred">${logoInk(50)}<span class="credit fm">Strategy to Ship</span></div>
  </header>
  <h1 class="fd">One discovery method. <em>Two eras.</em></h1>

  <div class="pipe">${nodes}</div>

  <div class="lane then">
    <div class="lane-lbl"><span class="t fd">Then</span><span class="s fm">Agency + consulting</span></div>
    ${thenCells}
  </div>
  <div class="lane now">
    <div class="lane-lbl"><span class="t fd">Now</span><span class="s fm">Forward-deployed AI</span></div>
    ${nowCells}
  </div>

  <footer>
    <p class="foot-line">The one translation that matters: the <b>creative brief &rarr; the system prompt.</b></p>
    <p class="foot-fig fm">Fig. 2 — Discovery to deployment</p>
  </footer>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 2800, height: 1760, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'images', 'insights', 'forward-deployed-strategist-method.png'), type: 'png' });
  console.log('Method figure v2 -> public/images/insights/forward-deployed-strategist-method.png');
  await browser.close();
})();
