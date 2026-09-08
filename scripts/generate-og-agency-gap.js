const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// OG for: agency-orchestration-gap-36-points
// Style: Strategy → Ship typographic card (Warm Signal palette)
// 1200×630, Paper background, Ink typography, Ship Coral accent

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const html = `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px; height: 630px;
      background: #F7F1E6;
      font-family: 'Inter Tight', sans-serif;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 56px 72px 48px;
      position: relative; overflow: hidden;
    }
    /* Subtle ruled line texture */
    body::before {
      content: ''; position: absolute; inset: 0;
      background-image: repeating-linear-gradient(
        transparent, transparent 39px, rgba(30,24,19,0.06) 39px, rgba(30,24,19,0.06) 40px
      );
    }
    .top {
      display: flex; align-items: center; gap: 16px;
      position: relative; z-index: 1;
    }
    .kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: #F0512E; /* Ship Coral */
    }
    .dot { color: rgba(30,24,19,0.3); font-size: 13px; }
    .date-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px; letter-spacing: 0.1em;
      color: rgba(30,24,19,0.5);
    }
    .middle {
      position: relative; z-index: 1;
      flex: 1; display: flex; flex-direction: column;
      justify-content: center; padding: 24px 0 8px;
    }
    .stat-row {
      display: flex; gap: 40px; margin-bottom: 28px;
    }
    .stat-block { display: flex; flex-direction: column; gap: 4px; }
    .stat-num {
      font-family: 'Lora', serif;
      font-size: 64px; font-weight: 700; line-height: 1;
      color: #1E1813;
    }
    .stat-num .coral { color: #F0512E; }
    .stat-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(30,24,19,0.5);
    }
    .arrow-gap {
      display: flex; align-items: center; padding-top: 18px;
    }
    .arrow-line {
      width: 48px; height: 2px; background: #F0512E;
    }
    .arrow-head {
      width: 0; height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 10px solid #F0512E;
    }
    .gap-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
      color: #F0512E; margin-left: 12px;
    }
    .headline {
      font-family: 'Lora', serif;
      font-size: 44px; font-weight: 700; line-height: 1.12;
      color: #1E1813; max-width: 760px;
      letter-spacing: -0.02em;
    }
    .dek {
      font-family: 'Inter Tight', sans-serif;
      font-size: 17px; line-height: 1.5;
      color: rgba(30,24,19,0.65); margin-top: 16px;
      max-width: 680px;
    }
    .bottom {
      display: flex; align-items: center;
      justify-content: space-between;
      position: relative; z-index: 1;
      border-top: 1px solid rgba(30,24,19,0.15);
      padding-top: 20px;
    }
    .lockup {
      display: flex; align-items: center; gap: 10px;
    }
    .s2s-wordmark {
      font-family: 'Lora', serif;
      font-size: 15px; font-weight: 700;
      color: #1E1813; letter-spacing: -0.01em;
    }
    .s2s-arrow { color: #F0512E; }
    .from-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(30,24,19,0.45);
    }
    .source-cite {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 0.08em;
      color: rgba(30,24,19,0.4);
    }
  </style>
</head>
<body>
  <div class="top">
    <span class="kicker">Strategy &#8594; Ship</span>
    <span class="dot">·</span>
    <span class="date-label">Sep 8, 2026</span>
  </div>

  <div class="middle">
    <div class="stat-row">
      <div class="stat-block">
        <div class="stat-num">81%</div>
        <div class="stat-label">want integrated AI partner</div>
      </div>
      <div class="arrow-gap">
        <div class="arrow-line"></div>
        <div class="arrow-head"></div>
        <span class="gap-label">36-PT GAP</span>
      </div>
      <div class="stat-block">
        <div class="stat-num"><span class="coral">45%</span></div>
        <div class="stat-label">have one</div>
      </div>
    </div>
    <div class="headline">The 36-Point Gap in Advertising<br>Is a Workflow Problem</div>
    <div class="dek">Google/BCG surveyed 387 marketers. The gap is structural, not technical — and it's where the next budget dollar goes.</div>
  </div>

  <div class="bottom">
    <div class="lockup">
      <span class="s2s-wordmark">Strategy <span class="s2s-arrow">&#8594;</span> Ship</span>
      <span class="from-label">· FROM ENSO LABS</span>
    </div>
    <span class="source-cite">Google/BCG · N=387 · Jan. 2026</span>
  </div>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outDir = path.join(__dirname, '..', 'public', 'og');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'og-agency-orchestration-gap-36-points.png');

  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();
  console.log('OG generated:', outPath);
})();
