/* Forward Deployed Strategist — Part 3 routing table
 * Three-row lab routing card: Anthropic / OpenAI / Perplexity
 * Output: public/images/insights/fds-part3-routing.png (1200×440)
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FONTS = `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 440;

const ROWS = [
  ['#5CE0D2', 'Anthropic', 'Regulated workflow · governance-first · MCP tooling', 'Permission boundary · audit log · human approval gate'],
  ['#F0512E', 'OpenAI', 'Reasoning speed · coding velocity · broad enterprise', 'GPT-5 synthesis · Codex build depth · ChatGPT Enterprise embed'],
  ['#E0A23C', 'Perplexity', 'Real-time intelligence · grounded retrieval · live data', 'Current, cited signals · research-to-action · 200+ source coverage'],
];

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#0D1321;color:#fff;
       font-family:'Inter Tight',sans-serif;padding:44px 56px}
  .head{display:grid;grid-template-columns:260px 1fr 320px;gap:0 28px;
        padding:0 24px 14px;border-bottom:1px solid rgba(139,175,199,0.25)}
  .head span{font-family:'JetBrains Mono',monospace;font-size:11px;
        text-transform:uppercase;letter-spacing:0.16em;color:#8BAFC7}
  .rows{margin-top:6px}
  .row{display:grid;grid-template-columns:260px 1fr 320px;gap:0 28px;
       align-items:center;padding:22px 24px;position:relative;
       border-bottom:1px solid rgba(139,175,199,0.12)}
  .row:last-child{border-bottom:none}
  .row::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:6px}
  .lab{font-family:'Inter Tight',sans-serif;font-weight:700;font-size:24px;color:#fff}
  .use{font-size:16px;line-height:1.4;color:#C7DCE6}
  .get{font-size:14px;line-height:1.45;color:#8BAFC7}
  footer{margin-top:24px;text-align:center}
  footer span{font-family:'JetBrains Mono',monospace;font-size:11px;
        text-transform:uppercase;letter-spacing:0.16em;color:#5CE0D2}
</style></head><body>
  <div class="head">
    <span>Lab</span><span>Use when</span><span>What you get</span>
  </div>
  <div class="rows">
    ${ROWS.map(
      (r) => `<div class="row" style="border-color:${r[0]}"><div style="position:absolute;left:0;top:8px;bottom:8px;width:6px;background:${r[0]}"></div>
        <div class="lab">${r[1]}</div><div class="use">${r[2]}</div><div class="get">${r[3]}</div></div>`
    ).join('')}
  </div>
  <footer><span>Enso Labs &middot; Perplexity Implementation Partner &middot; Claude-Native Studio</span></footer>
</body></html>`;

(async () => {
  const outDir = path.join(__dirname, '..', 'public', 'images', 'insights');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  const outPath = path.join(outDir, 'fds-part3-routing.png');
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();

  console.log('routing table ->', outPath);
})();
