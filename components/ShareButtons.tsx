'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/gtag';

type Props = {
  /** Path-only URL (e.g. /work/gore). The full URL is built at click time
   *  using window.location.origin so this works on preview + custom domains. */
  path: string;
  /** Title used as the social share copy (LinkedIn, X, email subject). */
  title: string;
};

type ShareMethod = 'linkedin' | 'twitter' | 'email' | 'copy';

export function ShareButtons({ path, title }: Props) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = origin ? `${origin}${path}` : path;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Derive content_type + item_id from the path so the same component
  // emits the right analytics on case studies AND insight articles.
  const segments = path.split('/').filter(Boolean);
  const contentType: 'case_study' | 'insight' | 'page' =
    segments[0] === 'work' ? 'case_study'
    : segments[0] === 'insights' ? 'insight'
    : 'page';
  const itemId = segments[segments.length - 1] || path;

  const fireShare = (method: ShareMethod) => {
    track('share', {
      method,
      content_type: contentType,
      item_id: itemId,
    });
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      fireShare('copy');
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
        onClick={() => fireShare('linkedin')}
      >
        LINKEDIN
      </a>

      <a
        className="share-btn"
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
        onClick={() => fireShare('twitter')}
      >
        X / TWITTER
      </a>

      <a
        className="share-btn"
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        onClick={() => fireShare('email')}
      >
        EMAIL
      </a>
    </div>
  );
}
