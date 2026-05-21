# Notion Just Launched a Developer Platform. We Shipped an Open-Source Career Agent on Day One.

**By Sav Banerjee · May 19, 2026 · 8 min read · BUILD**

*Three days after Notion unveiled Workers, MCP, and an Agent SDK, we were at their first hackathon in San Francisco — building a career intelligence agent that anyone can fork and deploy today.*

---

On May 13, Notion [launched a developer platform](https://www.notion.com/releases/2026-05-13) that turns every workspace into an AI agent hub — Workers for custom code, MCP for data access, an Agent SDK for external integrations, and a CLI for deployment. [TechCrunch called it](https://techcrunch.com/2026/05/13/notion-just-turned-its-workspace-into-a-hub-for-ai-agents/) a move that positions Notion as an orchestration layer where people and agents collaborate across tools and databases. Three days later, we were at Notion HQ in San Francisco for their first-ever Developer Platform Hackathon.

We shipped a career intelligence agent in 24 hours — five Notion Worker tools, 487 lines of TypeScript, a full pipeline from job scanning to AI-tailored resume generation. **The project is open source and ready to fork.** [github.com/nycsav/notion-career-agent](https://github.com/nycsav/notion-career-agent)

![Welcome hackers — Notion Developer Platform Hackathon, sponsored by Anthropic, Vercel, and OpenAI](/images/insights/notion-hackathon-01.jpg)

## Notion's Developer Platform: What Launched and Why It Matters

The [Notion Developer Platform](https://www.notion.com/product/developer-platform) is the biggest expansion of Notion's capabilities since the API launched in 2021. Over 1 million custom agents have already been built since Notion introduced AI agents in February 2026. The developer platform gives builders the primitives to go much further:

**Notion Workers** are sandboxed TypeScript functions that run on Notion's infrastructure. No servers, no deployment pipelines — you write the logic and deploy with the Notion CLI. Workers are free during beta, with credit-based pricing starting August 11, 2026.

**Notion MCP** (Model Context Protocol) servers let any AI assistant — Claude, Codex, or your own agents — read and write Notion data natively. This is the data layer that makes Notion a genuine platform, not just a workspace.

**The Agent SDK and External Agents API** bring external agents into Notion as native workspace participants. At launch, partners include Claude Code, Cursor, Codex, and Decagon.

**Database Sync** pulls data from any API (Salesforce, Zendesk, Postgres) directly into Notion databases — making the workspace the single pane of glass for agent workflows.

For builders, the implication is clear: you can now ship AI agents that live where your users already work, backed by Anthropic, Vercel, and OpenAI as platform sponsors.

![Notion Hackathon — May 16-17, San Francisco, backed by Anthropic, Vercel, and OpenAI](/images/insights/notion-hackathon-02.jpg)

## What We Built: An Open-Source Career Intelligence Agent

Job seekers submit an average of 16 applications per week but spend less than 30 minutes customizing each one. Tailored resumes are 61% more likely to land interviews, but deep customization does not scale with manual effort. The existing tools are either spam cannons (mass-apply bots that tank your response rate) or glorified spreadsheets. We built a system that does the intelligence work — scanning, scoring, tailoring — while keeping the human in the loop for every decision that matters.

## Five Notion Worker Tools, One Pipeline

The career agent runs entirely inside a Notion workspace using Notion Workers — the same runtime powering Notion AI agents across the platform. No servers to manage, no infra to maintain. We built five Agent Tools that chain together into an end-to-end career pipeline:

**scanJobs** parses job listings from LinkedIn email notifications, extracts structured data (title, company, location, salary, requirements), and scores each role against the user's career profile using Claude Haiku. Every job gets a match score from 0 to 100 with a written rationale. Jobs scoring 75+ get flagged for action.

**tailorResume** is the heavy lifter. Give it a job listing and a base resume, and it generates an ATS-optimized resume and cover letter using Claude Sonnet — the stronger model, because resume quality directly affects interview conversion. It extracts ATS keywords from the listing, maps them against existing experience, and returns structured data ready to save as linked Notion pages.

**getCareerInsight** turns the agent into a strategic career advisor. Salary negotiation data, interview prep, company research — direct and actionable, powered by Haiku for speed on quick Q&A.

**configureAgent** lets the user set automation preferences: copilot (suggestions only), autopilot (acts with confirmation), or autonomous (full auto). You configure scan cadence, match threshold, target roles, locations, salary minimum, and notification channels. The agent adapts its behavior to your risk tolerance.

**getAgentStatus** provides pipeline analytics — jobs scanned, scored, applied, interviewing, offered, rejected — filtered by time range. The control panel for knowing whether your job search machine is working.

![The hackathon space at Notion HQ, Annie Street, San Francisco](/images/insights/notion-hackathon-03.jpg)

## Two-Model Architecture: Matching Claude to Task Criticality

We deliberately split the AI work across two Claude models — a pattern we call task-criticality routing. Haiku (claude-haiku-4-5) handles the high-volume, speed-sensitive operations: job scoring, career Q&A, classification. Sonnet handles the high-stakes generation: resume tailoring and cover letters where quality directly drives outcomes.

This is not about cost optimization. It is about matching model capability to task criticality. A wrong match score wastes a click. A weak resume wastes an interview opportunity. The same two-model pattern applies to any Notion AI agent where you need both throughput and quality — customer support triage versus response drafting, lead scoring versus proposal generation.

## Source-Tier Ranking: Not All Applications Are Equal

We ported the source-tier ranking system from [signal2noise](https://signals.ensolabs.ai), our market intelligence platform, into the career agent. Every job is classified by acquisition channel: Tier 1 (direct referral, ~50% interview rate) through Tier 5 (cold apply, ~2%). This changes the agent's behavior — a Tier 1 referral with a 60 match score still gets priority over a Tier 5 cold apply at 85.

The system encodes what experienced job seekers already know intuitively: **who referred you matters more than how perfectly your resume matches.** Source-tier ranking is a general pattern — it applies equally to sales pipelines, content distribution, and investor outreach.

![Building and presenting at the Notion Developer Platform Hackathon](/images/insights/notion-hackathon-05.jpg)

## Building on Notion Workers: What We Learned

Three observations from shipping Notion AI agents in production during the hackathon:

**Speed to deployment is real.** We went from zero to five deployed Notion Worker tools in under 24 hours using Claude Code as the primary dev environment. The Notion CLI (`npx notion workers deploy`) handles packaging and deployment. The Notion SDK provides typed access to databases, pages, and blocks. The developer experience is the best we have seen for agent deployment.

**Notion MCP changes the integration model.** With [Notion MCP](https://www.notion.com/product/developer-platform), any MCP-compatible AI assistant — Claude, Codex, your own agents — can read and write Notion data natively. The career agent stores every job, resume, and status update as structured Notion pages. That data is immediately accessible to any other Notion AI agent or MCP client without additional integration work.

**The design patterns transfer.** We have been running signal2noise on Firebase and Vercel for months. Porting its intelligence patterns (source-tier ranking, multi-model routing, structured output parsing) to Notion Workers took hours, not weeks. If you have built agentic systems on any modern runtime, you can build Notion AI agents.

## Fork It, Ship It, Make It Yours

The career agent is open source and ready to deploy. Fork the repo, plug in your own resume and career preferences, and you have a working career intelligence system inside your Notion workspace. The architecture patterns — multi-model routing, source-tier ranking, configurable automation levels — are designed to be portable to any domain.

[Fork on GitHub →](https://github.com/nycsav/notion-career-agent)

## What This Means for the Notion Ecosystem

Notion's Developer Platform is the most significant expansion of a productivity tool into an AI agent runtime we have seen. With 1 million custom agents already built, Workers free through August, and partners like Anthropic and OpenAI backing the ecosystem, this is a genuine platform play — not a feature announcement.

The workspace is the interface. The Worker is the runtime. Notion MCP is the data layer. For builders and enterprises evaluating where to ship their next AI agent, Notion just became a serious platform option.

At Enso Labs, we build AI agents on Notion and every major platform. The career agent is a compressed case study of how we approach every engagement: decompose the workflow, insert AI where it creates the most leverage, keep humans in the loop where judgment matters. If you are evaluating Notion Workers for your team, [get in touch](/contact).

---

**Photos:** 4 real hackathon images from Notion HQ, San Francisco (May 16-17, 2026)
**GitHub:** github.com/nycsav/notion-career-agent
**Live URL:** ensolabs.ai/insights/notion-career-agent-open-source-hackathon
