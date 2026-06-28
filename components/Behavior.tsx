'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/gtag';
import { captureAttribution } from '@/lib/attribution';

// ---------------------------------------------------------------------------
// Enso Labs — site-wide behavior instrumentation (first-party).
//
// Mounted once in the root layout. It:
//   1. Captures first-touch attribution (UTM / referrer) into a cookie.
//   2. Fires scroll-depth milestones (25/50/75/100%) per page.
//   3. Fires "engaged_read" when a visitor spends 30s+ AND scrolls past 50%
//      — the strongest free signal that someone actually read a case study.
//   4. Tracks outbound link clicks (LinkedIn, GitHub, mailto, booking).
//
// All events flow through track(), which double-writes to GA4 client-side and
// to our own /api/track endpoint. No third-party tags.
// ---------------------------------------------------------------------------

// Pages where a deep read is a meaningful buying signal.
function isReadPage(path: string): boolean {
  return (
    path.startsWith('/work') ||
    path.startsWith('/insights') ||
    path.startsWith('/services') ||
    path.startsWith('/about')
  );
}

export function Behavior() {
  const pathname = usePathname();

  // First-touch attribution — capture once, persists 90 days.
  useEffect(() => {
    captureAttribution();
  }, []);

  // Per-page engagement: scroll depth + engaged read.
  useEffect(() => {
    const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const start = Date.now();
    let maxScroll = 0;
    const fired = new Set<number>();
    let engagedFired = false;

    const milestones = [25, 50, 75, 100];

    function pct(): number {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 100;
      return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    }

    function onScroll() {
      const p = pct();
      if (p > maxScroll) maxScroll = p;
      for (const m of milestones) {
        if (p >= m && !fired.has(m)) {
          fired.add(m);
          track('scroll_depth', { page_path: path, percent: m });
        }
      }
      maybeEngaged();
    }

    function maybeEngaged() {
      if (engagedFired) return;
      const seconds = (Date.now() - start) / 1000;
      if (isReadPage(path) && seconds >= 30 && maxScroll >= 50) {
        engagedFired = true;
        track('engaged_read', {
          page_path: path,
          seconds: Math.round(seconds),
          max_scroll: maxScroll,
        });
      }
    }

    const interval = window.setInterval(maybeEngaged, 5000);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
    };
  }, [pathname]);

  // Outbound + CTA clicks (event delegation so it covers the whole tree).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href) return;

      const path = window.location.pathname;

      if (href.startsWith('mailto:')) {
        track('cta_click', { type: 'email', page_path: path });
        return;
      }
      // Booking / contact CTAs.
      if (href === '/contact' || /cal\.com|calendly/.test(href)) {
        track('booking_intent', { page_path: path, target: href });
        return;
      }
      // Outbound (different host).
      try {
        const u = new URL(href, window.location.origin);
        if (u.hostname && u.hostname !== window.location.hostname) {
          let label = u.hostname.replace(/^www\./, '');
          if (/linkedin|lnkd/.test(label)) label = 'linkedin';
          else if (/github/.test(label)) label = 'github';
          else if (/x\.com|twitter/.test(label)) label = 'twitter';
          track('outbound_click', { destination: label, page_path: path });
        }
      } catch {
        // relative link — ignore
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
