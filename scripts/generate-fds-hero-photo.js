/* Forward Deployed Strategist — Part 1: PHOTO-LED hero (Perplexity-style).
 * Real documentary photo (Sav in the OpenAI Builder Lounge) + dark scrim + title + Enso logo.
 * 2400x1350 (16:9). */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const root = path.join(__dirname, '..');
const photo = fs.readFileSync(path.join(root, 'public', 'images', 'insights', 'openai-builder-lounge-01.jpg')).toString('base64');
const logoWhite = fs.readFileSync(path.join(root, 'public', 'images', 'logo-white.svg'), 'utf8')
  .replace(/<\?xml[\s\S]*?\?>/, '').replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/, '');

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2400px; height:1350px; position:relative; overflow:hidden; font-family:'Inter Tight',sans-serif; }
  .photo { position:absolute; inset:0; background:url('data:image/jpeg;base64,${photo}') center 30% / cover no-repeat; }
  .scrim { position:absolute; inset:0; background:linear-gradient(90deg, rgba(22,17,11,0.94) 0%, rgba(22,17,11,0.82) 34%, rgba(22,17,11,0.42) 62%, rgba(22,17,11,0.05) 100%); }
  .grain { position:absolute; inset:0; background:linear-gradient(0deg, rgba(22,17,11,0.55), rgba(22,17,11,0) 40%); }
  .content { position:absolute; inset:0; padding:120px 130px; display:flex; flex-direction:column; justify-content:space-between; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  .kick { font-size:30px; text-transform:uppercase; letter-spacing:0.22em; color:#F0512E; font-weight:700; }
  h1 { margin-top:40px; max-width:1500px; font-size:104px; line-height:1.03; letter-spacing:-0.02em; color:#F7F1E6; font-weight:500; }
  h1 em { font-style:italic; color:#F0512E; }
  .rule { height:5px; width:220px; background:#F0512E; margin-top:52px; }
  footer { display:flex; align-items:center; justify-content:space-between; }
  .enso svg { height:60px; width:auto; display:block; }
  .fr { font-size:26px; text-transform:uppercase; letter-spacing:0.18em; color:#B9AE99; }
</style></head><body>
  <div class="photo"></div><div class="scrim"></div><div class="grain"></div>
  <div class="content">
    <div>
      <p class="kick fm">Part 1 · The Forward Deployed Strategist</p>
      <h1 class="fd">The best Forward Deployed Engineers have been forward deployed <em>all along.</em></h1>
    </div>
    <div>
      <div class="rule"></div>
    </div>
    <footer>
      <span class="enso">${logoWhite}</span>
      <span class="fr fm">Powered by Enso Labs</span>
    </footer>
  </div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 2400, height: 1350, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(root, 'public', 'images', 'insights', 'forward-deployed-strategist-hero-photo.png'), type: 'png' });
  console.log('Photo hero -> public/images/insights/forward-deployed-strategist-hero-photo.png');
  await browser.close();
})();
