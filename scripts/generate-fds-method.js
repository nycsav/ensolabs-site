/* Forward Deployed Strategist — Part 1, Fig. 2 (v3): the method as a COLORED JOURNEY DIAGRAM.
 * Horizontal gradient flow-line, 5 colored stations with duotone icons, two eras above/below the line.
 * More color + real diagram (not a table). Storytelling-with-data: crux station spotlighted. 2800x1760. */
const puppeteer = require('puppeteer');
const path = require('path');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const ic = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="#FBF6EC" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const icons = [
  ic('<circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/>'),
  ic('<rect x="3" y="3" width="7.5" height="7.5" rx="1"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1"/>'),
  ic('<path d="M6 2.5h8L19.5 8v13.5H6z"/><path d="M14 2.5V8h5.5"/><line x1="9" y1="13" x2="16" y2="13"/><line x1="9" y1="16.5" x2="16" y2="16.5"/>'),
  ic('<line x1="2.5" y1="12" x2="19" y2="12"/><polyline points="13,5.5 20.5,12 13,18.5"/>'),
  ic('<line x1="5" y1="21" x2="5" y2="13"/><line x1="12" y1="21" x2="12" y2="8"/><line x1="19" y1="21" x2="19" y2="4"/>'),
];
const colors = ['#E0A23C', '#E67B39', '#F0512E', '#E85C2E', '#D8431F'];

const phases = [
  { name: 'Discover', then: 'Stakeholder interviews · C-suite alignment', now: 'Discovery on your real systems and data' },
  { name: 'Frame', then: 'MECE structuring · market insight', now: 'Map the workflow · where the model fits' },
  { name: 'The Brief', then: 'The creative brief', now: 'The system prompt + guardrails', crux: true },
  { name: 'Deploy', then: 'Campaign rollout', now: 'Ship the agent · harness · human-in-the-loop' },
  { name: 'Measure', then: 'Performance measurement', now: 'Evals · observability · outcome' },
];

const N = phases.length;
const CW = 2500, cx = (i) => Math.round((CW / N) * (i + 0.5)); // station centre x within container
const spineY = 470;

const stations = phases.map((p, i) => {
  const x = cx(i), c = colors[i], r = p.crux ? 96 : 74;
  const cardW = 440, left = x - cardW / 2;
  return `
    <div class="then-card ${p.crux ? 'crux' : ''}" style="left:${left}px;width:${cardW}px"><p>${p.then}</p></div>
    <div class="vline then" style="left:${x - 1}px;top:230px;height:${spineY - r - 232}px"></div>
    <div class="station ${p.crux ? 'crux' : ''}" style="left:${x - r}px;top:${spineY - r}px;width:${r * 2}px;height:${r * 2}px;background:${c};${p.crux ? 'box-shadow:0 0 0 14px rgba(240,81,46,0.16);' : ''}">
      <span class="ico">${icons[i]}</span>
    </div>
    <div class="pname fd" style="left:${x - 200}px;top:${spineY + r + 18}px;width:400px;color:${p.crux ? '#F0512E' : '#16110B'}">${p.name}</div>
    <div class="vline now" style="left:${x - 1}px;top:${spineY + r + 96}px;height:44px"></div>
    <div class="now-card ${p.crux ? 'crux' : ''}" style="left:${left}px;top:${spineY + r + 140}px;width:${cardW}px"><p>${p.now}</p></div>`;
}).join('');

const spineW = cx(N - 1) - cx(0);
const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2800px; height:1760px; background:#F7F1E6; color:#1E1813; font-family:'Inter Tight',sans-serif; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  header { display:flex; align-items:center; justify-content:space-between; padding:90px 150px 0; }
  .kicker { font-size:34px; font-weight:700; text-transform:uppercase; color:#F0512E; letter-spacing:0.22em; }
  .cred { display:flex; align-items:center; gap:26px; }
  .credit { font-size:26px; text-transform:uppercase; color:#79705F; letter-spacing:0.18em; }
  .titlerow { display:flex; align-items:flex-end; justify-content:space-between; padding:40px 150px 0; }
  h1 { font-size:98px; line-height:1.0; letter-spacing:-0.015em; color:#16110B; font-weight:500; }
  h1 em { font-style:italic; color:#F0512E; }
  .legend { display:flex; gap:40px; padding-bottom:14px; }
  .lg { display:flex; align-items:center; gap:14px; font-size:28px; font-weight:500; }
  .lg .d { width:22px; height:22px; border-radius:50%; }
  .lg.then .d { background:#E0A23C; } .lg.then { color:#8a7a56; }
  .lg.now .d { background:#F0512E; } .lg.now { color:#F0512E; }

  .diagram { position:relative; height:960px; margin:56px 150px 0; }
  .spine { position:absolute; top:${spineY - 4}px; left:${cx(0)}px; width:${spineW}px; height:8px; border-radius:4px;
           background:linear-gradient(90deg,#E0A23C,#F0512E); z-index:1; }
  .station { position:absolute; border-radius:50%; z-index:3; display:flex; align-items:center; justify-content:center; }
  .station .ico svg { width:74px; height:74px; }
  .station.crux .ico svg { width:94px; height:94px; }
  .vline { position:absolute; width:2px; z-index:2; }
  .vline.then { background:#E0A23C; opacity:0.6; }
  .vline.now { background:#F0512E; opacity:0.6; }
  .pname { position:absolute; text-align:center; font-size:44px; font-weight:500; z-index:3; }
  .then-card, .now-card { position:absolute; padding:26px 28px; border-radius:6px; min-height:150px; display:flex; align-items:center; z-index:2; }
  .then-card { top:70px; background:#F4E7D3; border:2px solid #E7CFA6; }
  .then-card p { font-size:31px; line-height:1.26; font-weight:300; color:#6B5E42; }
  .now-card { background:#FCEDE7; border:2px solid #F3B5A2; }
  .now-card p { font-size:31px; line-height:1.26; font-weight:400; color:#1E1813; }
  .now-card.crux { background:#F0512E; border-color:#16110B; }
  .now-card.crux p { color:#F7F1E6; font-weight:600; }
  .then-card.crux { background:#F7E1CF; border-color:#E0A23C; }

  footer { position:absolute; bottom:0; left:0; right:0; margin:0 150px 78px; display:flex; align-items:center; justify-content:space-between; padding-top:38px; border-top:2px solid #DDD2BC; }
  .foot-line { font-size:34px; font-weight:300; color:#1E1813; } .foot-line b { color:#F0512E; font-weight:600; }
  .foot-fig { font-size:26px; text-transform:uppercase; letter-spacing:0.2em; color:#79705F; }
</style></head><body>
  <header>
    <p class="kicker fm">The Method Never Changed</p>
    <div class="cred">${logoInk(50)}<span class="credit fm">Strategy to Ship</span></div>
  </header>
  <div class="titlerow">
    <h1 class="fd">One discovery method. <em>Two eras.</em></h1>
    <div class="legend">
      <span class="lg then"><span class="d"></span>Then · agency + consulting</span>
      <span class="lg now"><span class="d"></span>Now · forward-deployed AI</span>
    </div>
  </div>

  <div class="diagram">
    <div class="spine"></div>
    ${stations}
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
  console.log('Method figure v3 -> public/images/insights/forward-deployed-strategist-method.png');
  await browser.close();
})();
