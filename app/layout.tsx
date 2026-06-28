import type { Metadata, Viewport } from 'next';
import './globals.css';
import '../brand/strategy-to-ship/tokens.css';
import { Lora, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { RevealMount } from '@/components/Reveal';
import { ThemeMount } from '@/components/ThemeMount';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';
import { Behavior } from '@/components/Behavior';
import { orgSchema, personSchema, websiteSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

// Self-hosted brand fonts (no external Google request, no FOUT). Exposed as CSS
// variables consumed by globals.css (--display/--mono) and the Strategy to Ship
// publication tokens (tokens.css: --sts-serif/--sts-sans/--sts-mono).
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-inter-tight',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
// Space Mono 700 — the locked Strategy to Ship masthead face. Used for stat-callout
// figures on /insights articles (and embedded separately for OG cards in lib/og/fonts).
const spaceMono = localFont({
  src: '../lib/og/fonts/SpaceMono-700.ttf',
  weight: '700',
  variable: '--font-space-mono',
  display: 'swap',
});

// Inline pre-paint script — applies the light theme class to <html> before
// the first paint on /insights pages. Synchronous; runs before any CSS or
// React hydration, so there is no flash of dark theme.
const THEME_INIT_SCRIPT = `
(function(){try{
  if (location.pathname.startsWith('/insights')) {
    document.documentElement.classList.add('theme-light', 'theme-sts');
  }
}catch(e){}})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: 'Enso Labs — AI Transformation Consulting & Agentic Systems Studio | NYC',
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
    title: 'Enso Labs — AI Transformation Consulting & Agentic Systems Studio | NYC',
    description: 'Principal-led AI transformation consulting firm and agentic systems studio in NYC, founded by Sav Banerjee. Enterprise AI strategy, production AI agents, and financial AI for Healthcare, Finance, and B2B Tech.',
    url: 'https://ensolabs.ai',
    siteName: 'Enso Labs',
    images: [{
      url: 'https://ensolabs.ai/og-default.png?v=3',
      secureUrl: 'https://ensolabs.ai/og-default.png?v=3',
      width: 1200,
      height: 630,
      type: 'image/png',
      alt: 'Enso Labs — Strategy to Ship',
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enso Labs — Strategy to Ship',
    description: 'AI transformation consultancy and agentic systems studio. NYC.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
  other: {
    'thumbnail': 'https://ensolabs.ai/og-default.png?v=3',
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
    <html lang="en" className={`${lora.variable} ${interTight.variable} ${jetbrainsMono.variable} ${spaceMono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="image_src" href="https://ensolabs.ai/og-default.png?v=3" />
        {/* Fonts are self-hosted via next/font (Lora · Inter Tight · JetBrains Mono) — no external <link>. */}
      </head>
      <body>
        <JsonLd schemas={[orgSchema(), personSchema(), websiteSchema()]} />
        <Analytics />
        <Behavior />
        <RevealMount />
        <ThemeMount />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
