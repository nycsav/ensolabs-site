/* Strategy to Ship — Golden Gate Bridge as a line icon (animated).
 * A recurring series motif for the SF / Berkeley RDI pieces: hairline geometry,
 * Ship Coral main cable, deck and suspenders drawing in left to right.
 * Outputs a wide article figure (GIF + MP4) and a static square icon (PNG). */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { PALETTE, FONTS, cornerMarks, gradientField } = require('./_sts-geo');

const W = 1200, H = 560;
const OUTDIR = path.join(__dirname, '..', 'public', 'images', 'insights');

// Geometry — anchorages, tower tops, deck.
const DECK = 400, TOP = 150, SAG = 330;
const TWR_L = 400, TWR_R = 800, ANCH_L = 120, ANCH_R = 1080;

/** Cable height at x — parabolic main span, parabolic side spans. */
function cableY(x) {
  if (x >= TWR_L && x <= TWR_R) {
    const t = (x - (TWR_L + TWR_R) / 2) / ((TWR_R - TWR_L) / 2);
    return TOP + (SAG - TOP) * (1 - t * t);
  }
  const twr = x < TWR_L ? TWR_L : TWR_R;
  const anch = x < TWR_L ? ANCH_L : ANCH_R;
  const t = (x - twr) / (anch - twr);
  return TOP + (SAG - TOP) * t * t;
}

const cablePath = (() => {
  let d = '';
  for (let x = ANCH_L; x <= ANCH_R; x += 4) {
    d += (x === ANCH_L ? 'M' : 'L') + x + ' ' + cableY(x).toFixed(1) + ' ';
  }
  return d.trim();
})();

/** Tower: two verticals + crossbeams, drawn as one path. */
const tower = (cx) => {
  const w = 11;
  let d = `M${cx - w} ${DECK + 26} L${cx - w} ${TOP - 16} M${cx + w} ${DECK + 26} L${cx + w} ${TOP - 16}`;
  [TOP + 6, TOP + 74, DECK - 92, DECK - 6].forEach((y) => {
    d += ` M${cx - w} ${y} L${cx + w} ${y}`;
  });
  return d;
};

// Suspenders — skip the ones that would land on a tower.
const suspenders = [];
for (let x = ANCH_L + 26; x <= ANCH_R - 26; x += 26) {
  if (Math.abs(x - TWR_L) < 22 || Math.abs(x - TWR_R) < 22) continue;
  const y = cableY(x);
  if (DECK - y < 10) continue;
  suspenders.push({ x, y });
}

const svgBody = `
  ${cornerMarks(W, H, { fill: PALETTE.paper })}
  <path id="deck" d="M60 ${DECK} L${W - 60} ${DECK}" fill="none" stroke="${PALETTE.paper}" stroke-width="2.4"/>
  <path id="deck2" d="M60 ${DECK + 9} L${W - 60} ${DECK + 9}" fill="none" stroke="${PALETTE.paper}" stroke-width="1.2" opacity="0.55"/>
  <path id="twrL" d="${tower(TWR_L)}" fill="none" stroke="${PALETTE.paper}" stroke-width="2.2"/>
  <path id="twrR" d="${tower(TWR_R)}" fill="none" stroke="${PALETTE.paper}" stroke-width="2.2"/>
  <path id="cable" d="${cablePath}" fill="none" stroke="${PALETTE.coral}" stroke-width="2.6" stroke-linecap="round"/>
  <g id="susp">
    ${suspenders
      .map(
        (s, i) =>
          `<line id="sp${i}" x1="${s.x}" y1="${s.y.toFixed(1)}" x2="${s.x}" y2="${DECK}" stroke="${PALETTE.paper}" stroke-width="1" opacity="0"/>`
      )
      .join('')}
  </g>
  <circle cx="${ANCH_L}" cy="${SAG}" r="5" fill="${PALETTE.coral}" id="aL" opacity="0"/>
  <circle cx="${ANCH_R}" cy="${SAG}" r="5" fill="${PALETTE.coral}" id="aR" opacity="0"/>
`;

const html = `<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:${PALETTE.ink};overflow:hidden}
  .k{font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:3.2px;fill:${PALETTE.coral};font-weight:700}
  .hl{font-family:'Lora',Georgia,serif;font-size:36px;fill:${PALETTE.paper}}
  .src{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:1.5px;fill:${PALETTE.mute}}
</style></head><body>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  ${gradientField(W, H, 0, true)}
  <text x="60" y="72" class="k">BERKELEY RDI &#183; AGENTIC AI SUMMIT 2026</text>
  <text x="60" y="118" class="hl">Built where the agents are being built.</text>
  ${svgBody}
  <text x="60" y="${H - 34}" class="src" fill="${PALETTE.paper}">STRATEGY &#8594; SHIP</text>
  <text x="${W - 60}" y="${H - 34}" text-anchor="end" class="src">ENSO LABS &#183; SAN FRANCISCO &#183; NEW YORK</text>
</svg>
<script>
  var N = ${suspenders.length};
  function dashInit(id){
    var el=document.getElementById(id); var L=el.getTotalLength();
    el.setAttribute('stroke-dasharray', L); el.setAttribute('stroke-dashoffset', L); el.dataset.len=L;
  }
  ['deck','deck2','twrL','twrR','cable'].forEach(dashInit);
  function draw(id,p){var el=document.getElementById(id);var L=+el.dataset.len;
    el.setAttribute('stroke-dashoffset', String(L*(1-Math.max(0,Math.min(1,p)))));}
  function fade(id,p){var el=document.getElementById(id);if(el)el.setAttribute('opacity',String(Math.max(0,Math.min(1,p))));}
  window.render=function(t){
    var e = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    draw('deck',  e/0.30);
    draw('deck2', (e-0.04)/0.30);
    draw('twrL',  (e-0.24)/0.18);
    draw('twrR',  (e-0.30)/0.18);
    draw('cable', (e-0.44)/0.34);
    for(var i=0;i<N;i++) fade('sp'+i, (e-0.62-(i/N)*0.20)/0.10);
    fade('aL', (e-0.86)/0.10); fade('aR', (e-0.88)/0.10);
  };
  window.render(0);
</script>
</body></html>`;

(async () => {
  const dir = '/tmp/p2-geo-bridge';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  const N = 46, hold = 24;
  let idx = 0;
  for (let i = 0; i < N; i++) {
    await pg.evaluate((p) => window.render(p), i / (N - 1));
    await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
  }
  for (let h = 0; h < hold; h++) {
    await pg.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
  }
  await b.close();

  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -vf "scale=${W}:${H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" ${path.join(OUTDIR, 'geo-bridge.gif')}`, { stdio: 'ignore' });
  execSync(`ffmpeg -y -framerate 18 -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(OUTDIR, 'geo-bridge.mp4')}`, { stdio: 'ignore' });
  console.log('geo-bridge -> .gif + .mp4');
})();
