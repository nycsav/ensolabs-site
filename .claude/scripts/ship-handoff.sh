#!/usr/bin/env bash
# ship-handoff.sh — Enso Labs Design → Code handoff executor
#
# Companion to safe-deploy.sh. safe-deploy pushes STRAIGHT to master (for the
# daily SEO engine). THIS script is for Claude Design handoffs: it works on a
# feature branch, pushes it, and opens a PR + Vercel preview. It NEVER touches
# master directly and NEVER merges — Sav reviews the preview and merges.
#
# It reuses the same sandbox-safe rules safe-deploy.sh encodes:
#   1. Never `git rm` (the sandbox blocks unlink()); delete via the filesystem
#      connector or `mv` out of tree, THEN let `git add -A` record it (rename path).
#   2. A stale .git/index.lock is renamed away, not unlinked.
#
# Two modes so the /ship-handoff command can drive edits in between:
#
#   bash .claude/scripts/ship-handoff.sh start <slug>
#       -> fetches master, creates/switches to branch design/<slug> off origin/master.
#          (Then Claude Code applies the handoff edits and runs `npm run build`.)
#
#   bash .claude/scripts/ship-handoff.sh ship  <slug> "commit subject"
#       -> stages, commits, pushes the branch, opens a PR. Never merges.

set -uo pipefail
cd "$(git rev-parse --show-toplevel)" || { echo "ship-handoff: not in a git repo"; exit 1; }

MODE="${1:?ship-handoff: mode required — 'start' or 'ship'}"
SLUG="${2:?ship-handoff: pass a handoff slug, e.g. perplexity-partner}"
BRANCH="design/${SLUG}"

# Always clear a stale lock first (rename, not unlink).
if [ -f .git/index.lock ]; then
  echo "ship-handoff: clearing stale index.lock"
  mv .git/index.lock ".git/index.lock.stale.$(date +%s)" 2>/dev/null || true
fi

case "$MODE" in
  start)
    git fetch origin master --quiet || true
    git checkout -B "$BRANCH" origin/master 2>/dev/null || git checkout -B "$BRANCH"
    echo "ship-handoff: on branch $BRANCH (off latest master)."
    echo "ship-handoff: now apply handoffs/${SLUG}.md, run 'npm run build', then:"
    echo "              bash .claude/scripts/ship-handoff.sh ship ${SLUG} \"design: ${SLUG}\""
    ;;

  ship)
    MSG="${3:-design: ${SLUG} handoff}"

    # Refuse to ship from master — this flow is branch + PR only.
    CURRENT="$(git rev-parse --abbrev-ref HEAD)"
    if [ "$CURRENT" = "master" ]; then
      echo "ship-handoff: refusing to commit on master. Run 'start ${SLUG}' first."
      exit 1
    fi

    git add -A
    if git diff --cached --quiet; then
      echo "ship-handoff: nothing staged — apply the handoff edits first."
      exit 0
    fi

    echo "ship-handoff: staging —"
    git status --short
    git commit -m "$MSG" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>" \
      || { echo "ship-handoff: commit failed"; exit 1; }

    git push -u origin "$BRANCH" || { echo "ship-handoff: push failed"; exit 1; }

    # Open a PR (gh if available; else print the compare URL). NEVER merge.
    if command -v gh >/dev/null 2>&1; then
      gh pr create --base master --head "$BRANCH" --title "$MSG" \
        --body "Automated design handoff for \`${SLUG}\` (handoffs/${SLUG}.md). Vercel builds a preview from this branch. Review the preview, then merge manually — do NOT auto-merge." \
        2>/dev/null || echo "ship-handoff: open PR -> https://github.com/nycsav/ensolabs-site/compare/master...${BRANCH}?expand=1"
    else
      echo "ship-handoff: open PR -> https://github.com/nycsav/ensolabs-site/compare/master...${BRANCH}?expand=1"
    fi

    echo "ship-handoff: branch pushed. Vercel builds a preview automatically."
    echo "ship-handoff: confirm READY via Vercel MCP, review the preview, then merge the PR yourself."
    ;;

  *)
    echo "ship-handoff: unknown mode '$MODE' — use 'start' or 'ship'."
    exit 1
    ;;
esac
