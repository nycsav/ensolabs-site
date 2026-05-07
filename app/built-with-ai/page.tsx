import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, orgSchema } from '@/lib/schema';
import { SITE, url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
  description:
    'The story of building ensolabs.ai using Claude Chat, Claude Design, Claude Code, and Vercel — from strategy to production in a single day.',
  alternates: { canonical: '/built-with-ai' },
  openGraph: {
    title: 'Built with AI — How We Shipped a Production Site in 24 Hours',
    description:
      'Claude Chat for strategy. Claude Design for prototyping. Claude Code for production. Vercel for deployment. One day.',
    url: '/built-with-ai',
  },
};

const articleJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': url('/built-with-ai'),
  headline: 'Built with AI — How We Shipped a Production Site in 24 Hours',
  description:
    'The story of building ensolabs.ai using Claude Chat, Claude Design, Claude Code, and Vercel.',
  datePublished: '2026-05-01',
  dateModified: '2026-05-07',
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
        ]}
      />

      <section className="hero">
        <p className="label">Case Study</p>
        <h1>Built with AI</h1>
        <p className="sub-head">
          How we shipped a production website — 71 JSON-LD schemas, MCP
          endpoint, signal2noise integration, dynamic OG images, GA4 event
          tracking, and mobile responsive design — in 24 hours.
        </p>
      </section>

      <section className="section">
        <div className="prose">
          <h2>The Stack</h2>
          <p>
            ensolabs.ai was built entirely with AI tools — not as a stunt, but
            because it&rsquo;s the fastest way to ship a production-quality
            site. The same toolchain we use for client engagements built our own
            studio presence.
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
              <strong>signal2noise integration:</strong> Live intelligence feed
              embedded on the Insights page, pulling daily briefings from
              signals.ensolabs.ai (our Firebase-hosted intelligence engine).
            </li>
            <li>
              <strong>Dynamic OG images:</strong> Edge-runtime generated Open
              Graph images for every case study and insight article — unique
              social previews without a static image pipeline.
            </li>
            <li>
              <strong>GA4 event tracking:</strong> Form submissions, share
              button clicks, signal2noise feed interactions, and page
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
            A single senior practitioner with the right AI toolchain can ship
            production infrastructure that would take a traditional agency team
            weeks — with better SEO, more structured data, and tighter code.
          </p>
          <p>
            That&rsquo;s the thesis behind Enso Labs: AI doesn&rsquo;t replace
            senior judgment. It amplifies it. The human decides what to build
            and why. The AI handles the volume, velocity, and consistency.
          </p>
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
