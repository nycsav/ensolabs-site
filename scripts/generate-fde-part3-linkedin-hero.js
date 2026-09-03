/* Forward Deployed Strategist — Part 3 LinkedIn post image.
 * Same signature-photography system + same source photo as the article OG
 * (scripts/generate-fde-part3-photo-og.js), sized for a LinkedIn single-image
 * post (1200x627). The silhouette test photo (fde-part3-silhouette-test.jpg)
 * was tried here first and rejected — it crops badly in landscape (loses the
 * lamp and the silhouette). Cinematic grade per brand-principles.md §9.
 * Source photo: public/images/photography/fde-part3-engineer-code-warm.jpg
 * Output: public/social/fde-part3/linkedin-hero.jpg
 */
const path = require('path');
const { renderPhotoOg } = require('./lib/photo-og-template');

renderPhotoOg({
  photoPath: path.join(__dirname, '..', 'public', 'images', 'photography', 'fde-part3-engineer-code-warm.jpg'),
  kicker: 'The Forward Deployed Strategist · Part 3',
  headlineLines: ['The Labs Behind', 'the Frontier'],
  dek: 'Anthropic. OpenAI. Perplexity. They are not interchangeable.',
  outPath: path.join(__dirname, '..', 'public', 'social', 'fde-part3', 'linkedin-hero.jpg'),
  width: 1200,
  height: 627,
  grade: 'cinematic',
});
