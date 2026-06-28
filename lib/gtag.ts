/**
 * Tiny typed wrapper around the global `gtag` function injected by
 * components/Analytics.tsx. Safe to call before/without GA loaded — it
 * just no-ops in those cases (e.g. SSR, ad-blockers, missing env var).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Reads the GA client id from the _ga cookie so the server-side beacon can
// stitch events to the same user/session GA already created.
function gaClientId(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m ? m[1] : undefined;
}

/**
 * Fire an analytics event through TWO paths:
 *   1. client-side gtag.js (real-time GA, may be blocked by extensions)
 *   2. our own /api/track endpoint, which forwards to GA4 server-side
 *      (same-origin, survives ad-blockers, first-party owned data)
 * Both are best-effort and never throw.
 */
export function track(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;

  // Path 1 — client gtag
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Never let analytics break the page.
  }

  // Path 2 — first-party server beacon (ad-blocker resilient)
  try {
    const payload = JSON.stringify({
      client_id: gaClientId(),
      name: eventName,
      params,
    });
    // sendBeacon survives page unloads (e.g. outbound clicks); fall back to fetch.
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Swallow — analytics must never break UX.
  }
}
