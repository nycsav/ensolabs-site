'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Fires a GA4 generate_lead event when a visitor arrives from a LinkedIn
 * paid lead-gen campaign (utm_source=linkedin & utm_medium=paid).
 * Placed on /insights — the confirmation URL for the FDS carousel Lead Gen Form.
 */
export function LeadConversionTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');
    const campaign = searchParams.get('utm_campaign');

    if (source === 'linkedin' && medium === 'paid') {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead Gen',
          event_label: campaign || 'linkedin-paid',
          source: 'linkedin',
          medium: 'paid',
          campaign: campaign || '',
        });
      }
    }
  }, [searchParams]);

  return null;
}
