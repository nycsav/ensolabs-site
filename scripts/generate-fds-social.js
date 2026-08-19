/* Forward Deployed Strategist — Part 1 SOCIAL assets.
 * LinkedIn share card (1200x627), X card (1600x900), square pull-quote (1080x1080).
 * Strategy -> Ship brand: dark editorial (Ink Deep) for share cards, Warm Signal for the quote. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { logoInk, logoWhite } = require('./_fds-logo');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const shareCard = (w, h, hSize) => `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:${w}px; height:${h}px; background:#16110B; color:#F7F1E6; font-family:'Inter Tight',sans-serif; padding:${Math.round(h*0.13)}px ${Math.round(w*0.07)}px; display:flex; flex-direction:column; justify-content:space-between; position:relative; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  .kick { font-size:${Math.round(hSize*0.30)}px; text-transform:uppercase; letter-spacing:0.2em; color:#F0512E; font-weight:700; }
  h1 { margin-top:${Math.round(hSize*0.45)}px; font-size:${hSize}px; line-height:1.04; letter-spacing:-0.015em; color:#F7F1E6; font-weight:500; }
  h1 em { font-style:italic; color:#F0512E; }
  .sub { margin-top:${Math.round(hSize*0.5)}px; font-size:${Math.round(hSize*0.42)}px; font-weight:300; color:#B9AE99; }
  .rule { height:4px; width:${Math.round(w*0.15)}px; background:#F0512E; }
  footer { display:flex; align-items:center; justify-content:space-between; }
  .mark { font-family:'Lora',Georgia,serif; font-size:${Math.round(hSize*0.42)}px; color:#F7F1E6; } .mark .a { color:#F0512E; }
  .fr { font-size:${Math.round(hSize*0.26)}px; text-transform:uppercase; letter-spacing:0.16em; color:#79705F; }
</style></head><body>
  <div>
    <p class="kick fm">Part 1 · The Forward Deployed Strategist</p>
    <h1 class="fd">Forward deployment always sent <em>two.</em></h1>
    <p class="sub">The market only talks about one of them.</p>
  </div>
  <div class="rule"></div>
  <footer>${logoWhite(Math.round(hSize * 0.8))}<span class="fr fm">Powered by Enso Labs</span></footer>
</body></html>`;

const quoteCard = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1080px; height:1080px; background:#F7F1E6; color:#1E1813; font-family:'Inter Tight',sans-serif; padding:96px 84px; display:flex; flex-direction:column; justify-content:space-between; }
  .fd { font-family:'Lora',Georgia,serif; } .fm { font-family:'JetBrains Mono',monospace; }
  .kick { font-size:26px; text-transform:uppercase; letter-spacing:0.2em; color:#F0512E; font-weight:700; }
  .q { font-size:70px; line-height:1.18; letter-spacing:-0.01em; color:#16110B; font-weight:500; }
  .q b { color:#F0512E; font-weight:500; }
  .by { font-size:30px; color:#79705F; }
  footer { display:flex; align-items:center; justify-content:space-between; border-top:2px solid #DDD2BC; padding-top:34px; }
  .mark { font-family:'Lora',Georgia,serif; font-size:34px; color:#16110B; } .mark .a { color:#F0512E; }
  .fr { font-size:22px; text-transform:uppercase; letter-spacing:0.16em; color:#79705F; }
</style></head><body>
  <p class="kick fm">The Forward Deployed Strategist</p>
  <p class="q fd">It just wasn't called forward deployment. It was called account planning, digital, CX, and <b>data strategy.</b></p>
  <p class="by">— Sav Banerjee, Enso Labs</p>
  <footer>${logoInk(52)}<span class="fr fm">Powered by Enso Labs</span></footer>
</body></html>`;

(async () => {
  const outDir = path.join(__dirname, '..', 'public', 'images', 'strategy-to-ship', 'forward-deployed-strategist');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const shot = async (html, w, h, file) => {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(outDir, file), type: 'png' });
    console.log('->', file);
  };
  await shot(shareCard(1200, 627, 68), 1200, 627, 'linkedin-share.png');
  await shot(shareCard(1600, 900, 92), 1600, 900, 'x-card.png');
  await shot(quoteCard, 1080, 1080, 'pull-quote-square.png');
  await browser.close();
})();
