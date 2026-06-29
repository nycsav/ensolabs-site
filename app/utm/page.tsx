import type { Metadata } from 'next';
import { UtmBuilder } from '@/components/UtmBuilder';

// Internal tool — keep it out of search and the sitemap.
export const metadata: Metadata = {
  title: 'UTM Link Builder (internal)',
  robots: { index: false, follow: false },
  alternates: { canonical: '/utm' },
};

export default function UtmPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>
        Internal tool
      </p>
      <h1 style={{ fontSize: '2rem', margin: '0.4rem 0 0.5rem' }}>UTM Link Builder</h1>
      <p style={{ opacity: 0.8, lineHeight: 1.6, marginTop: 0 }}>
        Tag every link you post on LinkedIn or send in outreach. The site already
        reads these tags and stamps the channel onto each lead in Notion, so you
        can see which post or message produced a real conversation.
      </p>
      <UtmBuilder />
    </main>
  );
}
