# Handoff: LinkedIn publisher — linkedin-publisher

> Executed in Claude Code. Ships `scripts/publish-linkedin.js` and hardens the parts that
> could not be tested without a live LinkedIn token.

## Summary
`scripts/publish-linkedin.js` already exists and passes `node --check`. It publishes a
multi-image gallery post to Sav's personal LinkedIn profile from local PNGs, then posts the
first comment — no browser, no file picker. This handoff commits it, verifies the API details
that were written without a token to test against, and wires it into `package.json`.

**Context worth knowing:** today's attempt to post the FDE Part 1 carousel through browser
automation failed twice — LinkedIn's document-upload input sits in shadow DOM (unreachable by
the accessibility tree), and the photo button opens a native macOS file picker (outside the
browser entirely). The API is the only durable path.

## Target
- Branch: `design/linkedin-publisher`
- Files to touch: `scripts/publish-linkedin.js`, `package.json` (scripts block only), `.gitignore`, `handoffs/`
- **Do NOT touch:** `app/`, `components/`, `lib/`, `globals.css`, `next.config`, any `public/social/` asset

## Access reality — verify this is still true before building on it
Verified 2026-08-20 against LinkedIn's docs. Re-check, because it decides what is testable:

| Mode | Product required | Self-serve? |
|---|---|---|
| `--single` (one image) | "Share on LinkedIn" | **Yes** — add product, authorize, works immediately |
| default (up to 9 images) | **Community Management API** | **No** — manual review, registered legal entity only, published timelines 4–8 weeks fast path / 3–4 months typical |

Multi-image mode will return 403 until access is granted. That is expected, not a bug — the
script already prints that explanation on a 403. Do not "fix" it by rewriting the endpoint.

## Tasks

### 1. Verify the API surface (do this first — these were written without a token to test)
Check each against current LinkedIn documentation and correct in place if wrong:

- [ ] `POST /rest/images?action=initializeUpload` request/response shape, and that the upload
      URL takes a raw `PUT` with `Content-Type: application/octet-stream`.
- [ ] `POST /rest/posts` with `content.multiImage.images[]` — confirm the key is still
      `multiImage`, and that each entry takes `{ id, altText }`.
- [ ] Single-image content shape: currently `content.media = { id, altText }`. Confirm.
- [ ] **Comment endpoint is the least certain thing in the file.** It currently posts to
      `/rest/socialActions/{urn}/comments` with `{ actor, object, message: { text } }`.
      Verify the path, the URN encoding, and whether the current API version expects
      `/rest/comments` instead. Fix if wrong.
- [ ] Post URN extraction — currently reads the `x-restli-id` response header, falling back to
      `json.id`. Confirm that header is still what LinkedIn returns.
- [ ] `LinkedIn-Version: 202606` — confirm this is current and not deprecated.
- [ ] Confirm the image cap on multi-image posts, and the per-image pixel ceiling
      (documented as 36,152,320 px).
      **Correction (2026-08-20 re-verify): the cap is min 2 / max 20 images, not 9.**
      The MultiImage API doc (https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/multiimage-post-api)
      states "minimum of 2 images and maximum of 20 images." The script's
      MAX_IMAGES has been corrected from 9 to 20, with a MIN_IMAGES=2 guard added.

### 2. Make setup foolproof
- [ ] Add `.env.local` to `.gitignore` if not already covered. **Verify by running
      `git check-ignore -v .env.local`** — do not assume.
- [ ] Create `.env.local.example` with the two required keys and a comment pointing at the
      script header. Commit the example, never a real token.
- [ ] Add to `package.json` scripts:
      `"li:whoami"`, `"li:dry"`, `"li:post"`, `"li:single"` mapping to the corresponding flags.

### 3. Harden
- [ ] Token expiry: LinkedIn member tokens last 60 days. On a 401, the error should tell Sav
      to regenerate rather than making him read the stack.
- [ ] Add `--comment-only <postUrn>` so a failed comment can be retried without re-posting the
      images. Right now a comment failure after a successful post leaves no recovery path —
      that is the worst failure mode in the file.
- [ ] Image preflight: reject any slide over the pixel ceiling before uploading, naming the file.
- [ ] Idempotency guard: write a `.published/<slug>.json` receipt after a successful post and
      refuse to re-post the same slug without `--force`. Double-posting to a personal feed is
      embarrassing and not easily undone.

### 4. Ship
- [ ] `npm run build` must pass (the script is standalone, but confirm nothing broke).
- [ ] `node scripts/publish-linkedin.js --dry-run` must render the full post preview and exit
      cleanly **without a token present** — that is the no-credentials path Sav will hit first.
- [ ] Branch + PR against master. Never push to master.

## Content rules to honor
- The script reads post copy from `public/social/fds-part1/post-copy.md` — keep that as the
  single source of truth. Do not inline copy into the script.
- The confidential-client guard (`/\b(Gore|W\.? ?L\.? ?Gore)\b/i`) must stay and must abort.
- UTM-tagged links only, per `briefs/UTM-REGISTRY.md`.
- **The script must never post without either an interactive `yes` or an explicit `--yes` flag.**
  Do not add a mode that posts silently.

## Acceptance checklist
- [ ] Every API detail in Task 1 either confirmed against docs or corrected, with the doc URL
      noted in a comment next to the call.
- [ ] `--dry-run` works with no credentials configured.
- [ ] `git check-ignore -v .env.local` confirms the token file is ignored.
- [ ] No token, secret, or member URN committed anywhere.
- [ ] PR opened, not merged to master directly.

## Out of scope
Posting anything · requesting LinkedIn API access (Sav does that in the developer portal) ·
company-page posting · scheduling · analytics retrieval · Parts 2–4 content.
