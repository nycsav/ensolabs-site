import { renderOg } from '@/components/OgFrame';

// /insights OG — renders through the shared publication frame (the locked card
// system, docs/brand/STRATEGY-TO-SHIP-BRAND-LOCK.md §8) so it matches every article card.
export const runtime = 'nodejs';
export const alt = 'Strategy to Ship — Insights from Enso Labs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return renderOg({
    theme: 'publication',
    eyebrow: 'Insights · Daily AI intelligence',
    title: 'Strategy to Ship.',
    subtitle: 'AI intelligence for marketing strategists — scored, curated, and shipped from New York.',
  });
}
