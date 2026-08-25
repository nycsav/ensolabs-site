/* Part 2 — ANIMATED input/output spec of the agent harness (Warm Signal / paper ground).
 * Strategist deliverables (left) flow through the three harness tiers (centre) and come out
 * as measured numbers (right). Renders frames via puppeteer -> GIF + MP4 (ffmpeg). */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 760;
const OUT = 'agent-harness-inputs-outputs-pipeline';

const ROWS = [
  ['The brief', 'Runtime', 'System prompt + permission boundary'],
  ['The journey map', 'Capabilities', 'Tool allowlist + escalation gate'],
  ['The measurement plan', 'Assurance', 'Eval harness + golden-set CI'],
  ['The segmentation', 'Capabilities', 'Retrieval strategy + recall target'],
];

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#F7F1E6;color:#1E1813;
       font-family:'Inter Tight',sans-serif;padding:56px 64px;
       display:flex;flex-direction:column;justify-content:space-between}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .kick{font-size:22px;text-transform:uppercase;letter-spacing:0.2em;color:#F0512E;font-weight:700}
  h2{font-family:'Lora',Georgia,serif;font-size:44px;font-weight:500;margin-top:10px;line-height:1.12}
  .heads{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr;gap:0 18px;margin-top:30px}
  .hl{font-size:17px;text-transform:uppercase;letter-spacing:0.16em;color:#79705F;font-weight:600}
  .hl.mid{color:#F0512E}
  .grid{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr;gap:14px 18px;margin-top:12px}
  .cell{border:2px solid #DDD2BC;background:#fffdf8;border-radius:6px;padding:16px 18px;
        font-size:23px;line-height:1.25;opacity:0.24;transition:none;min-height:82px;
        display:flex;align-items:center}
  .cell.on{opacity:1}
  .cell.tier{background:#1E1813;color:#F7F1E6;border-color:#1E1813;font-weight:600}
  .cell.tier.on{background:#F0512E;border-color:#F0512E}
  .cell.out{font-family:'JetBrains Mono',monospace;font-size:20px;background:#F3EADA}
  .arw{display:flex;align-items:center;justify-content:center;font-size:26px;color:#C9BCA4;opacity:0.24}
  .arw.on{opacity:1;color:#F0512E}
  footer{display:flex;align-items:center;justify-content:space-between;padding-top:22px;border-top:2px solid #DDD2BC}
  .enso svg{height:36px;width:auto;display:block}
  .fr{font-size:18px;text-transform:uppercase;letter-spacing:0.14em;color:#79705F}
</style></head><body>
  <div>
    <p class="kick fm">The input/output spec</p>
    <h2 class="fd">A strategy deliverable goes in. A measured number comes out.</h2>
    <div class="heads">
      <div class="hl fm">Input — what strategy already produces</div><div></div>
      <div class="hl fm mid">Harness tier</div><div></div>
      <div class="hl fm">Output — what it becomes, measured</div>
    </div>
    <div class="grid" id="grid">
      ${ROWS.map(
        (r, i) => `
      <div class="cell fd" id="a${i}">${r[0]}</div>
      <div class="arw" id="x${i}">&rarr;</div>
      <div class="cell tier fm" id="b${i}">${r[1]}</div>
      <div class="arw" id="y${i}">&rarr;</div>
      <div class="cell out" id="c${i}">${r[2]}</div>`
      ).join('')}
    </div>
  </div>
  <footer>
    <span class="enso">${logoInk(36)}</span>
    <span class="fr fm">Part 2 · The Forward Deployed Strategist · Enso Labs</span>
  </footer>
  <script>
    var N = ${ROWS.length};
    window.render = function (p) {
      // Each row lights across three beats: input, tier, output.
      var total = N * 3;
      var head = p * (total + 2);
      for (var i = 0; i < N; i++) {
        var base = i * 3;
        set('a' + i, head > base + 0.4);
        set('x' + i, head > base + 0.9);
        set('b' + i, head > base + 1.2);
        set('y' + i, head > base + 1.9);
        set('c' + i, head > base + 2.2);
      }
    };
    function set(id, on) {
      var el = document.getElementById(id);
      if (on) el.classList.add('on'); else el.classList.remove('on');
    }
    window.render(0);
  </script>
</body></html>`;

(async () => {
  const dir = '/tmp/p2-pipe-frames';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  const N = 44, hold = 22;
  let idx = 0;
  for (let i = 0; i < N; i++) {
    await pg.evaluate((pp) => window.render(pp), i / (N - 1));
    await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
  }
  for (let h = 0; h < hold; h++) {
    await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
  }
  await b.close();

  const out = path.join(__dirname, '..', 'public', 'images', 'insights');
  fs.mkdirSync(out, { recursive: true });
  execSync(
    `ffmpeg -y -framerate 16 -i ${dir}/%03d.png -vf "scale=${W}:${H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(out, OUT + '.gif')}`,
    { stdio: 'ignore' }
  );
  execSync(
    `ffmpeg -y -framerate 16 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(out, OUT + '.mp4')}`,
    { stdio: 'ignore' }
  );
  console.log(`pipeline anim -> public/images/insights/${OUT}.gif (+ .mp4)`);
})();
