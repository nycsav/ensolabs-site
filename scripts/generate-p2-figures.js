/* Part 2 — three additional ANIMATED figures (Warm Signal / paper ground).
 *   A. harness-stack   — the three tiers build, then regulated obligations layer in
 *   B. demand-delivery — FDE postings 643 -> 5,330 against an 11% production rate
 *   C. benchmark       — retrieval strategy, not model choice, moves the number
 * Renders frames via puppeteer -> GIF + MP4 (ffmpeg) for each. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const OUTDIR = path.join(__dirname, '..', 'public', 'images', 'insights');

const BASE = `
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#F7F1E6;color:#1E1813;font-family:'Inter Tight',sans-serif;
       display:flex;flex-direction:column;justify-content:space-between}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .kick{font-size:22px;text-transform:uppercase;letter-spacing:0.2em;color:#F0512E;font-weight:700}
  h2{font-family:'Lora',Georgia,serif;font-size:42px;font-weight:500;margin-top:8px;line-height:1.14}
  footer{display:flex;align-items:center;justify-content:space-between;padding-top:20px;border-top:2px solid #DDD2BC}
  .enso svg{height:34px;width:auto;display:block}
  .fr{font-size:17px;text-transform:uppercase;letter-spacing:0.13em;color:#79705F}
`;

/* ---------- A. The harness stack ---------- */
const TIERS = [
  ['Assurance', 'Guardrails · validation loops · the eval harness', 'Policy-as-code + human approval before anything irreversible'],
  ['Capabilities', 'Tools · memory · state · retrieval', 'NIST AI RMF / FDA & MLR govern the tool list and the corpus'],
  ['Runtime', 'Prompt construction · output parsing · the loop', 'Audit trails and encryption become mandatory, not optional'],
];

const stackHtml = (W, H) => `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>${BASE}
  body{width:${W}px;height:${H}px;padding:52px 64px}
  .heads{display:grid;grid-template-columns:1.15fr 1fr;gap:18px;margin-top:26px;margin-bottom:10px}
  .hl{font-size:16px;text-transform:uppercase;letter-spacing:0.15em;color:#79705F;font-weight:600;
      white-space:nowrap;overflow:visible}
  .hl.regh{color:#F0512E}
  .rows{display:flex;flex-direction:column;gap:13px}
  .row{display:grid;grid-template-columns:1.15fr 1fr;gap:18px;opacity:0;transform:translateY(14px)}
  .row.on{opacity:1;transform:none}
  .tier{background:#1E1813;color:#F7F1E6;border-radius:6px;padding:16px 20px}
  .tier .n{font-family:'JetBrains Mono',monospace;font-size:25px;font-weight:700;color:#F0512E}
  .tier .d{font-size:19px;color:#CFC4B2;margin-top:5px;line-height:1.3}
  .reg{border:2px dashed #E8B9A9;background:#FDF3EF;border-radius:6px;padding:16px 18px;
       font-size:19px;line-height:1.32;color:#93331A;opacity:0;display:flex;align-items:center}
  .reg.on{opacity:1}
</style></head><body>
  <div>
    <p class="kick fm">The harness, in three tiers</p>
    <h2 class="fd">Every strategist decision lands in one of them.</h2>
    <div class="heads">
      <div class="hl fm">The tier</div>
      <div class="hl fm regh">What regulated deployment adds</div>
    </div>
    <div class="rows">
      ${TIERS.map(
        (t, i) => `
      <div class="row" id="r${i}">
        <div class="tier"><div class="n">${t[0]}</div><div class="d">${t[1]}</div></div>
        <div class="reg" id="g${i}">${t[2]}</div>
      </div>`
      ).join('')}
    </div>
  </div>
  <footer><span class="enso">${logoInk(34)}</span>
    <span class="fr fm">Part 2 · The Forward Deployed Strategist · Enso Labs</span></footer>
  <script>
    window.render=function(p){
      var n=${TIERS.length};
      for(var i=0;i<n;i++){
        // Stack builds bottom-up (Runtime first), then the regulated column fills in.
        var order=n-1-i;
        tog('r'+i, p > 0.06 + order*0.14);
        tog('g'+i, p > 0.52 + order*0.12);
      }
    };
    function tog(id,on){var e=document.getElementById(id);if(on)e.classList.add('on');else e.classList.remove('on');}
    window.render(0);
  </script>
</body></html>`;

/* ---------- B. Demand vs delivery ---------- */
const demandHtml = (W, H) => `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>${BASE}
  body{width:${W}px;height:${H}px;padding:52px 64px}
  .split{display:grid;grid-template-columns:1fr 1fr;gap:44px;margin-top:26px;align-items:start}
  .lab{font-size:17px;text-transform:uppercase;letter-spacing:0.15em;color:#79705F;font-weight:600;margin-bottom:12px}
  .big{font-family:'Lora',Georgia,serif;font-size:132px;line-height:0.9;color:#F0512E}
  .big.mut{color:#1E1813}
  .sub{font-size:22px;color:#5f584c;margin-top:12px;line-height:1.35;max-width:440px}
  .bars{margin-top:22px;display:flex;flex-direction:column;gap:11px}
  .brow{display:grid;grid-template-columns:150px 1fr;align-items:center;gap:14px}
  .blab{font-family:'JetBrains Mono',monospace;font-size:17px;color:#5f584c;white-space:nowrap}
  .btrack{height:40px;background:#EEE5D3;border-radius:3px;overflow:hidden}
  .b{height:100%;background:#E0A23C;border-radius:3px;width:0%}
  .b.now{background:#F0512E}
  .note{margin-top:26px;padding:16px 20px;background:#fffdf8;border-left:4px solid #F0512E;
        border-radius:0 6px 6px 0;font-size:22px;line-height:1.35;opacity:0}
  .note.on{opacity:1}
</style></head><body>
  <div>
    <p class="kick fm">Demand vs. delivery</p>
    <h2 class="fd">The market is hiring one half of the role.</h2>
    <div class="split">
      <div>
        <p class="lab fm">U.S. forward-deployed postings</p>
        <div class="big fd" id="posts">0</div>
        <p class="sub">up 729% year over year, Apr 2025 &rarr; Apr 2026.</p>
        <div class="bars">
          <div class="brow"><span class="blab">Apr 2025 · 643</span>
            <div class="btrack"><div class="b" id="b25"></div></div></div>
          <div class="brow"><span class="blab">Apr 2026 · 5,330</span>
            <div class="btrack"><div class="b now" id="b26"></div></div></div>
        </div>
      </div>
      <div>
        <p class="lab fm">Organizations with an agent in production</p>
        <div class="big mut fd" id="prod">0%</div>
        <p class="sub">Hiring for the engineering half has scaled roughly 8x. The share of companies that actually ship a system has not moved with it.</p>
        <div class="note fd" id="note">The bottleneck was never the code.</div>
      </div>
    </div>
  </div>
  <footer><span class="enso">${logoInk(34)}</span>
    <span class="fr fm">Indeed / Business Insider · Deloitte · 2026 · Powered by Enso Labs</span></footer>
  <script>
    window.render=function(p){
      var e = p<0.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
      var a = Math.min(1, e/0.62);
      document.getElementById('posts').textContent = Math.round(5330*a).toLocaleString();
      document.getElementById('prod').textContent = Math.round(11*a)+'%';
      document.getElementById('b25').style.width = (12*a)+'%';
      document.getElementById('b26').style.width = (100*a)+'%';
      var n=document.getElementById('note');
      if(e>0.78) n.classList.add('on'); else n.classList.remove('on');
    };window.render(0);
  </script>
</body></html>`;

/* ---------- C. Benchmark ---------- */
const BARS = [
  ['Embedding baseline', 27.8, '#C9BCA4', 'BRIGHT recall@1'],
  ['AgenticRAG harness', 49.6, '#F0512E', 'BRIGHT recall@1'],
  ['AgenticRAG harness', 92, '#F0512E', 'FinanceBench answer correctness'],
  ['Oracle evidence', 94, '#1E1813', 'FinanceBench answer correctness'],
];

const benchHtml = (W, H) => `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>${BASE}
  body{width:${W}px;height:${H}px;padding:52px 64px}
  .grp{margin-top:24px}
  .gl{font-size:16px;text-transform:uppercase;letter-spacing:0.15em;color:#79705F;font-weight:600;margin-bottom:10px}
  .row{display:grid;grid-template-columns:250px 1fr 96px;align-items:center;gap:16px;margin-bottom:11px}
  .rl{font-size:20px;color:#1E1813}
  .track{height:40px;background:#EEE5D3;border-radius:3px;overflow:hidden}
  .fill{height:100%;width:0%;border-radius:3px}
  .val{font-family:'JetBrains Mono',monospace;font-size:23px;font-weight:700;text-align:right}
  .note{margin-top:22px;padding:15px 20px;background:#fffdf8;border-left:4px solid #F0512E;
        border-radius:0 6px 6px 0;font-size:21px;line-height:1.35;opacity:0}
  .note.on{opacity:1}
</style></head><body>
  <div>
    <p class="kick fm">Same model. Different harness.</p>
    <h2 class="fd">Retrieval strategy moved the number, not model choice.</h2>
    <div class="grp">
      <p class="gl fm">BRIGHT · recall@1</p>
      <div class="row"><span class="rl">Embedding baseline</span>
        <div class="track"><div class="fill" id="f0" style="background:#C9BCA4"></div></div>
        <span class="val" id="v0">0%</span></div>
      <div class="row"><span class="rl">AgenticRAG harness</span>
        <div class="track"><div class="fill" id="f1" style="background:#F0512E"></div></div>
        <span class="val" id="v1" style="color:#F0512E">0%</span></div>
    </div>
    <div class="grp">
      <p class="gl fm">FinanceBench · answer correctness</p>
      <div class="row"><span class="rl">AgenticRAG harness</span>
        <div class="track"><div class="fill" id="f2" style="background:#F0512E"></div></div>
        <span class="val" id="v2" style="color:#F0512E">0%</span></div>
      <div class="row"><span class="rl">Oracle evidence (ceiling)</span>
        <div class="track"><div class="fill" id="f3" style="background:#1E1813"></div></div>
        <span class="val" id="v3">0%</span></div>
    </div>
    <div class="note fd" id="note">Give the model tools to look for evidence and it lands within two points of being handed the answer.</div>
  </div>
  <footer><span class="enso">${logoInk(34)}</span>
    <span class="fr fm">Microsoft · arXiv 2605.05538 · May 2026 · Powered by Enso Labs</span></footer>
  <script>
    var T=${JSON.stringify(BARS.map((b) => b[1]))};
    window.render=function(p){
      var e = p<0.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
      for(var i=0;i<T.length;i++){
        var a=Math.max(0,Math.min(1,(e-i*0.09)/0.5));
        document.getElementById('f'+i).style.width=(T[i]*a)+'%';
        document.getElementById('v'+i).textContent=(T[i]*a).toFixed(1).replace(/\\.0$/,'')+'%';
      }
      var n=document.getElementById('note');
      if(e>0.82) n.classList.add('on'); else n.classList.remove('on');
    };window.render(0);
  </script>
</body></html>`;

const FIGURES = [
  { name: 'agent-harness-stack-anim', html: stackHtml, W: 1200, H: 700, frames: 40, hold: 22, fps: 16 },
  { name: 'agent-harness-demand-delivery-anim', html: demandHtml, W: 1200, H: 700, frames: 36, hold: 20, fps: 18 },
  { name: 'agent-harness-benchmark-anim', html: benchHtml, W: 1200, H: 700, frames: 38, hold: 22, fps: 18 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  for (const f of FIGURES) {
    const dir = `/tmp/p2-${f.name}`;
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    const pg = await browser.newPage();
    await pg.setViewport({ width: f.W, height: f.H, deviceScaleFactor: 2 });
    await pg.setContent(f.html(f.W, f.H), { waitUntil: 'load', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 800));

    let idx = 0;
    for (let i = 0; i < f.frames; i++) {
      await pg.evaluate((pp) => window.render(pp), i / (f.frames - 1));
      await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
    }
    for (let h = 0; h < f.hold; h++) {
      await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
    }
    await pg.close();

    execSync(
      `ffmpeg -y -framerate ${f.fps} -i ${dir}/%03d.png -vf "scale=${f.W}:${f.H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(OUTDIR, f.name + '.gif')}`,
      { stdio: 'ignore' }
    );
    execSync(
      `ffmpeg -y -framerate ${f.fps} -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${f.W}:${f.H}" -movflags +faststart ${path.join(OUTDIR, f.name + '.mp4')}`,
      { stdio: 'ignore' }
    );
    console.log(`${f.name} -> .gif + .mp4`);
  }
  await browser.close();
})();
