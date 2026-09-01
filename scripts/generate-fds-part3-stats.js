/* Forward Deployed Strategist — Part 3 stat block
 * Four-stat strip: 3 labs · Aug 24 GA · MCP · 0 benchmark-season decisions
 * Output: public/images/insights/fds-part3-stats.png (1200×380)
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FONTS = `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 380;

const STATS = [
  ['3', 'Labs. Three theories of production.'],
  ['Aug 24', 'Anthropic enterprise managed authorization: GA'],
  ['MCP', 'De facto agent plumbing layer, industry-wide'],
  ['0', 'Of these decisions belong to benchmark season'],
];

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#0D1321;color:#fff;
       font-family:'Inter Tight',sans-serif;position:relative;overflow:hidden}
  .tag{position:absolute;top:32px;left:56px;font-family:'JetBrains Mono',monospace;
       font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#5CE0D2}
  .row{position:absolute;top:100px;left:0;right:0;bottom:0;
       display:flex;align-items:stretch}
  .stat{flex:1;padding:0 40px;display:flex;flex-direction:column;justify-content:center;
        position:relative}
  .stat:not(:first-child)::before{
    content:'';position:absolute;left:0;top:20px;bottom:60px;width:1px;background:#5CE0D2;
    opacity:0.35;
  }
  .val{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:88px;line-height:1;
       color:#F0512E;letter-spacing:-0.02em;white-space:nowrap}
  .stat:nth-child(2) .val{font-size:60px}
  .lbl{margin-top:18px;font-size:17px;line-height:1.35;color:#8BAFC7;max-width:250px}
</style></head><body>
  <div class="tag">The Forward Deployed Strategist &middot; Part 3</div>
  <div class="row">
    ${STATS.map(
      (s) => `<div class="stat"><div class="val">${s[0]}</div><div class="lbl">${s[1]}</div></div>`
    ).join('')}
  </div>
</body></html>`;

(async () => {
  const outDir = path.join(__dirname, '..', 'public', 'images', 'insights');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  const outPath = path.join(outDir, 'fds-part3-stats.png');
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();

  console.log('stats block ->', outPath);
})();
