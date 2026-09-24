#!/usr/bin/env bash
# rotate-logs.sh — rotate the two Heller shared logs when they exceed 200 KB.
# Idempotent: a file under the limit is left alone. Archive name is date-stamped.
# Usage: bash scripts/ops/rotate-logs.sh   (run monthly from mcp-infrastructure-health-check)
set -euo pipefail
HELLER="$HOME/Documents/Claude/Heller"
LIMIT=$((200 * 1024))
TODAY=$(date +%F)
KEEP=250
rotated=0
rotate() {
  local file="$1" name; name=$(basename "$file" .md)
  [ -f "$file" ] || { echo "skip: $file missing"; return; }
  local size; size=$(stat -f%z "$file")
  if [ "$size" -le "$LIMIT" ]; then echo "ok: $name $((size/1024)) KB (<=200 KB)"; return; fi
  local dir; dir=$(dirname "$file")/Archive; mkdir -p "$dir"
  local archive="$dir/$name-through-$TODAY.md"
  [ -e "$archive" ] && archive="$dir/$name-through-$TODAY-$(date +%H%M%S).md"
  mv "$file" "$archive"
  {
    echo "# $name.md — rotated $TODAY (full history: $(basename "$dir")/$(basename "$archive"), $((size/1024)) KB). Keep this file under 200 KB; rotate monthly via scripts/ops/rotate-logs.sh."
    echo "# Grep the archive for older entries; never Read it whole (runtime gate 4)."
    tail -n "$KEEP" "$archive"
  } > "$file"
  echo "rotated: $name $((size/1024)) KB -> $archive (kept last $KEEP lines)"
  rotated=$((rotated+1))
}
rotate "$HELLER/Tasks/active-tasks.md"
rotate "$HELLER/Emails/email-log.md"
[ "$rotated" -eq 0 ] && echo "nothing to rotate"
exit 0
