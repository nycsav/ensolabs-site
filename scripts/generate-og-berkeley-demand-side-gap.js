const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 2800, height: 1760, deviceScaleFactor: 1 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 2800px; height: 1760px; background: #F7F1E6; color: #1E1813;
        font-family: 'Inter Tight', sans-serif; position: relative; overflow: hidden; }
      .font-display { font-family: 'Lora', Georgia, serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      header { display: flex; align-items: flex-start; justify-content: space-between; padding: 120px 150px 0; }
      .kicker { font-size: 38px; font-weight: 700; text-transform: uppercase; color: #F0512E; letter-spacing: 0.22em; }
      .credit { font-size: 30px; text-transform: uppercase; color: #79705F; letter-spacing: 0.2em; }
      .headline-row { padding: 86px 150px 0; display: flex; align-items: flex-start; gap: 64px; }
      h1 { max-width: 1560px; font-size: 104px; line-height: 1.06; letter-spacing: -0.015em; color: #16110B; font-weight: 500; }
      h1 em { font-style: italic; color: #1E1813; }
      .agenda { margin-left: auto; width: 560px; flex-shrink: 0; padding: 40px 44px; background: #EEE5D3; border: 2px solid #DDD2BC; }
      .agenda-kicker { font-size: 24px; text-transform: uppercase; color: #79705F; letter-spacing: 0.18em; }
      .agenda-row { margin-top: 28px; }
      .agenda-row + .agenda-row { margin-top: 28px; }
      .agenda-line { display: flex; align-items: baseline; justify-content: space-between; }
      .agenda-label { font-size: 24px; text-transform: uppercase; letter-spacing: 0.16em; }
      .agenda-val { font-size: 40px; }
      .bar { margin-top: 14px; height: 18px; width: 100%; }
      .rule { margin: 96px 150px 0; display: flex; align-items: center; }
      .rule-coral { height: 8px; width: 300px; background: #F0512E; }
      .rule-line { height: 2px; flex: 1; background: #DDD2BC; }
      .stats { padding: 86px 150px 0; display: grid; grid-template-columns: repeat(4, 1fr); flex: 1; }
      .stat { display: flex; flex-direction: column; padding: 0 56px; }
      .stat:first-child { padding-left: 0; }
      .stat:last-child { padding-right: 0; }
      .stat + .stat { border-left: 2px solid #DDD2BC; }
      .stat-fig { font-size: 172px; line-height: 0.92; letter-spacing: -0.03em; color: #16110B; }
      .stat-fig.signal { color: #F0512E; }
      .stat-label { margin-top: 40px; max-width: 520px; font-size: 36px; font-weight: 300; line-height: 1.32; color: #1E1813; }
      .stat-source { margin-top: auto; padding-top: 48px; font-size: 24px; text-transform: uppercase; letter-spacing: 0.16em; color: #79705F; }
      .stat-source.signal { color: #F0512E; }
      footer { margin: 80px 150px 110px; display: flex; align-items: center; justify-content: space-between; padding-top: 42px; border-top: 2px solid #DDD2BC; }
      .foot-line { font-size: 32px; font-weight: 300; color: #79705F; }
      .foot-fig { font-size: 26px; text-transform: uppercase; letter-spacing: 0.2em; color: #79705F; }
    </style>
  </head>
  <body>
    <header>
      <p class="kicker font-mono">The Demand-Side Gap</p>
      <p class="credit font-mono">Strategy to Ship — Enso Labs</p>
    </header>

    <div class="headline-row">
      <h1 class="font-display">Berkeley is solving the supply side.<br><em>The demand side is where projects succeed or fail.</em></h1>
      <div class="agenda">
        <p class="agenda-kicker font-mono">Agentic AI Summit 2026 agenda</p>
        <div class="agenda-row">
          <div class="agenda-line">
            <span class="agenda-label font-mono" style="color:#1E1813">Supply side</span>
            <span class="agenda-val font-display" style="color:#16110B">100%</span>
          </div>
          <div class="bar" style="background:#1E1813"></div>
        </div>
        <div class="agenda-row">
          <div class="agenda-line">
            <span class="agenda-label font-mono" style="color:#79705F">Demand side</span>
            <span class="agenda-val font-display" style="color:#F0512E">0%</span>
          </div>
          <div class="bar" style="border:2px solid #F0512E"></div>
        </div>
      </div>
    </div>

    <div class="rule"><div class="rule-coral"></div><div class="rule-line"></div></div>

    <div class="stats">
      <div class="stat">
        <p class="stat-fig font-display">39%</p>
        <p class="stat-label">of organizations have a customer data platform ready for agentic AI</p>
        <p class="stat-source font-mono">Adobe / Oxford Economics</p>
      </div>
      <div class="stat">
        <p class="stat-fig font-display">45%</p>
        <p class="stat-label">of martech leaders say vendor AI agents fail to meet promised performance</p>
        <p class="stat-source font-mono">Gartner</p>
      </div>
      <div class="stat">
        <p class="stat-fig font-display">84%</p>
        <p class="stat-label">of marketers still run generic, unsegmented campaigns</p>
        <p class="stat-source font-mono">Salesforce</p>
      </div>
      <div class="stat">
        <p class="stat-fig font-display signal">40%+</p>
        <p class="stat-label">of agentic AI projects will be cancelled by 2027</p>
        <p class="stat-source font-mono signal">Gartner</p>
      </div>
    </div>

    <footer>
      <p class="foot-line">The infrastructure is arriving on schedule. The readiness to use it is not.</p>
      <p class="foot-fig font-mono">Fig. 1 — Demand-side readiness</p>
    </footer>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'images', 'insights', 'berkeley-agentic-summit-demand-side-gap.png'), type: 'png' });
  await browser.close();
  console.log('Figure generated: public/images/insights/berkeley-agentic-summit-demand-side-gap.png');
})();
