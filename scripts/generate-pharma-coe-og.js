/* AI Center of Excellence for Pharma — primary OG/social image.
 * Uses the signature-photography OG system (scripts/lib/photo-og-template.js),
 * documentary grade — slight warm grade, deep contrast, paper-toned.
 * Source photo: public/images/insights/ai-coe-pharma/hero.jpg
 *   (Unsplash, free commercial license: https://images.unsplash.com/photo-1450101499163-c8848c66ca85)
 * Output: public/og/og-ai-coe-pharma-v1.png (1200x630, true PNG)
 *
 * Note: renderPhotoOg always emits JPEG bytes, so we render to a temp .jpg and
 * convert to PNG with macOS `sips` so the .png extension is honest.
 */
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { renderPhotoOg } = require('./lib/photo-og-template');

const ROOT = path.join(__dirname, '..');
const tmpJpg = path.join(os.tmpdir(), 'og-ai-coe-pharma-v1.jpg');
const outPng = path.join(ROOT, 'public', 'og', 'og-ai-coe-pharma-v1.png');

(async () => {
  await renderPhotoOg({
    photoPath: path.join(ROOT, 'public', 'images', 'insights', 'ai-coe-pharma', 'hero.jpg'),
    kicker: 'Client Story · Pharma · Enso Labs',
    headlineLines: ['AI that survives', 'MLR review.'],
    dek: 'How a pharma agency cut campaign launches from 3 months to 2 weeks',
    outPath: tmpJpg,
    grade: 'documentary',
    objectPosition: 'center 40%',
  });
  execFileSync('sips', ['-s', 'format', 'png', tmpJpg, '--out', outPng], { stdio: 'ignore' });
  fs.unlinkSync(tmpJpg);
  console.log('png OG ->', outPng);
})();
