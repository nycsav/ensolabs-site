const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Generates 3 images for the agency-gap article:
// 1. hero.png       — full-width editorial header (1200×560)
// 2. stat-gap.png   — 81% vs 45% gap bar chart (880×400)
// 3. stat-budget.png — budget reallocation bars (880×400)
// Strategy → Ship Warm Signal palette throughout

const outDir = path.join(__dirname, '..', 'public', 'images', 'insights');
fs.mkdirSync(outDir, { recursive: true });

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">`;

const BASE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #F7F1E6;
    font-family: 'Inter Tight', sans-serif;
    position: relative; overflow: hidden;
  }
  body::before {
    content: ''; position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      transparent, transparent 39px, rgba(30,24,19,0.05) 39px, rgba(30,24,19,0.05) 40px
    );
    pointer-events: none;
  }
`;

async function generate(browser, html, viewport, filename) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outPath = path.join(outDir, filename);
  await page.screenshot({ path: outPath, type: 'png' });
  await page.close();
  console.log('Generated:', filename);
  return outPath;
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  // ── 1. HERO ──────────────────────────────────────────────────────────────
  const heroHtml = `<!DOCTYPE html><html><head>${FONTS}<style>
    ${BASE_CSS}
    body { width: 1200px; height: 560px; display: flex; flex-direction: column; justify-content: space-between; padding: 52px 80px 44px; }
    .kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
      color: #F0512E; position: relative; z-index: 1;
    }
    .middle { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 24px; }
    .headline {
      font-family: 'Lora', serif;
      font-size: 58px; font-weight: 700; line-height: 1.08;
      color: #1E1813; letter-spacing: -0.025em; max-width: 780px;
    }
    .headline .coral { color: #F0512E; }
    .dek {
      font-family: 'Inter Tight', sans-serif;
      font-size: 18px; line-height: 1.55; color: rgba(30,24,19,0.6);
      max-width: 660px;
    }
    .bottom {
      display: flex; align-items: center; justify-content: space-between;
      position: relative; z-index: 1;
      border-top: 1px solid rgba(30,24,19,0.12); padding-top: 18px;
    }
    .lockup { font-family: 'Lora', serif; font-size: 14px; font-weight: 700; color: #1E1813; }
    .lockup .arrow { color: #F0512E; }
    .source { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: rgba(30,24,19,0.4); }
  </style></head><body>
    <div class="kicker">Strategy &#8594; Ship &nbsp;·&nbsp; Intelligence Report &nbsp;·&nbsp; Sep 8, 2026</div>
    <div class="middle">
      <div class="headline">Every ad channel has AI now.<br><span class="coral">Almost none of them</span><br>talk to each other.</div>
      <div class="dek">Google and BCG surveyed 387 marketers. 81% want one integrated AI partner. 45% have one. The gap is structural — and it's where the next budget dollar goes.</div>
    </div>
    <div class="bottom">
      <div class="lockup">Strategy <span class="arrow">&#8594;</span> Ship &nbsp;·&nbsp; FROM ENSO LABS</div>
      <div class="source">Google / BCG · N=387 · Jan. 2026</div>
    </div>
  </body></html>`;

  await generate(browser, heroHtml, { width: 1200, height: 560 }, 'agency-gap-hero.png');

  // ── 2. STAT: THE GAP (81% vs 45%) ────────────────────────────────────────
  const gapHtml = `<!DOCTYPE html><html><head>${FONTS}<style>
    ${BASE_CSS}
    body { width: 880px; height: 380px; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 56px 32px; }
    .label-row { display: flex; justify-content: space-between; align-items: baseline; position: relative; z-index: 1; }
    .chart-title {
      font-family: 'Lora', serif; font-size: 20px; font-weight: 700; color: #1E1813;
    }
    .source-tag {
      font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em;
      color: rgba(30,24,19,0.4); text-transform: uppercase;
    }
    .bars { display: flex; flex-direction: column; gap: 20px; position: relative; z-index: 1; flex: 1; justify-content: center; }
    .bar-row { display: flex; align-items: center; gap: 16px; }
    .bar-label {
      font-family: 'Inter Tight', sans-serif; font-size: 13px; font-weight: 500;
      color: rgba(30,24,19,0.65); width: 220px; flex-shrink: 0; text-align: right;
    }
    .bar-track { flex: 1; height: 40px; background: rgba(30,24,19,0.07); border-radius: 4px; position: relative; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; padding-left: 14px; }
    .bar-fill.want { background: #1E1813; width: 81%; }
    .bar-fill.have { background: #F0512E; width: 45%; }
    .bar-pct {
      font-family: 'Lora', serif; font-size: 20px; font-weight: 700; color: #F7F1E6;
    }
    .gap-callout {
      position: relative; z-index: 1;
      display: flex; align-items: center; gap: 12px;
      padding: 10px 0 0;
    }
    .gap-line { flex: 1; height: 1px; background: rgba(30,24,19,0.15); }
    .gap-text {
      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;
      letter-spacing: 0.1em; color: #F0512E; text-transform: uppercase;
      white-space: nowrap;
    }
  </style></head><body>
    <div class="label-row">
      <div class="chart-title">The integration gap — 387 marketers surveyed</div>
      <div class="source-tag">Google / BCG · Jan 2026</div>
    </div>
    <div class="bars">
      <div class="bar-row">
        <div class="bar-label">Want one integrated AI partner</div>
        <div class="bar-track"><div class="bar-fill want"><span class="bar-pct">81%</span></div></div>
      </div>
      <div class="bar-row">
        <div class="bar-label">Currently have one</div>
        <div class="bar-track"><div class="bar-fill have"><span class="bar-pct">45%</span></div></div>
      </div>
    </div>
    <div class="gap-callout">
      <div class="gap-line"></div>
      <div class="gap-text">36-point gap · structural, not technical</div>
      <div class="gap-line"></div>
    </div>
  </body></html>`;

  await generate(browser, gapHtml, { width: 880, height: 380 }, 'agency-gap-stat-gap.png');

  // ── 3. STAT: BUDGET REALLOCATION ─────────────────────────────────────────
  const budgetHtml = `<!DOCTYPE html><html><head>${FONTS}<style>
    ${BASE_CSS}
    body { width: 880px; height: 380px; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 56px 36px; }
    .label-row { display: flex; justify-content: space-between; align-items: baseline; position: relative; z-index: 1; }
    .chart-title { font-family: 'Lora', serif; font-size: 20px; font-weight: 700; color: #1E1813; }
    .source-tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: rgba(30,24,19,0.4); text-transform: uppercase; }
    .stats-row { display: flex; gap: 0; position: relative; z-index: 1; flex: 1; align-items: center; justify-content: space-around; }
    .stat-block { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; }
    .stat-num { font-family: 'Lora', serif; font-size: 64px; font-weight: 700; line-height: 1; color: #1E1813; }
    .stat-num.coral { color: #F0512E; }
    .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(30,24,19,0.5); text-align: center; max-width: 180px; }
    .divider { width: 1px; height: 80px; background: rgba(30,24,19,0.12); }
    .footer-note {
      position: relative; z-index: 1;
      font-family: 'Inter Tight', sans-serif; font-size: 13px; line-height: 1.5;
      color: rgba(30,24,19,0.55); border-top: 1px solid rgba(30,24,19,0.1); padding-top: 14px;
    }
    .footer-note strong { color: #F0512E; font-weight: 600; }
  </style></head><body>
    <div class="label-row">
      <div class="chart-title">Where AI innovation budget comes from</div>
      <div class="source-tag">Google / BCG · Jan 2026</div>
    </div>
    <div class="stats-row">
      <div class="stat-block">
        <div class="stat-num coral">45%</div>
        <div class="stat-label">reallocating from paid media</div>
      </div>
      <div class="divider"></div>
      <div class="stat-block">
        <div class="stat-num">35%</div>
        <div class="stat-label">from brand marketing budgets</div>
      </div>
      <div class="divider"></div>
      <div class="stat-block">
        <div class="stat-num">21%</div>
        <div class="stat-label">using entirely new budget</div>
      </div>
    </div>
    <div class="footer-note">The buyer is moving money, not adding it. <strong>97%</strong> say they'd increase spend with a partner who can show where the reallocated dollar went and what it returned.</div>
  </body></html>`;

  await generate(browser, budgetHtml, { width: 880, height: 380 }, 'agency-gap-stat-budget.png');

  await browser.close();
  console.log('All images generated in public/images/insights/');
})();
