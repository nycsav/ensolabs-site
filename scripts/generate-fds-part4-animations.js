// No GIF-encoding tooling (gifencoder/pngjs) exists in this repo — only puppeteer.
// Producing single-frame static PNGs at the same visual specs instead of animated GIFs.
const puppeteer = require('puppeteer');
const path = require('path');

async function shoot(html, outFile) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'images', 'insights', outFile), type: 'png' });
  await browser.close();
  console.log('Generated:', outFile);
}

const deployLoopHtml = `
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Inter+Tight:wght@600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px; height: 630px; background: #0D1117;
      font-family: 'JetBrains Mono', monospace;
      display: flex; flex-direction: column; justify-content: center;
      padding: 0 80px;
    }
    .cap {
      font-family: 'Inter Tight', sans-serif; font-size: 15px; color: #6B7280;
      letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 40px;
    }
    .line { font-size: 22px; margin-bottom: 26px; display: flex; align-items: center; gap: 16px; }
    .num { color: #4B5563; font-size: 16px; width: 20px; }
    .step1, .step4 { color: #F0512E; }
    .step2 { color: #E6E1D6; }
    .step3 { color: #5CE0D2; text-shadow: 0 0 18px rgba(92,224,210,0.5); }
  </style>
</head>
<body>
  <div class="cap">The four-step loop at the heart of every AI-native deployment</div>
  <div class="line"><span class="num">1</span><span class="step1">user_context = retrieve_and_rank(tasks, calendar, prefs)</span></div>
  <div class="line"><span class="num">2</span><span class="step2">prompt = build_prompt(system, user_context, request)</span></div>
  <div class="line"><span class="num">3</span><span class="step3">response = claude.messages.create(model, prompt, tools)</span></div>
  <div class="line"><span class="num">4</span><span class="step4">action = parse_and_validate(response)</span></div>
</body>
</html>`;

const permissionModelHtml = `
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=JetBrains+Mono:wght@500;700&family=Inter+Tight:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px; height: 630px; background: #F7F1E6;
      font-family: 'Inter Tight', sans-serif;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 22px;
    }
    .tier {
      width: 620px; padding: 20px 28px; border-radius: 10px;
      display: flex; align-items: center; justify-content: space-between;
      background: #FFFFFF; border: 1.5px solid #DDD2BC;
    }
    .tier.operator { border: 2px solid #F0512E; }
    .name { font-family: 'Lora', serif; font-size: 24px; font-weight: 600; color: #1E1813; }
    .desc { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #79705F; }
    .arrow { font-size: 20px; color: #F0512E; }
  </style>
</head>
<body>
  <div class="tier"><span class="name">Anthropic</span><span class="desc">Sets absolute limits (training)</span></div>
  <div class="arrow">↓ ↑</div>
  <div class="tier operator"><span class="name">Operator</span><span class="desc">System prompt + tool access</span></div>
  <div class="arrow">↓ ↑</div>
  <div class="tier"><span class="name">User</span><span class="desc">Runtime requests</span></div>
</body>
</html>`;

(async () => {
  await shoot(deployLoopHtml, 'fds-part4-deploy-loop.png');
  await shoot(permissionModelHtml, 'fds-part4-permission-model.png');
})();
