#!/usr/bin/env bash
# Register the Enso Research MCP server as a watsonx Orchestrate toolkit.
#
# RUN THIS AFTER Ethan's credit code is applied and your Orchestrate environment
# is active. This is the step that makes the "one MCP server, two hosts" demo
# literal: the same server backing Claude Code also backs the Orchestrate agent.
#
#   bash register-orchestrate-toolkit.sh
#
# Docs: https://developer.watson-orchestrate.ibm.com/tools/toolkits/remote_mcp_toolkits
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
MCP_DIR="$HERE/enso-research-mcp"

command -v orchestrate >/dev/null 2>&1 || {
  echo "✗ 'orchestrate' CLI not found. Install it first:"
  echo "    pip install --upgrade ibm-watsonx-orchestrate"
  exit 1
}

[ -f "$MCP_DIR/.env" ] || {
  echo "✗ No .env found. Run: bash $MCP_DIR/setup-keys.sh"
  exit 1
}
set -a; . "$MCP_DIR/.env"; set +a

echo "→ Active Orchestrate environment:"
orchestrate env list || true
echo

echo "→ Registering 'enso_research' as a local MCP toolkit"
# --tools "*" imports every tool the server advertises (sonar_search,
# openai_reason, corroborate, provider_status).
orchestrate toolkits add \
  --kind mcp \
  --name enso_research \
  --description "Live research: Perplexity Sonar web search, OpenAI synthesis, and cross-provider fact-checking. Read-only." \
  --command "$MCP_DIR/.venv/bin/python3 $MCP_DIR/server.py" \
  --tools "*" \
  || {
    echo
    echo "! Flags vary by ADK release. Check what your version expects:"
    echo "    orchestrate toolkits add --help"
    exit 1
  }

echo
echo "→ Toolkits now registered:"
orchestrate toolkits list

cat <<'NEXT'

✓ Done. Next:
  1) Add the toolkit's tools to the Signal Lens agent (agents/signal_lens.yaml)
     or attach them in the Orchestrate Agent Builder UI.
  2) Swap the Scout step to live retrieval:
       orchestrate tools import -k python -f adk-scaffold/tools/fetch_signals_live.py
  3) orchestrate chat start  →  "Give me today's signal brief on grid-scale battery storage."
NEXT
