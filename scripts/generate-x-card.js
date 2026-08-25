/* X card — 1600×900, dark Warm Signal ground, the crossing in ring geometry.
 * Rides on the first tweet of the Part 2 thread. */
const puppeteer = require('puppeteer');
const path = require('path');
const { PALETTE, FONTS, ringCluster, gradientField, cornerMarks } = require('./_sts-geo');
const { logoWhite } = require('./_fds-logo');

const W = 1600, H = 900;
const draw = (o) => ringCluster(o).svg.replace(/stroke-dashoffset="[\d.]+"/g, 'stroke-dashoffset="0"');

const html = `<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:${PALETTE.ink};overflow:hidden}
</style></head><body>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  ${gradientField(W, H, 0, true)}
  ${cornerMarks(W, H, { fill: PALETTE.paper })}
  <text x="76" y="106" font-family="'JetBrains Mono',monospace" font-size="24"
    letter-spacing="4" fill="${PALETTE.coral}" font-weight="700">THE CROSSING</text>
  <text x="76" y="182" font-family="'Lora',Georgia,serif" font-size="62" fill="#FFF">Nine in ten agents never leave the pilot.</text>

  ${draw({ id: 'a', tx: 470, cy: 530, rMax: 172, rMin: 26, count: 17, stroke: PALETTE.paper, width: 2.2 })}
  ${draw({ id: 'b', tx: 900, cy: 530, rMax: 62, rMin: 16, count: 6, stroke: PALETTE.coral, width: 2.6 })}
  <line x1="700" y1="530" x2="808" y2="530" stroke="${PALETTE.coral}" stroke-width="3"/>
  <path d="M814 530 l-14 -8 l0 16 z" fill="${PALETTE.coral}"/>

  <text x="292" y="762" text-anchor="middle" font-family="'JetBrains Mono',monospace"
    font-size="22" letter-spacing="2" fill="#D9CDB8">PILOTING · 38%</text>
  <text x="900" y="392" text-anchor="middle" font-family="'JetBrains Mono',monospace"
    font-size="22" letter-spacing="2" fill="${PALETTE.coral}">IN PRODUCTION · 11%</text>

  <text x="1524" y="700" text-anchor="end" font-family="'Lora',Georgia,serif"
    font-size="150" fill="${PALETTE.coral}">11%</text>
  <text x="1524" y="742" text-anchor="end" font-family="'JetBrains Mono',monospace"
    font-size="20" letter-spacing="2" fill="#8E8069">CROSS INTO PRODUCTION</text>

  <line x1="76" y1="820" x2="${W - 76}" y2="820" stroke="rgba(247,241,230,0.18)" stroke-width="2"/>
  <text x="${W - 76}" y="862" text-anchor="end" font-family="'JetBrains Mono',monospace"
    font-size="19" letter-spacing="2" fill="#8E8069">DELOITTE TECH TRENDS 2026</text>
</svg>
<div style="position:absolute;left:76px;bottom:34px">${logoWhite(34)}</div>
</body></html>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 900));
  const out = path.join(__dirname, '..', 'out', 'carousels', 'agent-harness', 'x-card.png');
  await p.screenshot({ path: out, type: 'png' });
  console.log('x-card -> ' + out);
  await b.close();
})();
