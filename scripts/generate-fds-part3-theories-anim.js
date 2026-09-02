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

// Brand marks via Simple Icons (simpleicons.org, CC0) — single-path, colored with currentColor.
const LOGO_PATHS = {
  anthropic:
    'M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z',
  openai:
    'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
  perplexity:
    'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z',
};
const logoSvg = (key, size) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${LOGO_PATHS[key]}"/></svg>`;

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
  .name{display:flex;align-items:center;gap:10px;
        font-family:'Inter Tight',sans-serif;font-weight:700;font-size:22px;color:#fff}
  .name svg{flex-shrink:0;color:var(--c)}
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
        <div class="name">${logoSvg(c.key, 24)}<span>${c.name}</span></div>
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
