import Link from 'next/link';
import { NycClock } from './NycClock';
import { SITE } from '@/lib/site';

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
          </div>
          <div className="foot-col">
            <h4>Connect</h4>
            <a href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
            <a href="https://linkedin.com/in/savbanerjee" rel="noopener" target="_blank">LinkedIn</a>
            <a href="https://github.com/nycsav" rel="noopener" target="_blank">GitHub</a>
            <Link href="/contact">Schedule call →</Link>
          </div>
          <div className="foot-col">
            <h4>Certified</h4>
            <p>Anthropic · Claude Code</p>
            <p>Google AI</p>
            <p>OpenAI</p>
            <p style={{ marginTop: 12, color: 'var(--teal)' }}>Perplexity Fellow</p>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Enso Labs. All systems owned by their respective operators.</span>
          <span>
            Built &amp; shipped in NYC · <NycClock /> ET
          </span>
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--fg-3)', marginTop: '12px' }}>
          Designed with Claude Design · Built with Claude Code · Intelligence by signal2noise · Human-in-the-loop: Sav Banerjee
        </p>
      </div>
    </footer>
  );
}
