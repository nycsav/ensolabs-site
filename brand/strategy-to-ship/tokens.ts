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
  display: 'Space Mono', // display / headlines / wordmark — the locked mono voice (700), brand-lock §5
  sans: 'Inter Tight',   // body / UI
  mono: 'JetBrains Mono', // metadata / the machine signal
} as const;

export const STS_TYPE = {
  fsKicker: 13,
  fsBody: 18,
  fsDek: 22,
  fsH3: 26,
  fsH2: 34,
  lhTight: 1.08,          // serif headlines
  lhBody: 1.62,
  lsMono: '0.08em',
} as const;

export const STS_SHAPE = {
  radius: 10,
  radiusSm: 7,
  maxRead: '64ch',
} as const;

export const STS = { color: STS_COLOR, font: STS_FONT, type: STS_TYPE, shape: STS_SHAPE } as const;
export default STS;
