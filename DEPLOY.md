# Deploy — ensolabs.ai

Step-by-step deploy to Vercel + DNS cutover from GoDaddy/Wix.
Read the **Pre-flight** section first; the GoDaddy steps are destructive
to the live Wix site if done out of order.

---

## 0. Pre-flight (before touching DNS)

- [ ] `npm run build` succeeds locally
- [ ] `npm run dev` smoke-tested at `http://localhost:3000`
- [ ] Created the Formspree form, copied its ID
- [ ] Logged into the Vercel team that will own the project
- [ ] Logged into the GoDaddy account that owns `ensolabs.ai` and `ensopartners.co`
- [ ] **Lowered TTL to 600s on existing Wix records 24h before cutover** —
      lets you roll back fast if anything goes wrong

---

## 1. Push to a Git host

Vercel deploys from GitHub / GitLab / Bitbucket.

```bash
cd ~/Projects/ensolabs-site
git init
git add -A
git commit -m "Initial port of Claude Design prototype to Next.js 14"

# Create a private GitHub repo named ensolabs-site, then:
git remote add origin git@github.com:nycsav/ensolabs-site.git
git branch -M main
git push -u origin main
```

---

## 2. Import into Vercel

1. Vercel dashboard → **Add New… → Project**
2. Pick the `ensolabs-site` repo
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.`
5. Build command: `next build` (default)
6. Output directory: `.next` (default)
7. **Environment Variables** — add for **Production** + **Preview**:
   - `NEXT_PUBLIC_FORMSPREE_ID` = your Formspree form ID
   - `NEXT_PUBLIC_SITE_URL` = `https://ensolabs.ai`
   - (optional) `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX`
8. Deploy — you'll get a `*.vercel.app` URL. Smoke-test it before touching DNS.

---

## 3. Add domains in Vercel

In the Vercel project → **Settings → Domains**:

1. Add `ensolabs.ai` → set as **primary**
2. Add `www.ensolabs.ai` → set to redirect to `ensolabs.ai` (Vercel auto-suggests this)
3. Add `ensopartners.co` → set to **redirect to** `https://ensolabs.ai` (301)
4. Add `www.ensopartners.co` → redirect to `https://ensolabs.ai` (301)

Vercel's UI will display the exact records it expects. Use those values
if they differ from the ones below — Vercel's anycast IPs change over time.

---

## 4. GoDaddy DNS — `ensolabs.ai` (primary)

GoDaddy → **My Products → Domains → ensolabs.ai → DNS**.

### Records to ADD

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | 600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 600 |

### Records to REMOVE (these point at Wix today)

Anything with these patterns:
- `A` records pointing at Wix IPs (`23.236.62.147`, `185.230.63.x`, etc.)
- `CNAME` records pointing at `*.wixdns.net` or `*.wix.com`
- The `_wix-...` verification TXT record (only if you've already moved off Wix
  for hosting — leaving it doesn't hurt)

### Records to LEAVE ALONE

- Any MX records — `ensolabs.ai` may or may not have email; either way, do not touch
- TXT records for SPF (`v=spf1 ...`)
- TXT records for DMARC (`_dmarc`)
- CNAME records for DKIM (`*._domainkey.ensolabs.ai`)

After saving, raise TTL back to 3600s once propagation looks clean (~1 hour).

---

## 5. GoDaddy DNS — `ensopartners.co` (mail-bearing, 301 redirect)

This is the one to be careful with. **Email runs on this domain**. The redirect
to `ensolabs.ai` is web-only — A and CNAME records — and is independent of MX.

GoDaddy → **My Products → Domains → ensopartners.co → DNS**.

### Records to ADD

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | 600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 600 |

### Records to REMOVE

- Any existing A records on `@` (apex)
- Any existing CNAMEs on `www`

### Records to NEVER TOUCH

These are mail-related. Touching any of them breaks email on `sav@ensopartners.co`.

- **MX records** — typically pointing at Google Workspace (`*.googlemail.com`) or
  similar mail providers. Verify they're still present after you save.
- **TXT @ — SPF** — the `v=spf1 include:_spf.google.com ~all` (or similar) record.
- **TXT _dmarc — DMARC** — the `v=DMARC1; ...` record.
- **CNAME — DKIM** — usually `google._domainkey` or `selector1._domainkey`.

> Verify post-save by running these checks **before walking away**:
>
> ```bash
> dig MX ensopartners.co +short
> dig TXT ensopartners.co +short | grep spf1
> dig TXT _dmarc.ensopartners.co +short
> ```
>
> All three should return what they returned before the change.

The 301 redirect to `ensolabs.ai` is configured **inside Vercel**, not in DNS or
in app code. Vercel handles it at the edge.

---

## 6. Verify the cutover

After DNS propagates (usually 5–60 minutes with TTL 600):

```bash
# ensolabs.ai resolves to Vercel
dig A ensolabs.ai +short        # → 76.76.21.21 (or current Vercel IP)
dig CNAME www.ensolabs.ai +short # → cname.vercel-dns.com.

# ensopartners.co web resolves to Vercel
dig A ensopartners.co +short    # → 76.76.21.21

# CRITICAL: ensopartners.co MAIL still works
dig MX ensopartners.co +short   # → unchanged from before

# 301 redirect is wired
curl -sI https://ensopartners.co/ | grep -iE 'location|http/'
# → HTTP/2 308 (or 301)
# → location: https://ensolabs.ai/
```

Send yourself a test email at `sav@ensopartners.co` from another address to confirm mail flow.

---

## 7. Post-deploy sanity checks

- [ ] `curl https://ensolabs.ai/sitemap.xml` returns valid XML
- [ ] `curl https://ensolabs.ai/robots.txt` lists `Sitemap: https://ensolabs.ai/sitemap.xml`
- [ ] `curl https://ensolabs.ai/feed.xml` returns valid RSS
- [ ] `curl https://ensolabs.ai/.well-known/mcp.json` returns the MCP discovery doc
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on `https://ensolabs.ai/`
      returns the Organization + ProfessionalService schemas
- [ ] Submit `https://ensolabs.ai/sitemap.xml` to Google Search Console
- [ ] Test the Formspree submit on `/contact` end-to-end with a real email

---

## Rollback

If anything goes wrong on `ensolabs.ai`:

1. In GoDaddy, restore the previous Wix A/CNAME records (you noted them, right?)
2. Wait for TTL (600s if you lowered it pre-cutover)
3. Site reverts to Wix while you debug

If anything goes wrong on `ensopartners.co` mail:

1. Check that the MX records are still present and correct
2. If somehow lost, restore from GoDaddy DNS history
   (GoDaddy → DNS → ⋯ menu → "DNS History")

---

## Vercel anycast IP — caveat

Vercel's apex IP for A records can change. The current value is `76.76.21.21`.
**When you add `ensolabs.ai` in the Vercel dashboard, the UI will display the
current expected IP.** If it differs from `76.76.21.21`, use the value from
the Vercel UI, not this document.
