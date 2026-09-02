/* Forward Deployed Strategist — Part 3 primary OG/hero image.
 * Uses the signature-photography OG system (scripts/lib/photo-og-template.js),
 * cinematic grade — warm amber, deep shadow, vignette. Reference: a Mobbin
 * screenshot of runway.ml/studios' hero (warm, atmospheric, backlit mood).
 * Source photo: public/images/photography/fde-part3-engineer-code-warm.jpg
 *   (Unsplash, free commercial license: https://images.unsplash.com/photo-1580894912989-0bc892f4efd0)
 * Output: public/og/og-frontier-labs-fde-platform-theory-photo.jpg (1200x630)
 */
const path = require('path');
const { renderPhotoOg } = require('./lib/photo-og-template');

renderPhotoOg({
  photoPath: path.join(__dirname, '..', 'public', 'images', 'photography', 'fde-part3-engineer-code-warm.jpg'),
  kicker: 'The Forward Deployed Strategist · Part 3',
  headlineLines: ['The Labs Behind', 'the Frontier'],
  dek: 'Anthropic. OpenAI. Perplexity. They are not interchangeable.',
  outPath: path.join(__dirname, '..', 'public', 'og', 'og-frontier-labs-fde-platform-theory-photo.jpg'),
  grade: 'cinematic',
});
