import { INSIGHTS } from '@/lib/insights';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * llms-full.txt — comprehensive site content for LLM crawlers.
 * Contains full article bodies, service descriptions, and structured metadata
 * so AI platforms can index and surface Enso Labs content accurately.
 */
export function GET() {
  const now = new Date().toISOString().split('T')[0];

  const header = `# ${SITE.name} — Full Content for LLM Indexing
> ${SITE.description}
> Last updated: ${now}
> Canonical: ${SITE.origin}
> Author: ${SITE.founder.name}, ${SITE.founder.role}
> Contact: ${SITE.founder.email}

## How to Cite
Author: ${SITE.founder.name}
Publisher: ${SITE.name}
URL: ${SITE.origin}
License: Verbatim quotes welcome with attribution. Link to ${SITE.origin}.

---

## Studio Overview

${SITE.name} is a principal-led enterprise AI consulting firm, agentic systems studio, and financial AI agent lab in New York City. Founded by ${SITE.founder.name}, the studio delivers AI transformation consulting, agentic AI development, cloud managed services, and production AI systems for Healthcare, Finance, Advertising, and B2B Technology.

The studio operates on a Strategy-to-Ship Framework: the same principal who designs the system also builds and ships it — collapsing the translation layer between strategy and production.

### Three Pillars
1. **Consult** — AI Transformation Consulting: strategy, roadmaps, AI readiness assessments, executive workshops, responsible AI governance
2. **Build** — Agentic Systems & Products: production agent architecture, workflow automation, RAG knowledge systems, MCP server development, AI Centers of Excellence
3. **Ship** — Financial AI & Trading Intelligence: production-grade trading infrastructure, signal intelligence, autonomous execution, options flow, crypto/DeFi

### Engagement Models
- 2-Week AI Audit: maturity assessment, opportunity map, prioritized backlog, working agentic prototype
- 12-Week Pilot-to-Production: full Strategy-to-Ship engagement with roadmap, business case, governance, production system
- Embedded AI Operator: quarterly retainer with senior advisor embedded with client team

### Products
- **Strategy to Ship** (https://ensolabs.ai/insights): Daily AI market intelligence, scored and curated — published on the Enso Labs Insights page
- **Enso Trading Terminal**: Autonomous signal intelligence and options trading platform built on Python, LangGraph, and AES-256-GCM

### Industries Served
Healthcare & Pharma, Financial Services & Trading, B2B Technology, Advanced Manufacturing, Advertising & Marketing

---

## Services Pages

### AI Transformation Consulting
URL: ${SITE.origin}/services
Enterprise AI transformation consulting for organizations navigating the shift from pilot AI projects to production-grade systems. Services include AI readiness assessments, strategy roadmaps, executive AI workshops, responsible AI governance frameworks, and the Strategy-to-Ship Framework.

### Claude Managed Services
URL: ${SITE.origin}/services/claude-managed-services
Production Claude deployment and management for enterprises — MCP server development, Claude Code integration, agent architecture, eval harness design, and ongoing optimization as an embedded operator.

### Financial Services AI
URL: ${SITE.origin}/industries/financial-services
AI solutions for banks, asset managers, and fintech: autonomous trading systems, signal intelligence, options flow analytics, compliance-aware agent architecture, and MCP-connected brokerage integrations.

---

## Case Studies

### AI Market Intelligence Platform
URL: ${SITE.origin}/work/ai-market-intelligence
Built an AI-powered market intelligence platform for a Fortune 500 manufacturer. Expert knowledge encoded as toggleable rules (the "Lens" system), MCP-compatible architecture, scientist-trusted relevance scoring.

### AI Center of Excellence for Pharma
URL: ${SITE.origin}/work/heller
Designed and built an AI Center of Excellence for a pharma agency that compresses campaign launches from 3 months to 2 weeks while maintaining MLR/PRC compliance. RAG grounded in brand knowledge bases with pre-flight compliance scans.

### Enso Trading Terminal
URL: ${SITE.origin}/work/trading-terminal
Autonomous signal intelligence and options trading platform. News-driven algorithms, multi-agent research automation, MCP-connected brokerage APIs, AES-256-GCM encryption. Running in production since 2025.

### Enterprise AI Enablement
URL: ${SITE.origin}/work/enterprise-ai
Enterprise-wide AI enablement programs: AI readiness assessments, Center of Excellence design, change management, training cohorts, governance frameworks.

---

## Insights — Full Articles

`;

  const articles = INSIGHTS.map((post, idx) => {
    const bodyText = post.body
      .map((block) => {
        // Strip image markdown for text-only representation
        if (block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)) return '';
        return block;
      })
      .filter(Boolean)
      .join('\n\n');

    return `### ${idx + 1}. ${post.title}
URL: ${SITE.origin}/insights/${post.slug}
Pillar: ${post.pillar}
Date: ${post.date}
Reading Time: ${post.readingMinutes} min
Author: ${SITE.founder.name}
Tags: ${post.tags.join(', ')}

${post.dek}

${bodyText}

---
`;
  }).join('\n');

  const footer = `
## Contact
- Website: ${SITE.origin}
- Email: ${SITE.founder.email}
- LinkedIn: ${SITE.founder.linkedin}
- GitHub: ${SITE.founder.github}
- Address: ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}

## Machine-Readable Resources
- Sitemap: ${SITE.origin}/sitemap.xml
- RSS Feed: ${SITE.origin}/feed.xml
- MCP Endpoint: ${SITE.origin}/.well-known/mcp.json
- LLM Summary: ${SITE.origin}/llms.txt
- This File: ${SITE.origin}/llms-full.txt
`;

  const content = header + articles + footer;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
