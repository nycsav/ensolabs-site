# Enso Research MCP

**One MCP server that gives Claude Code (or any MCP host) live research across Perplexity Sonar and OpenAI — plus a cross-provider fact-check tool.**

Built by Enso Labs. Read-only by design: it searches and synthesizes, never sends, posts, or spends.

## Why this matters (the partnership angle)

IBM's own framing: MCP is the "USB-C port" for AI — a standard integration layer so agents reach tools without bespoke glue. This server is that layer for **research**, and it plugs into both sides of Enso's stack:

- **Claude Code** — Sav's daily driver, gets grounded web research inline.
- **watsonx Orchestrate** — the same server can back the Signal Lens agent's Scout step, so the ADK agent and Claude Code share one research substrate.

That's the demo story: *one MCP server, two hosts, no rewrite.*

## Tools

| Tool | What it does |
|---|---|
| `sonar_search` | Live web research via Perplexity Sonar. 4 depths: `fast` / `pro` / `reasoning` / `deep`. Returns answer + citations. |
| `openai_reason` | Synthesis/drafting with any frontier model (no web). Routes via the Agent API. |
| `corroborate` | Runs Sonar, then has a second model audit it for unsupported claims + undated figures. Ends with a confidence rating. |
| `panel` | Asks OpenAI, Anthropic and Google the **same** question side by side. Divergence = verify by hand. |
| `provider_status` | Which keys and models are available. Call this first when debugging. |

**One key runs all of it.** `PERPLEXITY_API_KEY` alone covers Sonar *and* every frontier model below, because Perplexity's Agent API resells them at direct provider rates with no markup. `OPENAI_API_KEY` is optional (only used if you pass a bare model id like `gpt-4o`).

### Model registry — all 7 verified live 2026-07-30

| Short name | Model ID |
|---|---|
| `gpt` | `openai/gpt-5.4` |
| `gpt-max` | `openai/gpt-5.5` |
| `claude` | `anthropic/claude-sonnet-4-6` |
| `haiku` | `anthropic/claude-haiku-4-5` |
| `gemini` | `google/gemini-3.1-pro-preview` |
| `flash` | `google/gemini-3-flash-preview` |
| `grok` | `xai/grok-4.3` |

Two gotchas found the hard way, both handled in code:
- **Anthropic models 400 without `max_output_tokens`** — the server always sends it.
- `anthropic/claude-opus-4-7` is documented but returned 400 on this API group; omitted rather than shipped broken.

## Status

✅ **LIVE on Sav's Mac (Jul 30, 2026)** — 5 tools registered, **5/5 smoke checks passing against live APIs**, **7/7 frontier models verified**. Tested on **MCP Python SDK 2.0.0**; the import shim also supports SDK 1.x (`FastMCP` → `MCPServer` rename).

## Install

```bash
cd enso-research-mcp
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## Connect to Claude Code

From your project root:

```bash
claude mcp add enso-research \
  --env PERPLEXITY_API_KEY=your-key \
  --env OPENAI_API_KEY=your-key \
  -- python3 /Users/savbanerjee/Projects/ensolabs-site/partnerships/ibm-watsonx/enso-research-mcp/server.py
```

Or commit a project-scoped `.mcp.json` (see `mcp.json.example`) so the whole team gets it.

Verify inside Claude Code:

```
/mcp
```

Then try: *"Use corroborate to check how fast grid-scale battery storage grew last quarter."*

## Connect to watsonx Orchestrate

Orchestrate consumes MCP servers as toolkits. Point it at this same `server.py` to give the Signal Lens agent live retrieval — replacing the bundled sample set in `../adk-scaffold/tools/fetch_signals.py` with real grounded search.

## Get API keys

- Perplexity: https://www.perplexity.ai/api-platform (Sonar pricing: https://docs.perplexity.ai/docs/getting-started/pricing)
- OpenAI: https://platform.openai.com/api-keys

Keep keys in the MCP env block or your shell — never commit them.

## Reference

- IBM on MCP: https://www.ibm.com/think/topics/model-context-protocol
- IBM MCP server tutorial: https://www.ibm.com/think/tutorials/how-to-build-an-mcp-server
- MCP spec: https://modelcontextprotocol.io
