const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');
const { GIFEncoder, quantize, applyPalette } = require('gifenc');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'insights');

async function renderGif({ html, frameCount, setFrame, outFile, delayMs, width = 1200, height = 630 }) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  // let webfonts settle
  await new Promise((r) => setTimeout(r, 300));

  const gif = GIFEncoder();

  for (let i = 0; i < frameCount; i++) {
    await page.evaluate(setFrame, i);
    const buf = await page.screenshot({ type: 'png' });
    const png = PNG.sync.read(buf);
    const rgba = new Uint8Array(png.data.buffer, png.data.byteOffset, png.data.length);
    const palette = quantize(rgba, 256);
    const index = applyPalette(rgba, palette);
    gif.writeFrame(index, width, height, { palette, delay: delayMs });
  }

  gif.finish();
  const bytes = gif.bytes();
  fs.writeFileSync(outFile, Buffer.from(bytes));
  await browser.close();
  const sizeKb = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`Wrote ${outFile} (${frameCount} frames, ${sizeKb}KB)`);
}

// ---------- Animation 1: The Four-Step Loop ----------
const deployLoopHtml = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#0D1117; font-family:'JetBrains Mono', monospace;
    display:flex; flex-direction:column; justify-content:center; padding:0 90px; position:relative; }
  .kicker { position:absolute; top:48px; left:90px; font-size:13px; letter-spacing:0.18em;
    color:#F0512E; text-transform:uppercase; }
  .steps { display:flex; flex-direction:column; gap:34px; }
  .line { display:flex; align-items:center; gap:20px; opacity:0; transition:none; }
  .line.visible { opacity:1; }
  .num { font-size:14px; color:#4B5563; width:20px; }
  .code { font-size:22px; white-space:nowrap; }
  .c1 .code { color:#F0512E; }
  .c2 .code { color:#E6EDF3; }
  .c3 .code { color:#5CE0D2; }
  .c4 .code { color:#F0512E; }
  .glow { box-shadow: 0 0 0 rgba(92,224,210,0); border-radius:6px; padding:6px 12px; margin:-6px -12px; }
  .caption { position:absolute; bottom:44px; left:90px; font-size:14px; color:#6B7280; }
</style>
</head>
<body>
  <div class="kicker">PART 4 · THE FORWARD DEPLOYED STRATEGIST</div>
  <div class="steps">
    <div class="line c1" id="l1"><span class="num">1</span><span class="code" id="c1-el">user_context = retrieve_and_rank(tasks, calendar, prefs)</span></div>
    <div class="line c2" id="l2"><span class="num">2</span><span class="code">prompt = build_prompt(system, user_context, request)</span></div>
    <div class="line c3" id="l3"><span class="num">3</span><span class="code glow" id="c3-el">response = claude.messages.create(model, prompt, tools)</span></div>
    <div class="line c4" id="l4"><span class="num">4</span><span class="code">action = parse_and_validate(response)</span></div>
  </div>
  <div class="caption">The four-step loop at the heart of every AI-native deployment</div>
<script>
window.__setFrame = function(i){
  const l1=document.getElementById('l1'), l2=document.getElementById('l2'),
        l3=document.getElementById('l3'), l4=document.getElementById('l4');
  l1.classList.toggle('visible', i>=1);
  l2.classList.toggle('visible', i>=3);
  l3.classList.toggle('visible', i>=5);
  l4.classList.toggle('visible', i>=7);
  const c3el = document.getElementById('c3-el');
  if (i>=9 && i<=16) {
    const t = (i-9)/7; // 0..1
    const intensity = Math.abs(Math.sin(t*Math.PI));
    c3el.style.boxShadow = '0 0 ' + Math.round(18*intensity) + 'px rgba(92,224,210,' + (0.15+0.45*intensity) + ')';
    c3el.style.background = 'rgba(92,224,210,' + (0.04*intensity) + ')';
  } else {
    c3el.style.boxShadow = '0 0 0 rgba(92,224,210,0)';
    c3el.style.background = 'transparent';
  }
};
</script>
</body>
</html>
`;

// ---------- Animation 2: The Permission Model ----------
const permissionModelHtml = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#F7F1E6; font-family:'JetBrains Mono', monospace;
    display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; }
  .kicker { position:absolute; top:48px; left:90px; font-size:13px; letter-spacing:0.18em;
    color:#F0512E; text-transform:uppercase; }
  .stack { display:flex; flex-direction:column; align-items:center; gap:0; }
  .tier { width:520px; padding:22px 28px; border-radius:10px; background:#FFFFFF; border:1.5px solid #DDD2BC;
    opacity:0; transform:translateY(-8px); text-align:center; }
  .tier.visible { opacity:1; transform:translateY(0); }
  .tier.operator { border-color:#F0512E; border-width:2px; }
  .name { font-family:'Lora', serif; font-weight:700; font-size:24px; color:#1E1813; }
  .desc { font-size:13px; color:#79705F; margin-top:6px; }
  .arrowWrap { height:52px; display:flex; align-items:center; justify-content:center; gap:36px; }
  .arrow { font-size:22px; opacity:0; }
  .arrow.down { color:#5CE0D2; }
  .arrow.up { color:#F0512E; }
  .arrow.visible { opacity:1; }
</style>
</head>
<body>
  <div class="kicker">PART 4 · THE PERMISSION MODEL</div>
  <div class="stack">
    <div class="tier" id="t1"><div class="name">Anthropic</div><div class="desc">Sets absolute limits (training)</div></div>
    <div class="arrowWrap" id="a1">
      <span class="arrow down" id="a1down">↓ capability</span>
      <span class="arrow up" id="a1up">↑ request</span>
    </div>
    <div class="tier operator" id="t2"><div class="name">Operator</div><div class="desc">System prompt + tool access</div></div>
    <div class="arrowWrap" id="a2">
      <span class="arrow down" id="a2down">↓ capability</span>
      <span class="arrow up" id="a2up">↑ request</span>
    </div>
    <div class="tier" id="t3"><div class="name">User</div><div class="desc">Runtime requests</div></div>
  </div>
<script>
window.__setFrame = function(i){
  const t1=document.getElementById('t1'), t2=document.getElementById('t2'), t3=document.getElementById('t3');
  const a1d=document.getElementById('a1down'), a1u=document.getElementById('a1up');
  const a2d=document.getElementById('a2down'), a2u=document.getElementById('a2up');
  t1.classList.toggle('visible', i>=1);
  a1d.classList.toggle('visible', i>=3);
  t2.classList.toggle('visible', i>=4);
  a1u.classList.toggle('visible', i>=6);
  a2d.classList.toggle('visible', i>=7);
  t3.classList.toggle('visible', i>=8);
  a2u.classList.toggle('visible', i>=10);
  if (i>=12 && i<=18) {
    const t = (i-12)/6;
    const intensity = Math.abs(Math.sin(t*Math.PI));
    t2.style.boxShadow = '0 0 ' + Math.round(16*intensity) + 'px rgba(240,81,46,' + (0.15+0.35*intensity) + ')';
  } else {
    t2.style.boxShadow = 'none';
  }
};
</script>
</body>
</html>
`;

(async () => {
  await renderGif({
    html: deployLoopHtml,
    frameCount: 20,
    delayMs: 180,
    setFrame: (i) => window.__setFrame(i),
    outFile: path.join(OUT_DIR, 'fds-part4-deploy-loop.gif'),
  });

  await renderGif({
    html: permissionModelHtml,
    frameCount: 20,
    delayMs: 180,
    setFrame: (i) => window.__setFrame(i),
    outFile: path.join(OUT_DIR, 'fds-part4-permission-model.gif'),
  });
})();
