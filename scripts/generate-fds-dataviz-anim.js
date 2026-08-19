/* Forward Deployed Strategist — ANIMATED data block for the ARTICLE (Warm Signal / paper).
 * "35%" counts up + the NY / SF / Rest bar grows. Renders frames via puppeteer -> GIF + MP4 (ffmpeg).
 * On-brand for the ensolabs.ai article (paper ground). GIF autoplays on desktop + mobile via a plain <img>. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 720;

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#F7F1E6;color:#1E1813;font-family:'Inter Tight',sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .kick{font-size:24px;text-transform:uppercase;letter-spacing:0.2em;color:#F0512E;font-weight:700}
  .figrow{display:flex;align-items:baseline;gap:28px;margin-top:6px}
  .fig{font-family:'Lora',Georgia,serif;font-size:236px;line-height:0.86;color:#F0512E}
  .cap{font-size:34px;font-weight:300;color:#1E1813;max-width:520px;line-height:1.25}
  .barlbl{font-size:20px;text-transform:uppercase;letter-spacing:0.14em;color:#79705F;margin:0 0 14px}
  .stack{display:flex;height:76px;background:#EEE5D3;border:2px solid #DDD2BC;overflow:hidden;border-radius:3px}
  .seg{display:flex;align-items:center;padding:0 20px;font-size:24px;font-weight:600;white-space:nowrap;overflow:hidden}
  .seg.ny{background:#F0512E;color:#fff}.seg.sf{background:#79705F;color:#fff}.seg.rest{background:#E0A23C;color:#241c12}
  footer{display:flex;align-items:center;justify-content:space-between;padding-top:26px;border-top:2px solid #DDD2BC}
  .enso svg{height:38px;width:auto;display:block}
  .fr{font-size:19px;text-transform:uppercase;letter-spacing:0.14em;color:#79705F}
</style></head><body>
  <div>
    <p class="kick fm">The forward-deployed boom</p>
    <div class="figrow">
      <div class="fig fd" id="fig">0%</div>
      <p class="cap fd">of U.S. forward-deployed roles are now in New York.</p>
    </div>
  </div>
  <div>
    <p class="barlbl fm">Where the roles are posted — NY vs SF vs rest of U.S.</p>
    <div class="stack">
      <div class="seg ny" id="ny" style="width:0%"></div>
      <div class="seg sf" id="sf" style="width:0%"></div>
      <div class="seg rest" id="rest" style="width:0%"></div>
    </div>
  </div>
  <footer><span class="enso">${logoInk(38)}</span><span class="fr fm">Bloomberry / Paraform · 2026 · Powered by Enso Labs</span></footer>
  <script>
    window.render=function(p){
      var e = p<0.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
      document.getElementById('fig').textContent = Math.round(35*e)+'%';
      document.getElementById('ny').style.width = (35*e)+'%';
      document.getElementById('sf').style.width = (11*e)+'%';
      document.getElementById('rest').style.width = (54*e)+'%';
      document.getElementById('ny').textContent = e>0.55?'NY 35%':'';
      document.getElementById('sf').textContent = e>0.8?'SF 11%':'';
      document.getElementById('rest').textContent = e>0.5?'Rest of U.S. 54%':'';
    };window.render(0);
  </script>
</body></html>`;

(async () => {
  const dir = '/tmp/fds-dv-frames';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  const N = 30, hold = 16; let idx = 0;
  for (let i = 0; i < N; i++) { const p = i / (N - 1); await pg.evaluate((pp) => window.render(pp), p); await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') }); }
  for (let h = 0; h < hold; h++) { await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') }); }
  await b.close();
  const out = path.join(__dirname, '..', 'public', 'images', 'insights');
  fs.mkdirSync(out, { recursive: true });
  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -vf "scale=${W}:${H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(out, 'forward-deployed-strategist-dataviz-anim.gif')}`, { stdio: 'ignore' });
  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(out, 'forward-deployed-strategist-dataviz-anim.mp4')}`, { stdio: 'ignore' });
  console.log('dataviz anim -> public/images/insights/forward-deployed-strategist-dataviz-anim.gif (+ .mp4)');
})();
