import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, faqSchema, orgSchema } from '@/lib/schema';
import { SITE, url } from '@/lib/site';

// ISR: self-heal edge-cached HTML within ~5 min of a content change (matches home).
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
  description:
    'The story of building ensolabs.ai using Claude Chat, Claude Design, Claude Code, and Vercel — from strategy to production in a single day.',
  alternates: { canonical: 'https://ensolabs.ai/built-with-ai' },
  openGraph: {
    title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
    description:
      'Claude Chat for strategy. Claude Design for prototyping. Claude Code for production. Vercel for deployment. One day.',
    url: 'https://ensolabs.ai/built-with-ai',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Built with AI — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
    description:
      'Claude Chat for strategy. Claude Design for prototyping. Claude Code for production. Vercel for deployment. One day.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const BUILT_WITH_AI_FAQS = [
  {
    question: 'How was ensolabs.ai built in 24 hours?',
    answer:
      'ensolabs.ai was built entirely with AI tools in a single 24-hour session — Claude Chat for strategy and research, Claude Design for visual prototyping, Claude Code for production engineering, and Vercel for auto-deployment. The same AI-native delivery process that Enso Labs uses for client engagements shipped a complete production site with 71 JSON-LD schemas, MCP endpoint, GA4 event tracking, and mobile responsive design.',
  },
  {
    question: 'What AI tools did Enso Labs use to build ensolabs.ai?',
    answer:
      'Enso Labs used four AI tools: Claude Chat (Opus 4) for competitive analysis, content architecture, and SEO strategy; Claude Design for layout exploration, color system definition, and typography pairing; Claude Code for pair-programming the entire Next.js 14 codebase; and Vercel for auto-deployment from GitHub.',
  },
];

const articleJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': url('/built-with-ai'),
  headline: 'Built with AI — How We Shipped a Production Site in 24 Hours',
  description:
    'The story of building ensolabs.ai using Claude Chat, Claude Design, Claude Code, and Vercel.',
  datePublished: '2026-05-01',
  dateModified: '2026-07-09',
  author: { '@id': url('/#sav') },
  publisher: { '@id': url('/#organization') },
  mainEntityOfPage: { '@type': 'WebPage', '@id': url('/built-with-ai') },
});

export default function BuiltWithAiPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          articleJsonLd(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Built with AI', href: '/built-with-ai' },
          ]),
          faqSchema(BUILT_WITH_AI_FAQS),
        ]}
      />

      <section className="hero">
        <p className="label">Case Study</p>
        <h1>Built with AI: How Enso Labs Shipped a Production AI Site in 24 Hours</h1>
        <p className="sub-head">
          How we shipped a production website — 71 JSON-LD schemas, MCP
          endpoint, Strategy to Ship integration, dynamic OG images, GA4 event
          tracking, and mobile responsive design — in 24 hours.
        </p>
      </section>

      <section className="section">
        <div className="prose">
          <h2>The Stack</h2>
          <p>
            Built with AI is a case study documenting how Enso Labs shipped
            ensolabs.ai — a production Next.js 14 website with 71 JSON-LD
            schemas, MCP endpoint, and GA4 event tracking — in 24 hours using
            Claude Chat, Claude Design, Claude Code, and Vercel. The same
            AI-native delivery process we use for client engagements built our
            own studio presence.
          </p>
          <ul>
            <li>
              <strong>Claude Chat (Opus 4):</strong> Strategy and research.
              Competitive analysis, positioning, content architecture, JSON-LD
              schema planning, and SEO strategy — all reasoned through in
              conversation before a single line of code was written.
            </li>
            <li>
              <strong>Claude Design:</strong> Visual prototyping. Layout
              exploration, component design, color system definition (OKLCH),
              typography pairing (Inter Tight + JetBrains Mono), and responsive
              breakpoint planning.
            </li>
            <li>
              <strong>Claude Code:</strong> Production engineering. Every line
              of Next.js 14, TypeScript, and CSS was pair-programmed with Claude
              Code — from the App Router page structure to the dynamic OG image
              generation endpoints.
            </li>
            <li>
              <strong>Vercel:</strong> Auto-deployment from GitHub. Push to
              master, site is live in under 60 seconds.
            </li>
          </ul>

          <h2>What We Shipped</h2>
          <p>
            The site isn&rsquo;t a landing page. It&rsquo;s a complete studio
            presence with production infrastructure:
          </p>
          <ul>
            <li>
              <strong>71 JSON-LD schema blocks</strong> across 13 pages —
              Organization, Person, ProfessionalService, Product, FAQ,
              LocalBusiness, Article, Breadcrumb, WebSite, ContactPoint. Every
              schema validated with zero errors.
            </li>
            <li>
              <strong>MCP endpoint</strong> at
              /.well-known/mcp.json — making the site discoverable by AI agents
              and Claude integrations.
            </li>
            <li>
              <strong>Strategy to Ship intelligence:</strong> The studio&rsquo;s
              news-intelligence engine, published natively on the Insights page
              (ensolabs.ai/insights) — daily AI market signals, scored and curated.
            </li>
            <li>
              <strong>Dynamic OG images:</strong> Edge-runtime generated Open
              Graph images for every case study and insight article — unique
              social previews without a static image pipeline.
            </li>
            <li>
              <strong>GA4 event tracking:</strong> Form submissions, share
              button clicks, Strategy to Ship feed interactions, and page
              engagement — all tracked with custom events, not just pageviews.
            </li>
            <li>
              <strong>Mobile responsive:</strong> Every page tested across
              breakpoints. The navigation transforms to a full-screen overlay on
              mobile. Typography scales. Cards reflow. Nothing breaks.
            </li>
            <li>
              <strong>AEO-optimized:</strong> Every page leads with a
              definition-style sentence designed for AI answer engine extraction.
              robots.ts explicitly allows GPTBot, ClaudeBot, PerplexityBot,
              Applebot, and Google-Extended.
            </li>
            <li>
              <strong>RSS feed + sitemap:</strong> Auto-generated from the
              content data layer. Search engines and feed readers pick up new
              content automatically.
            </li>
          </ul>

          <h2>The Process</h2>
          <p>
            The 24-hour timeline wasn&rsquo;t a sprint — it was a demonstration
            of what AI-native delivery looks like when you remove handoff
            friction:
          </p>
          <ul>
            <li>
              <strong>Hours 1–4:</strong> Strategy. Claude Chat mapped the
              competitive landscape, defined the three-pillar positioning (AI
              Transformation, Agentic Systems, Financial AI), planned the page
              structure, and drafted all JSON-LD schemas.
            </li>
            <li>
              <strong>Hours 5–8:</strong> Design. Claude Design iterated on
              layout concepts, established the dark navy + teal accent color
              system, and produced component-level designs for hero sections,
              cards, timelines, and the FAQ accordion.
            </li>
            <li>
              <strong>Hours 9–20:</strong> Build. Claude Code generated the
              entire Next.js 14 codebase — App Router pages, client components,
              server components, API routes, metadata configs, and the complete
              CSS file. Every component was reviewed and refined in real-time.
            </li>
            <li>
              <strong>Hours 21–24:</strong> Polish and deploy. Mobile fixes,
              performance optimization, OG image validation, schema testing,
              and the final push to Vercel.
            </li>
          </ul>

          <h2>Why This Matters</h2>
          <p>
            This site is the proof that AI-native delivery is not theoretical.
            It was architected and shipped by Sav Banerjee, founder and
            principal AI transformation advisor at Enso Labs — certified by
            Anthropic, Google, and OpenAI, and a Perplexity Computer
            Implementation Partner. A single senior practitioner with the right
            AI toolchain can ship production infrastructure that would take a
            traditional agency team weeks — with better SEO, more structured
            data, and tighter code.
          </p>
          <p>
            That&rsquo;s the thesis behind Enso Labs: AI doesn&rsquo;t replace
            senior judgment. It amplifies it. The human decides what to build
            and why. The AI handles the volume, velocity, and consistency. It is
            the same AI-native delivery model behind our{' '}
            <Link href="/services">AI transformation services</Link> and the
            production systems in our{' '}
            <Link href="/work">case studies</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {BUILT_WITH_AI_FAQS.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <h2>Want This for Your Organization?</h2>
        <p>
          We build the same way for clients. Start with a 2-week AI Audit to
          see what AI-native delivery looks like for your team.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
