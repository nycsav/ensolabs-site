/* Enso Labs "signature photography" OG/hero card — now a thin wrapper over the
 * canonical Strategy → Ship card (scripts/lib/s2s-card-template.js, locked 2026-09-09).
 *
 * Kept for backwards compatibility with the per-article generator scripts
 * (scripts/generate-*-photo-og.js). Same signature as before:
 *   renderPhotoOg({ photoPath, kicker, headlineLines, dek, outPath, width, height, grade, objectPosition })
 * `width`/`height` are mapped to the nearest canonical format (1200×630 → 'og',
 * 1200×627 → 'linkedin-cover', 1600×900 → 'x', 1080×1350 → 'carousel-cover').
 *
 * Photo rules still apply (brand-principles.md §9 / CLAUDE.md OG rule): real people
 * in real rooms, committed under public/images/photography/, never hot-linked;
 * grade 'documentary' (default) for bright naturalistic rooms, 'cinematic' for
 * moodier directional-light shots.
 */
const { renderCard, FORMATS } = require('./s2s-card-template');

function pickFormat(width, height) {
  const hit = Object.entries(FORMATS).find(([, f]) => f.w === width && f.h === height);
  if (hit) return hit[0];
  if (height > width) return 'carousel-cover';
  return width > 1300 ? 'x' : 'og';
}

async function renderPhotoOg({ photoPath, kicker, headlineLines, headline, dek, outPath, width = 1200, height = 630, grade = 'documentary', objectPosition }) {
  return renderCard({
    photoPath, kicker, dek, outPath, grade, objectPosition,
    headline: headlineLines || headline,
    format: pickFormat(width, height),
    type: 'jpeg',
  });
}

module.exports = { renderPhotoOg };
