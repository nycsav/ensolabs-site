import { SITE, url } from './site';
import type { Insight } from './insights';

type JsonLd = Record<string, unknown>;

export const orgSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': url('/#organization'),
  name: SITE.name,
  url: SITE.origin,
  description: SITE.description,
  slogan: 'Strategy to Ship',
  email: SITE.founder.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  sameAs: [
    'https://linkedin.com/in/savbanerjee',
    'https://github.com/nycsav',
    'https://linkedin.com/company/enso-partners',
    'https://signals.ensolabs.ai',
  ],
  foundingDate: '2020',
  foundingLocation: {
    '@type': 'Place',
    name: 'New York, NY',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10003',
      addressCountry: 'US',
    },
  },
  founder: {
    '@type': 'Person',
    name: 'Sav Banerjee',
    url: 'https://ensolabs.ai/about',
    jobTitle: 'Founder & Principal',
    sameAs: [
      'https://linkedin.com/in/savbanerjee',
      'https://github.com/nycsav',
    ],
  },
  knowsAbout: [
    'AI Transformation',
    'Agentic Systems',
    'Financial AI Agents',
    'Model Context Protocol',
    'Claude API',
    'LangGraph',
    'Enterprise AI Advisory',
    'Healthcare AI',
    'Pharma AI',
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 1,
  },
  brand: {
    '@type': 'Brand',
    name: 'Enso Labs',
    slogan: 'Strategy to Ship',
  },
});

export const personSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': url('/#sav'),
  name: SITE.founder.name,
  jobTitle: SITE.founder.role,
  email: SITE.founder.email,
  url: url('/about'),
  worksFor: { '@id': url('/#organization') },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Oregon',
  },
  knowsAbout: [
    'AI Transformation Strategy',
    'Agentic AI Architecture',
    'Financial AI Agents',
    'Model Context Protocol',
    'Claude API',
    'Enterprise AI Advisory',
    'Healthcare AI',
    'Multi-Agent Orchestration',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Claude Certified Architect',
      credentialCategory: 'Professional Certification',
      recognizedBy: { '@type': 'Organization', name: 'Anthropic' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Gemini Professional Certificate',
      recognizedBy: { '@type': 'Organization', name: 'Google' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Perplexity AI Business Fellowship',
      recognizedBy: { '@type': 'Organization', name: 'Perplexity AI' },
    },
  ],
  sameAs: [
    'https://linkedin.com/in/savbanerjee',
    'https://github.com/nycsav',
    'https://ensolabs.ai',
  ],
});

export const websiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': url('/#website'),
  url: SITE.origin,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': url('/#organization') },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE.origin}/insights?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const professionalServiceSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': url('/#service'),
  name: SITE.name,
  description: SITE.description,
  url: SITE.origin,
  provider: { '@id': url('/#organization') },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: [
    'AI Transformation Consulting',
    'Agentic Systems Development',
    'Financial AI & Trading Intelligence',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engagement Models',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: '2-Week AI Audit' },
        description: 'Diagnostic engagement: maturity assessment, opportunity map, prioritized backlog, working agentic prototype.',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: '12-Week Pilot-to-Production' },
        description: 'Full Strategy-to-Ship engagement: roadmap, business case, governance, production agentic system, enablement cohort.',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Embedded AI Operator' },
        description: 'Quarterly retainer: senior advisor and builder embedded with your team for continuous shipping and governance stewardship.',
      },
    ],
  },
});

export const localBusinessSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': url('/#localbusiness'),
  name: SITE.name,
  url: SITE.origin,
  email: SITE.founder.email,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    // 31 Union Square West, NYC
    latitude: 40.7362,
    longitude: -73.9903,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  founder: { '@id': url('/#sav') },
  priceRange: '$$$$',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'United States' },
    { '@type': 'Place', name: 'Healthcare' },
    { '@type': 'Place', name: 'Financial Services' },
    { '@type': 'Place', name: 'B2B Technology' },
    { '@type': 'Place', name: 'Advanced Manufacturing' },
  ],
});

export const breadcrumbSchema = (
  trail: { name: string; href: string }[],
): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((step, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: step.name,
    item: url(step.href),
  })),
});

export const faqSchema = (
  qa: { question: string; answer: string }[],
): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

export const productSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': url('/work#terminal-product'),
  name: 'Enso Trading Terminal',
  description:
    'Autonomous signal intelligence and options trading platform. News-driven trading algorithms, multi-agent research automation, crypto/DeFi strategy engines, options flow analysis, brokerage API integration. Production-grade security with AES-256-GCM encryption.',
  brand: { '@id': url('/#organization') },
  category: 'Financial AI Software',
  url: url('/work#terminal'),
});

export const blogSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': url('/insights#blog'),
  name: `${SITE.name} Insights`,
  url: url('/insights'),
  description:
    'Technical and strategic essays on AI transformation, agentic systems, and financial AI from Sav Banerjee.',
  publisher: { '@id': url('/#organization') },
  author: { '@id': url('/#sav') },
});

export const articleSchema = (post: Insight): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': url(`/insights/${post.slug}#article`),
  headline: post.title,
  description: post.dek,
  datePublished: post.date,
  dateModified: post.date,
  author: { '@id': url('/#sav') },
  reviewedBy: { '@id': url('/#sav') },
  publisher: { '@id': url('/#organization') },
  mainEntityOfPage: { '@id': url(`/insights/${post.slug}`) },
  articleSection: post.pillar,
  wordCount: post.body.join(' ').split(/\s+/).length,
});

export const webPageSchema = (post: Insight): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': url(`/insights/${post.slug}`),
  url: url(`/insights/${post.slug}`),
  name: post.title,
  description: post.dek,
  inLanguage: 'en-US',
  isPartOf: { '@id': url('/#website') },
  primaryImageOfPage: undefined,
  datePublished: post.date,
  dateModified: post.date,
  lastReviewed: post.date,
  reviewedBy: { '@id': url('/#sav') },
  about: { '@id': url('/#organization') },
  author: { '@id': url('/#sav') },
  publisher: { '@id': url('/#organization') },
});

export const contactPointSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPoint',
  contactType: 'customer support',
  email: SITE.founder.email,
  availableLanguage: 'English',
  areaServed: 'US',
});

export const renderJsonLd = (...schemas: JsonLd[]) =>
  schemas.map((s) => JSON.stringify(s)).join('\n');
