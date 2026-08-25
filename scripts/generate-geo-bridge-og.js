/* Golden Gate line icon as the shareable card.
 *   1) og-<slug>-v3.png   1200x630 STATIC (fully-assembled frame) — link previews are
 *      always rendered as a static bitmap, so the OG card is the payoff frame.
 *   2) geo-bridge-social  1080x1080 ANIMATED (GIF + MP4) — for uploading NATIVELY to
 *      LinkedIn, where feed posts do animate. */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { PALETTE, FONTS, cornerMarks } = require('./_sts-geo');
const { logoInk } = require('./_fds-logo');

const OUT_OG = path.join(__dirname, '..', 'public', 'og');
const OUT_IMG = path.join(__dirname, '..', 'public', 'images', 'insights');

/** Build a bridge composition for a given canvas + geometry. */
function compose({ W, H, deck, top, sag, anchL, anchR, twrL, twrR, headSize, headY, kickY, stack }) {
  const cableY = (x) => {
    if (x >= twrL && x <= twrR) {
      const t = (x - (twrL + twrR) / 2) / ((twrR - twrL) / 2);
      return top + (sag - top) * (1 - t * t);
    }
    const twr = x < twrL ? twrL : twrR;
    const anch = x < twrL ? anchL : anchR;
    const t = (x - twr) / (anch - twr);
    return top + (sag - top) * t * t;
  };

  let cable = '';
  for (let x = anchL; x <= anchR; x += 4) {
    cable += (x === anchL ? 'M' : 'L') + x + ' ' + cableY(x).toFixed(1) + ' ';
  }

  const tower = (cx) => {
    const w = Math.max(8, Math.round(W * 0.009));
    let d = `M${cx - w} ${deck + 22} L${cx - w} ${top - 14} M${cx + w} ${deck + 22} L${cx + w} ${top - 14}`;
    [top + 6, top + 62, deck - 78, deck - 6].forEach((y) => { d += ` M${cx - w} ${y} L${cx + w} ${y}`; });
    return d;
  };

  const step = Math.round((anchR - anchL) / 40);
  const susp = [];
  for (let x = anchL + step; x <= anchR - step; x += step) {
    if (Math.abs(x - twrL) < step * 0.9 || Math.abs(x - twrR) < step * 0.9) continue;
    const y = cableY(x);
    if (deck - y < 10) continue;
    susp.push({ x, y });
  }

  const head = stack
    .map((l, i) => `<tspan x="56" dy="${i === 0 ? 0 : headSize * 1.16}">${l}</tspan>`)
    .join('');

  return `
  ${cornerMarks(W, H)}
  <text x="56" y="${kickY}" class="k">PART 2 &#183; THE FORWARD DEPLOYED STRATEGIST</text>
  <text x="56" y="${headY}" class="hl" font-size="${headSize}">${head}</text>
  <path id="deck" d="M${anchL - 34} ${deck} L${anchR + 34} ${deck}" fill="none" stroke="${PALETTE.ink}" stroke-width="2.6"/>
  <path id="deck2" d="M${anchL - 34} ${deck + 9} L${anchR + 34} ${deck + 9}" fill="none" stroke="${PALETTE.ink}" stroke-width="1.2" opacity="0.5"/>
  <path id="twrL" d="${tower(twrL)}" fill="none" stroke="${PALETTE.ink}" stroke-width="2.2"/>
  <path id="twrR" d="${tower(twrR)}" fill="none" stroke="${PALETTE.ink}" stroke-width="2.2"/>
  <path id="cable" d="${cable.trim()}" fill="none" stroke="${PALETTE.coral}" stroke-width="2.8" stroke-linecap="round"/>
  <g id="susp">${susp.map((s, i) => `<line id="sp${i}" x1="${s.x}" y1="${s.y.toFixed(1)}" x2="${s.x}" y2="${deck}" stroke="${PALETTE.ink}" stroke-width="1" opacity="0"/>`).join('')}</g>
  <circle id="aL" cx="${anchL}" cy="${sag}" r="5" fill="${PALETTE.coral}" opacity="0"/>
  <circle id="aR" cx="${anchR}" cy="${sag}" r="5" fill="${PALETTE.coral}" opacity="0"/>
  <script>window.__N=${susp.length};</script>`;
}

const page = (W, H, inner, footSize) => `<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:${PALETTE.paper};overflow:hidden}
  .k{font-family:'JetBrains Mono',monospace;font-size:${Math.round(W * 0.0155)}px;letter-spacing:${W * 0.0026}px;fill:${PALETTE.coral};font-weight:700}
  .hl{font-family:'Lora',Georgia,serif;fill:${PALETTE.ink}}
  .hl tspan.em{fill:${PALETTE.coral};font-style:italic}
  .fr{font-family:'JetBrains Mono',monospace;font-size:${footSize}px;letter-spacing:${footSize * 0.12}px;fill:${PALETTE.mute}}
</style></head><body>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${inner}
  <text x="${W - 56}" y="${H - 44}" text-anchor="end" class="fr">POWERED BY ENSO LABS</text>
</svg>
<div style="position:absolute;left:56px;bottom:${Math.round(H * 0.045)}px">${logoInk(Math.round(H * 0.055))}</div>
<script>
  function init(id){var el=document.getElementById(id);var L=el.getTotalLength();
    el.setAttribute('stroke-dasharray',L);el.setAttribute('stroke-dashoffset',L);el.dataset.len=L;}
  ['deck','deck2','twrL','twrR','cable'].forEach(init);
  function draw(id,p){var el=document.getElementById(id);var L=+el.dataset.len;
    el.setAttribute('stroke-dashoffset',String(L*(1-Math.max(0,Math.min(1,p)))));}
  function fade(id,p){var el=document.getElementById(id);if(el)el.setAttribute('opacity',String(Math.max(0,Math.min(1,p))));}
  window.render=function(t){
    var e=t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
    draw('deck',e/0.30); draw('deck2',(e-0.04)/0.30);
    draw('twrL',(e-0.24)/0.18); draw('twrR',(e-0.30)/0.18);
    draw('cable',(e-0.44)/0.34);
    for(var i=0;i<window.__N;i++) fade('sp'+i,(e-0.62-(i/window.__N)*0.20)/0.10);
    fade('aL',(e-0.86)/0.10); fade('aR',(e-0.88)/0.10);
  };
  window.render(0);
</script></body></html>`;

const OG = {
  W: 1200, H: 630, deck: 470, top: 300, sag: 424,
  anchL: 90, anchR: 1110, twrL: 390, twrR: 810,
  headSize: 40, headY: 150, kickY: 92,
  stack: ['Build an agent harness.', 'The <tspan class="em">4 inputs</tspan> that get agents into production.'],
};

const SQ = {
  W: 1080, H: 1080, deck: 740, top: 500, sag: 672,
  anchL: 80, anchR: 1000, twrL: 380, twrR: 700,
  headSize: 62, headY: 250, kickY: 160,
  stack: ['Build an', 'agent harness.', 'The <tspan class="em">4 inputs</tspan> that', 'get agents shipped.'],
};

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  // 1 — static OG at the fully-assembled frame.
  const p1 = await b.newPage();
  await p1.setViewport({ width: OG.W, height: OG.H, deviceScaleFactor: 2 });
  await p1.setContent(page(OG.W, OG.H, compose(OG), 15), { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  await p1.evaluate(() => window.render(1));
  await new Promise((r) => setTimeout(r, 300));
  await p1.screenshot({ path: path.join(OUT_OG, 'og-agent-harness-inputs-outputs-v3.png'), type: 'png' });
  console.log('og -> public/og/og-agent-harness-inputs-outputs-v3.png (static, 1200x630)');
  await p1.close();

  // 2 — square animated asset for native LinkedIn upload.
  const dir = '/tmp/p2-bridge-social';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const p2 = await b.newPage();
  await p2.setViewport({ width: SQ.W, height: SQ.H, deviceScaleFactor: 1 });
  await p2.setContent(page(SQ.W, SQ.H, compose(SQ), 18), { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  const N = 48, hold = 30;
  let idx = 0;
  for (let i = 0; i < N; i++) {
    await p2.evaluate((p) => window.render(p), i / (N - 1));
    await p2.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
  }
  for (let h = 0; h < hold; h++) await p2.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
  await p2.close();
  await b.close();

  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -vf "scale=1080:1080:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(OUT_IMG, 'geo-bridge-social.gif')}`, { stdio: 'ignore' });
  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=1080:1080" -movflags +faststart ${path.join(OUT_IMG, 'geo-bridge-social.mp4')}`, { stdio: 'ignore' });
  console.log('social -> public/images/insights/geo-bridge-social.gif (+ .mp4, 1080x1080)');
})();
