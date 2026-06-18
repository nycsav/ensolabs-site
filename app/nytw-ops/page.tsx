import type { Metadata } from 'next';

// Private ops view — unlisted + noindex. Scored, mobile-first, fully self-contained
// (no connectors, no Mac dependency). Works on Sav's phone anytime.
export const metadata: Metadata = {
  title: 'NYTW Ops — Enso',
  robots: { index: false, follow: false, nocache: true },
};

type Ev = { d: string; t: string; n: string; v: string; score: number; why: string; status?: 'waitlist' | 'pending' | 'confirmed'; link?: string };

// Scores 1–10 = avg(client/pilot potential · builder cred · network quality · Enso positioning fit).
// Statuses live-verified on Partiful 6/4 AM (GOING / ON THE LIST = confirmed; WAITLIST / PENDING flagged).
const EVENTS: Ev[] = [
  // Thu Jun 4
  { d: '2026-06-04', t: '11:30 AM', n: 'AI Agents: How To Keep Pace', v: '18 E 50th St', score: 6, why: "CX leaders adopting agents (Fin/Intercom orbit). Rec: open with the eval-gap wedge — 'how do you measure agent quality?' → Research Desk demo." },
  { d: '2026-06-04', t: '12:00 PM', n: 'AI Strategy Summit (Section) · virtual', v: 'Virtual', score: 5, why: 'Virtual exec summit — learning only, clashes with the OpenAI Lounge. Rec: skip live, catch the replay.' },
  { d: '2026-06-04', t: '1:00 PM', n: 'Autonomously Improving Agent Swarms (W&B)', v: 'The Bench, 49 Elizabeth St', score: 7, why: 'ON THE LIST. Agent-swarm + eval crowd. Rec: W&B Weave sits right next to Signal Lens scoring — pitch the eval-rubric-as-product angle to the hosts.', status: 'confirmed' },
  { d: '2026-06-04', t: '1:00 PM', n: 'Anthropic Claude Cowork webinar · virtual', v: 'Virtual', score: 5, why: 'Virtual; useful for your own Cowork ops. Rec: mine it for a Strategy to Ship post.' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Fin in Practice', v: '18 E 50th St', score: 6, why: 'CX practitioners mid-deployment — lower seniority than 2x AI tonight. Rec: skip if heading to OpenAI Lounge; same Fin orbit at 5:30.' },
  { d: '2026-06-04', t: '2:00 PM', n: 'OpenAI Builder Lounge', v: 'OpenAI HQ, 295 Lafayette St', score: 9, why: '⚠️ DOORS CLOSE 2:30 — arrive 2:00. Codex + OpenAI AMA + credits. Partiful mirror still says pending, but your Visitly pre-reg is the real ticket. Rec: walk in with Signal Lens running on Codex — that IS your "built with Codex" story; fire Cloud tasks live while you talk to staff.' },
  { d: '2026-06-04', t: '2:00 PM', n: 'Shipping GTM Workflows w/ Vercel · virtual', v: 'Virtual', score: 4, why: 'Vercel GTM webinar — virtual learning. Rec: skip, replay.' },
  { d: '2026-06-04', t: '3:30 PM', n: 'AI for Finance: Claude + Excel + MCP', v: 'Jay Conference, 159 W 25th', score: 9, why: '⭐ Your exact stack (Claude + Excel + MCP) and the FS wedge — highest-signal finance room of the week, but you are WAITLISTED. Rec: work the waitlist / walk up early; if you get in, demo the FS agent angle hard.', status: 'waitlist' },
  { d: '2026-06-04', t: '4:15 PM', n: 'The Future of Tech & Talent in NYC (IBM)', v: 'IBM, One Madison Ave', score: 6, why: 'ON THE LIST. Talent/startup ecosystem panel + cocktails. Rec: ecosystem networking only — lower priority than the FS room.', status: 'confirmed' },
  { d: '2026-06-04', t: '5:30 PM', n: '2x AI w/ Anthropic (Fin)', v: '18 E 50th St', score: 9, why: '★ Claude-ecosystem room, Anthropic + Fin on stage — your Thu evening ANCHOR. Rec: this is the CX-in-the-AI-era positioning room; lead with the Gore (Fortune 500 manufacturer) proof point. Hold this unless Omakase is actually approved.' },
  { d: '2026-06-04', t: '6:00 PM', n: 'NYTW Omakase Dinner — Auth0 & MongoDB (VIP)', v: '26 W 23rd St, 5th fl', score: 7, why: 'Invite-only seated founders dinner — MongoDB Atlas vector (Signal Lens RAG layer) + Auth0 (agent identity). ⚠️ RSVP still shows NEEDS-ACTION / approval unconfirmed — confirm before you build the evening around it. If approved, this edges out 2x AI.', status: 'pending', link: 'https://nyc.aitinkerers.org/p/nytw-omakase-dinner-with-auth0' },
  { d: '2026-06-04', t: '6:00 PM', n: 'No Forking Way', v: 'Civic Hall, 124 E 14th St', score: 5, why: 'Clone-a-build demo night — overlaps the evening anchor. Rec: skip.' },
  // Fri Jun 5
  { d: '2026-06-05', t: '11:00 AM', n: 'a16z Speedrun AI Faire', v: 'NYC', score: 8, why: '★ a16z Speedrun community — best investor + founder density of the week, but you are WAITLISTED. Rec: push hard for approval; if in, this is your top VC-pipeline room.', status: 'waitlist' },
  { d: '2026-06-05', t: '3:00 PM', n: 'Vibe Code & Tea: build with Gemini', v: 'Cha, 51 Essex St', score: 4, why: 'Casual Gemini build session. Rec: optional — only if a real lead is going.', status: 'pending' },
  // Sat Jun 6
  { d: '2026-06-06', t: '9:00 AM', n: 'Profound Marketing Engineering Hackathon', v: 'NYC', score: 8, why: "★ BUILD DAY — you're accepted (direct host). AEO/GEO is Strategy to Ship's exact turf. Rec: ship a marketing-intel agent on the Signal Lens scaffold and write it up as a Strategy to Ship case study." },
  { d: '2026-06-06', t: '9:00 AM', n: 'Multimodal Hacks: Interface for Agents', v: 'Betaworks, 29 Little W 12th', score: 6, why: 'Agent-interface hackathon — WAITLISTED and clashes with Profound. Rec: Profound wins; drop this.', status: 'waitlist' },
  { d: '2026-06-06', t: '7:00 PM', n: 'do you want the house tour?', v: '447 E 9th St', score: 2, why: '👍 Going — personal/social house party, not Enso pipeline. Rec: downtime, enjoy it.', status: 'confirmed' },
  // Sun Jun 7
  { d: '2026-06-07', t: '9:30 AM', n: 'vibeFORWARD: M-2', v: 'NYC', score: 5, why: '👍 Going. Builder showcase — casual. Rec: low-key reps; scout builders to feature on Insights.', status: 'confirmed' },
  // Tue Jun 9
  { d: '2026-06-09', t: '6:00 PM', n: 'Marketing Engineer Meetup', v: 'WorkOS, 56 Greene St', score: 8, why: "★ Technical marketers + WorkOS / Bond AI hosts — Strategy to Ship's exact audience. Rec: your warmest GTM-engineering pipeline room; lead with the Strategy to Ship angle." },
  // Wed Jun 10
  { d: '2026-06-10', t: '2:00 PM', n: 'Build AI Forecasts w/ BigQuery + Agents · virtual', v: 'Virtual', score: 4, why: 'Google Cloud webinar — virtual learning. Rec: replay; mine for FS-forecasting content.' },
  { d: '2026-06-10', t: '5:30 PM', n: 'Codex Lab: New York', v: 'The Farm SoHo, 447 Broadway', score: 7, why: 'Hands-on AI-native eng, OpenAI partner — builder peers. Rec: continuity from the Builder Lounge; deepen the Codex story.' },
  { d: '2026-06-10', t: '6:00 PM', n: 'Arize Builders Meetup', v: 'Betaworks, 29 Little W 12th', score: 8, why: '★ Eval / observability crowd — your scoring rubric IS the eval story. Rec: pitch Signal Lens scoring as an eval product to Arize builders.' },
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
      <div style={{ fontFamily: mono, fontSize: 11.5, color: '#8a93a0', marginBottom: 16 }}>★ = 8+ priority · score /10 · statuses live-verified on Partiful</div>

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
              {e.link ? (
                <a href={e.link} target="_blank" rel="noreferrer" style={{ fontFamily: mono, fontSize: 11, color: '#5ce0d2', marginTop: 6, display: 'inline-block', textDecoration: 'none' }}>
                  → event page
                </a>
              ) : null}
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
