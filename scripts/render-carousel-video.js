/* Strategy → Ship — animated carousel.
 * PDFs and LinkedIn image carousels are static. Native video is the only format
 * that animates in feed, so this renders the same 10 slides as an MP4:
 * each slide's glyph draws in (~1.1s), holds (~1.9s), then cuts to the next.
 *
 * Also writes per-slide GIFs so any single slide can be posted on its own.
 * Usage: node scripts/render-carousel-video.js
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUT = path.join(__dirname, '..', 'out', 'carousels', 'agent-harness');
const TMP = '/tmp/sts-carousel-video';
const STEPS = 18;       // animation frames per slide
const HOLD = 30;        // held frames per slide
const FPS = 16;
const SLIDES = 10;

// Slides whose glyph actually animates; the rest just hold.
const ANIMATED = new Set([2, 3, 4, 5, 6, 7, 8]);

(async () => {
  fs.rmSync(TMP, { recursive: true, force: true });
  for (let i = 1; i <= SLIDES; i++) fs.mkdirSync(path.join(TMP, String(i)), { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  // Build the deck once per progress step, capturing every slide at that step.
  for (let s = 0; s < STEPS; s++) {
    const prog = s / (STEPS - 1);
    process.env.STS_PROG = String(prog);
    delete require.cache[require.resolve('./render-geo-carousel.js')];

    // Re-derive the deck HTML at this progress value without re-running its IIFE.
    const src = fs.readFileSync(path.join(__dirname, 'render-geo-carousel.js'), 'utf8');
    const htmlOnly = src.slice(0, src.indexOf('(async () => {')) + '\nmodule.exports = { html };\n';
    // Must live beside the real script so its relative requires resolve.
    const tmpMod = path.join(__dirname, '_deck.tmp.js');
    fs.writeFileSync(tmpMod, htmlOnly);
    delete require.cache[tmpMod];
    const { html } = require(tmpMod);

    const pg = await browser.newPage();
    await pg.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
    await pg.setContent(html, { waitUntil: 'load', timeout: 60000 });
    await new Promise((r) => setTimeout(r, s === 0 ? 1200 : 350));
    const els = await pg.$$('.slide');
    for (let i = 0; i < els.length; i++) {
      await els[i].screenshot({ path: path.join(TMP, String(i + 1), String(s).padStart(3, '0') + '.png') });
    }
    await pg.close();
    process.stdout.write(`\r  frames ${s + 1}/${STEPS}`);
  }
  await browser.close();
  fs.rmSync(path.join(__dirname, '_deck.tmp.js'), { force: true });
  console.log('');

  // Per-slide clips: animate (or freeze), then hold.
  const clips = [];
  for (let i = 1; i <= SLIDES; i++) {
    const dir = path.join(TMP, String(i));
    const seq = path.join(TMP, `seq${i}`);
    fs.mkdirSync(seq, { recursive: true });
    let n = 0;
    const anim = ANIMATED.has(i);
    for (let s = 0; s < STEPS; s++) {
      const src = path.join(dir, String(anim ? s : STEPS - 1).padStart(3, '0') + '.png');
      fs.copyFileSync(src, path.join(seq, String(n++).padStart(3, '0') + '.png'));
    }
    for (let h = 0; h < HOLD; h++) {
      fs.copyFileSync(path.join(dir, String(STEPS - 1).padStart(3, '0') + '.png'),
        path.join(seq, String(n++).padStart(3, '0') + '.png'));
    }
    const clip = path.join(TMP, `clip${i}.mp4`);
    execSync(`ffmpeg -y -framerate ${FPS} -i ${seq}/%03d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=1080:1350" ${clip}`, { stdio: 'ignore' });
    clips.push(clip);

    // Standalone GIF for the animated slides — postable on its own.
    if (anim) {
      execSync(`ffmpeg -y -framerate ${FPS} -i ${seq}/%03d.png -vf "scale=1080:1350:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=bayer" ${path.join(OUT, 'carousel-slides', `slide-${String(i).padStart(2, '0')}.gif`)}`, { stdio: 'ignore' });
    }
  }

  const list = path.join(TMP, 'list.txt');
  fs.writeFileSync(list, clips.map((c) => `file '${c}'`).join('\n'));
  execSync(`ffmpeg -y -f concat -safe 0 -i ${list} -c copy ${path.join(OUT, 'carousel-animated.mp4')}`, { stdio: 'ignore' });

  const secs = (SLIDES * (STEPS + HOLD)) / FPS;
  console.log(`carousel-animated.mp4 -> ${SLIDES} slides, ~${secs.toFixed(0)}s`);
  console.log(`per-slide GIFs -> carousel-slides/slide-NN.gif`);
})();
