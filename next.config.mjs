/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ensolabs.ai' }],
        destination: 'https://ensolabs.ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ensopartners.co' }],
        destination: 'https://ensolabs.ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ensopartners.co' }],
        destination: 'https://ensolabs.ai/:path*',
        permanent: true,
      },
      // /industries/ directory redirect → financial services (only active industry page)
      {
        source: '/industries',
        destination: '/industries/financial-services',
        permanent: false,
      },
      // Old article slug → new slug (permanent)
      {
        source: '/insights/notion-hackathon-agent-distribution-problem',
        destination: '/insights/notion-career-agent-open-source-hackathon',
        permanent: true,
      },
      // Duplicate article removed (same story as agi-summit-2026-code-is-free) — keep old LinkedIn links alive
      {
        source: '/insights/distribution-is-the-moat-code-is-free',
        destination: '/insights/agi-summit-2026-code-is-free',
        permanent: true,
      },
      // Client-confidentiality scrub: old "gore" slugs → renamed slugs (permanent)
      {
        source: '/work/gore',
        destination: '/work/ai-market-intelligence',
        permanent: true,
      },
      {
        source: '/insights/gore-lens-expert-knowledge-encoding',
        destination: '/insights/expert-lens-knowledge-encoding',
        permanent: true,
      },
      // Temporarily unpublished (archived for later re-publish) — avoid 404 + dead cross-links
      {
        source: '/insights/langchain-deep-agents-in-plain-english',
        destination: '/insights',
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      // App Router ignores folders that start with a dot, so the
      // MCP discovery document lives at /api/mcp internally and is
      // exposed at the conventional /.well-known/mcp.json path.
      { source: '/.well-known/mcp.json', destination: '/api/mcp' },
    ];
  },
};

export default nextConfig;
