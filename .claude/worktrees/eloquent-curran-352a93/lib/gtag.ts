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

export function track(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Never let analytics break the page.
  }
}
