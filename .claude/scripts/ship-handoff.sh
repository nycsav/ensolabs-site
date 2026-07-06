#!/usr/bin/env bash
# ship-handoff.sh — Enso Labs Design → Code handoff executor
#
# Companion to safe-deploy.sh. safe-deploy pushes STRAIGHT to master (for the
# daily SEO engine). THIS script is for Claude Design handoffs: it works on a
# feature branch, pushes it, opens a PR, and — for routine handoffs — enables
# GitHub AUTO-MERGE so the PR merges itself the moment the Vercel check passes.
# It never pushes to master directly and never force-merges past a failing check.
#
# Auto-merge posture (Sav is time-pressed and does not review routine PRs):
#   * Green-gated: `gh pr merge --auto` queues the merge; GitHub merges ONLY when
#     the required status check (Vercel) is green. A broken build never merges.
#   * Protected-paths TRIPWIRE: if the diff touches agent-behavior / config /
#     brand-critical files (see PROTECTED_PATHS), auto-merge is WITHHELD and the
#     PR waits for Sav. Everything else flows hands-off.
#   * Escape hatch: `NO_AUTOMERGE=1` env or a 4th arg of "review" forces manual.
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
#   bash .claude/scripts/ship-handoff.sh ship  <slug> "commit subject" [review]
#       -> stages, commits, pushes the branch, opens a PR, and enables green-gated
#          auto-merge unless the tripwire fires or manual review is forced.

set -uo pipefail
cd "$(git rev-parse --show-toplevel)" || { echo "ship-handoff: not in a git repo"; exit 1; }

# Files that must NEVER auto-merge — a human glances at these before they go live.
# (Extended-regex, matched against paths in the branch diff vs origin/master.)
PROTECTED_PATHS='^(CLAUDE\.md|\.claude/|app/globals\.css|next\.config\.|vercel\.json|package(-lock)?\.json|middleware\.|lib/schema|lib/.*schema)'

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

    # Decide auto-merge eligibility BEFORE opening the PR.
    CHANGED="$(git diff --name-only origin/master...HEAD)"
    FORCE_REVIEW="${4:-}"
    AUTOMERGE=1
    REASON=""
    if [ "${NO_AUTOMERGE:-0}" = "1" ] || [ "$FORCE_REVIEW" = "review" ]; then
      AUTOMERGE=0; REASON="manual review forced"
    elif echo "$CHANGED" | grep -Eq "$PROTECTED_PATHS"; then
      AUTOMERGE=0; REASON="tripwire: diff touches protected paths"
    fi

    if [ "$AUTOMERGE" = "1" ]; then
      PRBODY="Automated design handoff for \`${SLUG}\` (handoffs/${SLUG}.md). AUTO-MERGE is ON: GitHub merges this the moment the Vercel check passes. A failing build will NOT merge."
    else
      PRBODY="Automated design handoff for \`${SLUG}\` (handoffs/${SLUG}.md). AUTO-MERGE WITHHELD (${REASON}). Sav reviews the Vercel preview and merges manually."
    fi

    # Open the PR (gh if available; else print the compare URL).
    if command -v gh >/dev/null 2>&1; then
      gh pr create --base master --head "$BRANCH" --title "$MSG" --body "$PRBODY" 2>/dev/null \
        || echo "ship-handoff: open PR -> https://github.com/nycsav/ensolabs-site/compare/master...${BRANCH}?expand=1"

      if [ "$AUTOMERGE" = "1" ]; then
        # Green-gated: merges ONLY when required checks pass. Requires repo
        # 'Allow auto-merge' ON + a required status check (see AUTOMERGE-SETUP.md).
        if gh pr merge "$BRANCH" --auto --squash --delete-branch 2>/dev/null; then
          echo "ship-handoff: AUTO-MERGE enabled — merges when the Vercel check goes green."
        else
          echo "ship-handoff: could not enable auto-merge (is 'Allow auto-merge' + a required check configured?)."
          echo "ship-handoff: PR is open for manual merge -> https://github.com/nycsav/ensolabs-site/pulls"
        fi
      else
        echo "ship-handoff: AUTO-MERGE withheld (${REASON}). PR waits for Sav."
      fi
    else
      echo "ship-handoff: gh not found. Open PR -> https://github.com/nycsav/ensolabs-site/compare/master...${BRANCH}?expand=1"
    fi

    echo "ship-handoff: branch pushed. Vercel builds a preview automatically."
    ;;

  *)
    echo "ship-handoff: unknown mode '$MODE' — use 'start' or 'ship'."
    exit 1
    ;;
esac
