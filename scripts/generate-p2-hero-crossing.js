/* Part 2 hero + OG — "the crossing", literal.
 * The Golden Gate as the harness; ring clusters riding it from pilot to production.
 * Big cream cluster still on the approach, a mid-span one under way, a small coral
 * one already across. Dark ground, gradient field, playful but on-system.
 * Outputs: in-article hero 2400x1350 and og-<slug>-v4.png 1200x630. */
const puppeteer = require('puppeteer');
const path = require('path');
const { PALETTE, FONTS, ringCluster, gradientField, cornerMarks } = require('./_sts-geo');
const { logoWhite } = require('./_fds-logo');

const SLUG = 'agent-harness-inputs-outputs';
const solid = (o) => ringCluster(o).svg.replace(/stroke-dashoffset="[\d.]+"/g, 'stroke-dashoffset="0"');

/** One composition, scaled by `k` so hero and OG stay identical in proportion. */
function compose(W, H, k) {
  const DECK = H * 0.70, TOP = H * 0.385, SAG = H * 0.563;
  const aL = W * 0.075, aR = W * 0.925, tL = W * 0.325, tR = W * 0.675;

  const cableY = (x) => {
    if (x >= tL && x <= tR) {
      const t = (x - (tL + tR) / 2) / ((tR - tL) / 2);
      return TOP + (SAG - TOP) * (1 - t * t);
    }
    const twr = x < tL ? tL : tR, an = x < tL ? aL : aR;
    const t = (x - twr) / (an - twr);
    return TOP + (SAG - TOP) * t * t;
  };

  let cable = '';
  for (let x = aL; x <= aR; x += 3) cable += (x === aL ? 'M' : 'L') + x.toFixed(1) + ' ' + cableY(x).toFixed(1) + ' ';

  const tower = (cx) => {
    const w = 7 * k;
    let d = `M${cx - w} ${DECK + 20 * k} L${cx - w} ${TOP - 12 * k} M${cx + w} ${DECK + 20 * k} L${cx + w} ${TOP - 12 * k}`;
    [TOP + 5 * k, TOP + 52 * k, DECK - 66 * k, DECK - 5 * k].forEach((y) => { d += ` M${cx - w} ${y} L${cx + w} ${y}`; });
    return d;
  };

  let susp = '';
  const step = (aR - aL) / 46;
  for (let x = aL + step; x <= aR - step; x += step) {
    if (Math.abs(x - tL) < step * 0.9 || Math.abs(x - tR) < step * 0.9) continue;
    const y = cableY(x);
    if (DECK - y < 8) continue;
    susp += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${DECK}" stroke="${PALETTE.paper}" stroke-width="${0.9 * k}" opacity="0.5"/>`;
  }

  // Three payloads riding the deck: approach -> mid-span -> across.
  const rA = 84 * k, rB = 58 * k, rC = 38 * k;
  const clusters =
    solid({ id: 'pa', tx: W * 0.235, cy: DECK - rA, rMax: rA, rMin: 13 * k, count: 13, stroke: PALETTE.paper, width: 1.8 * k }) +
    solid({ id: 'pb', tx: W * 0.53, cy: DECK - rB, rMax: rB, rMin: 11 * k, count: 9, stroke: PALETTE.amber, width: 1.9 * k }) +
    solid({ id: 'pc', tx: W * 0.845, cy: DECK - rC, rMax: rC, rMin: 9 * k, count: 6, stroke: PALETTE.coral, width: 2.2 * k });

  // Coral progress trail under the deck, plus the arrow of travel.
  const trail = `<line x1="${aL}" y1="${DECK + 9 * k}" x2="${W * 0.845}" y2="${DECK + 9 * k}"
      stroke="${PALETTE.coral}" stroke-width="${2.2 * k}" opacity="0.85"/>
    <line x1="${W * 0.845}" y1="${DECK + 9 * k}" x2="${aR}" y2="${DECK + 9 * k}"
      stroke="${PALETTE.paper}" stroke-width="${1.4 * k}" opacity="0.22" stroke-dasharray="${6 * k} ${7 * k}"/>`;

  return `
  ${gradientField(W, H, 0, true)}
  ${cornerMarks(W, H, { fill: PALETTE.paper, pad: 26 * k, cell: 7 * k, dot: 3 * k })}
  <line x1="${aL - 26 * k}" y1="${DECK}" x2="${aR + 26 * k}" y2="${DECK}" stroke="${PALETTE.paper}" stroke-width="${2.2 * k}"/>
  ${susp}
  <path d="${tower(tL)}" fill="none" stroke="${PALETTE.paper}" stroke-width="${1.9 * k}"/>
  <path d="${tower(tR)}" fill="none" stroke="${PALETTE.paper}" stroke-width="${1.9 * k}"/>
  <path d="${cable.trim()}" fill="none" stroke="${PALETTE.coral}" stroke-width="${2.4 * k}" stroke-linecap="round"/>
  <circle cx="${aL}" cy="${SAG}" r="${4.5 * k}" fill="${PALETTE.coral}"/>
  <circle cx="${aR}" cy="${SAG}" r="${4.5 * k}" fill="${PALETTE.coral}"/>
  ${trail}
  ${clusters}
  <text x="${W * 0.235}" y="${DECK + 44 * k}" text-anchor="middle" font-family="'JetBrains Mono',monospace"
    font-size="${13 * k}" letter-spacing="${1.6 * k}" fill="#C7BAA4">PILOTED · 38%</text>
  <text x="${W * 0.845}" y="${DECK + 44 * k}" text-anchor="middle" font-family="'JetBrains Mono',monospace"
    font-size="${13 * k}" letter-spacing="${1.6 * k}" fill="${PALETTE.coral}">SHIPPED · 11%</text>`;
}

const page = (W, H, k, stack) => `<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:${PALETTE.ink};overflow:hidden;position:relative}
</style></head><body>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  ${compose(W, H, k)}
  <text x="${52 * k}" y="${62 * k}" font-family="'JetBrains Mono',monospace" font-size="${17 * k}"
    letter-spacing="${3 * k}" fill="${PALETTE.coral}" font-weight="700">PART 2 · THE FORWARD DEPLOYED STRATEGIST</text>
  <text x="${52 * k}" y="${118 * k}" font-family="'Lora',Georgia,serif" font-size="${46 * k}" fill="#FFF">${
    stack.map((l, i) => `<tspan x="${52 * k}" dy="${i === 0 ? 0 : 54 * k}">${l}</tspan>`).join('')
  }</text>
  <text x="${W - 52 * k}" y="${H - 34 * k}" text-anchor="end" font-family="'JetBrains Mono',monospace"
    font-size="${13 * k}" letter-spacing="${1.8 * k}" fill="#8E8069">POWERED BY ENSO LABS</text>
</svg>
<div style="position:absolute;left:${52 * k}px;bottom:${26 * k}px">${logoWhite(Math.round(26 * k))}</div>
</body></html>`;

const STACK = ['Build an agent harness.', 'The <tspan fill="' + PALETTE.coral + '" font-style="italic">4 inputs</tspan> that get agents shipped.'];

(async () => {
  const root = path.join(__dirname, '..');
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  const shot = async (W, H, k, out, dsf) => {
    const p = await b.newPage();
    await p.setViewport({ width: W, height: H, deviceScaleFactor: dsf });
    await p.setContent(page(W, H, k, STACK), { waitUntil: 'load', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 900));
    await p.screenshot({ path: out, type: 'png' });
    await p.close();
    console.log('-> ' + out.replace(root + '/', ''));
  };

  // In-article hero (site) — 16:9
  await shot(2400, 1350, 2, path.join(root, 'public', 'images', 'insights', `${SLUG}-hero.png`), 1);
  // og:image — auto-attached to any shared LINK (LinkedIn feed, X, Slack, iMessage)
  await shot(1200, 630, 1, path.join(root, 'public', 'og', `og-${SLUG}-v4.png`), 2);
  // LinkedIn native ARTICLE cover — a separate manual upload in the Pulse editor, 1920x1080
  await shot(1920, 1080, 1.6, path.join(root, 'public', 'images', 'insights', `${SLUG}-linkedin-article-cover.png`), 1);
  await b.close();
})();
