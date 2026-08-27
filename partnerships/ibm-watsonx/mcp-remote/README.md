# Partner Plus Navigator — remote MCP server

A public HTTPS endpoint exposing the Partner Plus knowledge base and research
tools over the **MCP Streamable HTTP transport**, so any remote MCP client can
reach them — Claude Code, Claude Desktop, Cursor, and **watsonx Orchestrate**.

**Status:** 25/25 local tests passing, live API calls verified (2026-07-30).

## Why remote

The local stdio server only works on the machine it runs on. A URL works
everywhere — and IBM's [remote MCP toolkits](https://developer.watson-orchestrate.ibm.com/tools/toolkits/remote_mcp_toolkits)
consume a **URL + transport**. So deploying now means adding Orchestrate later is
one command against the same URL. No rework.

## Tools

| Tool | Purpose |
|---|---|
| `partner_plus_benefits` | What a tier unlocks — and what it doesn't. Verified first-hand. |
| `partner_plus_build_route` | Fastest route to a working IBM build environment. |
| `partner_plus_troubleshoot` | Five real onboarding failures, with the actual causes. |
| `partner_plus_ask` | Any Partner Plus question, cited from IBM sources. |
| `sonar_search` | Live web research with citations. |
| `frontier_reason` | Any frontier model — OpenAI, Anthropic, Google, xAI. |

Read-only by design. Nothing sends, posts, purchases, or accepts terms.

## Deploy to Vercel

```bash
cd mcp-remote
vercel                      # first deploy (preview)
vercel --prod               # production
```

Then set two environment variables in the Vercel dashboard
(**Project → Settings → Environment Variables**), or via CLI:

```bash
vercel env add PERPLEXITY_API_KEY production   # your Perplexity key
vercel env add MCP_AUTH_TOKEN production       # any long random string you invent
vercel --prod                                  # redeploy so they take effect
```

`MCP_AUTH_TOKEN` gates the endpoint — without it the server is open to anyone
who finds the URL. Set it.

### Verify the deploy

```bash
curl https://<your-deployment>.vercel.app/mcp
```

Returns server info, the tool list, and whether the key and auth token are
configured. No auth needed for this health check.

## Connect from Claude Code

```bash
claude mcp add --scope user --transport http partner-plus \
  https://<your-deployment>.vercel.app/mcp \
  --header "Authorization: Bearer <your MCP_AUTH_TOKEN>"
```

## Connect from watsonx Orchestrate (when the environment exists)

```bash
orchestrate toolkits add \
  --kind mcp \
  --name partner_plus_navigator \
  --url https://<your-deployment>.vercel.app/mcp \
  --transport streamable-http \
  --tools "*"
```

Flags vary by ADK release — check `orchestrate toolkits add --help`.

## Local test

```bash
python3 -m pip install certifi
export PERPLEXITY_API_KEY=...     # optional; live tools skip without it
python3 test_local.py
```

Exercises the full JSON-RPC surface — initialize, tools/list, tools/call, error
codes — without deploying.

## Notes

- **Stdlib only** apart from `certifi` (a CA bundle, so TLS behaves identically
  on Vercel's Linux runtime and local macOS Python builds).
- Implemented as a plain JSON-RPC handler rather than via the MCP SDK, because
  Vercel's Python runtime is request/response and the SDK's session machinery
  assumes a long-lived process.
- The local stdio server in `../enso-research-mcp/` remains the development
  copy; this is the deployable twin.
