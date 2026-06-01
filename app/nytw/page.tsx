import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NY Tech Week 2026',
  description: "Where to find Sav Banerjee and Enso Labs during NY Tech Week 2026 — events, venues, and times. Come say hi.",
  alternates: { canonical: 'https://ensolabs.ai/nytw' },
  openGraph: {
    title: 'Enso Labs @ NY Tech Week 2026',
    description: 'Where to find me this week — events, venues, and times. Come say hi.',
    url: 'https://ensolabs.ai/nytw',
    type: 'website',
  },
};

type Ev = { d: string; t: string; n: string; v: string; star?: boolean; tag?: 'virtual' | 'online' };

const EVENTS: Ev[] = [
  // Mon Jun 1
  { d: '2026-06-01', t: 'all week', n: 'ElevenLabs NY Tech Week Pop-Up', v: '54 Crosby St' },
  { d: '2026-06-01', t: '3:00 PM', n: 'ERA / Remarkable Agentic AI Demo Showcase', v: 'Fenwick & West, 902 Broadway' },
  { d: '2026-06-01', t: '6:30 PM', n: 'Frontier Agentic GTM Night', v: '136 Crosby St' },
  { d: '2026-06-01', t: 'Jun 1–7', n: 'Resilient Agents — Online Hackathon', v: 'Online', tag: 'online' },
  // Tue Jun 2
  { d: '2026-06-02', t: 'drop-in', n: 'Fin Labs New York (book a demo)', v: '18 E 50th St' },
  { d: '2026-06-02', t: '2:00 PM', n: 'Find Your AI Use Case', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-02', t: '5:30 PM', n: 'Fin x Clay: Scaling CX in the AI Era', v: '18 E 50th St' },
  // Wed Jun 3
  { d: '2026-06-03', t: '5:00 PM', n: 'First Wednesday #NYCTechWeek', v: 'NYC' },
  { d: '2026-06-03', t: '5:00 PM', n: 'Pinecone Nexus AI Launch Party', v: '127 W 26th St' },
  { d: '2026-06-03', t: '6:00 PM', n: 'AI Tinkerers Demo Day (PostHog, Convex, Veris)', v: '598 Broadway, fl 11', star: true },
  // Thu Jun 4
  { d: '2026-06-04', t: '11:30 AM', n: 'AI Agents: How To Keep Pace', v: '18 E 50th St' },
  { d: '2026-06-04', t: '12:00 PM', n: 'The AI Strategy Summit', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-04', t: '1:00 PM', n: "How Anthropic's Marketing Team Uses Claude Cowork", v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Shipping AI-Powered GTM Workflows with Vercel', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Fin in Practice: The Path to Perfect CX', v: '18 E 50th St' },
  { d: '2026-06-04', t: '2:00 PM', n: 'OpenAI Builder Lounge', v: 'OpenAI HQ, 295 Lafayette St', star: true },
  { d: '2026-06-04', t: '5:30 PM', n: '2x AI: We Gave Everyone the Tools (Fin + Anthropic)', v: '18 E 50th St', star: true },
  { d: '2026-06-04', t: '6:00 PM', n: 'No Forking Way: AI Builds You Can Clone', v: 'Civic Hall, 124 E 14th St' },
  // Sat Jun 6
  { d: '2026-06-06', t: '9:00 AM', n: 'Profound Marketing Engineering Hackathon', v: 'NYC' },
  // Tue Jun 9
  { d: '2026-06-09', t: '1:00 PM', n: 'What Happens When AI Writes All the Code?', v: 'Virtual', tag: 'virtual' },
  { d: '2026-06-09', t: '6:00 PM', n: 'Marketing Engineer Meetup', v: 'WorkOS, 56 Greene St' },
  // Wed Jun 10
  { d: '2026-06-10', t: '12:30 PM', n: 'AI Inference Hack Day', v: 'NYC' },
  { d: '2026-06-10', t: '5:30 PM', n: 'Codex Lab: New York', v: 'The Farm SoHo, 447 Broadway' },
  { d: '2026-06-10', t: '6:00 PM', n: 'Arize Builders Meetup', v: 'Betaworks', star: true },
];

const dayLabel = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export default function NytwPage() {
  const days = Array.from(new Set(EVENTS.map((e) => e.d))).sort();
  const mono = 'var(--mono)';
  return (
    <main className="shell" style={{ paddingTop: 120, paddingBottom: 96, maxWidth: 720 }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 14 }}>
        Enso Labs · New York
      </div>
      <h1 style={{ fontSize: 'clamp(30px, 6vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 16px' }}>
        Find me at NY Tech Week
      </h1>
      <p style={{ color: 'var(--fg-2)', fontSize: 17, maxWidth: 560, margin: '0 0 14px' }}>
        I&rsquo;m Sav Banerjee, founder of Enso Labs. Here&rsquo;s my full week — if any of these overlap with yours, come say hi.
      </p>
      <p style={{ color: 'var(--fg-3)', fontSize: 14.5, borderLeft: '2px solid var(--teal-dim)', paddingLeft: 14, maxWidth: 560, margin: '0 0 22px' }}>
        Enso Labs is a forward-deployed, Claude-native AI intelligence studio. We build explainable market-sensing and agentic
        systems for brands and financial-services firms — proven inside a Fortune 500 and a pharma org.
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
        <span style={{ color: 'var(--teal)' }}>★ Best bets to catch me in person:</span> AI Tinkerers Demo Day (Wed), OpenAI Builder Lounge &amp; 2x AI w/ Anthropic (Thu), and Arize Builders (Jun 10).
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

      <p style={{ marginTop: 30, borderTop: '1px solid var(--line)', paddingTop: 16, fontSize: 13.5, color: 'var(--fg-3)', maxWidth: 560 }}>
        Building something in AI intelligence, agents, or financial services? I&rsquo;d love to compare notes — reach out at{' '}
        <a href="mailto:sav@ensopartners.co" style={{ color: 'var(--teal)' }}>sav@ensopartners.co</a>.
      </p>
    </main>
  );
}
