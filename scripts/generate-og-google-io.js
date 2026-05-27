// Generates Option C "Enso Labs Report" OG covers for the Google I/O 2026 series.
// Run from project root: node scripts/generate-og-google-io.js
// Output: public/og/og-google-io-hackathon-managed-agents-omni-antigravity.png
//         public/og/og-google-io-after-hours-deepmind-strategy-signal.png

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'og');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function buildHtml({ classification, title, pillar, readMin }) {
  return `<!DOCTYPE html><html><head>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:1200px;height:630px;overflow:hidden}
    body{font-family:'Inter Tight',-apple-system,sans-serif;display:flex;background:#ffffff;position:relative}
    .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(92,224,210,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(92,224,210,0.10) 1px,transparent 1px);background-size:48px 48px}
    .left{flex:1;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;z-index:1}
    .right{width:280px;background:#0a1a2a;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:64px 32px;position:relative;z-index:1}
    .mark{display:flex;align-items:center;gap:14px}
    .chev{font-size:34px;color:#5ce0d2;font-weight:900;line-height:1}
    .word{font-size:20px;font-weight:700;letter-spacing:3px;color:#0a1a2a}
    .bar{height:1.5px;width:120px;background:#5ce0d2;margin:22px 0 16px}
    .class{font-size:15px;font-weight:700;letter-spacing:2.4px;color:#3a4a5a;font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;line-height:1.8}
    .title{font-size:62px;font-weight:700;color:#0a1a2a;line-height:1.04;letter-spacing:-1.5px;max-width:99%}
    .meta{font-size:15px;color:#3a4a5a;font-weight:600;letter-spacing:1.8px;font-family:'JetBrains Mono',ui-monospace,Menlo,monospace}
    .stack{display:flex;flex-direction:column;align-items:center;gap:20px}
    .gio{display:inline-flex;align-items:center;gap:8px;font-family:'Inter Tight',sans-serif;font-weight:700;color:#ffffff;letter-spacing:-1px;line-height:1;font-size:54px}
    .gio .g{display:inline-block;letter-spacing:-2px}
    .gio .i{display:inline-block;width:7px;height:1em;background:#ffffff;border-radius:2px}
    .gio .slash{display:inline-block;width:0.42em;height:1em;background:#4285F4;border-radius:3px;transform:skewX(-15deg)}
    .gio .o{display:inline-block;width:1em;height:1em;border-radius:50%;background:conic-gradient(from 0deg,#EA4335 0deg 90deg,#FBBC04 90deg 180deg,#34A853 180deg 270deg,#4285F4 270deg 360deg)}
    .stamp{font-size:14px;letter-spacing:2.6px;color:#5ce0d2;font-weight:700;text-align:center;line-height:1.6}
    .rfoot{font-size:13px;color:#9ca3af;letter-spacing:1.8px;font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;text-align:center;font-weight:500;line-height:1.7}
  </style></head><body>
    <div class="grid"></div>
    <div class="left">
      <div>
        <div class="mark"><span class="chev">▼</span><span class="word">ENSO LABS</span></div>
        <div class="bar"></div>
        <div class="class">${classification}</div>
      </div>
      <div class="title">${title}</div>
      <div class="meta">ensolabs.ai &nbsp;·&nbsp; ${readMin} MIN READ &nbsp;·&nbsp; PILLAR: ${pillar}</div>
    </div>
    <div class="right">
      <div class="stack">
        <div class="gio"><span class="g">G</span>&nbsp;<span class="i"></span><span class="slash"></span><span class="o"></span></div>
        <div class="stamp">OFFICIAL<br>PARTNER<br>ATTENDEE</div>
      </div>
      <div class="rfoot">SAN<br>FRANCISCO<br>MAY 2026</div>
    </div>
  </body></html>`;
}

const articles = [
  {
    slug: 'google-io-hackathon-managed-agents-omni-antigravity',
    classification: 'REPORT &middot; PART 1 OF 2<br>GOOGLE I/O 2026 SERIES &middot; MAY 26 2026',
    title: 'Inside the Google I/O Hackathon: 150 builders, Managed Agents, and the new Google agent stack.',
    pillar: 'BUILD',
    readMin: 8,
  },
  {
    slug: 'google-io-after-hours-deepmind-strategy-signal',
    classification: 'REPORT &middot; PART 2 OF 2<br>GOOGLE I/O 2026 SERIES &middot; MAY 26 2026',
    title: 'Google I/O After-Hours: two nights with Google DeepMind and the strategic signal behind the demos.',
    pillar: 'CONSULT',
    readMin: 7,
  },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const art of articles) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.setContent(buildHtml(art), { waitUntil: 'networkidle0' });
    const outPath = path.join(OUT_DIR, `og-${art.slug}.png`);
    await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log('Wrote', outPath);
    await page.close();
  }
  await browser.close();
})();
