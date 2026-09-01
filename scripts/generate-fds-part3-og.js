/* Forward Deployed Strategist — Part 3 OG image (visual refresh)
 * Two-panel: headline left, three stacked lab cards right.
 * Output: public/og/og-frontier-labs-fde-platform-theory.png (1200×630)
 * Overwrites the existing per-slug OG.
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 630;

const CARDS = [
  ['#5CE0D2', 'ANTHROPIC', 'Governance Lab', '#F0512E', 'MCP · Managed Auth · Operator Layer'],
  ['#F0512E', 'OPENAI', 'Full-Stack Operator', '#E0A23C', 'GPT-5 · Codex · Direct Embed'],
  ['#E0A23C', 'PERPLEXITY', 'Research/Action', '#5CE0D2', 'Computer · Grounded · Real-Time'],
];

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#0D1321;color:#fff;
       font-family:'Inter Tight',sans-serif;display:flex;overflow:hidden}
  .left{width:700px;padding:48px 52px;display:flex;flex-direction:column;
        justify-content:space-between}
  .tag{font-family:'JetBrains Mono',monospace;font-size:12px;
       text-transform:uppercase;letter-spacing:0.18em;color:#F0512E}
  h1{font-family:'Lora',Georgia,serif;font-weight:500;font-size:52px;line-height:1.1;
     color:#fff;margin-top:22px}
  .sub{margin-top:20px;font-size:20px;line-height:1.4;color:#8BAFC7;max-width:560px}
  .brand{font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:0.05em}
  .brand .arrow{color:#F0512E}
  .right{width:500px;display:flex;flex-direction:column;gap:1px;
         padding:24px 24px 24px 0}
  .card{flex:1;background:#141B2E;border-left:6px solid;
        padding:0 28px;display:flex;flex-direction:column;justify-content:center}
  .card .name{font-weight:700;font-size:26px;color:#fff}
  .card .kind{margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:12px;
        text-transform:uppercase;letter-spacing:0.12em;font-weight:600}
  .card .items{margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:13px;
        color:#8BAFC7}
</style></head><body>
  <div class="left">
    <div>
      <div class="tag">The Forward Deployed Strategist &middot; Part 3</div>
      <h1>The Labs Behind<br>the Frontier</h1>
      <div class="sub">Anthropic. OpenAI. Perplexity.<br>They are not interchangeable.</div>
    </div>
    <div class="brand">STRATEGY <span class="arrow">&rarr;</span> SHIP</div>
  </div>
  <div class="right">
    ${CARDS.map(
      (c) => `<div class="card" style="border-color:${c[0]}">
        <div class="name">${c[1]}</div>
        <div class="kind" style="color:${c[3]}">${c[2]}</div>
        <div class="items">${c[4]}</div>
      </div>`
    ).join('')}
  </div>
</body></html>`;

(async () => {
  const outDir = path.join(__dirname, '..', 'public', 'og');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const outPath = path.join(outDir, 'og-frontier-labs-fde-platform-theory.png');
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();

  console.log('OG image ->', outPath);
})();
