#!/usr/bin/env bash
# Securely add your API keys and register the MCP server with Claude Code.
#
# RUN THIS YOURSELF in Terminal. It prompts for keys with the screen hidden and
# writes them only to your local config — nothing is echoed, logged, or sent to
# anyone. Never paste API keys into a chat window.
#
#   bash setup-keys.sh
#
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ENVFILE="$HERE/.env"

echo "=== Enso Research MCP — key setup ==="
echo "Keys are hidden as you type. Press Enter to skip one."
echo

read -rsp "Perplexity API key (from perplexity.ai/api-platform): " PPLX; echo
read -rsp "OpenAI API key      (from platform.openai.com/api-keys): " OAI; echo

umask 077
{
  echo "# Enso Research MCP — local secrets. DO NOT COMMIT."
  [ -n "${PPLX:-}" ] && echo "PERPLEXITY_API_KEY=$PPLX"
  [ -n "${OAI:-}"  ] && echo "OPENAI_API_KEY=$OAI"
} > "$ENVFILE"
chmod 600 "$ENVFILE"
echo "✓ Wrote $ENVFILE (permissions 600, owner-only)"

# Make sure it can never be committed.
GITIGNORE="$HERE/.gitignore"
grep -qxF ".env" "$GITIGNORE" 2>/dev/null || printf '.env\n.venv/\n__pycache__/\n' >> "$GITIGNORE"
echo "✓ .env is git-ignored"

echo
echo "=== Registering with Claude Code ==="
if command -v claude >/dev/null 2>&1; then
  ARGS=(mcp add enso-research)
  [ -n "${PPLX:-}" ] && ARGS+=(--env "PERPLEXITY_API_KEY=$PPLX")
  [ -n "${OAI:-}"  ] && ARGS+=(--env "OPENAI_API_KEY=$OAI")
  ARGS+=(-- "$HERE/.venv/bin/python3" "$HERE/server.py")
  claude "${ARGS[@]}" && echo "✓ Registered. Open Claude Code and run /mcp to confirm."
else
  echo "! 'claude' CLI not found — skipping Claude Code registration."
  echo "  The .env is still written, so the server works standalone and with watsonx."
fi

echo
echo "=== Smoke test ==="
set -a; . "$ENVFILE"; set +a
"$HERE/.venv/bin/python3" "$HERE/smoke_test.py"
