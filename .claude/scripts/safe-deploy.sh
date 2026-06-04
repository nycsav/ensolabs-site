#!/usr/bin/env bash
# safe-deploy.sh — Enso Labs autonomous deploy helper
#
# Why this exists: the Cowork/Claude sandbox blocks the unlink() syscall, so
# `git rm` and stale-lock cleanup fail mid-operation and leave a stuck
# .git/index.lock that breaks every later commit. This script avoids both
# traps so the daily SEO engine (and any agent run) can commit + deploy with
# zero manual help.
#
# Rules it encodes:
#   1. Never use `git rm`. To delete a file, remove it via the filesystem
#      connector (mcp__filesystem__*) or `mv` it out of the tree first, THEN
#      let `git add -A` record the deletion (that path uses rename, not unlink).
#   2. A stale lock is renamed away (rename works; unlink doesn't).
#   3. drafts/ is gitignored, so `git add -A` can't sweep in unpublished drafts.
#
# Usage:  bash .claude/scripts/safe-deploy.sh "commit subject line"
# Deploy: Vercel auto-deploys from the master push. No manual deploy step.

set -uo pipefail

cd "$(git rev-parse --show-toplevel)" || { echo "safe-deploy: not in a git repo"; exit 1; }

MSG="${1:-seo: automated update}"

# 1) Clear a stale lock left by a previously crashed git op (rename, not unlink).
if [ -f .git/index.lock ]; then
  echo "safe-deploy: clearing stale index.lock"
  mv .git/index.lock ".git/index.lock.stale.$(date +%s)" 2>/dev/null || true
fi

# 2) Stage all changes (adds, modifications, and already-removed files).
git add -A

# 3) Nothing to do? Exit clean.
if git diff --cached --quiet; then
  echo "safe-deploy: no changes to commit."
  exit 0
fi

# 4) Show what will ship, then commit + push.
echo "safe-deploy: staging —"
git status --short
git commit -m "$MSG" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>" \
  || { echo "safe-deploy: commit failed"; exit 1; }
git push origin master \
  || { echo "safe-deploy: push failed"; exit 1; }

echo "safe-deploy: pushed to master. Vercel auto-deploys — confirm READY via Vercel MCP list_deployments."
