/**
 * Brand image assets embedded for OG / social image rendering (next/og `ImageResponse`).
 *
 * Read the SAME way as the fonts (lib/og/fonts.ts) — `new URL('./assets/…', import.meta.url)`
 * — so Next file-traces the binaries into the serverless function bundle (nodejs runtime).
 *
 * WHY THIS EXISTS: the per-article OG route (`app/insights/[slug]/opengraph-image.tsx`) is a
 * DYNAMIC Vercel function. It previously read these assets from `public/` via
 * `readFileSync(new URL('../public/…'))`, but Vercel does NOT bundle `public/` into a function,
 * so the file was missing at request time → ENOENT → HTTP 500 in production (it worked locally,
 * where `public/` is on disk). Reading from `lib/og/assets/` traces correctly — same mechanism
 * that makes the fonts work in prod.
 */
import { readFileSync } from 'node:fs';

function dataUri(file: string, mime: string): string {
  const buf = readFileSync(new URL(`./assets/${file}`, import.meta.url));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

/** White Enso wordmark — shown in the publication OG footer. */
export const ensoLogoWhite = (): string => dataUri('logo-white.svg', 'image/svg+xml');

/** Claude sunburst — shown only when an insight credits a Claude source. */
export const claudeIconPng = (): string => dataUri('claude-icon.png', 'image/png');
