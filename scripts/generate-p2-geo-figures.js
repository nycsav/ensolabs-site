/* Part 2 — animated figures in the Strategy to Ship concentric-arc system.
 *   geo-crossing  : 38% piloted collapsing into 11% in production
 *   geo-spec      : the four strategy inputs, each firing into its harness tier
 *   geo-benchmark : same model, different harness (27.8% -> 49.6%)
 * Rings draw in via stroke-dashoffset; labels and numbers follow. GIF + MP4 out. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { PALETTE, ringCluster, dashRule, microLabel, frame } = require('./_sts-geo');

const W = 1200, H = 760;
const OUTDIR = path.join(__dirname, '..', 'public', 'images', 'insights');

/* ---------------- A. The crossing ---------------- */
const big = ringCluster({ id: 'a', tx: 470, cy: 400, rMax: 178, rMin: 26, count: 17, stroke: PALETTE.paper });
const small = ringCluster({ id: 'b', tx: 880, cy: 400, rMax: 62, rMin: 16, count: 6, stroke: PALETTE.coral, width: 2 });

const crossing = frame(W, H, `
  ${big.svg}
  ${small.svg}
  ${dashRule(640, 250, 550)}
  <g id="arrow" opacity="0">
    <line x1="676" y1="400" x2="742" y2="400" stroke="${PALETTE.coral}" stroke-width="2"/>
    <path d="M746 400 l-11 -6 l0 12 z" fill="${PALETTE.coral}"/>
  </g>
  ${microLabel(292, 638, ['PILOTED', '38% OF ORGANIZATIONS'], { arrow: '↑', anchor: 'middle', id: 'lblA', arrowAbove: true, color: PALETTE.paper })}
  ${microLabel(880, 220, ['IN PRODUCTION'], { arrow: '↓', anchor: 'middle', id: 'lblB', color: PALETTE.coral })}
  <text id="figA" x="1136" y="600" text-anchor="end" class="big" font-size="124" opacity="0">0%</text>
  <text id="figAc" x="1136" y="638" text-anchor="end" class="src" opacity="0">CROSS INTO PRODUCTION</text>
`, {
  kicker: 'THE CROSSING',
  headline: 'Nine in ten agents never leave the pilot.',
  source: 'DELOITTE TECH TRENDS 2026',
  dark: true,
});

/* ---------------- B. The input/output spec ---------------- */
const SPEC = [
  ['THE BRIEF', 'RUNTIME', 'System prompt + permission boundary'],
  ['THE JOURNEY MAP', 'CAPABILITIES', 'Tool allowlist + escalation gate'],
  ['THE MEASUREMENT PLAN', 'ASSURANCE', 'Eval harness + golden-set CI'],
  ['THE SEGMENTATION', 'CAPABILITIES', 'Retrieval strategy + recall target'],
];

let specInner = '';
const specIds = [];
SPEC.forEach((row, i) => {
  const cy = 250 + i * 108;
  const cl = ringCluster({ id: `s${i}`, tx: 560, cy, rMax: 40, rMin: 11, count: 5, width: 1.7, stroke: PALETTE.paper });
  specIds.push(cl.ids);
  specInner += cl.svg;
  specInner += `<text id="si${i}" x="64" y="${cy + 6}" class="lbl" font-size="17" opacity="0">${row[0]}</text>`;
  specInner += `<text id="st${i}" x="600" y="${cy - 6}" class="lbl" font-size="16" fill="${PALETTE.coral}" opacity="0">${row[1]}</text>`;
  specInner += `<text id="so${i}" x="600" y="${cy + 18}" font-family="'Inter Tight',sans-serif" font-size="19" fill="${PALETTE.paper}" opacity="0">${row[2]}</text>`;
});
specInner += dashRule(446, 196, 646);

const spec = frame(W, H, specInner, {
  kicker: 'THE INPUT/OUTPUT SPEC',
  headline: 'A deliverable goes in. A number comes out.',
  source: 'ENSO LABS · FORWARD DEPLOYED STRATEGIST',
  dark: true,
});

/* ---------------- C. Same model, different harness ---------------- */
// Clusters sit low so the counting numbers can own the space above them, clear of the arcs.
const baseCl = ringCluster({ id: 'c1', tx: 410, cy: 470, rMax: 86, rMin: 18, count: 9, stroke: '#B7A992', width: 1.7 });
const agCl = ringCluster({ id: 'c2', tx: 980, cy: 470, rMax: 153, rMin: 24, count: 15, stroke: PALETTE.coral, width: 1.9 });

const bench = frame(W, H, `
  ${baseCl.svg}
  ${agCl.svg}
  ${dashRule(560, 250, 620)}
  <text id="figC1" x="324" y="330" text-anchor="middle" class="big" font-size="66" fill="#D9CDB8" opacity="0">0%</text>
  <text id="figC2" x="827" y="300" text-anchor="middle" class="big" font-size="104" opacity="0">0%</text>
  ${microLabel(324, 612, ['EMBEDDING', 'BASELINE'], { arrow: '↑', anchor: 'middle', id: 'lblC1', arrowAbove: true, color: PALETTE.paper })}
  ${microLabel(827, 646, ['AGENTIC HARNESS'], { arrow: '↑', anchor: 'middle', id: 'lblC2', color: PALETTE.coral, arrowAbove: true })}
`, {
  kicker: 'BRIGHT · RECALL@1',
  headline: 'Retrieval strategy beat model choice.',
  source: 'MICROSOFT · ARXIV 2605.05538 · MAY 2026',
  dark: true,
});

/* ---------------- animation drivers ---------------- */
const driver = (kind, payload) => `
  const P = ${JSON.stringify(payload)};
  const ease = (p) => (p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2);
  const draw = (id, p) => {
    const el = document.getElementById(id); if (!el) return;
    const c = parseFloat(el.getAttribute('stroke-dasharray'));
    el.setAttribute('stroke-dashoffset', String(c * (1 - Math.max(0, Math.min(1, p)))));
  };
  const fade = (id, p) => { const el = document.getElementById(id); if (el) el.setAttribute('opacity', String(Math.max(0, Math.min(1, p)))); };
  window.render = function (t) {
    const e = ease(t);
    ${kind === 'crossing' ? `
      P.big.forEach((id, i) => draw(id, (e - i * 0.028) / 0.34));
      fade('lblA', (e - 0.30) / 0.12);
      fade('arrow', (e - 0.44) / 0.10);
      P.small.forEach((id, i) => draw(id, (e - 0.50 - i * 0.022) / 0.26));
      fade('lblB', (e - 0.62) / 0.12);
      const n = Math.max(0, Math.min(1, (e - 0.66) / 0.26));
      fade('figA', n); fade('figAc', n);
      document.getElementById('figA').textContent = Math.round(11 * n) + '%';
    ` : ''}
    ${kind === 'spec' ? `
      P.rows.forEach((ids, r) => {
        const s = r * 0.17;
        fade('si' + r, (e - s) / 0.08);
        ids.forEach((id, i) => draw(id, (e - s - 0.05 - i * 0.014) / 0.16));
        fade('st' + r, (e - s - 0.13) / 0.08);
        fade('so' + r, (e - s - 0.16) / 0.08);
      });
    ` : ''}
    ${kind === 'bench' ? `
      P.base.forEach((id, i) => draw(id, (e - i * 0.022) / 0.30));
      fade('lblC1', (e - 0.24) / 0.10);
      const n1 = Math.max(0, Math.min(1, (e - 0.26) / 0.20));
      fade('figC1', n1);
      document.getElementById('figC1').textContent = (27.8 * n1).toFixed(1) + '%';
      P.ag.forEach((id, i) => draw(id, (e - 0.42 - i * 0.018) / 0.30));
      fade('lblC2', (e - 0.66) / 0.10);
      const n2 = Math.max(0, Math.min(1, (e - 0.66) / 0.22));
      fade('figC2', n2);
      document.getElementById('figC2').textContent = (49.6 * n2).toFixed(1) + '%';
    ` : ''}
  };
  window.render(0);
`;

const FIGS = [
  { name: 'geo-crossing', html: crossing, drv: driver('crossing', { big: big.ids, small: small.ids }) },
  { name: 'geo-spec', html: spec, drv: driver('spec', { rows: specIds }) },
  { name: 'geo-benchmark', html: bench, drv: driver('bench', { base: baseCl.ids, ag: agCl.ids }) },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  for (const f of FIGS) {
    const dir = `/tmp/p2-${f.name}`;
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    const pg = await browser.newPage();
    await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
    await pg.setContent(f.html, { waitUntil: 'load', timeout: 60000 });
    await pg.evaluate(f.drv);
    await new Promise((r) => setTimeout(r, 700));

    const N = 46, hold = 26;
    let idx = 0;
    for (let i = 0; i < N; i++) {
      await pg.evaluate((p) => window.render(p), i / (N - 1));
      await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
    }
    for (let h = 0; h < hold; h++) {
      await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
    }
    await pg.close();

    execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -vf "scale=${W}:${H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(OUTDIR, f.name + '.gif')}`, { stdio: 'ignore' });
    execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(OUTDIR, f.name + '.mp4')}`, { stdio: 'ignore' });
    console.log(`${f.name} -> .gif + .mp4`);
  }
  await browser.close();
})();
