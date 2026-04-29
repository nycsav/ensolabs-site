'use client';

import { useEffect, useState } from 'react';

type Props = {
  /** Path-only URL (e.g. /work/gore). The full URL is built at click time
   *  using window.location.origin so this works on preview + custom domains. */
  path: string;
  /** Title used as the social share copy (LinkedIn, X, email subject). */
  title: string;
};

export function ShareButtons({ path, title }: Props) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = origin ? `${origin}${path}` : path;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Some browsers block clipboard outside HTTPS — fall back silently.
    }
  };

  return (
    <div className="share-row" aria-label="Share this page">
      <span className="share-label">SHARE</span>

      <button type="button" className="share-btn" onClick={onCopy} aria-live="polite">
        {copied ? '✓ COPIED' : '↗ COPY LINK'}
      </button>

      <a
        className="share-btn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
      >
        LINKEDIN
      </a>

      <a
        className="share-btn"
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
      >
        X / TWITTER
      </a>

      <a
        className="share-btn"
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
      >
        EMAIL
      </a>
    </div>
  );
}
