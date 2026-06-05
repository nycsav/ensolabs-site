import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

const NYTW_FAQ = [
  {
    question: 'Which AI companies are at New York Tech Week 2026?',
    answer:
      'New York Tech Week 2026 (June 1-7) features AI companies and studios including Enso Labs, OpenAI, Anthropic, a16z, ElevenLabs, IBM, Scale AI, Pinecone, Vercel, Datadog, and Arize AI — with events spanning agentic AI, AI strategy, frontier models, and financial AI across Manhattan.',
  },
  {
    question: 'Where can you meet AI strategy consultants at NY Tech Week?',
    answer:
      'Sav Banerjee, founder of Enso Labs (AI transformation consulting firm in NYC), is at NY Tech Week 2026. Confirmed events include the OpenAI Builder Lounge, AI Tinkerers Demo Day, 2x AI with Anthropic, Fin x Clay, the Marketing Engineer Meetup, Codex Lab, and the Arize Builders Meetup. Contact sav@ensopartners.co to meet.',
  },
  {
    question: 'What is Enso Labs?',
    answer:
      'Enso Labs is a principal-led AI transformation studio and AI consulting firm based in New York City. Founded by Sav Banerjee, the studio builds production agentic systems, market intelligence platforms, and financial AI agents for Fortune 500 companies across healthcare, finance, and B2B technology. Certified by Anthropic, Google AI, and OpenAI.',
  },
];

export const metadata: Metadata = {
  title: 'Enso Labs at NY Tech Week 2026 | AI Companies, Events & Schedule',
  description:
    'Enso Labs — AI transformation studio and AI consulting firm in NYC — at New York Tech Week 2026. Confirmed event schedule: OpenAI, Anthropic, Fin, AI agents, and financial AI sessions. Find Sav Banerjee.',
  keywords: [
    'New York Tech Week 2026', 'NY Tech Week AI', 'AI companies NYC',
    'AI consultancies New York', 'AI strategy NYC', 'AI agency New York',
    'Enso Labs', 'Sav Banerjee', 'agentic AI NYC', 'frontier AI partner',
    'AI transformation consulting', 'Claude consulting', 'MCP architect',
  ],
  alternates: { canonical: 'https://ensolabs.ai/nytw' },
  openGraph: {
    title: 'Enso Labs at NY Tech Week 2026 — AI Strategy Studio NYC',
    description:
      'Where to find Sav Banerjee and Enso Labs during NY Tech Week 2026 — confirmed AI events: OpenAI, Anthropic, Fin, AI agents, financial AI.',
    url: 'https://ensolabs.ai/nytw',
    type: 'website',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Enso Labs at NY Tech Week 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enso Labs at NY Tech Week 2026 — AI Strategy Studio NYC',
    description:
      'Where to find Sav Banerjee and Enso Labs during NY Tech Week 2026 — confirmed AI events: OpenAI, Anthropic, Fin, AI agents, financial AI.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

type Ev = { d: string; t: string; n: string; v: string; star?: boolean; tag?: 'virtual' | 'online' };

// Confirmed only — cross-checked across Luma (approved) + Partiful (GOING / ON THE LIST) + direct host confirmations.
const EVENTS: Ev[] = [
  // Mon Jun 1
  { d: '2026-06-01', t: 'all week', n: 'ElevenLabs NY Tech Week Pop-Up', v: '54 Crosby St' },
  { d: '2026-06-01', t: '3:00 PM', n: 'ERA / Remarkable Agentic AI Demo Showcase', v: 'Fenwick & West, 902 Broadway', star: true },
  { d: '2026-06-01', t: '6:30 PM', n: 'Frontier Agentic GTM Night', v: '136 Crosby St', star: true },
  { d: '2026-06-01', t: 'Jun 1–7', n: 'Resilient Agents — Online Hackathon', v: 'Online', tag: 'online' },
  // Tue Jun 2
  { d: '2026-06-02', t: 'drop-in', n: 'Mercury Vinyl House (runs Jun 1–3)', v: "Port Sa'id, 88 King St, SoHo" },
  { d: '2026-06-02', t: 'drop-in', n: 'Fin Labs New York (book a demo)', v: '18 E 50th St' },
  { d: '2026-06-02', t: '9:00 AM', n: 'WeWork Coworking Day', v: 'Midtown' },
  { d: '2026-06-02', t: '10:00 AM', n: "Vercel's AI Cafe (coworking)", v: '45 E 20th St, Flatiron' },
  { d: '2026-06-02', t: '12:00 PM', n: 'Using Parallel Agents to Work Faster in Replit', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-02', t: '2:00 PM', n: 'Find Your AI Use Case (Section)', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-02', t: '3:00 PM', n: 'Build Agent-first Companies with Hyperagent', v: 'SECOND, 849 6th Ave' },
  { d: '2026-06-02', t: '3:00 PM', n: 'Masters of Scale Live w/ IBM CEO Arvind Krishna', v: 'IBM, One Madison Ave', star: true },
  { d: '2026-06-02', t: '4:00 PM', n: "AI Stack to Nasdaq: The Modern CFO's Exit Playbook", v: 'Nasdaq MarketSite, 151 W 43rd' },
  { d: '2026-06-02', t: '5:30 PM', n: 'Fin x Clay: Scaling CX in the AI Era', v: '18 E 50th St', star: true },
  { d: '2026-06-02', t: '5:30 PM', n: 'Agents & APIs Demo Night (WorkOS, Postman, Render, Composio)', v: '56 Greene St, 4th fl', star: true },
  { d: '2026-06-02', t: '5:30 PM', n: 'Datadog × Vercel: Taking AI to New Heights (rooftop)', v: 'NY Times Building, 620 8th Ave' },
  { d: '2026-06-02', t: '6:30 PM', n: 'Stan x Verci: Happy Hour & Stanley Beta Reveal', v: '45 E 20th St, Flatiron' },
  // Wed Jun 3
  { d: '2026-06-03', t: '10:00 AM', n: "Build AI Agent Workflows That Stick: Vercel's Blueprint", v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-03', t: '2:00 PM', n: "The Non-Engineer's AI Playbook — MuleRun", v: '55 Broadway' },
  { d: '2026-06-03', t: '5:00 PM', n: 'Pinecone Nexus AI Launch Party', v: '127 W 26th St', star: true },
  { d: '2026-06-03', t: '5:00 PM', n: 'AI Collective Demo Night', v: '888 Broadway, fl 4 (Atlassian)' },
  { d: '2026-06-03', t: '5:30 PM', n: 'Camp AI: Agents at Work', v: 'Datadog HQ, 620 8th Ave' },
  { d: '2026-06-03', t: '6:00 PM', n: 'AI Tinkerers Demo Day (PostHog, Convex, Veris)', v: '598 Broadway, fl 11', star: true },
  { d: '2026-06-03', t: '6:00 PM', n: 'AI-Assisted Setups ft. Activant & Stuut', v: 'Activant Capital, 110 Greene St' },
  { d: '2026-06-03', t: '6:00 PM', n: 'AI Builders Night', v: 'The Ready Cantina, 112 E 11th' },
  { d: '2026-06-03', t: '6:00 PM', n: 'Managing in an AI-Native Company: Live Podcast', v: '121 E 27th St, Ste 207' },
  // Thu Jun 4
  { d: '2026-06-04', t: '11:30 AM', n: 'AI Agents: How To Keep Pace', v: '18 E 50th St' },
  { d: '2026-06-04', t: '1:00 PM', n: 'Autonomously Improving Agent Swarms with W&B', v: 'The Bench, 49 Elizabeth St' },
  { d: '2026-06-04', t: '1:00 PM', n: "How Anthropic's Marketing Team Uses Claude Cowork", v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Shipping AI-Powered GTM Workflows with Vercel', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Fin in Practice: The Path to Perfect CX', v: '18 E 50th St' },
  { d: '2026-06-04', t: '2:00 PM', n: 'OpenAI Builder Lounge', v: 'OpenAI HQ, 295 Lafayette St', star: true },
  { d: '2026-06-04', t: '3:30 PM', n: 'AI for Finance: Building with Claude + Excel + MCP', v: 'Jay Conference Chelsea, 159 W 25th St', star: true },
  { d: '2026-06-04', t: '4:15 PM', n: 'The Future of Tech & Talent in NYC', v: 'IBM, One Madison Ave' },
  { d: '2026-06-04', t: '5:30 PM', n: '2x AI: We Gave Everyone the Tools (Fin + Anthropic)', v: '18 E 50th St', star: true },
  { d: '2026-06-04', t: '6:00 PM', n: 'No Forking Way: AI Builds You Can Clone', v: 'Civic Hall, 124 E 14th St' },
  // Fri Jun 5
  { d: '2026-06-05', t: '5:00 PM', n: 'Lovable Build Session with Datadog & Firecrawl', v: 'Datadog, 620 8th Ave, 45th fl' },
  { d: '2026-06-05', t: '6:30 PM', n: 'AI/ML Engineer Craft Beer Crawl (Hop-field Networks)', v: 'London & Martin Co., 6 Stone St' },
  // Sat Jun 6
  { d: '2026-06-06', t: '9:00 AM', n: 'Profound Marketing Engineering Hackathon', v: 'NYC', star: true },
  { d: '2026-06-06', t: '9:00 AM', n: 'Multimodal Hacks: Build the Interface for Agents', v: 'Betaworks, 29 Little W 12th St' },
  // Sun Jun 7
  { d: '2026-06-07', t: '9:30 AM', n: 'vibeFORWARD: M-2', v: 'NYC' },
  // Tue Jun 9
  { d: '2026-06-09', t: '6:00 PM', n: 'Marketing Engineer Meetup', v: 'WorkOS, 56 Greene St' },
  // Wed Jun 10
  { d: '2026-06-10', t: '2:00 PM', n: 'Future-proof Your Business: AI Forecasts with BigQuery + Agents', v: 'Online', tag: 'virtual' },
  { d: '2026-06-10', t: '5:30 PM', n: 'Codex Lab: New York', v: 'The Farm SoHo, 447 Broadway' },
  { d: '2026-06-10', t: '6:00 PM', n: 'Arize Builders Meetup', v: 'Betaworks, 29 Little W 12th St', star: true },
];

const dayLabel = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export default function NytwPage() {
  // Keep the public page current: only show today + upcoming days (drops elapsed days automatically on each deploy).
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
  const days = Array.from(new Set(EVENTS.map((e) => e.d))).filter((d) => d >= today).sort();
  const mono = 'var(--mono)';
  return (
    <main className="shell" style={{ paddingTop: 120, paddingBottom: 96, maxWidth: 720 }}>
      <JsonLd
        schemas={[
          faqSchema(NYTW_FAQ),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'NY Tech Week 2026', href: '/nytw' },
          ]),
        ]}
      />
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 14 }}>
        Enso Labs · AI Consulting Studio · New York
      </div>
      <h1 style={{ fontSize: 'clamp(30px, 6vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 16px' }}>
        Enso Labs at NY Tech Week 2026
      </h1>
      <p style={{ color: 'var(--fg-2)', fontSize: 17, maxWidth: 560, margin: '0 0 14px' }}>
        Enso Labs is a principal-led <Link href="/services" style={{ color: 'var(--teal)' }}>AI transformation consulting firm</Link> based in NYC. I&rsquo;m Sav Banerjee, the founder — here&rsquo;s my confirmed NY Tech Week schedule. If any of these overlap with yours, come say hi.
      </p>
      <p style={{ color: 'var(--fg-3)', fontSize: 14.5, borderLeft: '2px solid var(--teal-dim)', paddingLeft: 14, maxWidth: 560, margin: '0 0 22px' }}>
        We build production agentic systems and AI strategy for Fortune 500 companies — proven inside a <Link href="/work/gore" style={{ color: 'var(--teal)' }}>Fortune 500 manufacturer</Link> and a <Link href="/work/heller" style={{ color: 'var(--teal)' }}>pharma agency</Link>. Certified by Anthropic, Google AI, and OpenAI.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
        {[
          { href: 'https://ensolabs.ai', label: 'ensolabs.ai' },
          { href: 'https://www.linkedin.com/in/savbanerjee', label: 'LinkedIn' },
          { href: 'mailto:sav@ensopartners.co', label: 'sav@ensopartners.co' },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontFamily: mono, fontSize: 12, color: 'var(--teal)', border: '1px solid var(--line-2)', borderRadius: 999, padding: '8px 14px', textDecoration: 'none' }}>
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--teal-dim)', borderRadius: 12, padding: '13px 16px', marginBottom: 4, fontSize: 14, color: 'var(--fg-2)' }}>
        <span style={{ color: 'var(--teal)' }}>★ Best bets to catch me in person:</span> the OpenAI Builder Lounge, AI for Finance (Claude + MCP), and 2x AI with Fin + Anthropic (Thu), the Profound Marketing Engineering Hackathon (Sat), and the Arize Builders Meetup (Wed Jun 10).
      </div>
      <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--fg-3)', margin: '8px 0 0' }}>★ = best chance to meet · &ldquo;virtual&rdquo; = I&rsquo;m tuning in remotely</p>

      {days.map((d) => (
        <section key={d}>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--fg-2)', margin: '26px 0 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {dayLabel(d)}<span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          {EVENTS.filter((e) => e.d === d).map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '11px 0', borderBottom: '1px solid var(--line)', opacity: e.tag === 'virtual' ? 0.62 : 1 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--teal-dim)', whiteSpace: 'nowrap', minWidth: 92, paddingTop: 2 }}>{e.t}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15.5, letterSpacing: '-0.01em' }}>
                  {e.n}
                  {e.star && <span style={{ color: 'var(--teal)', fontSize: 12 }}> ★</span>}
                  {e.tag && (
                    <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--fg-3)', border: '1px solid var(--line-2)', borderRadius: 999, padding: '1px 7px', marginLeft: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {e.tag}
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: 'var(--fg-3)', marginTop: 2 }}>{e.v}</div>
              </div>
            </div>
          ))}
        </section>
      ))}

      <div style={{ marginTop: 30, borderTop: '1px solid var(--line)', paddingTop: 20 }}>
        <p style={{ fontSize: 13.5, color: 'var(--fg-3)', maxWidth: 560, margin: '0 0 16px' }}>
          Building something in AI intelligence, agents, or financial services? I&rsquo;d love to compare notes — reach out at{' '}
          <a href="mailto:sav@ensopartners.co" style={{ color: 'var(--teal)' }}>sav@ensopartners.co</a>.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontFamily: mono, fontSize: 12 }}>
          <Link href="/services" style={{ color: 'var(--teal)' }}>AI Consulting Services</Link>
          <span style={{ color: 'var(--line-2)' }}>·</span>
          <Link href="/work" style={{ color: 'var(--teal)' }}>Case Studies</Link>
          <span style={{ color: 'var(--line-2)' }}>·</span>
          <Link href="/about" style={{ color: 'var(--teal)' }}>About Sav Banerjee</Link>
          <span style={{ color: 'var(--line-2)' }}>·</span>
          <Link href="/contact" style={{ color: 'var(--teal)' }}>Get in Touch</Link>
          <span style={{ color: 'var(--line-2)' }}>·</span>
          <Link href="/insights" style={{ color: 'var(--teal)' }}>Insights</Link>
        </div>
      </div>
    </main>
  );
}
