/**
 * Strategy to Ship — design tokens (TypeScript single source).
 * Mirrors brand/strategy-to-ship/tokens.css 1:1. Imported by the OG image renderers
 * (app/**\/opengraph-image.tsx) and the Puppeteer scripts in scripts/ so the publication's
 * color + type stay identical across web, social/OG, and newsletter surfaces.
 *
 * Keep this and tokens.css in sync — they are the single source of truth for the publication brand.
 */

export const STS_COLOR = {
  paper: '#F7F1E6',       // primary reading ground (warm newsprint)
  paper2: '#EEE5D3',      // cards, insets, table fills
  ink: '#1E1813',         // body text / dark ground
  inkDeep: '#16110B',     // deepest ground for social/OG cards
  coral: '#F0512E',       // THE signal — arrow, stamps, pull-quotes, CTAs (≤10%)
  amber: '#E0A23C',       // secondary warm accent
  slate: '#79705F',       // muted metadata / secondary text
  line: '#DDD2BC',        // hairlines, dividers, borders
  ensoTeal: '#5CE0D2',    // parent-brand link ONLY — "from Enso Labs", sparing
  // on dark grounds
  paperOnDark: '#F3ECDD',
  slateOnDark: '#9B8F78',
  lineOnDark: '#2C2419',
} as const;

export const STS_FONT = {
  display: 'Space Mono',  // headlines / masthead / wordmark — LOCKED 2026-09-09 (brand lock §5, §8), weight 700
  serif: 'Lora',          // LEGACY — long-form pull-quotes only; never headlines, never the wordmark
  sans: 'Inter Tight',    // body / UI
  mono: 'JetBrains Mono', // metadata / the machine signal
} as const;

/** The card system — the 36-point-gap card, locked 2026-09-09. Master frame 1200×630; other
 *  formats scale proportionally (scripts/lib/s2s-card-template.js is the renderer). */
export const STS_CARD = {
  padY: 64, padX: 72, colW: 560, gap: 22,
  kicker: { size: 17, ls: '0.16em', square: 12 },        // JetBrains Mono + amber ■ before it
  headline: { size: 76, lh: 1.0, ls: '-0.035em', weight: 700 }, // Space Mono
  dek: { size: 26, lh: 1.32, weight: 500, color: '#CFC3A7' },   // Inter Tight
  footer: { wordmark: 22, meta: 13, metaLs: '0.16em', urlLs: '0.14em', rule: 'rgba(247,241,230,0.22)', padTop: 20, hairline: 18 },
  overlay: 'linear-gradient(90deg, rgba(22,17,11,0) 25%, rgba(22,17,11,0.6) 50%, rgba(22,17,11,0.94) 70%)',
  overlayPortrait: 'linear-gradient(180deg, rgba(22,17,11,0) 18%, rgba(22,17,11,0.6) 42%, rgba(22,17,11,0.94) 60%)',
  ribbonPath: 'M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z',
  formats: { og: [1200, 630], linkedinCover: [1200, 627], x: [1600, 900], carouselCover: [1080, 1350] },
} as const;

export const STS_TYPE = {
  fsKicker: 13,
  fsBody: 18,
  fsDek: 22,
  fsH3: 26,
  fsH2: 34,
  lhTight: 1.0,           // Space Mono headlines
  lhBody: 1.62,
  lsMono: '0.16em',
  lsDisplay: '-0.035em',
} as const;

export const STS_SHAPE = {
  radius: 10,
  radiusSm: 7,
  maxRead: '64ch',
} as const;

export const STS = { color: STS_COLOR, font: STS_FONT, type: STS_TYPE, shape: STS_SHAPE, card: STS_CARD } as const;
export default STS;
