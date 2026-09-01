/* Forward Deployed Strategist — Part 3 "three theories" animation.
 * Anthropic / OpenAI / Perplexity columns reveal in sequence, then a caption.
 * Renders discrete frames via puppeteer -> GIF (2fps) + MP4 (ffmpeg).
 * Outputs: public/images/insights/fds-part3-theories.{gif,mp4} (1200×675)
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`;
const W = 1200, H = 676; // even height required by libx264
const OUT = 'fds-part3-theories';
const FPS = 2;

const COLS = [
  {
    key: 'anthropic',
    color: '#5CE0D2',
    name: 'ANTHROPIC',
    items: ['MCP — tool integration standard', 'Managed Authorization — per-agent allowlists', 'Operator Layer — permission boundary'],
    tag: 'Governance Lab',
  },
  {
    key: 'openai',
    color: '#F0512E',
    name: 'OPENAI',
    items: ['GPT-5 / Codex — reasoning + build speed', 'Operator Model — full-stack ambition', 'Direct Enterprise Embed — production layer'],
    tag: 'Full-Stack Operator',
  },
  {
    key: 'perplexity',
    color: '#E0A23C',
    name: 'PERPLEXITY',
    items: ['Computer — research/action interface', 'Grounded Retrieval — cited, real-time', 'Intelligence Feed — current as of now'],
    tag: 'Research/Action Interface',
  },
];

const html = `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#0D1321;color:#fff;
       font-family:'Inter Tight',sans-serif;position:relative;overflow:hidden}
  .kick{position:absolute;top:36px;left:0;right:0;text-align:center;
        font-family:'JetBrains Mono',monospace;font-size:13px;
        text-transform:uppercase;letter-spacing:0.2em;color:#5CE0D2}
  .cols{position:absolute;top:96px;left:64px;right:64px;bottom:100px;
        display:flex;gap:24px}
  .col{flex:1;border-left:6px solid transparent;padding:0 26px 0 22px;
       transition:none;display:flex;flex-direction:column}
  .col.on{border-color:var(--c)}
  .name{font-family:'Inter Tight',sans-serif;font-weight:700;font-size:22px;color:#fff}
  .items{margin-top:22px;display:flex;flex-direction:column;gap:16px}
  .item{font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.5;
        color:#8BAFC7;opacity:0;transform:translateY(6px)}
  .item.on{opacity:1;transform:translateY(0)}
  .tag{margin-top:auto;padding-top:18px;font-family:'JetBrains Mono',monospace;
       font-size:12px;text-transform:uppercase;letter-spacing:0.14em;opacity:0}
  .tag.on{opacity:1;color:var(--c)}
  .caption{position:absolute;bottom:34px;left:0;right:0;text-align:center;
        font-family:'Lora',Georgia,serif;font-style:italic;font-size:22px;
        color:#fff;opacity:0}
  .caption.on{opacity:1}
</style></head><body>
  <div class="kick">The Three Theories of Production</div>
  <div class="cols">
    ${COLS.map(
      (c) => `<div class="col" id="col-${c.key}" style="--c:${c.color}">
        <div class="name">${c.name}</div>
        <div class="items">
          ${c.items.map((it, i) => `<div class="item" id="${c.key}-item-${i}">${it}</div>`).join('')}
        </div>
        <div class="tag" id="${c.key}-tag">${c.tag}</div>
      </div>`
    ).join('')}
  </div>
  <div class="caption" id="caption">&ldquo;Three labs. Three theories. Route accordingly.&rdquo;</div>
  <script>
    var COLS = ${JSON.stringify(COLS.map((c) => c.key))};
    window.render = function (state) {
      // state 0..3: cumulative column reveal. state 4: all lit + caption.
      var litCount = state >= 4 ? 3 : state;
      COLS.forEach(function (key, i) {
        var on = i < litCount;
        document.getElementById('col-' + key).classList.toggle('on', on);
        for (var j = 0; j < 3; j++) {
          document.getElementById(key + '-item-' + j).classList.toggle('on', on);
        }
        document.getElementById(key + '-tag').classList.toggle('on', on);
      });
      document.getElementById('caption').classList.toggle('on', state >= 4);
    };
    window.render(0);
  </script>
</body></html>`;

(async () => {
  const dir = '/tmp/fds-part3-theories-frames';
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  // Frame durations in seconds, matching the handoff's 5-beat sequence.
  const STATES = [1.5, 1.5, 1.5, 1.5, 2.5];
  let idx = 0;
  for (let s = 0; s < STATES.length; s++) {
    await page.evaluate((st) => window.render(st), s);
    const frames = Math.round(STATES[s] * FPS);
    for (let f = 0; f < frames; f++) {
      await page.screenshot({ path: path.join(dir, String(idx++).padStart(3, '0') + '.png') });
    }
  }
  await browser.close();

  const out = path.join(__dirname, '..', 'public', 'images', 'insights');
  fs.mkdirSync(out, { recursive: true });
  execSync(
    `ffmpeg -y -framerate ${FPS} -i ${dir}/%03d.png -vf "scale=${W}:${H}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" -loop 0 ${path.join(out, OUT + '.gif')}`,
    { stdio: 'ignore' }
  );
  execSync(
    `ffmpeg -y -framerate ${FPS} -i ${dir}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=${W}:${H}" -movflags +faststart ${path.join(out, OUT + '.mp4')}`,
    { stdio: 'ignore' }
  );
  console.log(`theories anim -> public/images/insights/${OUT}.gif (+ .mp4)`);
})();
