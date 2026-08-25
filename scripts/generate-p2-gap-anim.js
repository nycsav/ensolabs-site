/* Part 2 — ANIMATED "the crossing" data block (Warm Signal / paper ground).
 * 38% piloting vs 11% in production, then the four numbers that define the gap.
 * Renders frames via puppeteer -> GIF + MP4 (ffmpeg). */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 720;
const OUT = 'agent-harness-gap-anim';

const TILES = [
  ['64%', 'name evaluation gaps as the blocker'],
  ['57%', 'name governance friction'],
  ['51%', 'name model reliability'],
  ['171%', 'average ROI once agents do reach production'],
];

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#F7F1E6;color:#1E1813;
       font-family:'Inter Tight',sans-serif;padding:56px 68px;
       display:flex;flex-direction:column;justify-content:space-between}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .kick{font-size:23px;text-transform:uppercase;letter-spacing:0.2em;color:#F0512E;font-weight:700}
  .figrow{display:flex;align-items:baseline;gap:26px;margin-top:4px}
  .fig{font-family:'Lora',Georgia,serif;font-size:200px;line-height:0.86;color:#F0512E}
  .cap{font-size:32px;font-weight:300;max-width:520px;line-height:1.24}
  .barlbl{font-size:19px;text-transform:uppercase;letter-spacing:0.14em;color:#79705F;margin:0 0 12px}
  .track{display:flex;height:66px;background:#EEE5D3;border:2px solid #DDD2BC;border-radius:3px;overflow:hidden}
  .seg{display:flex;align-items:center;padding:0 18px;font-size:22px;font-weight:600;white-space:nowrap;overflow:hidden}
  .seg.pilot{background:#E0A23C;color:#241c12}
  .seg.prod{background:#F0512E;color:#fff;padding:0 10px;justify-content:center}
  .legend{display:flex;gap:26px;margin-top:10px;font-size:17px;color:#5f584c}
  .legend i{display:inline-block;width:13px;height:13px;border-radius:2px;margin-right:8px;vertical-align:-1px}
  .legend .a{background:#E0A23C}.legend .b{background:#F0512E}
  .tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px}
  .t{border:2px solid #DDD2BC;background:#fffdf8;border-radius:6px;padding:14px 16px;opacity:0.18}
  .t.on{opacity:1}
  .t .n{font-family:'Lora',Georgia,serif;font-size:46px;color:#1E1813;line-height:1}
  .t.last .n{color:#F0512E}
  .t .l{font-size:16px;color:#5f584c;margin-top:6px;line-height:1.25}
  footer{display:flex;align-items:center;justify-content:space-between;padding-top:20px;border-top:2px solid #DDD2BC}
  .enso svg{height:34px;width:auto;display:block}
  .fr{font-size:17px;text-transform:uppercase;letter-spacing:0.13em;color:#79705F}
</style></head><body>
  <div>
    <p class="kick fm">The crossing</p>
    <div class="figrow">
      <div class="fig fd" id="fig">0%</div>
      <p class="cap fd">of organizations have an agent actually running in production.</p>
    </div>
  </div>
  <div>
    <p class="barlbl fm">Piloting vs. in production</p>
    <div class="track">
      <div class="seg pilot" id="pilot" style="width:0%"></div>
      <div class="seg prod" id="prod" style="width:0%"></div>
    </div>
    <div class="legend fm">
      <span><i class="a"></i>Piloting 38%</span>
      <span><i class="b"></i>In production 11%</span>
    </div>
    <div class="tiles">
      ${TILES.map(
        (t, i) =>
          `<div class="t${i === 3 ? ' last' : ''}" id="t${i}"><div class="n fd">${t[0]}</div><div class="l">${t[1]}</div></div>`
      ).join('')}
    </div>
  </div>
  <footer>
    <span class="enso">${logoInk(34)}</span>
    <span class="fr fm">Deloitte · PagerDuty · 2026 · Powered by Enso Labs</span>
  </footer>
  <script>
    window.render = function (p) {
      var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      var b = Math.min(1, e / 0.55);
      document.getElementById('fig').textContent = Math.round(11 * b) + '%';
      document.getElementById('pilot').style.width = (38 * b) + '%';
      document.getElementById('prod').style.width = (11 * b) + '%';
      document.getElementById('pilot').textContent = b > 0.6 ? 'Piloting 38%' : '';
      document.getElementById('prod').textContent = b > 0.9 ? '11%' : '';
      for (var i = 0; i < 4; i++) {
        var el = document.getElementById('t' + i);
        if (e > 0.55 + i * 0.1) el.classList.add('on'); else el.classList.remove('on');
      }
    };
    window.render(0);
  </script>
</body></html>`;

(async () => {
  const dir = '/tmp/p2-gap-frames';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  const N = 36, hold = 20;
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
  execSync(
    `ffmpeg -y -framerate 18 -i ${dir}/%03d.png -vf "scale=${W}:${H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(out, OUT + '.gif')}`,
    { stdio: 'ignore' }
  );
  execSync(
    `ffmpeg -y -framerate 18 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(out, OUT + '.mp4')}`,
    { stdio: 'ignore' }
  );
  console.log(`gap anim -> public/images/insights/${OUT}.gif (+ .mp4)`);
})();
