import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ShareButtons } from '@/components/ShareButtons';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const CASES: Record<string, {
  title: string; client: string; sector: string; sectorTag: string;
  engagement: string; stack: string; delivered: string;
  headline: string; subtitle: string;
  /** AEO definition-lead sentence rendered as the first body paragraph. */
  definition: string;
  challenge: string; approach: string[]; outcomes: { label: string; value: string }[];
  metaDesc: string;
  datePublished: string;
}> = {
  gore: {
    title: 'Gore M2 Intelligence Hub',
    client: 'W. L. Gore & Associates × Board of Innovation',
    sector: 'Advanced Materials / Manufacturing', sectorTag: 'Materials',
    engagement: 'Strategy → Build → Ship', stack: 'LangGraph · Python · Claude · MCP',
    delivered: 'April 2026',
    headline: 'A market-radar that scientists trust.',
    subtitle: '8-stage LangGraph pipeline with AES-256-GCM encryption and expert-knowledge encoding.',
    definition: 'The Gore M2 Intelligence Hub is a production-grade AI market-intelligence platform built by Enso Labs for W. L. Gore & Associates that surfaces auditable commercial signals from scientific literature, patents, and regulatory filings — replacing weeks of manual research with a single auditable pipeline.',
    challenge: 'Gore\'s Battery Insulation Division needed to surface emerging commercial opportunities from scientific literature, patents, and regulatory filings — replacing manual research processes that took weeks.',
    approach: [
      'Designed the "Gore Lens" — a 9-rule expert-knowledge encoding framework with toggleable relevance rules',
      'Built an 8-stage LangGraph pipeline with 4 parallel fetchers and ReAct agents',
      'Processed 731 documents, curated 111 sources, surfaced 16 market developments',
      'Delivered AES-256-GCM encrypted dashboard with signal cards and RWW scoring',
      'Go/no-go commercialization milestone validated by lead scientist',
    ],
    outcomes: [
      { label: 'Documents processed', value: '731' },
      { label: 'Sources curated', value: '111' },
      { label: 'Signals surfaced', value: '16' },
      { label: 'Encryption', value: 'AES-256-GCM' },
    ],
    metaDesc: 'How Enso Labs built an AI-powered market intelligence platform for W. L. Gore — 731 documents, 16 validated signals, AES-256-GCM encrypted dashboard.',
    datePublished: '2026-04-15',
  },
  heller: {
    title: 'AI Center of Excellence — Pharma',
    client: 'Heller Agency',
    sector: 'Healthcare / Pharma Advertising', sectorTag: 'Healthcare',
    engagement: 'Build → Scale', stack: 'MindStudio · RAG · Claude · N8N',
    delivered: '2022–Present',
    headline: 'AI that survives MLR review.',
    subtitle: '5 brand knowledge bases, 8 active automations, NIST + FDA/MLR/PRC compliant.',
    definition: 'The Heller AI Center of Excellence is a NIST-compliant agentic AI program built by Enso Labs that integrates artificial intelligence across five pharma brand teams while preserving FDA, MLR, and PRC review — and compresses campaign launches from three months to two weeks.',
    challenge: 'A full-service pharma agency needed to integrate AI across 5 brand teams while maintaining FDA/MLR/PRC compliance — without disrupting active campaigns.',
    approach: [
      'Designed and launched AI Center of Excellence with NIST AI RMF governance',
      'Built 5 brand knowledge bases (Tolmar, Eton, SpyGlass)',
      'Developed 8 active automations for content creation and regulatory workflows',
      'Reduced campaign launch timelines by 83% (3 months → 2 weeks)',
      'Achieved 75% pilot-to-production conversion across all initiatives',
    ],
    outcomes: [
      { label: 'Campaign launch reduction', value: '83%' },
      { label: 'Pilot-to-production', value: '75%' },
      { label: 'Time savings', value: '35%' },
      { label: 'Active automations', value: '8' },
    ],
    metaDesc: 'How Enso Labs built an AI Center of Excellence for a pharma agency — 83% faster campaign launches, 75% pilot-to-production, FDA/MLR compliant.',
    datePublished: '2022-09-01',
  },
  'trading-terminal': {
    title: 'Enso Trading Terminal',
    client: 'Enso Labs (Internal Product)',
    sector: 'Financial Services / FinTech', sectorTag: 'FinTech',
    engagement: 'Build → Ship → Operate', stack: 'Python · React · Alpaca · Public.com',
    delivered: '2025–Present',
    headline: 'We run what we sell.',
    subtitle: 'Autonomous signal intelligence and options trading platform — live in production.',
    definition: 'The Enso Trading Terminal is an autonomous signal-intelligence and options-trading platform built and operated by Enso Labs that runs 24/7 across equities, options, and crypto/DeFi — proving the studio\'s agentic architecture under live market conditions.',
    challenge: 'Enso Labs needed to prove that our agentic architecture works in production under real market conditions — not just in client demos.',
    approach: [
      'Built autonomous signal intelligence platform with news-driven trading algorithms',
      'Integrated multi-agent research automation across equities, options, and crypto/DeFi',
      'Connected to live brokerage APIs (Alpaca, Public.com, Hyperliquid)',
      'Implemented strategy backtesting, options flow analysis, and order management',
      'Running autonomously in production — the ultimate proof of our build practice',
    ],
    outcomes: [
      { label: 'Markets covered', value: 'Equities · Options · Crypto' },
      { label: 'Brokerage integrations', value: '3' },
      { label: 'Status', value: 'Live in production' },
      { label: 'Uptime', value: '24/7 autonomous' },
    ],
    metaDesc: 'The Enso Trading Terminal — an autonomous signal intelligence and options trading platform built by Enso Labs, running live in production.',
    datePublished: '2025-06-01',
  },
  'enterprise-ai': {
    title: 'Enterprise AI Enablement Programs',
    client: 'Cross-Industry',
    sector: 'Finance · Healthcare · Technology', sectorTag: 'Enterprise',
    engagement: 'Consult → Build', stack: 'Claude · Gemini · GPT-4 · MCP · N8N',
    delivered: '2022–Present',
    headline: 'Cohorts that actually ship.',
    subtitle: '3-month time-to-first-value, 75% pilot-to-production conversion.',
    definition: 'Enterprise AI Enablement is a cohort-based program from Enso Labs for executive teams that converts AI training into shipped production systems — averaging a 3-month time-to-first-value and 75% pilot-to-production conversion across finance, healthcare, and technology.',
    challenge: 'Enterprise teams invest in AI training but rarely ship anything to production. The gap between "workshop" and "deployed system" is where most AI initiatives die.',
    approach: [
      'Designed cohort-based enablement for 8–15 person executive teams',
      'Hands-on workshops with Claude, Gemini, GPT-4, MCP, and N8N',
      'Every cohort leaves with a working artifact — not just slides',
      'Built reusable prompt libraries, agent configuration templates, and AI maturity scorecards',
      'Averaged 3-month time-to-first-value across all engagements',
    ],
    outcomes: [
      { label: 'Time-to-first-value', value: '3 months' },
      { label: 'Pilot-to-production', value: '75%' },
      { label: 'Cohort size', value: '8–15 leaders' },
      { label: 'Sectors', value: 'Finance · Health · Tech' },
    ],
    metaDesc: 'Enterprise AI enablement programs by Enso Labs — 3-month time-to-first-value, 75% pilot-to-production, cohort-based delivery.',
    datePublished: '2022-09-01',
  },
};

const SLUGS = Object.keys(CASES);

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = CASES[params.slug];
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study`,
    description: cs.metaDesc,
    alternates: { canonical: `/work/${params.slug}` },
    openGraph: {
      title: `${cs.title} — Enso Labs Case Study`,
      description: cs.metaDesc,
      url: `${SITE.origin}/work/${params.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cs.title} — Enso Labs`,
      description: cs.metaDesc,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = CASES[params.slug];
  if (!cs) notFound();

  const shareUrl = `${SITE.origin}/work/${params.slug}`;

  return (
    <>
      <JsonLd schemas={[
        breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Work', href: '/work' },
          { name: cs.title, href: `/work/${params.slug}` },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: cs.title,
          description: cs.metaDesc,
          datePublished: cs.datePublished,
          dateModified: cs.datePublished,
          author: {
            '@type': 'Person',
            name: SITE.founder.name,
            url: `${SITE.origin}/about`,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.origin,
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
          url: shareUrl,
          image: `${SITE.origin}/og-default.png`,
          articleSection: cs.sectorTag,
        },
      ]} />

      <main>
        <style>{`
          .cs-hero { padding: clamp(120px, 16vw, 200px) var(--pad) 80px; }
          .cs-back { font-family: var(--mono); font-size: 12px; color: var(--fg-3); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 40px; }
          .cs-back:hover { color: var(--teal); }
          .cs-tag { font-family: var(--mono); font-size: 11px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
          .cs-h1 { font-family: var(--display); font-weight: 500; font-size: clamp(40px, 6vw, 72px); line-height: 0.98; letter-spacing: -0.02em; margin-bottom: 16px; }
          .cs-h1 em { font-style: italic; color: var(--teal); }
          .cs-sub { font-size: 18px; color: var(--fg-2); line-height: 1.5; max-width: 640px; margin-bottom: 24px; }
          .cs-definition { font-size: 17px; line-height: 1.6; color: var(--fg); max-width: 64ch; margin-bottom: 48px; padding: 18px 22px; border-left: 2px solid var(--teal); background: color-mix(in oklab, var(--teal) 6%, transparent); border-radius: 0 6px 6px 0; }
          .cs-meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); margin-bottom: 64px; }
          .cs-meta-cell { background: var(--bg); padding: 16px 20px; }
          .cs-meta-cell .label { font-family: var(--mono); font-size: 10px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
          .cs-meta-cell .val { font-size: 14px; color: var(--fg); }
          .cs-section { padding: 64px var(--pad); max-width: var(--max); margin: 0 auto; }
          .cs-section h2 { font-family: var(--display); font-size: 28px; font-weight: 500; margin-bottom: 24px; }
          .cs-challenge { font-size: 18px; color: var(--fg-2); line-height: 1.65; max-width: 720px; }
          .cs-approach { list-style: none; display: grid; gap: 14px; max-width: 720px; }
          .cs-approach li { display: flex; gap: 12px; color: var(--fg-2); font-size: 16px; line-height: 1.55; }
          .cs-approach li::before { content: "›"; color: var(--teal); font-family: var(--mono); flex-shrink: 0; }
          .cs-outcomes { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); margin-top: 32px; }
          .cs-outcome { background: var(--bg); padding: 24px; text-align: center; }
          .cs-outcome .num { font-family: var(--display); font-size: 28px; font-weight: 500; color: var(--teal); margin-bottom: 4px; }
          .cs-outcome .desc { font-family: var(--mono); font-size: 10px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; }
          .cs-cta { padding: 80px var(--pad); text-align: center; }
          .cs-cta p { font-size: 18px; color: var(--fg-2); margin-bottom: 24px; }
          @media (max-width: 768px) { .cs-meta-grid, .cs-outcomes { grid-template-columns: 1fr 1fr; } }
        `}</style>

        <section className="cs-hero" style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: 'clamp(120px, 16vw, 200px) var(--pad) 80px' }}>
          <Link href="/work" className="cs-back">← Back to Work</Link>
          <div className="cs-tag">{cs.sectorTag} · Case Study</div>
          <h1 className="cs-h1">{cs.title}. <em>{cs.headline}</em></h1>
          <p className="cs-sub">{cs.subtitle}</p>
          <p className="cs-definition">{cs.definition}</p>
          <div className="cs-meta-grid">
            <div className="cs-meta-cell"><div className="label">Client</div><div className="val">{cs.client}</div></div>
            <div className="cs-meta-cell"><div className="label">Sector</div><div className="val">{cs.sector}</div></div>
            <div className="cs-meta-cell"><div className="label">Engagement</div><div className="val">{cs.engagement}</div></div>
            <div className="cs-meta-cell"><div className="label">Stack</div><div className="val">{cs.stack}</div></div>
            <div className="cs-meta-cell"><div className="label">Delivered</div><div className="val">{cs.delivered}</div></div>
          </div>
        </section>

        <section className="cs-section" style={{ borderTop: '1px solid var(--line)' }}>
          <h2>The Challenge</h2>
          <p className="cs-challenge">{cs.challenge}</p>
        </section>

        <section className="cs-section" style={{ borderTop: '1px solid var(--line)' }}>
          <h2>What We Built</h2>
          <ul className="cs-approach">
            {cs.approach.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <section className="cs-section" style={{ borderTop: '1px solid var(--line)' }}>
          <h2>Outcomes</h2>
          <div className="cs-outcomes">
            {cs.outcomes.map((o, i) => (
              <div className="cs-outcome" key={i}>
                <div className="num">{o.value}</div>
                <div className="desc">{o.label}</div>
              </div>
            ))}
          </div>
        </section>

        <ShareButtons path={`/work/${params.slug}`} title={`${cs.title} — Enso Labs`} />

        <section className="cs-cta">
          <p>Interested in results like these?</p>
          <Link href="/contact" className="btn" style={{ display: 'inline-block' }}>Get in Touch</Link>
        </section>
      </main>
    </>
  );
}
