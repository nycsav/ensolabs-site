# Event-Scan Continuity Contract
**Canonical instructions for the `daily-event-scan` task (and any event/calendar run).**
Set by Sav 2026-07-28. Every run reads this file first and updates the "Last run state" block at the bottom before finishing.

---

## Rule: every run reconciles from FOUR sources BEFORE acting
Never re-derive from scratch and never repeat finished work. In order:

1. **Google Calendar** (via `enso-google`) — the live truth of what is already scheduled. Job 1 OWNS this calendar. Read it first; it already reflects prior-run writes. Never create a duplicate — if a copy exists (Luma/Zoom auto-sync included), enrich that copy, don't add a second.
2. **Both Gmail inboxes** (sav@ensopartners.co + sav@ensolabs.ai; the latter forwards into the former). Registration/approval/waitlist/cancellation truth. The inbox is the source of truth for registration — never infer it from the calendar.
3. **luma.com** — live discovery + live registration status (his logged-in Luma via Claude in Chrome). Use to confirm a spot, catch new SF-proper rooms, and verify a room is real/open before surfacing it.
4. **Previous runs** — this file's "Last run state" block + the session transcripts (`session_info`). Build on the last run; do not re-alert or re-register what a prior run already handled.

## Reality wins
If a source disagrees with a plan/memory/this file, verify on the live surface (Calendar, inbox, or the Luma page) and update state to match reality, then act only on what genuinely remains.

## Guardrails (unchanged)
- Auto-register only FREE, simple-RSVP, SF-proper rooms scoring strictly **>7**; hard-stop + flag on payment / account / CAPTCHA / wallet / sensitive field (ARR, funding, phone) / substantive application / referral.
- Never send to third parties, never buy/pay, never email a host. Register ≠ pay.
- Every run ends with an in-chat TL;DR + mobile-first table (even a no-change run).
- SF STAY MODE active through Aug 7, 2026: SF-proper only, times in PT, suppress NYC.

---

## Last run state
**2026-07-28 · afternoon sync run (4:11p ET / 1:11p PT)**
- Reconciled from the 8:10a run: it registered LangChain SF Meetup (tonight 6–9p) and dropped Enterprise AI at Scale (Menlo Park); Sam Blond GTM was left as "needs Sav."
- Calendar writes this run:
  - From Advising to Building: Making the Move into Growth Strategy (Jul 30, SF) — pending → **✅ APPROVED**, green, real address 251 Rhode Island St.
  - GTM Strategy with Sam Blond (Jul 29, SF · Monaco) — now **⏳ WAITLIST**, gray, pending host approval.
  - Unified Control Plane for the Agentic Enterprise (Jul 31, USF Downtown) — **✅ approved**, tagged ⭐6.5 yellow.
  - Agent Infrastructure Roundtable 2026 (Aug 1, Berkeley) — **✅ approved**, tagged ⭐7 yellow.
- Job 2/2.5: no NEW unregistered SF-proper 8+ room found beyond those already registered/waitlisted; nothing new free+simple >7 to auto-register.
- Open tap for Sav: Sam Blond ⭐8.5 remains waitlisted (host approval pending).
