'use client';

import Script from 'next/script';

// LinkedIn Insight Tag — the website-side signal for Campaign Manager
// (Enso Ad Account 510047438). Powers website demographics, matched and
// predictive audiences, and conversion tracking on anything we boost.
// Loads after hydration like GA4 and never blocks render. The partner ID is
// public by design: it ships in the page source of every site using the tag.
const PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '4225162';

export function LinkedInInsight() {
  return (
    <>
      <Script id="linkedin-insight-init" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script
        id="linkedin-insight-lib"
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        strategy="afterInteractive"
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`}
        />
      </noscript>
    </>
  );
}
