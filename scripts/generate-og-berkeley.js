const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        background: linear-gradient(135deg, #1a2332 0%, #1e2d3f 50%, #1a2332 100%);
        border: 2px solid rgba(255,255,255,0.15);
        font-family: 'Inter Tight', -apple-system, sans-serif;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 56px 76px;
        position: relative; overflow: hidden;
      }
      body::before {
        content: ''; position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(92,224,210,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(92,224,210,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
      }
      body::after {
        content: ''; position: absolute; top: -100px; right: -100px;
        width: 500px; height: 500px; border-radius: 50%;
        background: radial-gradient(circle, rgba(92,224,210,0.06) 0%, transparent 70%);
      }
      .top { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
      .chevron { color: #5ce0d2; font-size: 26px; }
      .wordmark { color: #ffffff; font-size: 18px; font-weight: 600; letter-spacing: 2px; }
      .divider { width: 1px; height: 26px; background: rgba(255,255,255,0.3); }
      .kicker { font-family: 'JetBrains Mono', monospace; color: #5ce0d2; font-size: 15px;
        letter-spacing: 0.14em; text-transform: uppercase; margin-left: auto; }
      .middle { position: relative; z-index: 1; }
      .headline { font-size: 56px; font-weight: 700; color: #ffffff; line-height: 1.08; letter-spacing: -1.2px; max-width: 920px; }
      .headline .coral { color: #f0512e; }
      .subtitle { font-size: 20px; color: rgba(255,255,255,0.55); margin-top: 22px; letter-spacing: 0.2px; max-width: 880px; }
      .bottom { display: flex; align-items: center; justify-content: space-between;
        border-top: 1px solid rgba(92,224,210,0.15); padding-top: 20px;
        position: relative; z-index: 1; }
      .url { color: #5ce0d2; font-size: 16px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
      .stat { color: rgba(255,255,255,0.5); font-size: 14px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.06em; }
      .stat b { color: #5ce0d2; }
    </style>
  </head>
  <body>
    <div class="top">
      <span class="chevron">▼</span>
      <div class="divider"></div>
      <span class="wordmark">STRATEGY TO SHIP</span>
      <span class="kicker">Berkeley Agentic AI Summit 2026</span>
    </div>

    <div class="middle">
      <div class="headline">Berkeley is solving the supply side.<br>The demand side is where <span class="coral">projects succeed or fail.</span></div>
      <div class="subtitle">Four stages, two days, zero sessions on the customer — and the buyer data says that's exactly where agentic projects fail.</div>
    </div>

    <div class="bottom">
      <span class="url">ensolabs.ai/insights</span>
      <span class="stat"><b>40%+</b> of agentic AI projects cancelled by 2027 &nbsp;·&nbsp; <b>45%</b> of martech AI agents fail to perform</span>
    </div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og', 'og-berkeley-agentic-summit-demand-side-gap.png'), type: 'png' });
  await browser.close();
  console.log('OG image generated: public/og/og-berkeley-agentic-summit-demand-side-gap.png');
})();
