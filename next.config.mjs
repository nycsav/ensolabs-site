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
