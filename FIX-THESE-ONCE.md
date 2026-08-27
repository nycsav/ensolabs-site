# Fix These Once — 6 minutes, and the daily breakage stops

Written 2026-08-25 after the JPMorgan application stalled one click short.
Everything below is diagnosed and verified. Do them in order; each is independent.

---

## 1. Remove the duplicate Claude extensions — 2 min ← **this is the "I can't find the browser" bug**

The Claude Chrome extension (`fcoeoabgfenejglbffodgkkbkcdhcgfn`) is installed in **three** places.
Each one registers as a separate "Browser" on your account, so Claude binds to whichever answers
first — and your tabs open in a window you're not looking at.

| Where | Signed in as | Action |
|---|---|---|
| Chrome → **Profile 10** | **sav@ensopartners.co** | ✅ **KEEP — this is your work profile** |
| Chrome → Default | sav.banerjee@gmail.com | ❌ Remove the extension |
| **Comet** (Perplexity browser) | — | ❌ Remove the extension |

**How:** in each browser/profile you're removing it from, go to `chrome://extensions`, find **Claude**, click **Remove**.

Until you do this, Claude now pins to the right one automatically —
canonical deviceId `4bde578f-c14b-442a-b028-c7cee39e3fbc` ("Browser 1" = Profile 10), recorded in CLAUDE.md.

---

## 2. Grant Accessibility to Terminal — 1 min ← **this is why applications stall**

This is the single permission blocking every job application from being finished end-to-end.

**System Settings → Privacy & Security → Accessibility → toggle ON `Terminal`**
(the pane is already open on your screen; if not: `open "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"`)

**Why it matters:** Cowork's browser upload tool is disabled, so the only route to attaching a resume
is driving the native macOS file picker. That needs assistive access. Without it, JPMorgan, Ford,
Greenhouse and Workday all stop at "attach your resume" and get handed back to you.

With it on, Claude finishes the application.

---

## 3. Uninstall two plugin bundles you've never authorized — 2 min

These fire an OAuth demand every single session and you have never connected any of them:

- **`marketing`** → ahrefs, amplitude, amplitude-eu, canva, figma, klaviyo, similarweb, supermetrics, hubspot
- **`productivity`** → asana, atlassian, clickup, linear, monday

That's 14 servers of pure startup noise. **Cowork → plugin manager → uninstall `marketing` and `productivity`.**

Keep Notion and Slack — you actually use those, and they're connected separately at the account level.

---

## 4. Nothing to do — already handled

- **Desktop Commander flapping.** It's a Cowork plugin with an app-managed lifecycle, not a config error
  on your machine. Claude now treats a drop as transient and retries instead of reporting it to you.
- **Notion query limit.** When the quota is hit, Claude writes the run log to
  `Professional: Jobs & Resumes/RUN-LOG-<date>.md` instead of blind-writing rows that might duplicate.
- **Stale resumes on ATS profiles.** Claude now checks every time. Two confirmed offenders:
  Greenhouse holds the superseded July-14 `Sav_Banerjee_Master.pdf`; JPMorgan holds `SavBanerjee_Jan2023.pdf`.

---

## What changed so you don't have to track this again

`/Users/savbanerjee/Projects/ensolabs-site/CLAUDE.md` now has a section
**"E. KNOWN-BROKEN SURFACES — read before reporting any blocker"**.

Every future run — scheduled or ad-hoc — reads it first, applies the workaround, and mentions a known
blocker at most once in a single line. No more re-diagnosing the same five things every morning.
