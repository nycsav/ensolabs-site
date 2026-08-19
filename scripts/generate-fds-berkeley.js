/* Berkeley composite — the Campanile photo as background with text overlay.
 * Outputs the in-article highlight (2400x1350) AND the article OG (1200x630, slug-named). */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { logoWhite } = require('./_fds-logo');
const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const root = path.join(__dirname, '..');
const photo = fs.readFileSync(path.join(root, 'public', 'images', 'insights', 'berkeley-campanile.jpg')).toString('base64');

const page = (w, h, hSize) => `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:${w}px;height:${h}px;position:relative;overflow:hidden;font-family:'Inter Tight',sans-serif;}
  .ph{position:absolute;inset:0;background:url('data:image/jpeg;base64,${photo}') center 42% / cover no-repeat;}
  .sc{position:absolute;inset:0;background:linear-gradient(to top,rgba(22,17,11,0.92) 0%,rgba(22,17,11,0.55) 34%,rgba(22,17,11,0.08) 62%);}
  .sc2{position:absolute;inset:0;background:linear-gradient(90deg,rgba(22,17,11,0.7) 0%,rgba(22,17,11,0.1) 42%,rgba(22,17,11,0) 70%);}
  .c{position:absolute;inset:0;padding:${Math.round(h*0.09)}px ${Math.round(w*0.06)}px;display:flex;flex-direction:column;justify-content:flex-end;}
  .fd{font-family:'Lora',Georgia,serif;} .fm{font-family:'JetBrains Mono',monospace;}
  .k{font-size:${Math.round(hSize*0.34)}px;text-transform:uppercase;letter-spacing:0.2em;color:#F0512E;font-weight:700;}
  h1{margin-top:${Math.round(hSize*0.32)}px;max-width:${Math.round(w*0.72)}px;font-size:${hSize}px;line-height:1.04;letter-spacing:-0.015em;color:#F7F1E6;font-weight:500;}
  .sub{margin-top:${Math.round(hSize*0.34)}px;font-size:${Math.round(hSize*0.4)}px;font-weight:300;color:#CDBFA8;}
  .foot{margin-top:${Math.round(hSize*0.55)}px;display:flex;align-items:center;justify-content:space-between;}
  .foot .enso svg{height:${Math.round(hSize*0.62)}px;width:auto;display:block;}
  .fr{font-size:${Math.round(hSize*0.26)}px;text-transform:uppercase;letter-spacing:0.16em;color:#B9AE99;}
</style></head><body>
  <div class="ph"></div><div class="sc"></div><div class="sc2"></div>
  <div class="c">
    <p class="k fm">Berkeley RDI · Agentic AI Summit 2026</p>
    <h1 class="fd">Key learnings on the agentic-AI trends of 2026.</h1>
    <p class="sub">Part 1 · The Forward Deployed Strategist</p>
    <div class="foot"><span class="enso">${logoWhite(Math.round(hSize*0.62))}</span><span class="fr fm">Powered by Enso Labs</span></div>
  </div>
</body></html>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 2400, height: 1350, deviceScaleFactor: 1 });
  await p.setContent(page(2400, 1350, 96), { waitUntil: 'load', timeout: 60000 });
  await new Promise(r => setTimeout(r, 900));
  await p.screenshot({ path: path.join(root, 'public', 'images', 'insights', 'berkeley-campanile-hero.png'), type: 'png' });
  console.log('hero -> public/images/insights/berkeley-campanile-hero.png');
  await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await p.setContent(page(1200, 630, 52), { waitUntil: 'load', timeout: 60000 });
  await new Promise(r => setTimeout(r, 900));
  await p.screenshot({ path: path.join(root, 'public', 'og', 'og-forward-deployed-strategist-agency-lineage.png'), type: 'png' });
  console.log('og -> public/og/og-forward-deployed-strategist-agency-lineage.png');
  await b.close();
})();
