/* Forward Deployed Strategist — Part 3 primary OG/hero image.
 * First use of the signature-photography OG system (scripts/lib/photo-og-template.js).
 * Source photo: public/images/photography/fde-part3-engineer-desk.jpg
 *   (Unsplash, free commercial license: https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1)
 * Output: public/og/og-frontier-labs-fde-platform-theory-photo.jpg (1200x630)
 */
const path = require('path');
const { renderPhotoOg } = require('./lib/photo-og-template');

renderPhotoOg({
  photoPath: path.join(__dirname, '..', 'public', 'images', 'photography', 'fde-part3-engineer-desk.jpg'),
  kicker: 'The Forward Deployed Strategist · Part 3',
  headlineLines: ['The Labs Behind', 'the Frontier'],
  dek: 'Anthropic. OpenAI. Perplexity. They are not interchangeable.',
  outPath: path.join(__dirname, '..', 'public', 'og', 'og-frontier-labs-fde-platform-theory-photo.jpg'),
});
