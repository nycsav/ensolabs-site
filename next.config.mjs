/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async rewrites() {
    return [
      // App Router ignores folders that start with a dot, so the
      // MCP discovery document lives at /api/mcp internally and is
      // exposed at the conventional /.well-known/mcp.json path.
      { source: '/.well-known/mcp.json', destination: '/api/mcp' },
      { source: '/.well-known/security.txt', destination: '/api/security' },
    ];
  },
};

export default nextConfig;
