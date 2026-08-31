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
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        display: flex;
        font-family: 'Inter Tight', -apple-system, sans-serif;
        position: relative;
        overflow: hidden;
      }
      .left {
        width: 600px; height: 630px;
        background: #F7F1E6;
        padding: 56px 60px;
        display: flex; flex-direction: column; justify-content: space-between;
        position: relative;
      }
      .right {
        width: 600px; height: 630px;
        background: #0D1117;
        padding: 56px 60px;
        display: flex; flex-direction: column; justify-content: space-between;
        position: relative;
      }
      .divider {
        position: absolute; left: 600px; top: 0; bottom: 0;
        width: 3px; background: #F0512E; z-index: 2;
      }
      .kicker {
        font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
        letter-spacing: 0.18em; text-transform: uppercase; color: #F0512E;
      }
      .headline {
        font-family: 'Lora', serif; font-size: 50px; font-weight: 600; color: #1E1813;
        line-height: 1.12; margin-top: 26px;
      }
      .headline em { font-style: italic; }
      .sub {
        font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #79705F;
        margin-top: 20px; letter-spacing: 0.02em;
      }
      .left-footer {
        font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 600; color: #F0512E;
      }
      .plates {
        display: flex; flex-direction: column; gap: 22px; margin-top: 20px;
      }
      .plate {
        display: flex; align-items: center; gap: 14px;
        font-family: 'JetBrains Mono', monospace; font-size: 20px; color: #ffffff;
      }
      .dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
      .code-line {
        font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #6B7280;
        margin-top: 28px;
      }
      .right-footer {
        display: flex; align-items: center; justify-content: flex-end;
        font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #4B5563;
      }
      .right-footer .arrow { color: #F0512E; }
    </style>
  </head>
  <body>
    <div class="left">
      <div>
        <div class="kicker">Part 4 · The Forward Deployed Strategist</div>
        <div class="headline">The Code<br>Behind Forward<br><em>Deployment.</em></div>
        <div class="sub">Motion · OpenAI · Anthropic · Perplexity</div>
      </div>
      <div class="left-footer">ensolabs.ai/insights</div>
    </div>
    <div class="right">
      <div class="plates">
        <div class="plate"><span class="dot" style="background:#A855F7;"></span>motion</div>
        <div class="plate"><span class="dot" style="background:#10B981;"></span>openai</div>
        <div class="plate"><span class="dot" style="background:#F0512E;"></span>anthropic</div>
        <div class="plate"><span class="dot" style="background:#5CE0D2;"></span>perplexity</div>
        <div class="code-line">response = model.deploy(context, tools, auth)</div>
      </div>
      <div class="right-footer">Strategy <span class="arrow">→</span> Ship · Enso Labs</div>
    </div>
    <div class="divider"></div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og', 'og-frontier-deployment-code-models-case-studies.png'), type: 'png' });
  await browser.close();
  console.log('OG image generated: public/og/og-frontier-deployment-code-models-case-studies.png');
})();
