import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { NycClock } from '@/components/NycClock';
import { ContactForm } from '@/components/ContactForm';
import {
  breadcrumbSchema,
  contactPointSchema,
  faqSchema,
  localBusinessSchema,
  orgSchema,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start an Enso Labs engagement. Book a Discovery Call, email Sav directly, or send a project brief. Response within 24 hours.',
  alternates: { canonical: '/contact' },
};

const FAQ = [
  {
    question: 'Is this a solo shop or a team?',
    answer:
      'Enso Labs is principal-led. Sav is the senior advisor on every engagement and is hands-on through delivery. A vetted specialist network — design, ops, niche engineering — scales with the work. Strategy and architecture are never subcontracted.',
  },
  {
    question: 'What does a 2-week diagnostic actually deliver?',
    answer:
      'A written roadmap, a prioritized opportunity backlog, an ROI model, a governance gap-map, and a working agentic prototype against your real data. Fixed-fee, scoped before we start.',
  },
  {
    question: 'Do you work with regulated industries?',
    answer:
      'Most of my work is in regulated industries: pharma (FDA / MLR / PRC), financial services, healthcare. Governance is built into every engagement, anchored on NIST AI RMF.',
  },
  {
    question: 'Can I just hire you to build, without consulting?',
    answer:
      'Yes. The Trading Terminal proves the build-only model. If you have a clearly-scoped agentic system you need shipped, send the brief.',
  },
  {
    question: 'Who owns the IP?',
    answer:
      'You do. Client engagements transfer all custom code, prompts, eval suites, and documentation on delivery. Frameworks like the Strategy-to-Ship Framework remain Enso Labs IP.',
  },
  {
    question: 'How many clients do you take at once?',
    answer:
      'A small handful of active deep engagements at a time. That’s the whole point — depth, not portfolio. If we’re at capacity, I’ll tell you and offer a date.',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          localBusinessSchema(),
          contactPointSchema(),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Contact', href: '/contact' },
          ]),
        ]}
      />

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 48px; } }
        form { display: grid; gap: 22px; }
        .field { display: grid; gap: 10px; }
        .field label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; display: flex; justify-content: space-between; }
        .field label .req { color: var(--teal); }
        .field input, .field textarea, .field select { background: transparent; border: none; border-bottom: 1px solid var(--line-2); color: var(--fg); font-family: var(--display); font-size: 18px; padding: 12px 0; transition: border-color .2s ease; width: 100%; outline: none; }
        .field textarea { min-height: 120px; resize: vertical; line-height: 1.55; }
        .field input:focus, .field textarea:focus, .field select:focus { border-color: var(--teal); }
        .field input::placeholder, .field textarea::placeholder { color: var(--fg-3); }
        .chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .chip { font-family: var(--mono); font-size: 12px; padding: 8px 14px; border: 1px solid var(--line-2); border-radius: 999px; color: var(--fg-2); cursor: pointer; transition: border-color .2s, color .2s, background .2s; user-select: none; background: transparent; }
        .chip:hover { border-color: var(--fg); color: var(--fg); }
        .chip.is-active { border-color: var(--teal); color: var(--teal); background: color-mix(in oklab, var(--teal) 10%, transparent); }
        .submit-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 12px; flex-wrap: wrap; }
        .submit-row .note { font-family: var(--mono); font-size: 12px; color: var(--fg-3); }
        .side { background: var(--bg-2); border: 1px solid var(--line); border-radius: 10px; padding: 36px 32px; display: grid; gap: 28px; }
        .side h3 { font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; }
        .channel { display: flex; gap: 16px; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid var(--line); }
        .channel:last-child { border-bottom: none; padding-bottom: 0; }
        .channel .ix { font-family: var(--mono); font-size: 11px; color: var(--teal); width: 32px; padding-top: 4px; }
        .channel .body { display: grid; gap: 4px; }
        .channel .body b { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; }
        .channel .body a { color: var(--teal); font-family: var(--mono); font-size: 13px; }
        .channel .body p { color: var(--fg-2); font-size: 14px; line-height: 1.5; }
        .cal-mock { border: 1px solid var(--line); border-radius: 8px; background: var(--bg); overflow: hidden; font-family: var(--mono); }
        .cal-head { padding: 14px 18px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; font-size: 12px; color: var(--fg-3); }
        .cal-head b { color: var(--fg); font-weight: 500; }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--line); }
        .cal-day { background: var(--bg); padding: 10px 8px; text-align: center; font-size: 11px; color: var(--fg-3); }
        .cal-day.head { color: var(--fg-2); padding: 12px 8px; font-weight: 500; }
        .cal-day.avail { color: var(--fg); border: 1px solid color-mix(in oklab, var(--teal) 50%, transparent); cursor: pointer; }
        .cal-day.avail:hover { background: var(--teal); color: var(--bg); }
        .cal-day.full { color: oklch(0.45 0.01 80); }
        .cal-foot { padding: 12px 18px; font-size: 11px; color: var(--fg-3); display: flex; justify-content: space-between; border-top: 1px solid var(--line); }
        .toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(60px); background: var(--teal); color: var(--bg); padding: 14px 22px; border-radius: 999px; font-family: var(--mono); font-size: 13px; font-weight: 500; box-shadow: 0 12px 40px rgba(0,0,0,0.4); opacity: 0; transition: opacity .3s, transform .3s; z-index: 100; pointer-events: none; display: flex; gap: 10px; align-items: center; }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
        details summary { cursor: pointer; display: flex; justify-content: space-between; align-items: baseline; gap: 24px; list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      <section className="hero" data-screen-label="01 Contact hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">PAGE / 06</span>&nbsp;Contact</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(44px, 7.5vw, 104px)' }}>
            Let&rsquo;s <em>scope</em><br />
            <span className="accent">something real.</span>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Tell me about the system you&rsquo;re trying to ship. I read every brief personally and respond within 24 hours.
              If we&rsquo;re a fit, we&rsquo;ll book a 30-minute call to scope a 2-week diagnostic.
            </p>
            <div className="reveal" data-delay="3">
              <div className="mono-sm" style={{ display: 'grid', gap: 8 }}>
                <div>↳ <span style={{ color: 'var(--fg-2)' }}>Response</span> within 24h</div>
                <div>↳ <span style={{ color: 'var(--fg-2)' }}>NDA</span> on request</div>
                <div>↳ <span style={{ color: 'var(--fg-2)' }}>Currently</span> {SITE.availability}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="02 Brief form" style={{ paddingTop: 'clamp(48px,6vw,80px)' }}>
        <div className="shell">
          <div className="contact-grid">
            <div className="reveal">
              <div className="divider-label left"><span>SEND A BRIEF</span></div>
              <ContactForm />
            </div>

            <div className="reveal" data-delay="1">
              <div className="side">
                <div>
                  <h3>Direct channels</h3>
                  <div className="channel">
                    <span className="ix">01</span>
                    <div className="body">
                      <b>Email</b>
                      <a href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
                      <p>Goes to my inbox. No CRM, no auto-responder.</p>
                    </div>
                  </div>
                  <div className="channel">
                    <span className="ix">02</span>
                    <div className="body">
                      <b>LinkedIn</b>
                      <a href="https://linkedin.com/in/savbanerjee" target="_blank" rel="noopener">linkedin.com/in/savbanerjee</a>
                      <p>For warm intros &amp; connect requests.</p>
                    </div>
                  </div>
                  <div className="channel">
                    <span className="ix">03</span>
                    <div className="body">
                      <b>GitHub</b>
                      <a href="https://github.com/nycsav" target="_blank" rel="noopener">github.com/nycsav</a>
                      <p>signal-forge-v2 · public commits.</p>
                    </div>
                  </div>
                  <div className="channel">
                    <span className="ix">04</span>
                    <div className="body">
                      <b>Studio</b>
                      <address style={{ color: 'var(--fg-2)', fontFamily: 'var(--display)', fontSize: 14, fontStyle: 'normal', lineHeight: 1.5 }}>
                        {SITE.address.street}<br />
                        {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                      </address>
                      <p style={{ marginTop: 6 }}>In-person available <NycClock /> ET / by appointment.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Pick a 30-min slot</h3>
                  <div className="cal-mock">
                    <div className="cal-head">
                      <span><b>May 2026</b> · 30-minute intro</span>
                      <span>America/New_York</span>
                    </div>
                    <div className="cal-grid">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="cal-day head">{d}</div>
                      ))}
                      <div className="cal-day full">28</div>
                      <div className="cal-day full">29</div>
                      <div className="cal-day avail">30</div>
                      <div className="cal-day avail">1</div>
                      <div className="cal-day full">2</div>
                      <div className="cal-day"></div>
                      <div className="cal-day"></div>

                      <div className="cal-day avail">5</div>
                      <div className="cal-day avail">6</div>
                      <div className="cal-day full">7</div>
                      <div className="cal-day avail">8</div>
                      <div className="cal-day avail">9</div>
                      <div className="cal-day"></div>
                      <div className="cal-day"></div>

                      <div className="cal-day full">12</div>
                      <div className="cal-day avail">13</div>
                      <div className="cal-day avail">14</div>
                      <div className="cal-day avail">15</div>
                      <div className="cal-day full">16</div>
                      <div className="cal-day"></div>
                      <div className="cal-day"></div>

                      <div className="cal-day avail">19</div>
                      <div className="cal-day avail">20</div>
                      <div className="cal-day avail">21</div>
                      <div className="cal-day full">22</div>
                      <div className="cal-day avail">23</div>
                      <div className="cal-day"></div>
                      <div className="cal-day"></div>
                    </div>
                    <div className="cal-foot">
                      <span><span style={{ color: 'var(--teal)' }}>●</span> available · <span style={{ color: 'oklch(0.45 0.01 80)' }}>●</span> full</span>
                      <a href="https://cal.com/sav" target="_blank" rel="noopener" style={{ color: 'var(--teal)' }}>cal.com/sav →</a>
                    </div>
                  </div>
                  <p className="mono-sm" style={{ marginTop: 14, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <a href="https://cal.com/sav" target="_blank" rel="noopener" className="kbd" style={{ textDecoration: 'none' }}>
                      Schedule on Cal.com →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="03 FAQ">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;FAQ</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Six questions, asked often.</h2></div>
          </div>

          <div className="reveal" style={{ display: 'grid', gap: 0, borderTop: '1px solid var(--line)' }}>
            {FAQ.map((qa, i) => (
              <details
                key={i}
                style={{
                  borderBottom: i === FAQ.length - 1 ? 'none' : '1px solid var(--line)',
                  padding: '28px 0',
                }}
              >
                <summary>
                  <span style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, letterSpacing: '-0.015em' }}>{qa.question}</span>
                  <span className="mono-sm" style={{ color: 'var(--teal)' }}>+ open</span>
                </summary>
                <p style={{ marginTop: 18, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.65, maxWidth: '80ch' }}>
                  {qa.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
