import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema } from '@/lib/schema';
import { url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Built with AI',
  description:
    'How we built ensolabs.ai in 24 hours using Claude Design, Claude Code, and Vercel. A case study in AI-native development.',
  alternates: { canonical: '/built-with-ai' },
  openGraph: {
    title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
    description:
      'Claude Design for prototyping. Claude Code for production. Vercel for deployment. 71 JSON-LD schemas. MCP endpoint. Auto-deploying from GitHub.',
    url: 'https://ensolabs.ai/built-with-ai',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=4', width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
    description:
      'Claude Design → Claude Code → Vercel. 71 JSON-LD schemas. MCP endpoint. Built in a day.',
  },
};

const STACK = [
  { ix: '01', step: 'Strategy & research', tool: 'Claude Chat (Opus 4.6)', det: 'Positioning, IA, naming, brand language. Decisions captured directly into project memory.' },
  { ix: '02', step: 'Visual prototyping', tool: 'Claude Design', det: 'Hi-fi prototypes for the home, services, work, insights, about, and contact pages — iterated live.' },
  { ix: '03', step: 'Production code', tool: 'Claude Code', det: 'Next.js 14 App Router, TypeScript, custom CSS, full JSON-LD graph, dynamic OG images, MCP endpoint.' },
  { ix: '04', step: 'Content intelligence', tool: 'signal2noise (PlannerAPI)', det: 'Daily AI-curated marketing signals embedded on /insights and surfaced on the home page.' },
  { ix: '05', step: 'Deployment', tool: 'Vercel + GitHub', det: 'Push to master → auto-deploy. No manual builds, no staging dance, no release engineering.' },
  { ix: '06', step: 'Analytics', tool: 'GA4 + Vercel Analytics', det: 'Event tracking on form submits, share clicks, signal2noise feed clicks. Wired before launch, not after.' },
];

const SHIPPED = [
  { ix: '01', ti: '6 main pages', de: 'Home, Services, Work, Insights, About, Contact — every one a definition-lead AEO surface.' },
  { ix: '02', ti: '4 case studies', de: 'Gore, Heller, Trading Terminal, Enterprise AI. Each with Article schema + share buttons.' },
  { ix: '03', ti: '71 JSON-LD schemas', de: 'Organization, Person, ProfessionalService, Product, FAQ, LocalBusiness, Article, Breadcrumb, WebSite. Validated, zero issues.' },
  { ix: '04', ti: 'Dynamic OG images', de: 'Edge-runtime image generation for case studies and insights. Static fallback at /og-default.png.' },
  { ix: '05', ti: 'MCP endpoint', de: 'Machine-readable studio profile at /.well-known/mcp.json so AI agents can query the studio directly.' },
  { ix: '06', ti: 'AI-crawler ready', de: 'GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, meta-externalagent — all explicitly welcomed in robots.txt.' },
];

export default function BuiltWithAiPage() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url('/built-with-ai'),
    headline: 'We built this site in 24 hours using AI.',
    description:
      'How Enso Labs shipped ensolabs.ai in a day using Claude Design, Claude Code, signal2noise, and Vercel — as a production system, not a demo.',
    datePublished: '2026-05-07',
    dateModified: '2026-05-07',
    author: { '@id': url('/#sav') },
    publisher: { '@id': url('/#organization') },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url('/built-with-ai') },
    articleSection: 'Build',
  } as Record<string, unknown>;

  return (
    <>
      <JsonLd
        schemas={[
          article,
          orgSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Built with AI', href: '/built-with-ai' },
          ]),
        ]}
      />

      <style>{`
        .stack-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        @media (max-width: 800px) { .stack-grid { grid-template-columns: 1fr; } }
        .stack-cell { background: var(--bg); padding: 28px 26px; display: grid; gap: 10px; min-height: 180px; }
        .stack-cell .ix { font-family: var(--mono); font-size: 11px; color: var(--teal); }
        .stack-cell .step { font-size: 13px; font-family: var(--mono); color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; }
        .stack-cell .tool { font-size: 21px; font-weight: 500; letter-spacing: -0.015em; }
        .stack-cell .det { color: var(--fg-2); font-size: 14.5px; line-height: 1.55; }
        .why p { font-size: 17px; line-height: 1.65; color: var(--fg-2); margin-bottom: 18px; }
        .why p strong { color: var(--fg); font-weight: 500; }
      `}</style>

      <section className="hero" data-screen-label="01 Built with AI hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">CASE / 05</span>&nbsp;Built with AI</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(44px, 7.5vw, 104px)' }}>
            We built this site<br />
            <em>in 24 hours</em> <span className="accent">using AI.</span>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Not as a demo. <strong style={{ color: 'var(--fg)' }}>As a production system serving real clients.</strong> Claude Design for the prototype.
              Claude Code for the production build. Vercel for deploy. signal2noise for content intelligence. Shipped, indexed, and earning citations.
            </p>
            <div className="reveal" data-delay="3">
              <div className="mono-sm" style={{ display: 'grid', gap: 8 }}>
                <div>↳ 6 pages, 4 case studies, 71 JSON-LD schemas</div>
                <div>↳ MCP endpoint · AI-crawler-ready robots</div>
                <div>↳ Auto-deploys from GitHub on push</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="02 The stack">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 01</span>&nbsp;The stack</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Strategy → prototype → production → deploy. Same operator end-to-end.</h2></div>
          </div>

          <div className="stack-grid reveal">
            {STACK.map((s) => (
              <div key={s.ix} className="stack-cell">
                <span className="ix">{s.ix}</span>
                <span className="step">{s.step}</span>
                <div className="tool">{s.tool}</div>
                <p className="det">{s.det}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="03 What shipped">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;What shipped</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">A production marketing system, not a landing page.</h2></div>
          </div>

          <div className="stack-grid reveal">
            {SHIPPED.map((s) => (
              <div key={s.ix} className="stack-cell">
                <span className="ix">{s.ix}</span>
                <div className="tool">{s.ti}</div>
                <p className="det">{s.de}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="04 Attribution">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 03</span>&nbsp;The AI attribution</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Credited in the footer of every page. Not a disclaimer — a competitive advantage.</h2></div>
          </div>

          <div className="reveal why" style={{ maxWidth: 760 }}>
            <p>
              The footer reads: <em>&ldquo;Designed with Claude Design · Built with Claude Code · Intelligence by signal2noise · Human-in-the-loop: Sav Banerjee.&rdquo;</em>
            </p>
            <p>
              We believe in transparency. Showing the stack signals two things to enterprise buyers: <strong>we use the tools we sell</strong>, and <strong>the studio is faster than a 50-person agency by design</strong>.
            </p>
            <p>
              The tools are in the prospectus. Production proof beats slideware every time.
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label="05 Why this matters">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 04</span>&nbsp;Why this matters</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">The companies that figure out AI-native development first will build 10× faster.</h2></div>
          </div>

          <div className="reveal why" style={{ maxWidth: 760 }}>
            <p>
              A traditional agency would have scoped this site as a 6-week engagement: discovery week, IA week, design rounds, dev sprints, QA, launch. Six figures, six weeks, six meetings.
            </p>
            <p>
              We compressed all of that into a single operator with the right tools. Strategy in Claude Chat. Prototype in Claude Design. Production code in Claude Code. Auto-deploy on Vercel. <strong>One day, one person, production-ready.</strong>
            </p>
            <p>
              That&rsquo;s the offer to clients: the same speed, applied to your business problem. We&rsquo;re proving the model on our own marketing first.
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label="06 CTA">
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Want to ship<br /><em>something</em> <span className="accent">like this?</span>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">Bring the business problem. We bring the operators, the stack, and the speed.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">Get in Touch <Arrow /></Link>
                <Link className="btn" href="/work">See the work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
