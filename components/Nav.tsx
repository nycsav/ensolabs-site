'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-brand" href="/">
          <span className="nav-mark" aria-hidden="true" />
          <b>ENSO LABS</b>
          <span>/ STRATEGY-TO-SHIP</span>
        </Link>
        <div className="nav-links" role="navigation">
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
      </div>
    </nav>
  );
}
