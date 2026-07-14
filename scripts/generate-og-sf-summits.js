const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Generates the "Meet us in SF" summit-announcement social cards (photo version —
// full-bleed Golden Gate sunset, Perplexity-card treatment):
//   public/og/og-enso-labs-sf-agentic-ai-summits-2026.png           (1200x630  — article OG + landscape social)
//   public/og/og-enso-labs-sf-agentic-ai-summits-2026-portrait.png  (1080x1350 — LinkedIn portrait)
// The background photo is fetched from Unsplash AT GENERATION TIME and baked into the
// PNGs (Unsplash License — free commercial use). To use a studio-owned SF photo instead,
// swap the images.unsplash.com URLs below and re-run.
// Mirrors scripts/generate-og.js: inline HTML -> headless Chromium -> PNG. Run: npm run og:sf-summits

const OUT = path.join(__dirname, '..', 'public', 'og');

const LAND_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Lora:wght@600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --navy:#0D1321;
    --card:#111A2C;
    --teal:#5CE0D2;
    --coral:#F0512E;
    --ink:#F5F4F0;
    --muted:#A9B2C6;
    --dek:#C7D0E2;
    --line:rgba(92,224,210,0.30);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{background:#141821;}
  body{font-family:'Inter Tight',sans-serif;-webkit-font-smoothing:antialiased;}

  /* ---- shared poster surface ---- */
  .poster{
    position:absolute;
    background:var(--navy);
    color:var(--ink);
    overflow:hidden;
    display:flex;
    flex-direction:column;
    isolation:isolate;
  }
  .poster::before{
    content:"";
    position:absolute;inset:0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size:60px 60px;
    z-index:0;pointer-events:none;
  }
  .poster > *{position:relative;z-index:2;}

  /* ---- brand lockup ---- */
  .brand{display:flex;align-items:center;gap:14px;}
  .glyph{display:block;flex:none;}
  .glyph path{fill:var(--teal);}
  .wordmark{
    font-weight:700;letter-spacing:0.10em;color:var(--ink);
    font-size:22px;line-height:1;text-transform:uppercase;
  }
  .kicker{
    font-family:'JetBrains Mono',monospace;font-weight:500;
    text-transform:uppercase;color:var(--teal);
    letter-spacing:0.16em;
  }

  /* ---- shared type bits ---- */
  .ev-name{
    font-weight:800;color:var(--ink);text-transform:uppercase;
    letter-spacing:-0.005em;line-height:1.02;
  }
  .ev-date{
    font-family:'JetBrains Mono',monospace;font-weight:700;
    color:var(--teal);letter-spacing:0.02em;
  }
  .ev-venue{
    font-family:'JetBrains Mono',monospace;font-weight:400;
    color:var(--muted);letter-spacing:0.12em;text-transform:uppercase;
  }
  .ev-stats{
    font-family:'JetBrains Mono',monospace;font-weight:400;
    color:var(--muted);letter-spacing:0.10em;text-transform:uppercase;
  }
  .ev-link{
    font-family:'JetBrains Mono',monospace;font-weight:500;
    color:var(--teal);letter-spacing:0.06em;
    text-decoration:underline;text-underline-offset:3px;
    text-decoration-color:rgba(92,224,210,.5);
  }
  .pill{
    font-family:'JetBrains Mono',monospace;font-weight:700;
    color:var(--teal);border:1.5px solid var(--teal);border-radius:999px;
    letter-spacing:0.04em;background:rgba(10,16,28,.6);
    display:inline-flex;align-items:center;white-space:nowrap;
  }
  .alt{
    font-family:'JetBrains Mono',monospace;font-weight:400;
    color:var(--muted);letter-spacing:0.04em;
  }

  /* ================================================================
     A · PHOTO VERSION — full-bleed Golden Gate (Perplexity-card energy)
     ================================================================ */
  .photo::before{display:none;}
  .photo .bg{
    position:absolute;inset:0;width:100%;height:100%;
    object-fit:cover;z-index:0;
  }
  .photo .scrim{
    position:absolute;inset:0;z-index:1;
    background:
      linear-gradient(180deg,
        rgba(13,19,33,0.93) 0%,
        rgba(13,19,33,0.46) 34%,
        rgba(13,19,33,0.52) 60%,
        rgba(13,19,33,0.94) 100%);
  }
  .photo .ph-head{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .photo .ph-headline{
    font-family:'Lora',serif;font-weight:600;color:var(--ink);
    letter-spacing:-0.015em;line-height:1.02;
    text-shadow:0 2px 24px rgba(9,13,24,.55);
  }
  .photo .ph-dek{
    color:var(--dek);font-weight:500;line-height:1.4;
    text-shadow:0 1px 14px rgba(9,13,24,.6);
  }
  .chip{
    background:rgba(10,16,28,.74);border:1.5px solid var(--line);
    border-radius:12px;display:flex;flex-direction:column;
    align-items:flex-start;text-align:left;
  }
  .photo .arrow{display:flex;align-items:center;justify-content:center;flex:none;}
  .photo .arrow svg{display:block;overflow:visible;background:rgba(10,16,28,.6);border-radius:12px;padding:8px 14px;filter:drop-shadow(0 2px 10px rgba(9,13,24,.5));}
  .ph-cta{display:flex;align-items:center;justify-content:center;}

  /* --- photo landscape 1200x630 --- */
  .pland{
    width:1200px;height:630px;
    padding:40px 64px 36px;
    justify-content:space-between;align-items:center;text-align:center;
  }
  .pland .glyph{height:30px;width:auto;}
  .pland .wordmark{font-size:20px;}
  .pland .kicker{font-size:12.5px;}
  .pland .ph-headline{font-size:80px;}
  .pland .ph-dek{font-size:20px;max-width:66ch;margin-top:12px;}
  .pland .ph-events{display:flex;align-items:stretch;width:100%;}
  .pland .chip{flex:1;padding:18px 24px;gap:7px;}
  .pland .c-name{font-size:22px;}
  .pland .ev-date{font-size:15px;}
  .pland .ev-date .ev-venue{font-size:13px;}
  .pland .ev-stats{font-size:11.5px;}
  .pland .ev-link{font-size:12px;margin-top:2px;}
  .pland .arrow{width:96px;}
  .pland .ph-cta{gap:18px;}
  .pland .pill{font-size:15px;padding:12px 26px;}
  .pland .alt{font-size:13px;}
</style>
<style>
 html,body{margin:0;padding:0;background:#0D1321;width:1200px;height:630px;overflow:hidden;}
 .poster{left:0!important;top:0!important;}
</style></head><body><div class="poster photo pland" style="left:0;top:0;" data-screen-label="A Photo Landscape 1200x630">
    <img class="bg" src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1600&amp;q=80" alt="">
    <div class="scrim"></div>
    <header class="ph-head">
      <div class="brand">
        <svg class="glyph" viewBox="30 200 80 100" aria-label="Enso Labs">
          <path transform="scale(2.5 2.5)" d="M32.9394 101.971L36.5888 102.372C36.0623 103.664 35.5152 104.536 34.5833 105.558L32.5901 107.071C32.5117 105.837 32.1667 102.915 32.9394 101.971Z"></path>
          <path transform="scale(2.5 2.5)" d="M16.7764 102.101L30.5777 102.099C30.5506 104.161 30.986 107.411 30.3368 109.304C29.9817 110.339 29.1166 111.404 28.4905 112.3L26.5486 114.385L17.3808 104.119C16.8662 103.416 16.6245 102.971 16.7764 102.101Z"></path>
          <path transform="scale(2.5 2.5)" d="M16.074 86.1907C20.2142 86.2592 24.3559 86.2275 28.4966 86.2393C31.4925 86.2477 34.47 86.1731 37.434 86.687L31.8065 92.6102L26.6631 98.496C24.83 96.6946 23.2043 94.7461 21.4684 92.8576C19.6005 90.8256 17.3016 88.6797 16.074 86.1907Z"></path>
        </svg>
        <span class="wordmark">Enso Labs</span>
      </div>
      <div class="kicker">On the ground in San Francisco · Summer 2026</div>
    </header>

    <div class="ph-hero">
      <div class="ph-headline">Meet us in SF.</div>
      <div class="ph-dek">The demo era is ending — the hard part is agents that survive production. If you’re building or buying agentic AI, let’s meet.</div>
    </div>

    <div class="ph-events">
      <div class="chip">
        <div class="ev-name c-name">AGI Summit 2026</div>
        <div class="ev-date">Jul 18–19 <span class="ev-venue">· Palace of Fine Arts, SF</span></div>
        <div class="ev-stats">15,000+ attendees · 200+ speakers</div>
        <div class="ev-link">agisummit.ai</div>
      </div>
      <div class="arrow">
        <svg width="76" height="49" viewBox="0 0 50 32">
          <path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill="#F0512E"></path>
        </svg>
      </div>
      <div class="chip">
        <div class="ev-name c-name">Berkeley Agentic AI Summit</div>
        <div class="ev-date">Aug 1–2 <span class="ev-venue">· UC Berkeley</span></div>
        <div class="ev-stats">5,000+ attendees · 4 stages · Berkeley RDI</div>
        <div class="ev-link">rdi.berkeley.edu</div>
      </div>
    </div>

    <div class="ph-cta">
      <span class="pill">Book 20 minutes in SF → ensolabs.ai/contact</span>
      <span class="alt">or email sav@ensolabs.ai</span>
    </div>
  </div></body></html>`;

const PORT_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Lora:wght@600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --navy:#0D1321;
    --card:#111A2C;
    --teal:#5CE0D2;
    --coral:#F0512E;
    --ink:#F5F4F0;
    --muted:#A9B2C6;
    --dek:#C7D0E2;
    --line:rgba(92,224,210,0.30);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{background:#141821;}
  body{font-family:'Inter Tight',sans-serif;-webkit-font-smoothing:antialiased;}

  /* ---- shared poster surface ---- */
  .poster{
    position:absolute;
    background:var(--navy);
    color:var(--ink);
    overflow:hidden;
    display:flex;
    flex-direction:column;
    isolation:isolate;
  }
  .poster::before{
    content:"";
    position:absolute;inset:0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size:60px 60px;
    z-index:0;pointer-events:none;
  }
  .poster > *{position:relative;z-index:2;}

  /* ---- brand lockup ---- */
  .brand{display:flex;align-items:center;gap:14px;}
  .glyph{display:block;flex:none;}
  .glyph path{fill:var(--teal);}
  .wordmark{
    font-weight:700;letter-spacing:0.10em;color:var(--ink);
    font-size:22px;line-height:1;text-transform:uppercase;
  }
  .kicker{
    font-family:'JetBrains Mono',monospace;font-weight:500;
    text-transform:uppercase;color:var(--teal);
    letter-spacing:0.16em;
  }

  /* ---- shared type bits ---- */
  .ev-name{
    font-weight:800;color:var(--ink);text-transform:uppercase;
    letter-spacing:-0.005em;line-height:1.02;
  }
  .ev-date{
    font-family:'JetBrains Mono',monospace;font-weight:700;
    color:var(--teal);letter-spacing:0.02em;
  }
  .ev-venue{
    font-family:'JetBrains Mono',monospace;font-weight:400;
    color:var(--muted);letter-spacing:0.12em;text-transform:uppercase;
  }
  .ev-stats{
    font-family:'JetBrains Mono',monospace;font-weight:400;
    color:var(--muted);letter-spacing:0.10em;text-transform:uppercase;
  }
  .ev-link{
    font-family:'JetBrains Mono',monospace;font-weight:500;
    color:var(--teal);letter-spacing:0.06em;
    text-decoration:underline;text-underline-offset:3px;
    text-decoration-color:rgba(92,224,210,.5);
  }
  .pill{
    font-family:'JetBrains Mono',monospace;font-weight:700;
    color:var(--teal);border:1.5px solid var(--teal);border-radius:999px;
    letter-spacing:0.04em;background:rgba(10,16,28,.6);
    display:inline-flex;align-items:center;white-space:nowrap;
  }
  .alt{
    font-family:'JetBrains Mono',monospace;font-weight:400;
    color:var(--muted);letter-spacing:0.04em;
  }

  /* ================================================================
     A · PHOTO VERSION — full-bleed Golden Gate (Perplexity-card energy)
     ================================================================ */
  .photo::before{display:none;}
  .photo .bg{
    position:absolute;inset:0;width:100%;height:100%;
    object-fit:cover;z-index:0;
  }
  .photo .scrim{
    position:absolute;inset:0;z-index:1;
    background:
      linear-gradient(180deg,
        rgba(13,19,33,0.93) 0%,
        rgba(13,19,33,0.46) 34%,
        rgba(13,19,33,0.52) 60%,
        rgba(13,19,33,0.94) 100%);
  }
  .photo .ph-head{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .photo .ph-headline{
    font-family:'Lora',serif;font-weight:600;color:var(--ink);
    letter-spacing:-0.015em;line-height:1.02;
    text-shadow:0 2px 24px rgba(9,13,24,.55);
  }
  .photo .ph-dek{
    color:var(--dek);font-weight:500;line-height:1.4;
    text-shadow:0 1px 14px rgba(9,13,24,.6);
  }
  .chip{
    background:rgba(10,16,28,.74);border:1.5px solid var(--line);
    border-radius:12px;display:flex;flex-direction:column;
    align-items:flex-start;text-align:left;
  }
  .photo .arrow{display:flex;align-items:center;justify-content:center;flex:none;}
  .photo .arrow svg{display:block;overflow:visible;background:rgba(10,16,28,.6);border-radius:12px;padding:8px 14px;filter:drop-shadow(0 2px 10px rgba(9,13,24,.5));}
  .ph-cta{display:flex;align-items:center;justify-content:center;}

  /* --- photo portrait 1080x1350 --- */
  .pport{
    width:1080px;height:1350px;
    padding:64px 72px 58px;
    justify-content:space-between;align-items:center;text-align:center;
  }
  .pport .bg{object-position:58% 42%;}
  .pport .glyph{height:38px;width:auto;}
  .pport .wordmark{font-size:25px;}
  .pport .kicker{font-size:15px;}
  .pport .ph-headline{font-size:104px;}
  .pport .ph-dek{font-size:23px;max-width:44ch;margin-top:18px;}
  .pport .ph-events{display:flex;flex-direction:column;width:100%;}
  .pport .chip{padding:28px 34px;gap:10px;}
  .pport .c-name{font-size:32px;}
  .pport .ev-date{font-size:19px;}
  .pport .ev-stats{font-size:14px;}
  .pport .ev-link{font-size:14.5px;margin-top:3px;}
  .pport .arrow{height:88px;width:100%;}
  .pport .arrow svg{transform:rotate(90deg);}
  .pport .ph-cta{flex-direction:column;gap:14px;}
  .pport .pill{font-size:17px;padding:15px 32px;}
  .pport .alt{font-size:14.5px;}
</style>
<style>
 html,body{margin:0;padding:0;background:#0D1321;width:1080px;height:1350px;overflow:hidden;}
 .poster{left:0!important;top:0!important;}
</style></head><body><div class="poster photo pport" style="left:1320px;top:0;" data-screen-label="A Photo Portrait 1080x1350">
    <img class="bg" src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1600&amp;q=80" alt="">
    <div class="scrim"></div>
    <header class="ph-head">
      <div class="brand">
        <svg class="glyph" viewBox="30 200 80 100" aria-label="Enso Labs">
          <path transform="scale(2.5 2.5)" d="M32.9394 101.971L36.5888 102.372C36.0623 103.664 35.5152 104.536 34.5833 105.558L32.5901 107.071C32.5117 105.837 32.1667 102.915 32.9394 101.971Z"></path>
          <path transform="scale(2.5 2.5)" d="M16.7764 102.101L30.5777 102.099C30.5506 104.161 30.986 107.411 30.3368 109.304C29.9817 110.339 29.1166 111.404 28.4905 112.3L26.5486 114.385L17.3808 104.119C16.8662 103.416 16.6245 102.971 16.7764 102.101Z"></path>
          <path transform="scale(2.5 2.5)" d="M16.074 86.1907C20.2142 86.2592 24.3559 86.2275 28.4966 86.2393C31.4925 86.2477 34.47 86.1731 37.434 86.687L31.8065 92.6102L26.6631 98.496C24.83 96.6946 23.2043 94.7461 21.4684 92.8576C19.6005 90.8256 17.3016 88.6797 16.074 86.1907Z"></path>
        </svg>
        <span class="wordmark">Enso Labs</span>
      </div>
      <div class="kicker">On the ground in San Francisco · Summer 2026</div>
    </header>

    <div class="ph-hero">
      <div class="ph-headline">Meet us in SF.</div>
      <div class="ph-dek">The demo era is ending — the hard part is agents that survive production. If you’re building or buying agentic AI, let’s meet.</div>
    </div>

    <div class="ph-events">
      <div class="chip">
        <div class="ev-name c-name">AGI Summit 2026</div>
        <div class="ev-date">Jul 18–19 <span class="ev-venue">· Palace of Fine Arts, SF</span></div>
        <div class="ev-stats">15,000+ attendees · 200+ speakers</div>
        <div class="ev-link">agisummit.ai</div>
      </div>
      <div class="arrow">
        <svg width="86" height="55" viewBox="0 0 50 32">
          <path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill="#F0512E"></path>
        </svg>
      </div>
      <div class="chip">
        <div class="ev-name c-name">Berkeley Agentic AI Summit</div>
        <div class="ev-date">Aug 1–2 <span class="ev-venue">· UC Berkeley</span></div>
        <div class="ev-stats">5,000+ attendees · 4 stages · Berkeley RDI</div>
        <div class="ev-link">rdi.berkeley.edu</div>
      </div>
    </div>

    <div class="ph-cta">
      <span class="pill">Book 20 minutes in SF → ensolabs.ai/contact</span>
      <span class="alt">or email sav@ensolabs.ai</span>
    </div>
  </div></body></html>`;

const shots = [
  { html: LAND_HTML, out: 'og-enso-labs-sf-agentic-ai-summits-2026.png', w: 1200, h: 630 },
  { html: PORT_HTML, out: 'og-enso-labs-sf-agentic-ai-summits-2026-portrait.png', w: 1080, h: 1350 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const s of shots) {
      const page = await browser.newPage();
      await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2 });
      await page.setContent(s.html, { waitUntil: 'networkidle0' });
      // ensure webfonts + the background photograph are fully in before capture
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        await Promise.all(Array.from(document.images).map((img) =>
          img.complete ? Promise.resolve() : new Promise((res) => { img.onload = res; img.onerror = res; })));
      });
      const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: s.w, height: s.h } });
      await sharp(buf).resize(s.w, s.h).png().toFile(path.join(OUT, s.out));
      console.log('wrote public/og/' + s.out + ' (' + s.w + 'x' + s.h + ')');
      await page.close();
    }
  } finally {
    await browser.close();
  }
})();
