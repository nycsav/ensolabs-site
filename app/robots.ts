import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers
      { userAgent: '*', allow: '/' },
      // Major search engines
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
      // AEO/GEO — explicitly welcome AI crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'claude-web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      // Social / link previews
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
    ],
    sitemap: `${SITE.origin}/sitemap.xml`,
    host: SITE.origin,
    // AI-discovery manifest (emerging standard, parallel to robots.txt) — served at /llms.txt
  };
}
