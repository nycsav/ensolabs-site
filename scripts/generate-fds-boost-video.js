/* Forward Deployed Strategist — LinkedIn BOOST video creative (1080×1350, 4:5 vertical).
 * One continuous Warm Signal timeline: hook → 35% count-up + bars grow → CTA. Frames -> MP4 (+GIF) via ffmpeg.
 * 4:5 is the max mobile real-estate for LinkedIn feed video. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { logoInk } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1080, H = 1350;

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#F7F1E6;color:#1E1813;font-family:'Inter Tight',sans-serif;padding:84px 76px;display:flex;flex-direction:column}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .kick{font-size:24px;text-transform:uppercase;letter-spacing:0.18em;color:#F0512E;font-weight:700}
  .hook{font-family:'Lora',Georgia,serif;font-size:72px;line-height:1.05;color:#16110B;margin-top:24px;letter-spacing:-0.01em}
  .mid{margin-top:auto;margin-bottom:auto}
  .fig{font-family:'Lora',Georgia,serif;font-size:300px;line-height:0.84;color:#F0512E}
  .cap{font-size:38px;font-weight:300;color:#1E1813;max-width:760px;line-height:1.25;margin-top:8px}
  .barlbl{font-size:20px;text-transform:uppercase;letter-spacing:0.14em;color:#79705F;margin:44px 0 14px}
  .stack{display:flex;height:74px;background:#EEE5D3;border:2px solid #DDD2BC;overflow:hidden;border-radius:3px}
  .seg{display:flex;align-items:center;padding:0 18px;font-size:23px;font-weight:600;white-space:nowrap;overflow:hidden}
  .seg.ny{background:#F0512E;color:#fff}.seg.sf{background:#79705F;color:#fff}.seg.rest{background:#E0A23C;color:#241c12}
  .cta{margin-top:40px;opacity:0}
  .cta .line{font-family:'Lora',Georgia,serif;font-size:46px;line-height:1.14;color:#16110B}
  .cta .read{margin-top:16px;font-size:30px;font-weight:500;color:#F0512E}
  footer{margin-top:38px;display:flex;align-items:center;justify-content:space-between;padding-top:26px;border-top:2px solid #DDD2BC}
  .enso svg{height:36px;width:auto;display:block}
  .fr{font-size:18px;text-transform:uppercase;letter-spacing:0.14em;color:#79705F}
</style></head><body>
  <div>
    <p class="kick fm">The Forward Deployed Strategist · Part 1</p>
    <div class="hook fd" id="hook" style="opacity:0">New York just passed San Francisco.</div>
  </div>
  <div class="mid">
    <div class="fig fd" id="fig">0%</div>
    <p class="cap fd">of U.S. forward-deployed roles are now in New York.</p>
    <p class="barlbl fm">NY vs SF vs rest of U.S.</p>
    <div class="stack">
      <div class="seg ny" id="ny" style="width:0%"></div>
      <div class="seg sf" id="sf" style="width:0%"></div>
      <div class="seg rest" id="rest" style="width:0%"></div>
    </div>
    <div class="cta" id="cta">
      <p class="line fd">The scarce half isn't the engineering. It's the strategist.</p>
      <p class="read">Read Part 1 → ensolabs.ai/insights</p>
    </div>
  </div>
  <footer><span class="enso">${logoInk(36)}</span><span class="fr fm">Bloomberry / Paraform · 2026 · Powered by Enso Labs</span></footer>
  <script>
    var clamp=function(x){return x<0?0:x>1?1:x;};
    var ease=function(p){return p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;};
    window.render=function(t){
      // t in 0..1 over the whole clip
      document.getElementById('hook').style.opacity = clamp(t/0.12);
      var dp = ease(clamp((t-0.18)/0.5));           // data animation window
      document.getElementById('fig').textContent = Math.round(35*dp)+'%';
      document.getElementById('ny').style.width=(35*dp)+'%';
      document.getElementById('sf').style.width=(11*dp)+'%';
      document.getElementById('rest').style.width=(54*dp)+'%';
      document.getElementById('ny').textContent = dp>0.55?'NY 35%':'';
      document.getElementById('sf').textContent = dp>0.8?'SF 11%':'';
      document.getElementById('rest').textContent = dp>0.5?'Rest of U.S. 54%':'';
      document.getElementById('cta').style.opacity = clamp((t-0.74)/0.14);
    };window.render(0);
  </script>
</body></html>`;

(async () => {
  const dir = '/tmp/fds-boost-frames';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  const N = 120, hold = 22; let idx = 0;            // ~8s motion + ~1.5s hold @15fps
  for (let i = 0; i < N; i++) { const t = i / (N - 1); await pg.evaluate((tt) => window.render(tt), t); await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') }); }
  for (let h = 0; h < hold; h++) { await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') }); }
  await b.close();
  const out = path.join(__dirname, '..', 'public', 'images', 'strategy-to-ship', 'forward-deployed-strategist');
  fs.mkdirSync(out, { recursive: true });
  execSync(`ffmpeg -y -framerate 15 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(out, 'boost-video-4x5.mp4')}`, { stdio: 'ignore' });
  console.log('boost video -> public/images/strategy-to-ship/forward-deployed-strategist/boost-video-4x5.mp4');
})();
