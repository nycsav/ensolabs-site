import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  orgSchema,
  professionalServiceSchema,
} from '@/lib/schema';

// ISR: self-heal edge-cached HTML within ~5 min of a content change.
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'AI for Regulated Industries — Pharma, Healthcare & Financial Services | Enso Labs',
  description:
    'Enso Labs builds NIST AI RMF–compliant agentic systems for pharma advertising, healthcare, and financial services — 83% faster campaign launches, FDA/MLR compliant.',
  alternates: { canonical: 'https://ensolabs.ai/services/regulated-industries' },
  openGraph: {
    title: 'AI for Regulated Industries — Pharma, Healthcare & Financial Services | Enso Labs',
    description:
      'NIST AI RMF–compliant agentic systems for pharma advertising, healthcare, and financial services. 83% faster campaign launches, FDA/MLR/PRC approved.',
    url: 'https://ensolabs.ai/services/regulated-industries',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'AI for Regulated Industries — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Regulated Industries — Enso Labs',
    description:
      'NIST AI RMF–compliant agentic systems for pharma advertising, healthcare, and financial services. 83% faster campaign launches, FDA/MLR/PRC approved.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'How does Enso Labs handle FDA/MLR compliance in AI workflows?',
    answer:
      'We build the compliance architecture before we build the automation. Every content output routes through a brand knowledge base loaded with prior MLR approvals and regulatory guardrails. The agent retrieves approved language — it does not generate from scratch. The result is content that enters MLR review already aligned with what has passed before.',
  },
  {
    question: 'What does an AI Center of Excellence look like for a pharma agency?',
    answer:
      'The Heller model: five brand knowledge bases encoding approved language and MLR precedent for each brand team, eight active automations handling content workflows, and a NIST AI RMF governance framework that documents every system decision. Campaign launch timelines compressed from three months to two weeks. The CoE is operated by us as a managed service — not handed off.',
  },
  {
    question: 'Can AI be used for regulated pharma content creation?',
    answer:
      'Yes — with the right architecture. The failure mode most agencies hit is using AI for generation without grounding it in what has already been approved. When the knowledge base comes first, AI-generated content inherits the brand\'s own MLR history. Review cycles shorten because reviewers are seeing language they have already approved, not new material to evaluate from scratch.',
  },
  {
    question: 'What is NIST AI RMF and why does it matter for healthcare AI?',
    answer:
      'The NIST AI Risk Management Framework is the US government\'s standard for governing AI systems — covering identification, measurement, management, and governance of AI risk. For healthcare and pharma, it provides the audit trail that regulators and legal teams require when AI is involved in any patient-facing or regulated content workflow. Enso Labs designs to NIST AI RMF from the start of every regulated engagement.',
  },
];

const DIFFERENTIATORS = [
  {
    ix: '01',
    title: 'MLR review survives',
    body: 'Every output routes through a brand knowledge base loaded with approved language, prior MLR decisions, and regulatory guardrails. The agent does not guess; it retrieves.',
  },
  {
    ix: '02',
    title: 'NIST AI RMF from day one',
    body: 'We design the governance architecture before we write the first prompt. Risk management framework, not an afterthought.',
  },
  {
    ix: '03',
    title: '5-year production track record',
    body: 'Our pharma advertising engagement began in 2022 and is still running. We do not pilot and exit.',
  },
];

const METRICS = [
  { value: '83%', label: 'Campaign launch reduction', sub: '3 months → 2 weeks' },
  { value: '5', label: 'Brand knowledge bases built', sub: 'Tolmar, Eton, SpyGlass + 2 more' },
  { value: '8', label: 'Active automations running', sub: 'Content + regulatory workflows' },
  { value: '100%', label: 'MLR compliance maintained', sub: 'Throughout the engagement' },
];

const PHASES = [
  {
    ix: 'Phase 1',
    title: 'Governance design',
    body: 'NIST AI RMF risk mapping, compliance inventory, stakeholder alignment. We define what the system is allowed to do before it does anything.',
  },
  {
    ix: 'Phase 2',
    title: 'Knowledge base architecture',
    body: 'Brand voice, approved language, MLR precedent, and regulatory guardrails encoded into retrieval layers. One knowledge base per brand team.',
  },
  {
    ix: 'Phase 3',
    title: 'Automation build',
    body: 'N8N workflows, Claude-powered content generation, RAG-grounded retrieval, review-gate routing. Built to your existing MLR cycle, not around it.',
  },
  {
    ix: 'Phase 4',
    title: 'Compliant rollout',
    body: 'NIST-documented deployment, staff training, ongoing operations. We stay in the loop; we do not hand off a repo and leave.',
  },
];

const INDUSTRIES = [
  {
    title: 'Pharma Advertising',
    body: 'FDA/MLR/PRC compliant content systems, brand knowledge bases, campaign automation.',
    href: '/work/heller',
    cta: 'See the Heller case study',
  },
  {
    title: 'Healthcare Technology',
    body: 'HIPAA-aware agentic workflows, patient-facing content guardrails, clinical AI systems.',
    href: '/industries/healthcare',
    cta: 'Healthcare AI',
  },
  {
    title: 'Financial Services',
    body: 'SEC/FINRA-aware AI, automated reporting, AES-encrypted intelligence platforms.',
    href: '/industries/financial-services',
    cta: 'Financial AI',
  },
];

export default function RegulatedIndustriesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          professionalServiceSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
            { name: 'Regulated Industries', href: '/services/regulated-industries' },
          ]),
        ]}
      />

      <style>{`
        .ri-chips { display:flex; flex-wrap:wrap; gap:10px; margin-top:28px; }
        .ri-chip { font-family:var(--mono); font-size:12px; letter-spacing:0.03em; color:var(--teal);
                   border:1px solid color-mix(in oklab, var(--teal) 50%, var(--line-2)); padding:8px 14px; border-radius:999px; }
        .ri-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:40px; }
        .ri-grid.four { grid-template-columns:repeat(4,1fr); }
        .ri-card { background:var(--bg); padding:32px 28px; display:flex; flex-direction:column; gap:14px; }
        .ri-card .ix { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.06em; text-transform:uppercase; }
        .ri-card h3 { font-size:20px; font-weight:500; letter-spacing:-0.015em; line-height:1.15; }
        .ri-card p { color:var(--fg-2); font-size:15px; line-height:1.55; }
        .ri-card .ri-link { margin-top:auto; padding-top:12px; font-family:var(--mono); font-size:13px; color:var(--teal); }
        .ri-metrics { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:36px; }
        .ri-metric { background:var(--bg); padding:24px; }
        .ri-metric .n { font-family:var(--display); font-size:40px; font-weight:500; letter-spacing:-0.02em; color:var(--teal); line-height:1; }
        .ri-metric .l { font-size:14px; color:var(--fg); line-height:1.4; margin-top:10px; font-weight:500; }
        .ri-metric .s { font-family:var(--mono); font-size:11px; color:var(--fg-3); margin-top:6px; letter-spacing:0.03em; }
        .ri-meta { display:grid; grid-template-columns:repeat(3,auto); gap:32px; font-family:var(--mono); font-size:12px; color:var(--fg-2); margin-top:24px; }
        .ri-meta span b { display:block; color:var(--fg-3); font-weight:400; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em; font-size:10.5px; }
        .ri-spot { display:grid; grid-template-columns:1fr 1.4fr; gap:64px; align-items:start; }
        .ri-faq details { border-bottom:1px solid var(--line); padding:28px 0; }
        .ri-faq details:last-child { border-bottom:none; }
        .ri-faq summary { cursor:pointer; display:flex; justify-content:space-between; align-items:baseline; gap:24px; list-style:none; }
        .ri-faq summary::-webkit-details-marker { display:none; }
        .ri-faq summary span:first-child { font-size:clamp(20px,2vw,24px); font-weight:500; letter-spacing:-0.015em; }
        .ri-faq p { margin-top:18px; color:var(--fg-2); font-size:16px; line-height:1.65; max-width:80ch; }
        @media (max-width:900px){ .ri-grid, .ri-grid.four, .ri-metrics { grid-template-columns:1fr 1fr; } .ri-spot { grid-template-columns:1fr; gap:32px; } .ri-meta { grid-template-columns:1fr; gap:14px; } }
        @media (max-width:560px){ .ri-grid, .ri-grid.four, .ri-metrics { grid-template-columns:1fr; } }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero" data-screen-label="01 Regulated hero" style={{ paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">SERVICES / 05</span>&nbsp;Regulated Industries</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(44px, 7vw, 96px)' }}>
            AI that survives<br /><em>compliance review.</em>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              We build agentic AI systems for industries where every output is reviewed, regulated, and audited. Pharma advertising. Financial services. Healthcare. <b style={{ color: 'var(--fg)' }}>The governance layer is the product.</b>
            </p>
            <div className="reveal" data-delay="3">
              <div className="ri-chips" style={{ marginTop: 0 }}>
                <span className="ri-chip">83% faster campaign launches</span>
                <span className="ri-chip">NIST AI RMF compliant</span>
                <span className="ri-chip">FDA / MLR / PRC approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why regulated industries are different ── */}
      <section data-screen-label="02 Why different">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 01</span>&nbsp;The difference</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Why regulated industries are different.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Most AI studios build for speed. Regulated industries require something harder: <b style={{ color: 'var(--fg)' }}>auditability</b>.
            </p>
          </div>
          <div className="ri-grid reveal" data-delay="2">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.ix} className="ri-card">
                <span className="ix">{d.ix}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study Spotlight ── */}
      <section data-screen-label="03 Heller spotlight">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;Case study</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">The Heller model — AI Center of Excellence for Pharma.</h2></div>
          </div>
          <div className="ri-spot reveal" data-delay="1">
            <div>
              <p className="lede" style={{ fontSize: 17 }}>
                A full-service pharma advertising agency needed AI across five brand teams without disrupting a single active campaign and without a single MLR failure. We built the governance layer first, then the knowledge bases, then the automations.
              </p>
              <div className="ri-meta">
                <span><b>Client</b>Heller Agency · Full-service pharma advertising</span>
                <span><b>Stack</b>MindStudio · RAG · Claude · N8N</span>
                <span><b>Engagement</b>2022–Present</span>
              </div>
              <div style={{ marginTop: 28 }}>
                <Link className="btn btn-primary" href="/work/heller">Read the full case study <Arrow /></Link>
              </div>
            </div>
            <div className="ri-metrics" style={{ marginTop: 0 }}>
              {METRICS.map((m) => (
                <div key={m.label} className="ri-metric">
                  <div className="n">{m.value}</div>
                  <div className="l">{m.label}</div>
                  <div className="s">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section data-screen-label="04 Approach">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 03</span>&nbsp;Method</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">How we approach regulated engagements.</h2></div>
          </div>
          <div className="ri-grid four reveal" data-delay="1">
            {PHASES.map((p) => (
              <div key={p.ix} className="ri-card">
                <span className="ix">{p.ix}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries served ── */}
      <section data-screen-label="05 Industries">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 04</span>&nbsp;Industries served</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Three sectors. One governance layer.</h2></div>
          </div>
          <div className="ri-grid reveal" data-delay="1">
            {INDUSTRIES.map((i) => (
              <div key={i.title} className="ri-card">
                <h3>{i.title}</h3>
                <p>{i.body}</p>
                <Link className="ri-link" href={i.href}>{i.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section data-screen-label="06 FAQ">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 05</span>&nbsp;Common questions</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Straight answers on compliance.</h2></div>
          </div>
          <div className="ri-faq reveal" style={{ borderTop: '1px solid var(--line)' }}>
            {FAQS.map((qa) => (
              <details key={qa.question}>
                <summary>
                  <span>{qa.question}</span>
                  <span className="mono-sm" style={{ color: 'var(--teal)' }}>+ open</span>
                </summary>
                <p>{qa.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-blue" data-screen-label="07 CTA">
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
              Ready to bring AI into<br /><em>a regulated environment?</em>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">We scope regulated engagements in two weeks. Tell us the brand, the compliance framework, and the workflow you want to automate.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">Talk to us <Arrow /></Link>
                <Link className="btn" href="/work/heller">See the Heller case study →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
