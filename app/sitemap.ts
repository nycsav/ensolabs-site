import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { INSIGHTS } from '@/lib/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.origin}/`,         lastModified: now, changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${SITE.origin}/services`, lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${SITE.origin}/work`,     lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${SITE.origin}/about`,    lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${SITE.origin}/insights`, lastModified: now, changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${SITE.origin}/contact`,  lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
  ];

  const insightRoutes: MetadataRoute.Sitemap = INSIGHTS.map((p) => ({
    url: `${SITE.origin}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...insightRoutes];
}
