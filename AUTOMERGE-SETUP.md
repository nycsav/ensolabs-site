# AUTOMERGE-SETUP — one-time: turn on green-gated auto-merge

> Run ONCE in Claude Code (repo `nycsav/ensolabs-site`), after the handoff pipeline is
> installed. This lets `/ship-handoff` merge routine PRs by itself the moment the Vercel
> build passes — so Sav never has to review or click merge. A failing build never merges,
> and the protected-paths tripwire still holds config/brand-critical changes for review.

You are enabling **green-gated auto-merge**. Two settings make it safe:
1. Repo allows auto-merge (so `gh pr merge --auto` can queue a merge).
2. A required status check on `master` (the Vercel deployment) — so a queued merge only
   fires when that check is green. Without a required check, "auto-merge" would merge
   immediately; the required check is what makes it *green-gated*.

## 1. Allow auto-merge on the repo
```
gh api -X PATCH repos/nycsav/ensolabs-site -f allow_auto_merge=true -f delete_branch_on_merge=true
```

## 2. Find the exact Vercel check name
Auto-merge needs the check's exact context string. Open a recent PR's checks, or run:
```
gh api repos/nycsav/ensolabs-site/commits/master/check-runs --jq '.check_runs[].name'
```
Typical values: `Vercel` or `Vercel – ensolabs-site` or `vercel`. Use whichever appears.

## 3. Require that check on master (branch protection)
Replace `VERCEL_CHECK` with the exact name from step 2:
```
gh api -X PUT repos/nycsav/ensolabs-site/branches/master/protection \
  -H "Accept: application/vnd.github+json" \
  -f 'required_status_checks[strict]=true' \
  -f 'required_status_checks[contexts][]=VERCEL_CHECK' \
  -f 'enforce_admins=false' \
  -f 'required_pull_request_reviews=' \
  -f 'restrictions='
```
Notes:
- `enforce_admins=false` + no `required_pull_request_reviews` means **no human approval is
  required** — the Vercel check is the only gate. That's the point: hands-off on green.
- `strict=true` requires the branch be up to date with master before merge; `--auto` handles
  the update automatically.

## 4. Verify
```
gh api repos/nycsav/ensolabs-site --jq '.allow_auto_merge'                 # -> true
gh api repos/nycsav/ensolabs-site/branches/master/protection --jq '.required_status_checks.contexts'
```

## 5. Done — the loop is now truly hands-off
- `/ship-handoff <slug>` opens the PR and enables auto-merge for routine handoffs.
- Vercel builds → check goes green → GitHub squash-merges → branch deleted → live.
- If the diff touches `CLAUDE.md`, `.claude/`, `globals.css`, schema, `next.config`,
  `package.json`, or `vercel.json`, auto-merge is withheld and the PR waits for Sav.
- Force manual review any time with `NO_AUTOMERGE=1` or a 4th arg `review` on the ship step.

## Rollback (if you ever want review back for everything)
```
gh api -X PATCH repos/nycsav/ensolabs-site -f allow_auto_merge=false
```
