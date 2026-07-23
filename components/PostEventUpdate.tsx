'use client';

import Link from 'next/link';
import { Arrow } from './Arrow';
import { track } from '@/lib/gtag';

/**
 * Dated post-event note rendered near the top of an insight article, with a
 * single conversion CTA. Data-driven via `Insight.postEventUpdate` so the
 * article template stays generic.
 *
 * The CTA fires `production_gap_review_click` through track() (client gtag +
 * first-party /api/track beacon). sendBeacon survives the ensuing navigation.
 * UTM params live on the href and are captured into the attribution cookie by
 * components/Behavior.tsx on the /contact landing (first-touch — see caveat in
 * the handoff), so the eventual generate_lead retains campaign attribution.
 */
export function PostEventUpdate({
  label,
  body,
  ctaLabel,
  ctaHref,
  slug,
}: {
  label: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  slug: string;
}) {
  return (
    <aside className="post-event-update" aria-label={label}>
      <p className="peu-kicker">{label}</p>
      <p className="peu-body">{body}</p>
      <Link
        className="btn btn-primary peu-cta"
        href={ctaHref}
        onClick={() =>
          track('production_gap_review_click', {
            event_category: 'lead_gen',
            event_label: 'production_gap_review',
            page_path: `/insights/${slug}`,
          })
        }
      >
        {ctaLabel}
        <Arrow />
      </Link>
    </aside>
  );
}
