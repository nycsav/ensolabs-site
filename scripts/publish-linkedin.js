#!/usr/bin/env node
/* Strategy → Ship — LinkedIn publisher.
 *
 * Publishes a multi-image (gallery) post to Sav's personal LinkedIn profile from
 * a local folder of PNGs, then optionally posts the first comment. No browser,
 * no file picker, no clicking.
 *
 *   node scripts/publish-linkedin.js --dry-run          # validate everything, post nothing
 *   node scripts/publish-linkedin.js                    # publish
 *   node scripts/publish-linkedin.js --single            # cover image only (basic access)
 *   node scripts/publish-linkedin.js --comment-only [urn] # retry just the first comment
 *
 * ---------------------------------------------------------------------------
 * ACCESS — read this before assuming the script will run
 * ---------------------------------------------------------------------------
 * Two different LinkedIn products gate the two modes here:
 *
 *   --single   "Share on LinkedIn" — SELF-SERVE. Add the product to your app in
 *              the LinkedIn Developer portal, authorize, done. Works today.
 *              Limited to ONE image per post.
 *
 *   default    Multi-image gallery via the Posts API. This lives under the
 *              COMMUNITY MANAGEMENT API, which requires a manual access request,
 *              a registered legal entity (Enso Labs LLC qualifies), and review.
 *              Published timelines: 4-8 weeks fast path, 3-4 months typical.
 *              The script is correct and will run the day access is granted —
 *              but it will 403 until then. Do NOT "fix" a 403 here — it is the
 *              expected, correct behavior until Community Management API access
 *              is granted. Leave it failing loudly.
 *
 * So: start the access request now, use --single (or post by hand) meanwhile.
 *
 * ---------------------------------------------------------------------------
 * SETUP
 * ---------------------------------------------------------------------------
 * 1. https://www.linkedin.com/developers/apps → create an app owned by the
 *    Enso Labs company page.
 * 2. Products tab → add "Share on LinkedIn" (instant) and request "Community
 *    Management API" (reviewed).
 * 3. Scopes needed: w_member_social, openid, profile.
 * 4. Generate a member access token (the portal's token generator is fine for a
 *    single-user tool; tokens last 60 days).
 * 5. Copy .env.local.example to .env.local at the repo root and fill in:
 *
 *      LINKEDIN_ACCESS_TOKEN=...
 *      LINKEDIN_MEMBER_URN=urn:li:person:XXXXXXXX
 *
 *    .env.local is gitignored — keep it that way. Get the URN by running:
 *      node scripts/publish-linkedin.js --whoami
 *
 * ---------------------------------------------------------------------------
 * LIMITS (verified 2026-08-20 against current LinkedIn API docs — see inline
 * citations near each call below for the exact doc URL checked)
 * ---------------------------------------------------------------------------
 *   - Multi-image posts: minimum 2, maximum 20 images. (The handoff doc and an
 *     earlier draft of this script assumed a 9-image cap — that was wrong; the
 *     MultiImage API doc confirms 2-20.) This script still hard-fails outside
 *     that range rather than silently truncating your deck.
 *   - Images: JPG / PNG / GIF, under 36,152,320 pixels each. Preflighted below
 *     with `sharp` before any upload starts.
 *   - Post text (commentary): LinkedIn does not publish a single hard numeric
 *     cap in the Posts API docs (errors surface as FIELD_LENGTH_TOO_LONG at
 *     write time); 3,000 chars is kept here as a conservative client-side
 *     guard consistent with LinkedIn's documented UGC text guidance.
 *   - Never posts without an explicit confirmation step unless --yes is passed.
 *   - LINKEDIN_ACCESS_TOKEN / LINKEDIN_MEMBER_URN are only required when
 *     actually calling the API — --dry-run (and --comment-only --dry-run) work
 *     with zero credentials present, by design (see DRY handling below).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ---------------------------------------------------------------------------
// Config — edit this block per article, or pass --dir / --copy to override.
// ---------------------------------------------------------------------------
const REPO = path.resolve(__dirname, '..');

const CONFIG = {
  // Used as the idempotency-receipt key (.published/<slug>.json) — keep this
  // in sync with the article/campaign folder under public/social/.
  slug: 'fds-part1',
  slidesDir: path.join(REPO, 'public/social/fds-part1/carousel-slides'),
  // Slides to publish, in order. LinkedIn's MultiImage API allows 2-20 images
  // (see LIMITS above). Part 1's deck is 11 pages, so we drop the two interior
  // data slides and keep the argument intact.
  slides: ['01.png', '02.png', '03.png', '04.png', '05.png', '07.png', '09.png', '10.png', '11.png'],
  altPrefix: 'The Forward Deployed Strategist, Part 1 — slide',
  copyFile: path.join(REPO, 'public/social/fds-part1/post-copy.md'),
  variant: 'B',
  firstComment:
    'A question for anyone hiring for this role right now: are you screening for the "forward" ' +
    '— the business judgment — or just the engineering stack? Full piece here: ' +
    'https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage' +
    '?utm_source=linkedin&utm_medium=social&utm_campaign=fde_part1&utm_content=first_comment',
};

const API = 'https://api.linkedin.com';
// LinkedIn-Version header, format YYYYMM. Verified 2026-08-20 as current and
// not sunset: https://learn.microsoft.com/en-us/linkedin/marketing/versioning
// LinkedIn supports each monthly version for ~12 months from release; 202606
// (June 2026) is well inside that window as of Aug 2026. Bump this as
// LinkedIn deprecates — check
// https://learn.microsoft.com/en-us/linkedin/marketing/integrations/migrations
// for the current sunset table before assuming a version is still valid.
const VERSION = '202606';
// MultiImage API: "minimum of 2 images and maximum of 20 images." Verified
// 2026-08-20 against
// https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/multiimage-post-api
// (NOT 9 — that number in the original handoff/draft was wrong.)
const MIN_IMAGES = 2;
const MAX_IMAGES = 20;
// Images API pixel ceiling, same doc family, verified 2026-08-20:
// https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/images-api
// "Images with less than 36,152,320 pixels. JPG, GIF, and PNG formats."
const MAX_PIXELS = 36_152_320;
const MAX_TEXT = 3000;
const RECEIPTS_DIR = path.join(REPO, '.published');

// ---------------------------------------------------------------------------
// Args + env
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => { const i = args.indexOf(f); return i > -1 && args[i + 1] ? args[i + 1] : d; };

const DRY = has('--dry-run');
const SINGLE = has('--single');
const AUTO_YES = has('--yes');
const WHOAMI = has('--whoami');
const FORCE = has('--force');
const COMMENT_ONLY = has('--comment-only');
// Optional positional arg right after --comment-only, e.g.
// `--comment-only urn:li:share:1234567890`. If omitted, falls back to the
// postUrn recorded in the slug's .published/<slug>.json receipt.
const commentOnlyIdx = args.indexOf('--comment-only');
const COMMENT_ONLY_URN =
  commentOnlyIdx > -1 && args[commentOnlyIdx + 1] && !args[commentOnlyIdx + 1].startsWith('--')
    ? args[commentOnlyIdx + 1]
    : null;

loadEnvLocal();

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const MEMBER = process.env.LINKEDIN_MEMBER_URN;

function loadEnvLocal() {
  const p = path.join(REPO, '.env.local');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function die(msg) { console.error(`\n  ✗ ${msg}\n`); process.exit(1); }
function ok(msg) { console.log(`  ✓ ${msg}`); }
function step(msg) { console.log(`\n▸ ${msg}`); }

async function li(method, url, { body, headers = {}, raw = false } = {}) {
  const res = await fetch(url.startsWith('http') ? url : `${API}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'LinkedIn-Version': VERSION,
      'X-Restli-Protocol-Version': '2.0.0',
      ...(raw ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: raw ? body : body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  return { text, json: text ? safeJson(text) : null, headers: res.headers, ok: res.ok, status: res.status, method, url };
}

// Wraps li() with the die()-on-error behavior the rest of the script expects,
// plus a one-shot self-healing retry: if the docs' raw-unencoded-URN
// convention for a socialActions path segment (see the comment endpoint
// below) turns out to be wrong for a given caller/URN shape, retry once with
// encodeURIComponent before giving up. This was NOT directly confirmed
// against a live token — every example in the Comments API doc uses a raw
// URN, but the doc never states the encoding rule explicitly the way the
// Posts API doc does for /rest/posts/{encoded urn}. Turning an untestable
// judgment call into a self-healing call beats leaving it a coin flip.
async function liOrDie(method, url, opts = {}) {
  let res = await li(method, url, opts);
  if (!res.ok && res.status === 400 && opts.retryEncodedOn400 && !opts._retried) {
    const encodedUrl = url.replace(opts.retryEncodedOn400, encodeURIComponent(opts.retryEncodedOn400));
    if (encodedUrl !== url) {
      res = await li(method, encodedUrl, { ...opts, _retried: true });
    }
  }
  return handleLiResult(res);
}

function handleLiResult(res) {
  if (!res.ok) {
    const hint =
      res.status === 403
        ? '\n    403 usually means your app lacks Community Management API access.\n' +
          '    Multi-image posts need it. Try --single, which uses the self-serve product.\n' +
          '    This is expected/correct, not a bug — do not route around it.'
        : res.status === 401
        ? '\n    401 — token expired or wrong scopes. LinkedIn member access tokens last\n' +
          '    60 days from generation. Go regenerate one at\n' +
          '    https://www.linkedin.com/developers/apps → your app → Auth → token generator,\n' +
          '    then update LINKEDIN_ACCESS_TOKEN in .env.local. This is not a code bug.'
        : res.status === 429
        ? '\n    429 — rate limited (LinkedIn throttles comment creation to a short\n' +
          '    per-minute cap per member). Wait a minute and retry — for a comment,\n' +
          '    that means re-running with --comment-only, no need to re-post images.'
        : '';
    die(`${res.method} ${res.url} → ${res.status}\n    ${res.text.slice(0, 400)}${hint}`);
  }
  return { text: res.text, json: res.json, headers: res.headers };
}

function safeJson(t) { try { return JSON.parse(t); } catch { return null; } }

// ---------------------------------------------------------------------------
// Idempotency receipts — .published/<slug>.json
// ---------------------------------------------------------------------------
function receiptPath(slug) { return path.join(RECEIPTS_DIR, `${slug}.json`); }

function readReceipt(slug) {
  const p = receiptPath(slug);
  if (!fs.existsSync(p)) return null;
  return safeJson(fs.readFileSync(p, 'utf8'));
}

function writeReceipt(slug, data) {
  if (!fs.existsSync(RECEIPTS_DIR)) fs.mkdirSync(RECEIPTS_DIR, { recursive: true });
  const existing = readReceipt(slug) || {};
  // `data.publishedAt` is only ever passed on the initial post-success write
  // (see the call sites). If that write is about to overwrite a DIFFERENT
  // prior postUrn — i.e. this is a --force republish — archive the prior
  // receipt into history[] first, so --force never silently loses the
  // record of the post it's superseding.
  const isFreshPublish = Boolean(data.publishedAt);
  const isForceOverride = isFreshPublish && existing.postUrn && existing.postUrn !== data.postUrn;
  const history = existing.history || [];
  if (isForceOverride) {
    const { history: _drop, ...archivable } = existing;
    history.push(archivable);
  }
  const base = isFreshPublish ? {} : existing; // fresh publish starts a clean record, not a merge of stale fields
  const merged = { ...base, ...data, slug, history, updatedAt: new Date().toISOString() };
  fs.writeFileSync(receiptPath(slug), JSON.stringify(merged, null, 2) + '\n');
  return merged;
}

// ---------------------------------------------------------------------------
// Post copy — pulled from post-copy.md so there is one source of truth
// ---------------------------------------------------------------------------
function readVariant(file, letter) {
  if (!fs.existsSync(file)) die(`Post copy not found: ${file}`);
  const md = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`## Variant ${letter}[^\\n]*\\n([\\s\\S]*?)(?=\\n## |\\n---|$)`);
  const m = md.match(re);
  if (!m) die(`Variant ${letter} not found in ${path.basename(file)}`);
  return m[1]
    .split('\n')
    .filter((l) => !/^\s*(Tags:|\*\*First comment)/i.test(l))
    .join('\n')
    .trim();
}

// ---------------------------------------------------------------------------
// Image preflight — reject anything over the pixel ceiling before uploading
// ---------------------------------------------------------------------------
async function preflightImages(files) {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.log('  (sharp not available — skipping pixel-ceiling preflight)');
    return;
  }
  for (const f of files) {
    const meta = await sharp(f).metadata();
    const pixels = (meta.width || 0) * (meta.height || 0);
    if (pixels > MAX_PIXELS) {
      die(
        `${path.basename(f)} is ${meta.width}x${meta.height} = ${pixels.toLocaleString()} px, ` +
          `over LinkedIn's ${MAX_PIXELS.toLocaleString()}px ceiling. Resize it before publishing.`
      );
    }
  }
  ok(`All images under the ${MAX_PIXELS.toLocaleString()}px ceiling`);
}

// ---------------------------------------------------------------------------
// Image upload: initializeUpload → PUT bytes → image URN
// Verified 2026-08-20 against
// https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/images-api
// ---------------------------------------------------------------------------
async function uploadImage(file) {
  // initializeUpload request/response shape confirmed current in the Images
  // API doc above ("Register an Upload for Images" / sample response with
  // `value.uploadUrl` + `value.image`).
  const init = await liOrDie('POST', '/rest/images?action=initializeUpload', {
    body: { initializeUploadRequest: { owner: MEMBER } },
  });
  const { uploadUrl, image } = init.json.value;
  const bytes = fs.readFileSync(file);

  // PUT the raw bytes. Per the Images API doc's "Upload the Image" step (which
  // defers to the Assets API doc for the mechanics): image uploads DO require
  // the Authorization header (unlike video uploads, which explicitly must NOT
  // include one) — the Authorization requirement is confirmed against
  // https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/vector-asset-api#upload-the-image
  // (that page's own image-upload curl example sends no Content-Type header
  // at all; application/octet-stream is only shown there for the video
  // multipart flow. Keeping it here anyway is a safe, conventional default
  // for a raw-binary PUT, not a doc-confirmed requirement — flag if a live
  // token ever rejects it.)
  const put = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/octet-stream' },
    body: bytes,
  });
  if (!put.ok) die(`Upload failed for ${path.basename(file)} → ${put.status}`);

  ok(`${path.basename(file)} → ${image}`);
  return image;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  console.log('\n  Strategy → Ship — LinkedIn publisher\n  ' + '─'.repeat(44));

  // Credentials are only required once we're actually about to call the API.
  // --dry-run (including `--comment-only --dry-run`) must work with zero
  // credentials present — do not move these checks earlier than this.
  if (!DRY) {
    if (!TOKEN) die('LINKEDIN_ACCESS_TOKEN missing. See SETUP at the top of this file.');
  }

  if (WHOAMI) {
    if (!TOKEN) die('LINKEDIN_ACCESS_TOKEN missing. See SETUP at the top of this file.');
    // /v2/userinfo is LinkedIn's OpenID Connect userinfo endpoint for the
    // `openid`+`profile` scopes; `sub` is the member ID. This is per
    // LinkedIn's documented OIDC userinfo behavior (a search result surfaced
    // this endpoint's shape but the doc page itself was not directly
    // re-fetched on 2026-08-20 — re-verify against
    // https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
    // before trusting this blindly if it ever 404s).
    const me = await liOrDie('GET', '/v2/userinfo');
    console.log(`\n  Member URN: urn:li:person:${me.json.sub}`);
    console.log(`  Name:       ${me.json.name}\n`);
    console.log('  Add to .env.local:');
    console.log(`  LINKEDIN_MEMBER_URN=urn:li:person:${me.json.sub}\n`);
    return;
  }

  if (!DRY && !MEMBER) die('LINKEDIN_MEMBER_URN missing. Run with --whoami to fetch it.');

  // -------------------------------------------------------------------------
  // --comment-only: retry just the first-comment step against an already-
  // published post, without re-uploading images or re-posting. This is the
  // recovery path for "post succeeded, comment call failed."
  // -------------------------------------------------------------------------
  if (COMMENT_ONLY) {
    step('Comment-only mode');

    const receipt = readReceipt(CONFIG.slug);
    const postUrn = COMMENT_ONLY_URN || receipt?.postUrn;
    if (!postUrn) {
      die(
        `No post URN given and no receipt found at .published/${CONFIG.slug}.json.\n` +
          '    Pass it explicitly: --comment-only <postUrn>'
      );
    }
    ok(`Target post: ${postUrn}${COMMENT_ONLY_URN ? '' : ' (from receipt)'}`);

    if (!CONFIG.firstComment) die('CONFIG.firstComment is empty — nothing to post.');
    console.log('\n  │ Comment:');
    console.log('  │ ' + CONFIG.firstComment + '\n');

    if (DRY) {
      console.log('  --dry-run: nothing was posted.\n');
      return;
    }

    if (receipt?.commentPosted && !FORCE) {
      die(
        `Receipt shows a comment was already posted on ${postUrn} ` +
          `(commentUrn: ${receipt.commentUrn || 'unknown'}) at ${receipt.commentPostedAt}.\n` +
          '    Pass --force to post another comment anyway.'
      );
    }

    if (!AUTO_YES) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const answer = await new Promise((r) => rl.question('  Post this comment? (yes/no) ', r));
      rl.close();
      if (answer.trim().toLowerCase() !== 'yes') { console.log('\n  Cancelled.\n'); return; }
    }

    step('Posting comment');
    // Comment creation: verified 2026-08-20 against
    // https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/comments-api#create-a-comment
    // Endpoint is POST /rest/socialActions/{shareUrn|ugcPostUrn|commentUrn}/comments
    // with body { actor, object, message: { text } } — this part of the
    // original script was already correct. What was wrong: every single
    // request example in that doc (including composite comment URNs
    // containing colons and parentheses) puts the URN RAW/unencoded directly
    // in the URL path — it is not percent-encoded, unlike the Posts API's
    // GET/DELETE/PARTIAL_UPDATE-by-URN endpoints which explicitly require
    // `encodeURIComponent`. This distinction was inferred from the doc's
    // examples, not confirmed with a live token — retryEncodedOn400 makes a
    // 400 here self-heal by retrying once with the URN encoded.
    const commentRes = await liOrDie('POST', `/rest/socialActions/${postUrn}/comments`, {
      body: { actor: MEMBER, object: postUrn, message: { text: CONFIG.firstComment } },
      retryEncodedOn400: postUrn,
    });
    // The response HEADER (x-restli-id) is a bare numeric comment ID, not a
    // URN — the doc's sample shows `x-restli-id: 6643206422739898368`. The
    // full comment URN (what --comment-only / future nested comments would
    // want) is in the response BODY's `commentUrn` field. Prefer that.
    const commentUrn = commentRes.json?.commentUrn || commentRes.headers.get('x-restli-id') || null;
    ok('Comment posted');

    writeReceipt(CONFIG.slug, {
      postUrn,
      commentPosted: true,
      commentUrn,
      commentPostedAt: new Date().toISOString(),
    });

    console.log('\n  Done.\n');
    return;
  }

  // --- Idempotency guard --------------------------------------------------
  const existingReceipt = readReceipt(CONFIG.slug);
  if (existingReceipt && !FORCE && !DRY) {
    die(
      `Slug "${CONFIG.slug}" was already published: ${existingReceipt.postUrn} ` +
        `at ${existingReceipt.publishedAt}.\n` +
        `    https://www.linkedin.com/feed/update/${existingReceipt.postUrn}/\n` +
        '    Pass --force to publish again anyway (double-posting to a personal feed\n' +
        '    is embarrassing and not easily undone — make sure that is really what you want).'
    );
  }
  if (existingReceipt && FORCE) {
    console.log(`  ! --force: overriding existing receipt for "${CONFIG.slug}" (${existingReceipt.postUrn})`);
  }

  // --- Validate before touching the network -------------------------------
  step('Validating');

  const dir = val('--dir', CONFIG.slidesDir);
  let slides = CONFIG.slides.map((f) => path.join(dir, f));
  if (SINGLE) slides = slides.slice(0, 1);

  const missing = slides.filter((f) => !fs.existsSync(f));
  if (missing.length) die(`Missing slides:\n    ${missing.join('\n    ')}`);

  if (!SINGLE) {
    if (slides.length > MAX_IMAGES) {
      die(`${slides.length} images requested; LinkedIn's MultiImage API caps posts at ${MAX_IMAGES}.\n` +
          `    Edit CONFIG.slides and choose which ${MAX_IMAGES} carry the argument.`);
    }
    if (slides.length < MIN_IMAGES) {
      die(`${slides.length} image requested; LinkedIn's MultiImage API requires at least ${MIN_IMAGES}.\n` +
          '    Use --single for a one-image post instead.');
    }
  }
  ok(`${slides.length} slide${slides.length === 1 ? '' : 's'} found in ${path.relative(REPO, dir)}`);

  await preflightImages(slides);

  const text = val('--text', null) || readVariant(val('--copy', CONFIG.copyFile), val('--variant', CONFIG.variant));
  if (text.length > MAX_TEXT) die(`Post text is ${text.length} chars; keeping this script's guard at ${MAX_TEXT}.`);
  ok(`Variant ${CONFIG.variant} copy, ${text.length} chars`);

  if (/\b(Gore|W\.? ?L\.? ?Gore)\b/i.test(text)) {
    die('Post text names the confidential client. Aborting.');
  }
  ok('No confidential client named');

  // --- Show exactly what will go out --------------------------------------
  step('This is what will be published');
  console.log('\n' + text.split('\n').map((l) => '  │ ' + l).join('\n'));
  console.log(`\n  │ [${slides.length} image${slides.length === 1 ? '' : 's'}]`);
  console.log('  │');
  console.log('  │ First comment:');
  console.log('  │ ' + CONFIG.firstComment.slice(0, 100) + '…\n');

  if (DRY) {
    console.log('  --dry-run: nothing was published.\n');
    return;
  }

  if (!AUTO_YES) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((r) => rl.question('  Publish to LinkedIn? (yes/no) ', r));
    rl.close();
    if (answer.trim().toLowerCase() !== 'yes') { console.log('\n  Cancelled.\n'); return; }
  }

  // --- Upload -------------------------------------------------------------
  step('Uploading images');
  const urns = [];
  for (const f of slides) urns.push(await uploadImage(f));

  // --- Post ---------------------------------------------------------------
  step('Creating post');
  // content.media = { id, altText } for a single image: verified 2026-08-20
  // against the Images API doc's "Create Image content" example —
  // https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/images-api#create-image-content
  //
  // content.multiImage.images[] = [{ id, altText }] for multi-image: verified
  // 2026-08-20 against the MultiImage API doc's sample request —
  // https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/multiimage-post-api#create-multiimage-content
  const content = SINGLE
    ? { media: { id: urns[0], altText: `${CONFIG.altPrefix} 1` } }
    : {
        multiImage: {
          images: urns.map((id, i) => ({ id, altText: `${CONFIG.altPrefix} ${i + 1}` })),
        },
      };

  const post = await liOrDie('POST', '/rest/posts', {
    body: {
      author: MEMBER,
      commentary: text,
      visibility: 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
      content,
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    },
  });

  // Post creation returns 201 with the post ID in the x-restli-id response
  // header (a share or ugcPost URN) — verified 2026-08-20 against
  // https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api#post-creation-response
  const postUrn = post.headers.get('x-restli-id') || post.json?.id;
  ok(`Published — ${postUrn}`);
  console.log(`  https://www.linkedin.com/feed/update/${postUrn}/`);

  // Write the receipt immediately after a successful publish, BEFORE
  // attempting the first comment — this is what makes --comment-only able to
  // recover a failed comment without re-posting: the postUrn is durable on
  // disk the instant the post itself succeeds, independent of whether the
  // comment call that follows succeeds.
  writeReceipt(CONFIG.slug, {
    postUrn,
    publishedAt: new Date().toISOString(),
    variant: CONFIG.variant,
    mode: SINGLE ? 'single' : 'multiImage',
    imageCount: slides.length,
    commentPosted: false,
  });

  // --- First comment ------------------------------------------------------
  if (CONFIG.firstComment) {
    step('Posting first comment');
    // See the --comment-only branch above for the full doc citation on this
    // call's path/body shape, the encoding decision, and why commentUrn is
    // read from the response body rather than the x-restli-id header.
    const commentRes = await liOrDie('POST', `/rest/socialActions/${postUrn}/comments`, {
      body: { actor: MEMBER, object: postUrn, message: { text: CONFIG.firstComment } },
      retryEncodedOn400: postUrn,
    });
    const commentUrn = commentRes.json?.commentUrn || commentRes.headers.get('x-restli-id') || null;
    ok('First comment posted');
    writeReceipt(CONFIG.slug, {
      commentPosted: true,
      commentUrn,
      commentPostedAt: new Date().toISOString(),
    });
  } else {
    console.log(
      '\n  ! No firstComment configured — if the comment call ever fails on a future run,\n' +
        `    recover with: node scripts/publish-linkedin.js --comment-only ${postUrn}\n`
    );
  }

  console.log('\n  Done.\n');
})().catch((e) => die(e.stack || String(e)));
