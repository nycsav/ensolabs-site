/* Shared template: Enso Labs "signature landscape" OG/hero card.
 * Flat vector / night-sky landscape motif — layered silhouettes + gradient
 * sky in Enso's locked palette (Teal #5CE0D2, Amber #E0A23C, Coral #F0512E,
 * Paper #F7F1E6, Ink #1E1813), with the real Enso Labs vector logo (not a
 * raster copy) so every render stays crisp at any output size.
 * Reference: Perplexity's homepage hero (canyon silhouette + starry gradient
 * sky + serif headline) and a Perplexity-style flat vector landscape card.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const FONTS = `https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Inter+Tight:wght@400;500&family=JetBrains+Mono:wght@500;700&display=swap`;

const LOGO_SVG = `<svg class="logo" viewBox="35 195 430 110" fill="#ffffff">
  <path fill="#5ce0d2" transform="scale(2.5 2.5)" d="M32.9394 101.971L36.5888 102.372C36.0623 103.664 35.5152 104.536 34.5833 105.558L32.5901 107.071C32.5117 105.837 32.1667 102.915 32.9394 101.971Z"/>
  <path transform="scale(2.5 2.5)" d="M46.2017 81.0638C46.9809 81.2768 47.1378 81.2657 47.6067 81.923C48.1661 87.3312 47.7818 93.1851 47.8009 98.6409C47.8154 102.795 47.818 106.949 47.8005 111.103C47.7898 113.641 47.9494 116.349 47.4757 118.842L46.5 118.741C46.394 118.61 46.1445 118.377 46.0875 118.232C45.8925 117.737 46.019 116.401 46.0172 115.824C46.0103 113.586 46.012 111.349 46.011 109.112C46.0087 103.895 46.041 98.6759 46.0001 93.459C45.9678 89.3351 45.809 85.176 46.2017 81.0638Z"/>
  <path fill="#5ce0d2" transform="scale(2.5 2.5)" d="M16.7764 102.101L30.5777 102.099C30.5506 104.161 30.986 107.411 30.3368 109.304C29.9817 110.339 29.1166 111.404 28.4905 112.3L26.5486 114.385L17.3808 104.119C16.8662 103.416 16.6245 102.971 16.7764 102.101Z"/>
  <path transform="scale(2.5 2.5)" d="M174.835 92.2967C177.254 92.0048 180.253 92.0338 182.463 93.125C182.547 94.2452 181.934 95.0162 181.428 96.0036L178.807 95.0664C177.971 94.8757 176.45 94.9643 175.716 95.4516C175.062 95.8861 174.914 96.1546 174.745 96.875C176.534 99.437 180.43 98.1978 182.536 100.809C183.631 102.166 183.379 103.067 183.179 104.685C181.675 106.587 180.836 107.268 178.417 107.731C175.946 107.793 174.012 107.672 171.625 106.958C170.932 106.228 171.052 105.837 171.017 104.875C171.407 104.218 171.6 104.147 172.25 103.787L174.155 104.538C176.563 105.45 178.276 104.645 180.49 103.647C178.788 102.369 177.545 101.828 175.546 101.153C173.92 100.605 172.127 99.8642 171.358 98.2312C170.878 97.2099 170.957 96.2519 171.368 95.2089C171.982 93.6493 173.386 92.9225 174.835 92.2967Z"/>
  <path transform="scale(2.5 2.5)" d="M88.7894 92.3909C91.3445 92.1233 94.0578 91.7393 96.375 93.0617C96.7473 93.8352 96.5549 94.4188 96.4593 95.25C96.3684 95.3445 96.0999 95.6899 96 95.7274C95.9006 95.7647 94.9332 95.5217 94.7552 95.4902C93.3089 95.2341 91.655 94.8354 90.2197 95.2944C89.5218 95.5176 89.4373 95.746 89.125 96.3665C89.1954 96.9298 89.1845 97.2424 89.6839 97.6152C90.0309 97.8743 90.6206 97.9181 91.0311 98.0532C93.8262 98.9729 95.8518 99.3505 97.8927 101.604C98.1414 103.07 97.5625 104.43 97.1848 105.836C95.5694 107.126 94.6108 107.497 92.5491 107.768C90.57 107.87 88.4012 107.859 86.535 107.088C85.764 106.769 85.4994 106.349 85.1925 105.625C85.2831 104.892 85.6282 104.454 86.0612 103.875C87.0091 103.614 87.582 104.33 88.5345 104.478C89.7771 104.672 90.8638 104.818 92.1328 104.764C92.9546 104.73 93.416 104.531 93.9637 103.913C94.1495 103.704 94.0677 103.519 94.051 103.25C92.7235 101.721 90.6461 101.589 88.8171 100.899C87.6813 100.471 86.1833 99.7685 85.6821 98.5824C85.2675 97.6011 85.2042 96.4412 85.6187 95.4512C86.1589 94.161 87.5245 92.9446 88.7894 92.3909Z"/>
  <path transform="scale(2.5 2.5)" d="M54.0084 92.2075C56.6308 92.2159 59.2532 92.2311 61.8756 92.2455C62.9618 92.2515 64.489 92.0353 65.4117 92.5775C65.5107 93.4348 65.6955 94.0394 65.3464 94.8512C63.2768 95.6649 59.8782 95.0571 57.578 95.0336C57.7461 96.1883 57.6762 97.1344 57.5034 98.2801C58.9384 98.3259 63.5892 98.0246 64.625 98.7942C64.6752 99.4732 64.6011 100.08 64.4916 100.75C63.2279 101.739 59.46 101.408 57.8084 101.395L57.6033 104.375L58 104.721C58.6447 104.557 59.2531 104.517 59.9144 104.503C61.7859 104.463 64.2353 104.17 65.6722 105.549C65.8276 106.29 66.0423 106.809 65.7891 107.544C64.7882 107.959 63.1618 107.656 62.0537 107.661C59.3745 107.672 56.6882 107.795 54.01 107.88L54.0084 92.2075Z"/>
  <path fill="#5ce0d2" transform="scale(2.5 2.5)" d="M16.074 86.1907C20.2142 86.2592 24.3559 86.2275 28.4966 86.2393C31.4925 86.2477 34.47 86.1731 37.434 86.687L31.8065 92.6102L26.6631 98.496C24.83 96.6946 23.2043 94.7461 21.4684 92.8576C19.6005 90.8256 17.3016 88.6797 16.074 86.1907Z"/>
  <path transform="scale(2.5 2.5)" d="M68.3335 92.1363L70.4957 92.2193C72.4564 92.386 74.124 95.3231 75.2467 96.75C76.4964 98.3382 77.8469 99.8647 79.1334 101.426L79.2147 92.7074C80.2317 92.4535 81.3335 92.1052 82.375 92.3566C82.9512 93.3542 82.7584 95.4146 82.7656 96.5894C82.7882 100.267 82.7822 103.947 82.7476 107.625L82.1937 107.906L79.3848 107.588C78.3638 106.249 77.4124 104.848 76.343 103.547C74.7726 101.637 73.3203 100.118 72.0998 97.9226L71.9523 107.25C71.2118 107.966 69.5479 107.849 68.4945 107.936L68.3335 92.1363Z"/>
  <path transform="scale(2.5 2.5)" d="M155.302 92.2554C158.956 92.2219 162.474 92.1269 166.092 92.76L166.726 93.4628C167.467 94.31 168.565 95.5637 168.488 96.75C168.133 97.7833 167.832 98.3268 166.987 99.055C166.842 99.1801 166.847 99.4369 166.812 99.625C167.642 100.105 168.364 101.045 168.763 101.905C169.238 102.932 169.198 104.735 168.821 105.792C167.632 106.436 166.47 107.115 165.147 107.439C162.11 108.183 158.126 107.779 154.997 107.811L155.302 92.2554ZM158.885 101.302C158.487 102.49 158.578 103.664 158.466 104.892L164.437 104.927C164.96 104.157 165.3 103.543 165.481 102.625C165.053 101.902 164.458 101.528 163.625 101.338C162.251 101.025 160.308 101.285 158.885 101.302ZM158.787 95.0808C158.51 96.1409 158.706 97.1705 158.529 98.25L158.875 98.5535L164.084 98.2846C164.559 97.6705 164.789 97.4598 164.71 96.6396C164.675 96.2832 164.457 95.9311 164.282 95.625C162.651 94.8715 160.546 95.0662 158.787 95.0808Z"/>
  <path transform="scale(2.5 2.5)" d="M105.305 92.2754C107.138 92.0591 109.521 92.092 111.25 92.7801L111.553 92.8987C112.978 93.493 114.862 95.3578 115.417 96.8042C116.122 98.6427 116.353 100.839 115.558 102.673C114.326 105.518 112.574 106.574 109.796 107.678C107.802 108.024 105.693 107.836 103.791 107.147C101.811 106.43 100.483 104.474 99.6899 102.619C99.0217 101.057 99.1349 99.1293 99.7483 97.5886C100.925 94.6334 102.387 93.5299 105.305 92.2754ZM107.104 95.2479C105.754 95.4677 105.128 95.7682 104.293 96.9137C103.468 98.0463 102.633 99.7296 102.908 101.161C103.129 102.316 104.552 103.553 105.491 104.169C106.35 104.733 107.592 104.72 108.593 104.687C109.949 104.364 111.179 103.325 111.891 102.128C112.529 101.056 112.671 100.047 112.35 98.8421C112.085 97.8487 111.653 97.1134 110.999 96.3234C110.381 95.5754 108.866 95.3064 107.93 95.2275C107.653 95.2042 107.379 95.2179 107.104 95.2479Z"/>
  <path transform="scale(2.5 2.5)" d="M125.05 92.1733L128.534 92.424C128.626 96.4035 128.95 100.726 128.497 104.674C130.306 104.645 133.621 104.266 135.227 104.914C136.046 105.244 136.266 106.107 136.62 106.875C137.39 106.092 137.495 104.64 137.953 103.629C139.677 99.8249 141.723 96.1496 143.183 92.2325L146.633 92.3073C148.076 94.8385 148.938 97.5456 150.152 100.183C151.443 102.686 152.152 105.387 153.557 107.794L149.698 107.745C149.19 106.702 148.785 105.68 148.668 104.519L141.17 104.464C140.899 105.473 140.577 106.802 139.845 107.57C139.615 107.812 137.627 107.886 137.25 107.735C136.99 107.631 136.847 107.281 136.538 107.28C136.179 107.279 135.931 107.627 135.625 107.752C135.19 107.931 133.911 107.765 133.36 107.769C130.571 107.79 127.782 107.815 124.994 107.853L125.05 92.1733ZM144.643 96.1377C144.006 97.7719 143.546 99.5685 142.782 101.125L143 101.484L145.757 101.802L146.732 101.695C146.955 100.752 145.935 97.6997 145.399 96.8252C145.19 96.483 145.018 96.2974 144.643 96.1377Z"/>
</svg>`;

// Each variant: sky gradient, whether stars render, and ridge layer shapes/colors.
const VARIANTS = {
  aurora: {
    sky: 'linear-gradient(180deg,#0D1321 0%,#0D1321 38%,#16233A 55%,#3A4A4E 68%,#C97A3E 82%,#F0512E 96%)',
    stars: true,
    glow: 'radial-gradient(ellipse at center bottom, rgba(240,81,46,0.55) 0%, rgba(224,162,60,0.28) 40%, transparent 72%)',
    ridges: [
      { height: 190, color: '#1E1813', points: '0% 55%,18% 20%,36% 48%,54% 12%,72% 42%,88% 18%,100% 40%' },
      { height: 110, color: '#0D0A08', points: '0% 40%,24% 65%,44% 25%,64% 58%,82% 15%,100% 50%' },
    ],
  },
  dusk: {
    sky: 'linear-gradient(180deg,#5CE0D2 0%,#8fd9c8 22%,#F7DDA0 42%,#F0A860 58%,#F0512E 74%)',
    stars: false,
    glow: 'none',
    ridges: [
      { height: 340, color: '#E0A23C', points: '0% 60%,10% 35%,22% 50%,34% 20%,48% 45%,60% 15%,74% 42%,88% 25%,100% 50%' },
      { height: 250, color: '#C9622E', points: '0% 70%,14% 40%,28% 62%,42% 30%,55% 58%,70% 25%,84% 55%,100% 35%' },
      { height: 170, color: '#7A2E22', points: '0% 65%,16% 30%,30% 55%,46% 20%,62% 50%,78% 22%,100% 48%' },
      { height: 110, color: '#1E1813', points: '0% 55%,20% 15%,38% 45%,56% 10%,74% 40%,100% 20%' },
    ],
  },
  canyon: {
    sky: 'linear-gradient(180deg,#0D1321 0%,#16233A 40%,#4A5A52 62%,#E0A23C 80%,#F0512E 100%)',
    stars: true,
    glow: 'radial-gradient(ellipse at center 70%, rgba(240,81,46,0.4) 0%, rgba(224,162,60,0.22) 45%, transparent 75%)',
    // Canyon walls arch in from both edges, framing the sky in the center — echoes the
    // Perplexity reference's cave-mouth composition rather than a flat horizon band.
    ridges: [
      { height: 630, color: '#0D0A08', points: '0% 0%,0% 100%,22% 100%,30% 60%,26% 15%,14% 0%', side: 'left' },
      { height: 630, color: '#0D0A08', points: '100% 0%,100% 100%,78% 100%,70% 55%,76% 10%,88% 0%', side: 'right' },
      { height: 150, color: '#1E1813', points: '0% 60%,20% 25%,40% 55%,58% 15%,76% 48%,100% 30%' },
    ],
  },
};

function buildHtml({ kicker, headlineLines, dek, width, height, variant = 'aurora' }) {
  const v = VARIANTS[variant] || VARIANTS.aurora;
  const ridgeCss = v.ridges
    .map(
      (r, i) =>
        `.ridge${i}{position:absolute;${r.side === 'right' ? 'right:0' : 'left:0'}:0;bottom:0;
          ${r.side ? 'width' : 'left:-5%;right:-5%;height'}:${r.height}px;
          background:${r.color};clip-path:polygon(${r.points});}`
    )
    .join('\n');
  const ridgeDivs = v.ridges.map((_, i) => `<div class="ridge${i}"></div>`).join('');
  return `
<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${width}px;height:${height}px;position:relative;overflow:hidden;background:#0D1321;font-family:'Inter Tight',sans-serif;}
  .sky{position:absolute;inset:0;background:${v.sky};}
  .stars{position:absolute;inset:0;}
  .star{position:absolute;background:#F7F1E6;border-radius:50%;}
  .glow{position:absolute;left:50%;bottom:0;width:75%;height:54%;transform:translateX(-50%);background:${v.glow};}
  ${ridgeCss}
  .content{position:absolute;left:0;right:0;bottom:0;padding:4% 4.7% 3.7%;z-index:5;}
  .kicker{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.18em;color:#F0512E;margin-bottom:16px}
  h1{font-family:'Lora',Georgia,serif;font-weight:600;font-size:46px;line-height:1.14;color:#F7F1E6;max-width:920px}
  .dek{margin-top:16px;font-size:18px;line-height:1.45;color:#D8CFC0;max-width:760px}
  .brand{position:absolute;top:36px;right:56px;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:0.05em;color:#F7F1E6;z-index:5}
  .brand .arrow{color:#F0512E}
  .logo{position:absolute;top:36px;left:56px;height:26px;z-index:5;}
  .logo-name{position:absolute;top:39px;left:110px;font-family:'Inter Tight',sans-serif;font-weight:600;font-size:15px;letter-spacing:0.06em;color:#fff;z-index:5;}
</style></head><body>
  <div class="sky"></div>
  ${v.stars ? '<div class="stars" id="stars"></div>' : ''}
  <div class="glow"></div>
  ${ridgeDivs}
  ${LOGO_SVG}
  <div class="logo-name">ENSO LABS</div>
  <div class="brand">STRATEGY <span class="arrow">&rarr;</span> SHIP</div>
  <div class="content">
    <div class="kicker">${kicker}</div>
    <h1>${headlineLines.join('<br>')}</h1>
    ${dek ? `<div class="dek">${dek}</div>` : ''}
  </div>
  ${
    v.stars
      ? `<script>
    var el = document.getElementById('stars');
    for (var i=0;i<120;i++){
      var s=document.createElement('div');
      s.className='star';
      var x=Math.random()*${width}, y=Math.random()*${Math.round(height * 0.6)};
      var size=Math.random()*1.6+0.5;
      s.style.left=x+'px'; s.style.top=y+'px';
      s.style.width=size+'px'; s.style.height=size+'px';
      s.style.opacity=(Math.random()*0.6+0.3).toFixed(2);
      el.appendChild(s);
    }
  </script>`
      : ''
  }
</body></html>`;
}

async function renderGeoOg({ kicker, headlineLines, dek, outPath, width = 1200, height = 630, variant = 'aurora' }) {
  const html = buildHtml({ kicker, headlineLines, dek, width, height, variant });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  // Render at 2x then let the final screenshot be resized by the OS-level viewport
  // scale, so the vector logo and type stay crisp at full quality.
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, v_wait(variant)));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });
  await browser.close();
  console.log('geo OG ->', outPath);
}

function v_wait() {
  return 600;
}

module.exports = { renderGeoOg, VARIANTS };
