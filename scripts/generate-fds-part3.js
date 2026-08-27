/* Forward Deployed Strategist — Part 3 OG image
 * "The Labs Behind the Frontier" — Anthropic / OpenAI / Perplexity
 * Output: public/og/og-frontier-labs-fde-platform-theory.png (1200×630)
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;

const ogHtml = `
<!DOCTYPE html><html><head>
<link href="${FONTS}" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px;
    background:#F7F1E6;
    color:#1E1813;
    font-family:'Inter Tight',sans-serif;
    position:relative; overflow:hidden;
  }
  /* Subtle texture grain */
  body::before {
    content:''; position:absolute; inset:0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 40px,
      rgba(30,24,19,0.018) 40px, rgba(30,24,19,0.018) 41px
    );
  }
  /* Header bar */
  .header {
    position:absolute; top:0; left:0; right:0;
    padding:36px 56px 0;
    display:flex; align-items:center; justify-content:space-between;
  }
  .series-tag {
    font-family:'JetBrains Mono',monospace;
    font-size:13px; font-weight:500;
    text-transform:uppercase; letter-spacing:0.18em;
    color:#F0512E;
  }
  .credit {
    font-family:'JetBrains Mono',monospace;
    font-size:12px; text-transform:uppercase; letter-spacing:0.18em;
    color:#79705F;
  }
  /* Main headline */
  .headline {
    position:absolute; top:100px; left:56px; right:460px;
  }
  .headline h1 {
    font-family:'Lora',Georgia,serif;
    font-size:54px; font-weight:500; line-height:1.1;
    color:#1E1813; letter-spacing:-0.01em;
  }
  .headline h1 em {
    font-style:italic; color:#F0512E;
  }
  .sub {
    margin-top:20px;
    font-size:16px; font-weight:400; color:#79705F;
    line-height:1.5; max-width:580px;
  }
  /* Three labs panel */
  .labs {
    position:absolute; right:48px; top:72px; bottom:80px;
    width:372px;
    display:flex; flex-direction:column; gap:14px;
    justify-content:center;
  }
  .lab {
    padding:20px 24px;
    border:1.5px solid rgba(30,24,19,0.12);
    background:#F3ECDD;
    position:relative;
  }
  .lab.highlight {
    border-color:#F0512E;
    background:#FBF6EC;
  }
  .lab-name {
    font-family:'JetBrains Mono',monospace;
    font-size:12px; text-transform:uppercase; letter-spacing:0.16em;
    color:#79705F; font-weight:500;
  }
  .lab.highlight .lab-name { color:#F0512E; }
  .lab-theory {
    margin-top:6px;
    font-size:18px; font-weight:600; color:#1E1813; line-height:1.2;
  }
  .lab-desc {
    margin-top:4px;
    font-size:13px; color:#79705F; line-height:1.4;
  }
  .lab-dot {
    position:absolute; right:18px; top:20px;
    width:8px; height:8px; border-radius:50%;
    background:#DDD2BC;
  }
  .lab.highlight .lab-dot { background:#F0512E; }
  /* Footer */
  .footer {
    position:absolute; bottom:0; left:0; right:0;
    padding:0 56px 32px;
    display:flex; align-items:center; justify-content:space-between;
    border-top:1.5px solid #DDD2BC;
    padding-top:20px;
  }
  .footer-url {
    font-family:'JetBrains Mono',monospace;
    font-size:13px; color:#F0512E; letter-spacing:0.05em;
  }
  .footer-series {
    font-family:'JetBrains Mono',monospace;
    font-size:12px; text-transform:uppercase; letter-spacing:0.16em; color:#79705F;
  }
  /* Divider line between headline and footer */
  .divider-line {
    position:absolute; left:56px; right:460px; bottom:88px;
    height:1.5px; background:#DDD2BC;
  }
</style>
</head>
<body>
  <div class="header">
    <span class="series-tag">Part 3 · The Forward Deployed Strategist</span>
    <span class="credit">Strategy → Ship · Enso Labs</span>
  </div>

  <div class="headline">
    <h1>The Labs Behind<br>the <em>Frontier.</em></h1>
    <p class="sub">Anthropic, OpenAI, and Perplexity each have a distinct theory of production deployment. Treating them as interchangeable is an architecture mistake.</p>
  </div>

  <div class="divider-line"></div>

  <div class="labs">
    <div class="lab highlight">
      <div class="lab-dot"></div>
      <div class="lab-name">Anthropic</div>
      <div class="lab-theory">The Governance Lab</div>
      <div class="lab-desc">MCP · Enterprise Managed Auth · Operator Layer</div>
    </div>
    <div class="lab">
      <div class="lab-dot"></div>
      <div class="lab-name">OpenAI</div>
      <div class="lab-theory">The Full-Stack Operator</div>
      <div class="lab-desc">GPT-5 · Codex · Forward-deployed relationships</div>
    </div>
    <div class="lab">
      <div class="lab-dot"></div>
      <div class="lab-name">Perplexity</div>
      <div class="lab-theory">Research/Action Interface</div>
      <div class="lab-desc">Real-time grounded intelligence · Implementation Partners</div>
    </div>
  </div>

  <div class="footer">
    <span class="footer-url">ensolabs.ai/insights</span>
    <span class="footer-series">Forward Deployed Strategist Series · Part 3 of 4</span>
  </div>
</body></html>
`;

(async () => {
  const outDir = path.join(__dirname, '..', 'public', 'og');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(ogHtml, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500)); // let fonts load

  const outPath = path.join(outDir, 'og-frontier-labs-fde-platform-theory.png');
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();

  console.log('✅ OG image written to', outPath);
})();
