import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { RevealMount } from '@/components/Reveal';
import { ThemeMount } from '@/components/ThemeMount';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';
import { orgSchema, personSchema, websiteSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

// Inline pre-paint script — applies the light theme class to <html> before
// the first paint on /insights pages. Synchronous; runs before any CSS or
// React hydration, so there is no flash of dark theme.
const THEME_INIT_SCRIPT = `
(function(){try{
  if (location.pathname.startsWith('/insights')) {
    document.documentElement.classList.add('theme-light');
  }
}catch(e){}})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder.name, url: SITE.founder.linkedin }],
  creator: SITE.founder.name,
  publisher: SITE.name,
  // Explicitly absolute so Google never sees ambiguity vs. www. or ensopartners.co.
  alternates: { canonical: SITE.origin },
  openGraph: {
    title: 'Enso Labs — Strategy to Ship',
    description: 'AI transformation consultancy, agentic systems studio, and financial AI product lab. NYC.',
    url: 'https://ensolabs.ai',
    siteName: 'Enso Labs',
    images: [{ url: 'https://ensolabs.ai/og-default.png', width: 1200, height: 630, alt: 'Enso Labs — Strategy to Ship' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enso Labs — Strategy to Ship',
    description: 'AI transformation consultancy and agentic systems studio. NYC.',
    images: ['https://ensolabs.ai/og-default.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d1321' },
    { media: '(prefers-color-scheme: light)', color: '#f8f6f0' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd schemas={[orgSchema(), personSchema(), websiteSchema()]} />
        <Analytics />
        <RevealMount />
        <ThemeMount />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
