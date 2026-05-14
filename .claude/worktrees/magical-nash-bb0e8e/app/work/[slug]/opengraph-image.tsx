import { renderOg, OG_SIZE } from '@/components/OgFrame';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Enso Labs Case Study';

// Mirror of the static slugs in app/work/[slug]/page.tsx.
// Keep these in sync — both files are tiny so the duplication is fine.
const CASES: Record<string, { title: string; subtitle: string; sector: string }> = {
  gore: {
    title: 'Gore M2 Intelligence Hub',
    subtitle: 'A market-radar that scientists trust.',
    sector: 'Materials',
  },
  heller: {
    title: 'AI Center of Excellence — Pharma',
    subtitle: 'Pharma campaigns shipped in two weeks.',
    sector: 'Healthcare',
  },
  'trading-terminal': {
    title: 'Enso Trading Terminal',
    subtitle: 'We build what we sell.',
    sector: 'FinTech',
  },
  'enterprise-ai': {
    title: 'Enterprise AI Enablement',
    subtitle: '8–15 leader cohorts. 75% pilot-to-production.',
    sector: 'Enterprise',
  },
};

export default function Image({ params }: { params: { slug: string } }) {
  const cs = CASES[params.slug];
  if (!cs) {
    return renderOg({ eyebrow: 'Case Study', title: 'Enso Labs', strap: 'ensolabs.ai' });
  }
  return renderOg({
    eyebrow: `Case Study · ${cs.sector}`,
    title: cs.title,
    subtitle: cs.subtitle,
  });
}
