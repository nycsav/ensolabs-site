'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <span className={className}>
      <a href={SITE.founder.github} target="_blank" rel="noopener" aria-label="GitHub">
        <GitHubIcon />
      </a>
      <a href={SITE.founder.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
      <a href={SITE.founder.x} target="_blank" rel="noopener" aria-label="X (formerly Twitter)">
        <XIcon />
      </a>
    </span>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link className="nav-brand" href="/" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-white.svg" alt="Enso Labs" className="nav-logo" />
            <span>/ STRATEGY-TO-SHIP</span>
          </Link>

          <div className="nav-links" role="navigation" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? 'is-active' : ''}
              >
                {l.label}
              </Link>
            ))}
            <SocialLinks className="nav-social" />

            <Link
              href="/contact"
              className={`nav-cta${isActive('/contact') ? ' is-active' : ''}`}
            >
              <span className="dot" />
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav-burger-icon${open ? ' is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <Link className="nav-brand" href="/" onClick={() => setOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-white.svg" alt="Enso Labs" className="nav-logo" />
            </Link>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <ul className="mobile-menu-links">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={isActive(l.href) ? 'is-active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu-num">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-menu-foot">
            <Link
              href="/contact"
              className="btn btn-primary mobile-menu-cta"
              onClick={() => setOpen(false)}
            >
              <span className="dot" aria-hidden="true" />
              Get in Touch
            </Link>
            <SocialLinks className="mobile-menu-social" />
            <p className="mono-sm">
              <a href="mailto:sav@ensolabs.ai">sav@ensolabs.ai</a><br />
              <a href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
