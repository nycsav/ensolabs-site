import Link from 'next/link';
import { NycClock } from './NycClock';
import { SITE } from '@/lib/site';

function ClaudeMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <g stroke="#D97757" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="4.21" y1="7.5" x2="19.79" y2="16.5" />
        <line x1="7.5" y1="4.21" x2="16.5" y2="19.79" />
        <line x1="16.5" y1="4.21" x2="7.5" y2="19.79" />
        <line x1="19.79" y1="7.5" x2="4.21" y2="16.5" />
      </g>
    </svg>
  );
}

function VercelMark() {
  return (
    <svg width="12" height="11" viewBox="0 0 24 22" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 1 L23 21 L1 21 Z" fill="#e8edf2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="shell">
        <div className="foot-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-white.svg" alt="Enso Labs" />
        </div>

        <div className="foot-grid">
          <div className="foot-col">
            <h4>Studio</h4>
            <p style={{ maxWidth: '36ch', lineHeight: 1.55 }}>
              AI transformation consultancy, agentic systems studio, and financial AI product lab.
              Founded by Sav Banerjee. Based in Manhattan, NYC.
            </p>
            <p className="mono-sm" style={{ marginTop: 16 }}>
              <span style={{ color: 'var(--teal)' }}>●</span>
              &nbsp;Currently accepting {SITE.availability} engagements
            </p>
          </div>
          <div className="foot-col">
            <h4>Site</h4>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/locations/new-york">AI Consulting · NYC</Link>
            <Link href="/built-with-ai">Built with AI</Link>
            <Link href="/editorial-policy">Editorial Policy</Link>
          </div>
          <div className="foot-col">
            <h4>Connect</h4>
            <a href="mailto:sav@ensolabs.ai">sav@ensolabs.ai</a>
            <a href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
            <a href="https://linkedin.com/in/savbanerjee" rel="noopener" target="_blank">LinkedIn</a>
            <a href="https://github.com/nycsav" rel="noopener" target="_blank">GitHub</a>
            <a href="https://x.com/nycsav" rel="noopener" target="_blank">X</a>
            {SITE.bookingUrl.startsWith('http') ? (
              <a href={SITE.bookingUrl} rel="noopener" target="_blank">Book a call →</a>
            ) : (
              <Link href={SITE.bookingUrl}>Schedule call →</Link>
            )}
          </div>
          <div className="foot-col">
            <h4>Certified</h4>
            <p>Anthropic · Claude Code</p>
            <p>Google AI</p>
            <p>OpenAI</p>
            <p style={{ marginTop: 12, color: 'var(--teal)' }}>Perplexity Fellow</p>
          </div>
        </div>

        <div className="foot-affil">
          <span className="foot-affil-label">Affiliations</span>
          <a href="https://www.ibm.com/partnerplus" target="_blank" rel="noopener">
            IBM Partner Plus · Registered Member
          </a>
          <a href="https://www.perplexity.ai/hub/computer-partners" target="_blank" rel="noopener">
            Perplexity Computer Implementation Partner
          </a>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Enso Labs. All systems owned by their respective operators.</span>
          <span>
            Built &amp; shipped in NYC · <NycClock /> ET
          </span>
        </div>

        <div className="foot-attribution" style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--fg-3)', marginTop: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px 9px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <ClaudeMark /> Designed with Claude Design
          </span>
          <span aria-hidden="true">·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <ClaudeMark /> Built with Claude Code
          </span>
          <span aria-hidden="true">·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <VercelMark /> Deployed on Vercel
          </span>
          <span aria-hidden="true">·</span>
          <span>Intelligence by Strategy <span style={{ color: '#F0512E' }}>→</span> Ship</span>
          <span aria-hidden="true">·</span>
          <span>Human-in-the-loop: Sav Banerjee</span>
        </div>
      </div>
    </footer>
  );
}
