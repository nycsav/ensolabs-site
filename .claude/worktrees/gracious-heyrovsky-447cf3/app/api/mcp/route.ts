import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * MCP discovery document, served at /.well-known/mcp.json via a rewrite
 * in next.config.mjs (Next 14's App Router ignores folders starting with
 * a dot, so we route through /api/mcp internally).
 *
 * NOTE — the well-known path for Model Context Protocol discovery is still
 * stabilizing. Anthropic's MCP spec currently focuses on stdio/SSE transports
 * negotiated per-client, not on a public web-discoverable manifest. The
 * `/.well-known/mcp.json` convention is an emerging community pattern for
 * advertising agent-readable site capabilities (akin to OpenAI's
 * `/.well-known/ai-plugin.json`). Update this document when the spec
 * formalizes — fields most likely to change: `transport`, `auth`, and the
 * top-level shape (currently flat; may move to nested `server` / `protocol`
 * objects).
 */
export function GET() {
  const doc = {
    schemaVersion: 'draft-2026-04',
    name: SITE.name,
    description: SITE.description,
    tagline: SITE.tagline,
    url: SITE.origin,
    contact: {
      email: SITE.founder.email,
      url: `${SITE.origin}/contact`,
    },
    organization: {
      name: SITE.name,
      founder: SITE.founder.name,
      jurisdiction: 'US-NY',
      type: 'ProfessionalService',
    },
    services: [
      {
        id: 'consult',
        name: 'AI Transformation Consulting',
        description:
          'Strategy, roadmaps, AI readiness assessments, executive workshops, and responsible-AI governance.',
      },
      {
        id: 'build',
        name: 'Agentic Systems & Products',
        description:
          'Production agent architecture, workflow automation, RAG knowledge systems, MCP server development, and AI Centers of Excellence.',
      },
      {
        id: 'ship',
        name: 'Financial AI & Trading Intelligence',
        description:
          'Production-grade trading infrastructure: signal intelligence, autonomous execution, news-driven algorithms, options flow, crypto/DeFi.',
      },
    ],
    products: [
      {
        id: 'enso-trading-terminal',
        name: 'Enso Trading Terminal',
        description:
          'Autonomous signal intelligence and options trading platform built on Python, LangGraph, and AES-256-GCM. News-driven algorithms across equities, options, and crypto/DeFi.',
        status: 'production',
      },
    ],
    capabilities: {
      // No remote MCP server is exposed by this site itself.
      // We list discovery-level metadata only.
      mcpServers: [],
      tools: [],
      resources: [
        {
          name: 'sitemap',
          uri: `${SITE.origin}/sitemap.xml`,
          mimeType: 'application/xml',
        },
        {
          name: 'rss',
          uri: `${SITE.origin}/feed.xml`,
          mimeType: 'application/rss+xml',
        },
        {
          name: 'insights',
          uri: `${SITE.origin}/insights`,
          mimeType: 'text/html',
          description: 'Editorial essays on production AI from Sav Banerjee.',
        },
      ],
    },
    crawlPolicy: {
      allowAi: true,
      attribution:
        'Cite Enso Labs / Sav Banerjee. Link to https://ensolabs.ai. Verbatim quotes welcome with attribution.',
      preferredCitation: {
        author: 'Sav Banerjee',
        publisher: 'Enso Labs',
        url: SITE.origin,
      },
    },
    sameAs: [SITE.founder.linkedin, SITE.founder.github],
  };

  return new Response(JSON.stringify(doc, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
