'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

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
            <span className="nav-mark" aria-hidden="true" />
            <b>ENSO LABS</b>
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
            <Link
              href="/contact"
              className={`nav-cta${isActive('/contact') ? ' is-active' : ''}`}
            >
              <span className="dot" />
              Book a Discovery Call
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
              <span className="nav-mark" aria-hidden="true" />
              <b>ENSO LABS</b>
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
              Book a Discovery Call
            </Link>
            <p className="mono-sm">
              <a href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
