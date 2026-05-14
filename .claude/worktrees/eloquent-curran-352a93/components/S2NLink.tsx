'use client';

import { track } from '@/lib/gtag';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** GA4 event_label — defaults to 'open_feed'. */
  eventLabel?: string;
};

/**
 * Outbound link to signal2noise that fires a GA4 click event before
 * navigation. Used inside server components (e.g. /insights) where
 * onClick handlers are not allowed.
 */
export function S2NLink({ href, children, className, style, eventLabel = 'open_feed' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() =>
        track('click', {
          event_category: 'signal2noise',
          event_label: eventLabel,
        })
      }
    >
      {children}
    </a>
  );
}
