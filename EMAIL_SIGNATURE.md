# Canonical Email Signature — single source of truth

**Why this file exists:** Gmail's saved signature is applied by the Gmail **web UI only**. Any draft or email created through the Gmail **API** (which is how every Cowork/Claude Code scheduled task and ad-hoc draft is created) is composed **without** the saved signature. So the signature must be appended **explicitly, every time**. This file is the exact block to append.

Verified against Sav's live Gmail signature ("Enso Labs Jul", account sav@ensopartners.co) on 2026-07-05.

---

## Scope — when to append this signature
**Universal: every email out of the account gets it — no exceptions by task, recipient, or type.** Enso Labs and Enso Partners are the same account (sav@ensopartners.co, which also receives sav@ensolabs.ai). Clients, partners, events, vendors, internal, cold outreach — new threads AND replies. Any email or Gmail draft composed by any task, skill, or ad-hoc request.

**Only true non-exception:** a block of social-post COPY meant to be pasted into LinkedIn (`signal2noise` / `wins-to-profiles` "[S2N]" post text) is pasted content, not an email — don't inject the email signature INTO the post copy itself.

This does not tell any task to start emailing — it only governs mail that IS composed. (The in-app-only / no-self-notification-draft rules still stand.)

---

## HTML signature (pass as `htmlBody`)
Clean anchors only — never bare/tracker-wrapped URLs. Colors are the Strategy → Ship brand: Ink `#1E1813`, Ship Coral `#F0512E` (the arrow only), taupe `#79705F`.

```html
<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#1E1813;margin-top:16px;">
  <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#1E1813;">Strategy <span style="color:#F0512E;">&rarr;</span> Ship</div>
  <div style="margin-top:6px;font-weight:bold;">Sav Banerjee</div>
  <div style="color:#79705F;">Founder &amp; Principal &middot; Enso Labs</div>
  <div style="margin-top:2px;">
    <a href="https://www.linkedin.com/in/savbanerjee" style="color:#1E1813;text-decoration:none;">LinkedIn</a>
    <span style="color:#79705F;">&middot;</span>
    <a href="https://github.com/nycsav" style="color:#1E1813;text-decoration:none;">GitHub</a>
    <span style="color:#79705F;">&middot;</span>
    <a href="https://ensolabs.ai" style="color:#1E1813;text-decoration:none;">ensolabs.ai</a>
  </div>
  <div><a href="mailto:sav@ensopartners.co" style="color:#79705F;text-decoration:none;">sav@ensopartners.co</a></div>
</div>
```

## Plain-text fallback (pass as `body`)
No `http(s)://` prefixes — prevents Gmail from wrapping links in `google.com/url` redirects.

```
Strategy → Ship
Sav Banerjee
Founder & Principal · Enso Labs
LinkedIn · GitHub · ensolabs.ai
sav@ensopartners.co
```

**Always pass BOTH `htmlBody` (governs display) and `body` (plain-text fallback).**

## ⚠️ htmlBody must be RAW HTML — never entity-escaped (rule set 2026-08-06 after a garbled draft)
- Pass literal tags (`<p>`, `<div>`, `<a href=...>`) in `htmlBody`. If the markup is HTML-entity-escaped (`&lt;p&gt;` etc.), Gmail renders the code as VISIBLE TEXT and the draft looks garbled and unprofessional.
- **Mandatory verification step:** after creating or updating ANY draft, read it back (get the draft/message body) and confirm it contains rendered-intent raw tags, not `&lt;` sequences, before reporting the draft as done. A draft nobody verified is not done.
- If the user opens a draft in the Gmail compose UI, its draft ID can go stale — an `update_draft` failure on a known ID usually means this; create a fresh draft and tell the user to discard the open one.

---

## Exact links (verified)
- LinkedIn → https://www.linkedin.com/in/savbanerjee
- GitHub → https://github.com/nycsav
- ensolabs.ai → https://ensolabs.ai
- Email → mailto:sav@ensopartners.co

## Notes / fidelity
- The live Gmail signature also contains two inline images: a "Strategy → Ship" wordmark graphic (served via Gmail's `googleusercontent.com` image proxy) and a "Built In NYC" badge (hotlinked from `logovectorseek.com`). These are **intentionally reproduced here as styled text, not images** — the proxied wordmark URL 403s when sent from an API draft, and hotlinked third-party logos break. To get a pixel-perfect image wordmark on outbound mail, host a stable PNG at `ensolabs.ai/...` and swap the text wordmark for it (ask Sav first).
- The live signature currently has a **temporary** OOO/travel prefix ("Travel date: Tuesday, July 7 / OOO... / Working on Pacific Standard Time July 8 – early August"). That is time-bound and is **excluded** from this canonical block so automated drafts never ship a stale OOO note. Update the block here if the permanent signature changes.
- Personal founder/scholarship emails stay first-person "I" in the body; the signature block above still applies.
