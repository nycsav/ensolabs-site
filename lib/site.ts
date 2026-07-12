export const SITE = {
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://ensolabs.ai',
  name: 'Enso Labs',
  tagline: 'Strategy to Ship.',
  description:
    'Enso Labs is a principal-led applied-AI studio in New York City, founded by Sav Banerjee. We turn strategy and research into shipped AI products — custom decision and signal intelligence systems, agentic workflows, and financial AI — for companies across Healthcare, Finance, Manufacturing, Media, B2B Technology, and Consumer.',
  // Configurable via NEXT_PUBLIC_AVAILABILITY env var (e.g. "Q1 2027", "Booked through 2026").
  // Surfaced in the home hero, footer, and Cal.com mock.
  availability: process.env.NEXT_PUBLIC_AVAILABILITY || 'Q3–Q4 2026',
  // Default Open Graph image — override per-page via metadata.openGraph.images
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-default.png',
  // Real booking link (Cal.com / Calendly). Set NEXT_PUBLIC_BOOKING_URL in Vercel
  // to the real slug. Falls back to the Cal.com placeholder — NOT /contact, which
  // was a dead end that fired phantom booking_intent events on nav clicks.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/ensolabs/intro',
  founder: {
    name: 'Sav Banerjee',
    role: 'Founder & Principal AI Transformation Advisor',
    email: 'sav@ensolabs.ai', // primary, brand-facing (forwards to ensopartners.co)
    emailAlt: 'sav@ensopartners.co', // secondary / Google Workspace backend
    linkedin: 'https://linkedin.com/in/savbanerjee',
    github: 'https://github.com/nycsav',
    x: 'https://x.com/nycsav',
    education: 'B.A. Advertising, University of Oregon',
  },
  address: {
    street: '31 Union Square West, 6th Floor',
    locality: 'New York',
    region: 'NY',
    postalCode: '10003',
    country: 'US',
  },
  pages: ['/', '/services', '/work', '/about', '/insights', '/contact'] as const,
} as const;

export const url = (path: string) =>
  new URL(path, SITE.origin).toString();
