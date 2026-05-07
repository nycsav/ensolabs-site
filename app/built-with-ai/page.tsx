import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Built with AI',
  description:
    'Enso Labs is an AI-native studio. Every deliverable — strategy, code, content, and intelligence — is built with Claude, Perplexity, and our own agentic systems.',
  alternates: { canonical: '/built-with-ai' },
  openGraph: {
    title: 'Built with AI | Enso Labs',
    description:
      'How Enso Labs uses Claude Code, Claude Design, Perplexity, and signal2noise to deliver AI transformation at production quality.',
    url: '/built-with-ai',
  },
};

const TOOLS = [
  {
    name: 'Claude Opus 4',
    role: 'Strategy & Research',
    desc: 'Deep reasoning for market analysis, competitive intelligence, and architectural decisions. Powers the thinking behind every engagement.',
  },
  {
    name: 'Claude Code',
    role: 'Production Engineering',
    desc: 'Full-stack development from Next.js frontends to Firebase Cloud Functions. Every line of production code is pair-programmed with Claude Code.',
  },
  {
    name: 'Claude Design',
    role: 'Visual Prototyping',
    desc: 'Rapid UI/UX iteration — from wireframes to production-ready component design, including this website.',
  },
  {
    name: 'signal2noise',
    role: 'Content Intelligence',
    desc: 'Our proprietary intelligence engine synthesizes Tier 1 research into daily executive briefings, signal scores, and strategic playbooks.',
  },
  {
    name: 'Perplexity',
    role: 'Real-time Research',
    desc: 'Live web research with source attribution. Powers signal2noise discovery cards and real-time strategy chat.',
  },
  {
    name: 'n8n',
    role: 'Workflow Orchestration',
    desc: 'Multi-step agentic workflows: research → synthesis → approval → publishing. Connects 16+ nodes across APIs.',
  },
];

export default function BuiltWithAiPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Built with AI', href: '/built-with-ai' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Our Stack</p>
        <h1>Built with AI</h1>
        <p className="sub-head">
          Enso Labs is an AI-native studio. We don&rsquo;t just advise on AI
          transformation — we run our entire practice on the same agentic
          infrastructure we build for clients.
        </p>
      </section>

      <section className="section">
        <div className="prose">
          <p>
            Every deliverable that leaves this studio — strategy decks,
            production code, intelligence briefings, and client-facing systems —
            is built with AI at the core. Not as a novelty, but as the operating
            model.
          </p>
          <p>
            We publish our toolchain because transparency builds trust, and
            because it proves the thesis: AI doesn&rsquo;t replace senior
            judgment. It amplifies it.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>The Toolchain</h2>
        <div className="grid-3">
          {TOOLS.map((t) => (
            <div key={t.name} className="card">
              <p className="label">{t.role}</p>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Human-in-the-Loop</h2>
        <div className="prose">
          <p>
            AI generates. Humans decide. Every engagement has a senior advisor
            reviewing outputs, validating reasoning, and making the judgment
            calls that models cannot. The AI handles volume and velocity; the
            human handles context, ethics, and accountability.
          </p>
        </div>
      </section>

      <section className="section cta-section">
        <h2>See It in Action</h2>
        <p>
          Explore our case studies to see how AI-native delivery translates to
          production results.
        </p>
        <Link href="/work" className="cta">
          View Our Work <Arrow />
        </Link>
      </section>
    </>
  );
}
