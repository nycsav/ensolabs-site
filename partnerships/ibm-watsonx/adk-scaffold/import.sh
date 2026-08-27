#!/usr/bin/env bash
# One-shot import for the Signal Lens agent.
# Assumes: ADK installed, `orchestrate server start -e .env` already running.
set -euo pipefail
cd "$(dirname "$0")"

echo "→ Activating local environment"
orchestrate env activate local

echo "→ Importing tools"
orchestrate tools import -k python -f tools/fetch_signals.py
orchestrate tools import -k python -f tools/score_signal.py
orchestrate tools import -k python -f tools/publish_brief.py

echo "→ Importing agent"
orchestrate agents import -f agents/signal_lens.yaml

echo "→ Launching chat (try: 'Give me today's signal brief on grid-scale battery storage.')"
orchestrate chat start
