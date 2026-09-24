#!/usr/bin/env bash
# seo-run.sh — the only deploy path for the ensolabs-seo-audit scheduled task.
# branch seo/<date> (reuse if it exists) -> npm run build -> push -> PR against master.
# Never pushes to master. Non-zero build exit = print the last 30 lines and stop.
set -uo pipefail
cd "$(dirname "$0")/../.." || exit 1
BRANCH="seo/$(date +%F)"
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git checkout "$BRANCH" || exit 1
else
  git checkout -b "$BRANCH" || exit 1
fi
echo "branch: $BRANCH"
LOG=$(mktemp)
if ! npm run build >"$LOG" 2>&1; then
  echo "BUILD FAILED — last 30 lines:"; tail -n 30 "$LOG"; rm -f "$LOG"; exit 1
fi
tail -n 5 "$LOG"; rm -f "$LOG"
echo "build: OK"
git push -u origin HEAD || exit 1
echo "commit: $(git rev-parse --short HEAD)"
if gh pr view --json url -q .url 2>/dev/null; then
  echo "pr: already open (URL above)"
else
  gh pr create --fill --base master || exit 1
fi
