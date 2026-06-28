/**
 * Enso Labs — first-party attribution.
 *
 * Captures where a visitor came from (UTM params, referrer, landing page) on
 * their FIRST visit and persists it to a first-party cookie. The contact form
 * reads this and sends it with the lead, so every Notion lead record carries
 * the channel/campaign that produced it.
 *
 * First-party only: the cookie is set by our own JS on our own domain. No
 * third-party pixel, no cross-site tracking. Survives ad-blockers (GA does not).
 */

export type Attribution = {
  source: string; // utm_source, or derived from referrer ("linkedin", "google", "direct")
  medium: string; // utm_medium ("organic", "social", "referral", "(none)")
  campaign: string; // utm_campaign
  content: string; // utm_content (e.g. a specific post or CTA)
  term: string; // utm_term
  referrer: string; // raw document.referrer host on first visit
  landing: string; // first path the visitor landed on
  ts: string; // ISO timestamp of first touch
};

const COOKIE = 'enso_attr';
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

// Best-effort host extraction from a referrer URL.
function refHost(ref: string): string {
  try {
    return new URL(ref).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

// Derive a clean source from a referrer host when no utm_source is present.
function sourceFromReferrer(host: string): string {
  if (!host) return 'direct';
  if (/lnkd\.in|linkedin\./.test(host)) return 'linkedin';
  if (/google\./.test(host)) return 'google';
  if (/bing\./.test(host)) return 'bing';
  if (/duckduckgo\./.test(host)) return 'duckduckgo';
  if (/t\.co|twitter\.|x\.com/.test(host)) return 'twitter';
  if (/perplexity\./.test(host)) return 'perplexity';
  if (/chatgpt\.|openai\./.test(host)) return 'chatgpt';
  if (/reddit\./.test(host)) return 'reddit';
  if (/github\./.test(host)) return 'github';
  return host; // some other referring site
}

function mediumFromReferrer(host: string): string {
  if (!host) return '(none)';
  if (/lnkd\.in|linkedin\.|t\.co|twitter\.|x\.com|reddit\./.test(host)) return 'social';
  if (/google\.|bing\.|duckduckgo\./.test(host)) return 'organic';
  if (/perplexity\.|chatgpt\.|openai\./.test(host)) return 'ai_referral';
  return 'referral';
}

/**
 * Captures attribution on the current pageview. Only writes the cookie on the
 * FIRST touch (first-touch attribution) so the original source is preserved
 * even if the visitor later arrives via a different path. Returns the stored
 * attribution either way.
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;

  // First touch already recorded — keep it, don't overwrite.
  const existing = readCookie(COOKIE);
  if (existing) {
    try {
      return JSON.parse(existing) as Attribution;
    } catch {
      // fall through and re-capture if the cookie is corrupt
    }
  }

  const url = new URL(window.location.href);
  const q = url.searchParams;
  const referrer = refHost(document.referrer || '');

  const utmSource = q.get('utm_source') || '';
  const attr: Attribution = {
    source: utmSource || sourceFromReferrer(referrer),
    medium: q.get('utm_medium') || mediumFromReferrer(referrer),
    campaign: q.get('utm_campaign') || '',
    content: q.get('utm_content') || '',
    term: q.get('utm_term') || '',
    referrer,
    landing: url.pathname,
    ts: new Date().toISOString(),
  };

  writeCookie(COOKIE, JSON.stringify(attr));
  return attr;
}

/** Returns the stored attribution without capturing (read-only). */
export function getAttribution(): Attribution | null {
  const raw = readCookie(COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** Compact one-line label for display / Notion, e.g. "linkedin / social / spring-post". */
export function attributionLabel(a: Attribution | null): string {
  if (!a) return '';
  const parts = [a.source, a.medium, a.campaign].filter(Boolean);
  return parts.join(' / ');
}
