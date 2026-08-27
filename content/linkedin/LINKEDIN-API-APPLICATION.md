# LinkedIn API access — application pack

**Why this exists:** I tested LinkedIn upload directly today and it is closed. There is
no `<input type="file">` in the DOM — LinkedIn spawns the **native macOS file picker**,
which lives outside the browser and cannot be driven by any browser tool. Confirmed by
querying the live page, not assumed.

Programmatic posting is the only way to remove Sav from this loop. That needs an
approved app. Below is everything to submit.

---

## Step 1 — Create the app (5 min)

Go to **https://developer.linkedin.com/** → **Create app**

| Field | Value |
|---|---|
| App name | `Strategy to Ship — Enso Labs Publisher` |
| LinkedIn Page | **Enso Labs** (linkedin.com/company/ensopartners-labs) |
| Privacy policy URL | `https://ensolabs.ai/editorial-policy` |
| App logo | **`APP-LOGO-300x300.png`** — already exported, sitting in the same folder as this file. Nothing to convert. |
| Legal agreement | Accept |

Verifying the app against the Enso Labs Page requires a Page admin — that is Sav, so
it is a single click on the verification URL the portal generates.

## Step 2 — Request products

On the app's **Products** tab, request:

1. **Share on LinkedIn** — grants `w_member_social`. Lets the engine create posts,
   including document posts (the carousel) and images. This is the one that matters.
2. **Sign In with LinkedIn using OpenID Connect** — grants `openid`, `profile`, `email`.
   Needed to resolve the member URN the post is authored as.

*Advertising API is a separate, heavier review and is NOT needed. Boosting stays manual
by choice — money movement is Sav's, always.*

## Step 3 — Use-case description (paste this)

> Enso Labs is a two-person AI consultancy in New York. We publish a research series,
> Strategy to Ship, to our own website and distribute each piece to our own LinkedIn
> presence — a long-form article, a document carousel, and a short post.
>
> Today that distribution is entirely manual: every image, PDF and caption is uploaded
> by hand for each piece. We are requesting Share on LinkedIn so our internal publishing
> tool can post the same content we already publish, authored by and to our own account.
>
> Scope: first-party content only. We do not post on behalf of third parties, do not
> aggregate or resell LinkedIn data, do not scrape, and do not automate engagement
> (no auto-likes, auto-comments, auto-connects). Posting stays human-approved — the
> tool prepares the post and a person approves each one before it is published.
>
> Volume: roughly 4–8 posts per month.

## Step 4 — After approval

Add to `~/Projects/strategy-to-ship-content-ops/.env`:

```
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_ACCESS_TOKEN=
LINKEDIN_MEMBER_URN=urn:li:person:XXXXXXXX
```

Then build `tools/linkedin_poster.py`, mirroring `tools/x_poster.py` (dry-run default,
`--confirm` to publish):

| Step | Endpoint |
|---|---|
| 1. Register upload | `POST /rest/images?action=initializeUpload` (images) or `POST /rest/documents?action=initializeUpload` (carousel PDF) |
| 2. Upload bytes | `PUT` to the returned `uploadUrl` |
| 3. Create post | `POST /rest/posts` with the returned URN in `content` |

Headers on every call: `LinkedIn-Version: 202508`, `X-Restli-Protocol-Version: 2.0.0`.

Note: access tokens expire in 60 days. Store the refresh token and refresh on a
schedule, the same way `enso-google` avoids the daily OAuth drop.

## Reality check on timing

LinkedIn review for Share on LinkedIn is typically days, not hours, and can be
rejected on a vague use case — which is why the description above is specific about
first-party-only and no engagement automation.

**Until it clears, publishing is manual.** That is a platform constraint, not a
tooling gap, and no amount of Claude Code changes it.
