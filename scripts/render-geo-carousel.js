/* Strategy → Ship — VISUAL LinkedIn carousel (1080×1350).
 * Every data slide carries the actual ring geometry from the article figures,
 * not a text restatement of it. Coral hero bookends, dark data interiors.
 * Outputs: carousel.pdf (10pp) + per-slide PNGs. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { PALETTE, FONTS, ringCluster } = require('./_sts-geo');
const { logoInk, logoWhite } = require('./_fds-logo');

const W = 1080, H = 1350;
const OUT = path.join(__dirname, '..', 'out', 'carousels', 'agent-harness');

/* ---------- shared bits ---------- */
const heroGlyph = `<svg class="glyph" viewBox="0 0 600 600">${
  [270, 232, 196, 162, 130, 100, 72, 48, 28].map((r) => `<circle cx="${560 - r}" cy="300" r="${r}"/>`).join('')
}</svg>`;

const rings = (o) => `<svg class="fig" viewBox="0 0 ${o.vw} ${o.vh}" width="${o.w}" height="${o.h}">${o.svg}</svg>`;

// Ring clusters are authored against their own viewBox, then scaled into the slide.
const cluster = (opts) => ringCluster({ ...opts, id: opts.id || 'r' }).svg.replace(/stroke-dashoffset="[\d.]+"/g, 'stroke-dashoffset="0"');

/* ---------- slide builders ---------- */
const shell = (cls, inner, pager) => `
<section class="slide ${cls}">
  ${cls.includes('hero') ? heroGlyph : ''}
  <span class="pg fm">${pager}</span>
  ${inner}
  <footer>
    <span class="enso">${cls.includes('hero') ? logoInk(38) : logoWhite(38)}</span>
    <span class="fr fm">POWERED BY ENSO LABS</span>
  </footer>
</section>`;

/* 01 — cover */
const s01 = shell('hero cover', `
  <p class="kick fm">PART 2 · THE FORWARD DEPLOYED STRATEGIST</p>
  <h1 class="fd">89% of AI agents never leave the pilot.</h1>
  <div class="rule"></div>
`, '01 / 10');

/* 02 — the crossing (the article's hero data viz, vertical) */
const s02 = shell('data', `
  <p class="kick fm">THE CROSSING</p>
  <h2 class="fd">38% pilot. 11% ship.</h2>
  <div class="figwrap">
    ${rings({ vw: 900, vh: 420, w: 900, h: 420, svg:
      cluster({ id: 'a', tx: 360, cy: 210, rMax: 190, rMin: 26, count: 17, stroke: PALETTE.paper, width: 2.2 }) +
      cluster({ id: 'b', tx: 800, cy: 210, rMax: 66, rMin: 16, count: 6, stroke: PALETTE.coral, width: 2.6 }) +
      `<line x1="590" y1="210" x2="700" y2="210" stroke="${PALETTE.coral}" stroke-width="3"/>
       <path d="M706 210 l-14 -8 l0 16 z" fill="${PALETTE.coral}"/>` })}
  </div>
  <div class="legend">
    <span><i class="dot pale"></i>PILOTING · 38%</span>
    <span><i class="dot coral"></i>IN PRODUCTION · 11%</span>
  </div>
  <p class="src fm">DELOITTE TECH TRENDS 2026</p>
`, '02 / 10');

/* 03 — the blockers */
const BLOCK = [['64%', 'Evaluation gaps'], ['57%', 'Governance friction'], ['51%', 'Model reliability']];
const s03 = shell('data', `
  <p class="kick fm">WHAT LEADERS BLAME</p>
  <h2 class="fd">Not one of them is the model.</h2>
  <div class="blockers">
    ${BLOCK.map(([n, l], i) => `
      <div class="bk">
        ${rings({ vw: 200, vh: 200, w: 168, h: 168, svg: cluster({ id: 'k' + i, tx: 168, cy: 100, rMax: 82, rMin: 18, count: 7, stroke: i === 0 ? PALETTE.coral : PALETTE.paper, width: 2.2 }) })}
        <div class="bkn fd">${n}</div>
        <div class="bkl">${l}</div>
      </div>`).join('')}
  </div>
  <p class="note fd">Every one is a harness problem — and every harness problem traces back to an input nobody wrote down.</p>
`, '03 / 10');

/* 04–07 — the four inputs, each with its ring node */
const INPUTS = [
  ['01', 'The brief', 'System prompt +<br>permission boundary'],
  ['02', 'The journey map', 'Tool allowlist +<br>escalation gate'],
  ['03', 'The measurement plan', 'Eval harness +<br>golden-set CI'],
  ['04', 'The segmentation', 'Retrieval strategy +<br>recall target'],
];
const inputSlides = INPUTS.map(([n, title, out], i) => shell('data', `
  <p class="kick fm">INPUT ${n} OF 04</p>
  <h2 class="fd">${title}</h2>
  <div class="figwrap tight">
    ${rings({ vw: 460, vh: 300, w: 700, h: 456, svg:
      cluster({ id: 'i' + i, tx: 300, cy: 150, rMax: 132, rMin: 26, count: 9, stroke: PALETTE.paper, width: 2.4 }) +
      `<circle cx="300" cy="150" r="16" fill="${PALETTE.coral}"/>` })}
  </div>
  <p class="becomes fm">BECOMES</p>
  <p class="out fd">${out}</p>
`, `0${i + 4} / 10`));

/* 08 — the benchmark */
const s08 = shell('data', `
  <p class="kick fm">BRIGHT · RECALL@1</p>
  <h2 class="fd">Same model.<br>Different harness.</h2>
  <div class="bench">
    <div class="bcol">
      <div class="bnum fd mute">27.8%</div>
      ${rings({ vw: 300, vh: 300, w: 300, h: 300, svg: cluster({ id: 'q1', tx: 250, cy: 150, rMax: 112, rMin: 22, count: 9, stroke: '#B7A992', width: 2 }) })}
      <div class="blab fm">EMBEDDING BASELINE</div>
    </div>
    <div class="bcol">
      <div class="bnum fd">49.6%</div>
      ${rings({ vw: 300, vh: 300, w: 300, h: 300, svg: cluster({ id: 'q2', tx: 285, cy: 150, rMax: 146, rMin: 24, count: 14, stroke: PALETTE.coral, width: 2.2 }) })}
      <div class="blab fm coral">AGENTIC HARNESS</div>
    </div>
  </div>
  <p class="src fm">MICROSOFT · ARXIV 2605.05538</p>
`, '08 / 10');

/* 09 — receipts */
const SRC = [
  ['DELOITTE TECH TRENDS 2026', '38% piloting vs 11% in production'],
  ['GARTNER, JUN 2025', '40%+ of agentic projects cancelled by 2027'],
  ['MICROSOFT, ARXIV 2605.05538', 'BRIGHT recall@1 27.8% to 49.6%'],
  ['PAGERDUTY, N=1,000 EXECUTIVES', '171% average ROI once in production'],
];
const s09 = shell('data', `
  <p class="kick fm">SOURCES</p>
  <h2 class="fd">Receipts.</h2>
  <ul class="srclist">
    ${SRC.map(([s, c]) => `<li><span class="s fm">${s}</span><span class="c">${c}</span></li>`).join('')}
  </ul>
`, '09 / 10');

/* 10 — CTA */
const s10 = shell('hero cta', `
  <p class="kick fm">STRATEGY → SHIP</p>
  <h1 class="fd">Build an agent harness.</h1>
  <div class="rule"></div>
  <p class="subhead">Full breakdown, with the animated data blocks →<br><b>ensolabs.ai/insights</b></p>
`, '10 / 10');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:${PALETTE.ink}}
  .fd{font-family:'Lora',Georgia,serif}.fm{font-family:'JetBrains Mono',monospace}
  .slide{position:relative;width:${W}px;height:${H}px;overflow:hidden;
    padding:96px 88px 84px;display:flex;flex-direction:column;
    font-family:'Inter Tight',sans-serif;color:${PALETTE.paper};
    background:
      radial-gradient(58% 42% at 86% 90%, rgba(240,81,46,0.22) 0%, rgba(0,0,0,0) 70%),
      linear-gradient(158deg, rgba(247,241,230,0.10) 0%, rgba(0,0,0,0) 46%),
      linear-gradient(200deg, rgba(224,162,60,0.20) 0%, rgba(0,0,0,0) 55%),
      ${PALETTE.ink};
    page-break-after:always;break-after:page}
  .slide:last-child{page-break-after:auto;break-after:auto}
  .hero{background:${PALETTE.coral};color:#16110B}
  .glyph{position:absolute;top:-150px;right:-300px;width:1080px;height:1080px;opacity:0.26}
  .glyph circle{fill:none;stroke:#F2EDE4;stroke-width:14}
  .kick{font-size:24px;letter-spacing:0.2em;font-weight:700;color:${PALETTE.coral};position:relative}
  .hero .kick{color:#2A1109}
  h1{margin-top:auto;font-size:104px;line-height:1.03;letter-spacing:-0.02em;font-weight:500;color:#16110B;position:relative}
  h2{margin-top:22px;font-size:70px;line-height:1.06;letter-spacing:-0.015em;font-weight:500;color:#FFF}
  .rule{height:8px;width:200px;background:#F2EDE4;border-radius:4px;margin-top:40px;margin-bottom:auto;position:relative}
  .subhead{margin-top:36px;font-size:38px;line-height:1.4;color:#FFF3EE;position:relative;margin-bottom:auto}
  .subhead b{font-weight:600;color:#16110B}
  .figwrap{margin-top:auto;margin-bottom:auto;display:flex;justify-content:center;align-items:center}
  .figwrap.tight{margin-top:40px}
  .fig{display:block;overflow:visible}
  .legend{display:flex;gap:44px;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:24px;color:#D9CDB8}
  .dot{display:inline-block;width:16px;height:16px;border-radius:50%;margin-right:12px;vertical-align:-2px}
  .dot.pale{background:${PALETTE.paper}}.dot.coral{background:${PALETTE.coral}}
  .src{margin-top:34px;font-size:21px;letter-spacing:0.14em;color:#8E8069}
  .blockers{margin-top:auto;margin-bottom:auto;display:flex;justify-content:space-between;gap:20px}
  .bk{display:flex;flex-direction:column;align-items:center;text-align:center}
  .bkn{font-size:64px;color:#FFF;margin-top:10px}
  .bkl{font-size:26px;color:#C7BAA4;margin-top:6px}
  .note{margin-bottom:20px;font-size:34px;line-height:1.35;color:#E4D9C6}
  .becomes{margin-top:auto;font-size:22px;letter-spacing:0.2em;color:${PALETTE.coral}}
  .out{margin-top:14px;margin-bottom:auto;font-size:52px;line-height:1.2;color:#FFF}
  .bench{margin-top:auto;margin-bottom:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
  .bcol{display:flex;flex-direction:column;align-items:center}
  .bnum{font-size:76px;color:${PALETTE.coral};margin-bottom:6px}
  .bnum.mute{font-size:58px;color:#D9CDB8}
  .blab{font-size:20px;letter-spacing:0.14em;color:#C7BAA4;margin-top:8px}
  .blab.coral{color:${PALETTE.coral}}
  .srclist{list-style:none;margin-top:52px;margin-bottom:auto;display:flex;flex-direction:column;gap:34px}
  .srclist li{display:flex;flex-direction:column;gap:8px;border-left:5px solid ${PALETTE.amber};padding-left:26px}
  .srclist .s{font-size:26px;font-weight:700;letter-spacing:0.06em;color:#FFF}
  .srclist .c{font-size:28px;font-weight:300;color:#B7A992}
  footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;
    padding-top:30px;border-top:2px solid rgba(247,241,230,0.18);position:relative}
  .hero footer{border-top-color:rgba(22,17,11,0.28)}
  .enso svg{height:38px;width:auto;display:block}
  .fr{font-size:19px;letter-spacing:0.14em;color:#8E8069}
  .hero .fr{color:#3A1B11}
  .pg{position:absolute;top:96px;right:88px;font-size:22px;letter-spacing:0.1em;color:#6E6152}
  .hero .pg{color:#7A3B2A}
</style></head><body>
${s01}${s02}${s03}${inputSlides.join('')}${s08}${s09}${s10}
</body></html>`;

(async () => {
  fs.mkdirSync(path.join(OUT, 'carousel-slides'), { recursive: true });
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));

  await pg.pdf({ path: path.join(OUT, 'carousel.pdf'), width: `${W}px`, height: `${H}px`, printBackground: true, pageRanges: '1-10' });

  const els = await pg.$$('.slide');
  for (let i = 0; i < els.length; i++) {
    await els[i].screenshot({ path: path.join(OUT, 'carousel-slides', String(i + 1).padStart(2, '0') + '.png') });
  }
  fs.copyFileSync(path.join(OUT, 'carousel-slides', '01.png'), path.join(OUT, 'carousel-cover.png'));
  await b.close();
  console.log(`visual carousel -> ${els.length} slides + carousel.pdf`);
})();
