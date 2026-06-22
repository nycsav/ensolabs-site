export const SITE = {
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://ensolabs.ai',
  name: 'Enso Labs',
  tagline: 'Strategy to Ship.',
  description:
    'Enso Labs is a principal-led AI transformation studio in New York City, founded by Sav Banerjee. We turn strategy into production systems — AI consulting, agentic systems, and financial AI delivered as products — spanning advertising, marketing, and media, for companies and agencies across Healthcare, Finance, B2B Technology, and Consumer.',
  // Configurable via NEXT_PUBLIC_AVAILABILITY env var (e.g. "Q1 2027", "Booked through 2026").
  // Surfaced in the home hero, footer, and Cal.com mock.
  availability: process.env.NEXT_PUBLIC_AVAILABILITY || 'Q3–Q4 2026',
  // Default Open Graph image — override per-page via metadata.openGraph.images
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-default.png',
  founder: {
    name: 'Sav Banerjee',
    role: 'Founder & Principal AI Transformation Advisor',
    email: 'sav@ensopartners.co',
    linkedin: 'https://linkedin.com/in/savbanerjee',
    github: 'https://github.com/nycsav',
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
