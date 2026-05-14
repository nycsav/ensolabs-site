const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        background: linear-gradient(135deg, #1a2332 0%, #1e2d3f 50%, #1a2332 100%);
        border: 2px solid rgba(255,255,255,0.15);
        font-family: 'Inter Tight', -apple-system, sans-serif;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 60px 80px;
        position: relative; overflow: hidden;
      }
      /* Subtle grid */
      body::before {
        content: ''; position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(92,224,210,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(92,224,210,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
      }
      /* Teal glow */
      body::after {
        content: ''; position: absolute; top: -100px; right: -100px;
        width: 500px; height: 500px; border-radius: 50%;
        background: radial-gradient(circle, rgba(92,224,210,0.06) 0%, transparent 70%);
      }
      .top { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
      .chevron { color: #5ce0d2; font-size: 28px; }
      .wordmark { color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 2px; }
      .divider { width: 1px; height: 28px; background: rgba(255,255,255,0.3); }
      .middle { position: relative; z-index: 1; }
      .headline { font-size: 88px; font-weight: 700; color: #ffffff; line-height: 0.95; letter-spacing: -2px; }
      .headline em { font-style: italic; color: rgba(255,255,255,0.4); font-weight: 400; }
      .headline .teal { color: #5ce0d2; }
      .subtitle { font-size: 20px; color: rgba(255,255,255,0.5); margin-top: 24px; letter-spacing: 0.5px; }
      .right-panel { position: absolute; right: 80px; top: 180px; z-index: 1; }
      .badge { display: flex; align-items: center; gap: 16px; padding: 12px 20px; margin-bottom: 8px;
        border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; background: rgba(255,255,255,0.03); }
      .badge.active { border-color: rgba(92,224,210,0.3); background: rgba(92,224,210,0.08); }
      .badge-num { font-size: 11px; color: #5ce0d2; font-weight: 500; min-width: 40px; }
      .badge-label { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500; letter-spacing: 1px; min-width: 120px; }
      .badge.active .badge-label { color: #5ce0d2; }
      .metrics { margin-top: 32px; }
      .metric { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
      .metric-num { font-size: 36px; font-weight: 600; color: #5ce0d2; }
      .metric-label { font-size: 13px; color: rgba(255,255,255,0.35); }
      .bottom { display: flex; align-items: center; justify-content: space-between;
        border-top: 1px solid rgba(92,224,210,0.15); padding-top: 20px;
        position: relative; z-index: 1; }
      .url { color: #5ce0d2; font-size: 16px; font-weight: 600; }
      .certs { color: rgba(255,255,255,0.35); font-size: 13px; }
    </style>
  </head>
  <body>
    <div class="top">
      <span class="chevron">▼</span>
      <div class="divider"></div>
      <span class="wordmark">ENSO LABS</span>
    </div>

    <div class="middle">
      <div class="headline">Strategy<br><em>to</em> <span class="teal">Ship.</span></div>
      <div class="subtitle">AI Transformation · Agentic Systems · Financial AI</div>
    </div>

    <div class="right-panel">
      <div class="badge"><span class="badge-num">P / 01</span><span class="badge-label">CONSULT</span></div>
      <div class="badge active"><span class="badge-num">P / 02</span><span class="badge-label">BUILD</span></div>
      <div class="badge"><span class="badge-num">P / 03</span><span class="badge-label">SHIP</span></div>
      <div class="metrics">
        <div class="metric"><span class="metric-num">75%</span><span class="metric-label">pilot-to-production</span></div>
        <div class="metric"><span class="metric-num">3mo</span><span class="metric-label">time-to-first-value</span></div>
      </div>
    </div>

    <div class="bottom">
      <span class="url">ensolabs.ai</span>
      <span class="certs">NYC · Anthropic · Google · OpenAI · Perplexity Fellow</span>
    </div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og-default.png'), type: 'png' });
  await browser.close();
  console.log('OG image generated: public/og-default.png');
})();
