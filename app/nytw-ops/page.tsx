import type { Metadata } from 'next';

// Private ops view — unlisted + noindex. Scored, mobile-first, fully self-contained
// (no connectors, no Mac dependency). Works on Sav's phone anytime.
export const metadata: Metadata = {
  title: 'NYTW Ops — Enso',
  robots: { index: false, follow: false, nocache: true },
};

type Ev = { d: string; t: string; n: string; v: string; score: number; why: string; status?: 'waitlist' | 'pending' };

const EVENTS: Ev[] = [
  // all week
  { d: '2026-06-03', t: 'all week', n: 'ElevenLabs Pop-Up', v: '54 Crosby St', score: 4, why: 'Voice-agent pop-up — content moment, not pipeline.' },
  // Wed Jun 3
  { d: '2026-06-03', t: '9:00 AM', n: 'Mercury Vinyl House (closing brunch)', v: "Port Sa'id, 88 King St, SoHo", score: 5, why: 'Casual founder/VC lounge — light networking.' },
  { d: '2026-06-03', t: '1:00 PM', n: 'Build AI Agent Workflows (Vercel) · virtual', v: 'Virtual', score: 4, why: 'Relevant learning; replay-able.' },
  { d: '2026-06-03', t: '2:00 PM', n: "MuleRun: Non-Engineer's AI Playbook", v: '55 Broadway', score: 6.5, why: "Operators + Andrew Yeung's network; 'AI-native teams' = your pitch." },
  { d: '2026-06-03', t: '5:00 PM', n: 'First Wednesday', v: 'NYC', score: 6, why: 'Agencies/brands/publishers — signal2noise audience.' },
  { d: '2026-06-03', t: '5:00 PM', n: 'Pinecone Nexus Launch', v: '127 W 26th St', score: 8, why: 'RAG/vector infra — the layer Signal Lens runs on; VP demo 5:15.' },
  { d: '2026-06-03', t: '5:00 PM', n: 'AI Collective Demo Night', v: '888 Broadway, fl 4', score: 6, why: 'Startup demos + investors — broad exposure.', status: 'pending' },
  { d: '2026-06-03', t: '5:30 PM', n: 'Camp AI: Agents at Work', v: 'Datadog HQ, 620 8th Ave', score: 7.5, why: 'Agentic-workflow panel (Fin/Datadog/Cursor/Auth0) — dead-on your topic.' },
  { d: '2026-06-03', t: '6:00 PM', n: 'AI Tinkerers Demo Day', v: '598 Broadway, fl 11', score: 9, why: 'Screened builders, no decks — home crowd + the room to demo Research Desk.' },
  { d: '2026-06-03', t: '6:00 PM', n: 'AI Builders Night', v: 'Ready Cantina, 112 E 11th', score: 6, why: 'Agents/evals/production — casual builder chats.' },
  { d: '2026-06-03', t: '6:00 PM', n: 'Managing in an AI-Native Company', v: '121 E 27th St', score: 7, why: '50 curated AI engineers + consultants; MVP demos + positioning.' },
  // Thu Jun 4
  { d: '2026-06-04', t: '11:30 AM', n: 'AI Agents: How To Keep Pace', v: '18 E 50th St', score: 6, why: 'CX leaders adopting agents — eval wedge convo.' },
  { d: '2026-06-04', t: '12:00 PM', n: 'AI Strategy Summit (Section) · virtual', v: 'Virtual', score: 5, why: 'Section summit — learning; clashes with OpenAI Lounge.' },
  { d: '2026-06-04', t: '1:00 PM', n: 'Autonomously Improving Agent Swarms (W&B)', v: 'The Bench, 49 Elizabeth St', score: 7, why: 'Agent-swarm + eval crowd — enterprise-agent relevant.' },
  { d: '2026-06-04', t: '1:00 PM', n: "Anthropic Claude Cowork webinar · virtual", v: 'Virtual', score: 5, why: 'Useful for your own ops (virtual).' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Fin in Practice', v: '18 E 50th St', score: 6, why: 'CX practitioners mid-deployment — lower seniority.' },
  { d: '2026-06-04', t: '2:00 PM', n: 'OpenAI Builder Lounge', v: 'OpenAI HQ, 295 Lafayette St', score: 9, why: 'Codex + OpenAI AMA + credits. ⚠️ DOORS CLOSE 2:30 — arrive 2:00.' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Shipping GTM Workflows w/ Vercel · virtual', v: 'Virtual', score: 4, why: 'Vercel GTM webinar — learning.' },
  { d: '2026-06-04', t: '3:30 PM', n: 'AI for Finance: Claude + Excel + MCP', v: 'Jay Conference, 159 W 25th', score: 9, why: '⭐ Your exact stack & FS wedge — highest-signal FS room.', status: 'waitlist' },
  { d: '2026-06-04', t: '4:15 PM', n: 'The Future of Tech & Talent in NYC (IBM)', v: 'IBM, One Madison Ave', score: 6, why: 'Talent/startup panel — ecosystem networking.' },
  { d: '2026-06-04', t: '5:30 PM', n: '2x AI w/ Anthropic (Fin)', v: '18 E 50th St', score: 9, why: 'Claude-ecosystem room — Anthropic + Fin on stage; CCS + Managed Services.' },
  { d: '2026-06-04', t: '6:00 PM', n: 'No Forking Way', v: 'Civic Hall, 124 E 14th St', score: 5, why: 'Overlaps 2x AI — skip unless you bail on Fin.' },
  // Fri Jun 5
  { d: '2026-06-05', t: '11:00 AM', n: 'a16z Speedrun AI Faire', v: 'NYC', score: 8, why: 'a16z Speedrun community — investor + founder density.', status: 'waitlist' },
  { d: '2026-06-05', t: '3:00 PM', n: 'Vibe Code & Tea: build with Gemini', v: 'Cha, 51 Essex St', score: 4, why: 'Casual build session.', status: 'pending' },
  // Sat Jun 6
  { d: '2026-06-06', t: '9:00 AM', n: 'Profound Marketing Engineering Hackathon', v: 'NYC', score: 8, why: "Build venue — ship a marketing-intel agent; you're accepted." },
  { d: '2026-06-06', t: '9:00 AM', n: 'Multimodal Hacks: Interface for Agents', v: 'Betaworks, 29 Little W 12th', score: 6, why: 'Agent-interface hackathon — builder reps.', status: 'waitlist' },
  // Sun Jun 7
  { d: '2026-06-07', t: '9:30 AM', n: 'vibeFORWARD: M-2', v: 'NYC', score: 5, why: 'Builder showcase — casual.' },
  // Tue Jun 9
  { d: '2026-06-09', t: '6:00 PM', n: 'Marketing Engineer Meetup', v: 'WorkOS, 56 Greene St', score: 8, why: "Technical marketers + WorkOS/Bond AI hosts — signal2noise's exact audience." },
  // Wed Jun 10
  { d: '2026-06-10', t: '5:30 PM', n: 'Codex Lab: New York', v: 'The Farm SoHo, 447 Broadway', score: 7, why: 'Hands-on AI-native eng, OpenAI partner — builder peers.' },
  { d: '2026-06-10', t: '6:00 PM', n: 'Arize Builders Meetup', v: 'Betaworks, 29 Little W 12th', score: 8, why: 'Eval/observability — your scoring rubric IS the eval story.' },
];

const dayLabel = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
const band = (s: number) => (s >= 8 ? '#5ce0d2' : s >= 6 ? '#e0b65c' : '#8a93a0');

export default function NytwOps() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
  const days = Array.from(new Set(EVENTS.map((e) => e.d))).filter((d) => d >= today).sort();
  const mono = "'JetBrains Mono', ui-monospace, monospace";
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '18px 14px 70px', fontFamily: "'Inter Tight', -apple-system, sans-serif", color: '#f5f3ee' }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a93a0' }}>Enso · NYTW Ops · private</div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: '4px 0 2px', letterSpacing: '-0.02em' }}>Scored event tracker</h1>
      <div style={{ fontFamily: mono, fontSize: 11.5, color: '#8a93a0', marginBottom: 16 }}>★ = 8+ priority · score /10 · works offline-ish on your phone</div>

      {days.map((d) => (
        <section key={d}>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#cfd6df', margin: '20px 0 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {dayLabel(d)}<span style={{ flex: 1, height: 1, background: '#2a3140' }} />
          </div>
          {EVENTS.filter((e) => e.d === d).sort((a, b) => b.score - a.score).map((e, i) => (
            <div key={i} style={{ background: '#1c2230', border: '1px solid #2a3140', borderRadius: 12, padding: '12px 13px', marginBottom: 9 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{e.t}</span>
                <span style={{ fontWeight: 600, fontSize: 14.5, flex: 1, minWidth: 160 }}>{e.n}</span>
                <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: band(e.score), border: `1px solid ${band(e.score)}`, borderRadius: 999, padding: '1px 8px' }}>
                  {e.score >= 8 ? '★ ' : ''}{e.score}
                </span>
              </div>
              <div style={{ fontFamily: mono, fontSize: 11, color: '#8a93a0', marginTop: 5 }}>
                📍 {e.v}{e.status ? ` · ${e.status.toUpperCase()}` : ''}
              </div>
              <div style={{ fontSize: 12.5, color: '#cfd6df', marginTop: 6 }}>{e.why}</div>
            </div>
          ))}
        </section>
      ))}
      <p style={{ fontFamily: mono, fontSize: 10.5, color: '#6b7280', marginTop: 22, borderTop: '1px solid #2a3140', paddingTop: 12 }}>
        Snapshot updated by Claude · ensolabs.ai/nytw is the public version · scores internal
      </p>
    </main>
  );
}
