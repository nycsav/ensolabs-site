/* Forward Deployed Strategist — animated data block (option A).
 * "35%" counts up + the NY/SF/Rest bar grows. Frames via puppeteer -> GIF + MP4 via ffmpeg.
 * LinkedIn supports GIF/video in feed; the MP4 is the higher-quality option. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { logoWhite } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1080px;background:#16110B;color:#F7F1E6;font-family:'Inter Tight',sans-serif;padding:96px 84px;display:flex;flex-direction:column;justify-content:space-between}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .kick{font-size:26px;text-transform:uppercase;letter-spacing:0.2em;color:#F0512E;font-weight:700}
  .fig{font-family:'Lora',Georgia,serif;font-size:340px;line-height:0.9;color:#F0512E;margin-top:6px}
  .cap{font-size:40px;font-weight:300;color:#F7F1E6;max-width:840px}
  .barlbl{font-size:23px;text-transform:uppercase;letter-spacing:0.14em;color:#B9AE99;margin:0 0 16px}
  .stack{display:flex;height:84px;background:#241c12;border:2px solid #3a3329;overflow:hidden}
  .seg{display:flex;align-items:center;padding:0 22px;color:#fff;font-size:27px;font-weight:600;white-space:nowrap;overflow:hidden;transition:none}
  .seg.ny{background:#F0512E}.seg.sf{background:#79705F}.seg.rest{background:#E0A23C;color:#241c12}
  footer{display:flex;align-items:center;justify-content:space-between}
  .enso svg{height:44px;width:auto;display:block}
  .fr{font-size:22px;text-transform:uppercase;letter-spacing:0.16em;color:#79705F}
</style></head><body>
  <div>
    <p class="kick fm">The forward-deployed boom</p>
    <div class="fig fd" id="fig">0%</div>
    <p class="cap fd">of U.S. forward-deployed roles are now in New York.</p>
  </div>
  <div>
    <p class="barlbl fm">Where the roles are posted</p>
    <div class="stack">
      <div class="seg ny" id="ny" style="width:0%"></div>
      <div class="seg sf" id="sf" style="width:0%"></div>
      <div class="seg rest" id="rest" style="width:0%"></div>
    </div>
  </div>
  <footer><span class="enso">${logoWhite(44)}</span><span class="fr fm">Powered by Enso Labs</span></footer>
  <script>
    window.render=function(p){
      var e = p<0.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
      document.getElementById('fig').textContent = Math.round(35*e)+'%';
      document.getElementById('ny').style.width = (35*e)+'%';
      document.getElementById('sf').style.width = (11*e)+'%';
      document.getElementById('rest').style.width = (54*e)+'%';
      document.getElementById('ny').textContent = e>0.55?'NY 35%':'';
      document.getElementById('sf').textContent = e>0.75?'SF 11%':'';
      document.getElementById('rest').textContent = e>0.45?'Rest of U.S. 54%':'';
    };window.render(0);
  </script>
</body></html>`;

(async () => {
  const dir = '/tmp/fds-frames';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  const N = 28, hold = 14; let idx = 0;
  for (let i = 0; i < N; i++) { const p = i / (N - 1); await pg.evaluate((pp) => window.render(pp), p); await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') }); }
  for (let h = 0; h < hold; h++) { await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') }); }
  await b.close();
  const out = path.join(__dirname, '..', 'public', 'images', 'strategy-to-ship', 'forward-deployed-strategist');
  fs.mkdirSync(out, { recursive: true });
  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -vf "scale=1080:1080:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${path.join(out, 'anim-ny-hub.gif')}`, { stdio: 'ignore' });
  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -movflags +faststart ${path.join(out, 'anim-ny-hub.mp4')}`, { stdio: 'ignore' });
  console.log('anim -> public/images/strategy-to-ship/forward-deployed-strategist/anim-ny-hub.gif (+ .mp4)');
})();
