'use client';

import { useMemo, useState } from 'react';

// ---------------------------------------------------------------------------
// Enso Labs — internal UTM link builder.
//
// Produces consistent, attribution-ready links. The matching capture code lives
// in lib/attribution.ts (reads utm_* params on landing) and app/api/lead
// (writes the channel onto the Notion lead record). Keeping the param vocabulary
// consistent here is what makes the lead reports legible.
// ---------------------------------------------------------------------------

// Preset channels with sensible source/medium pairs. Pick one, then set campaign.
const PRESETS: { label: string; source: string; medium: string }[] = [
  { label: 'LinkedIn — post', source: 'linkedin', medium: 'social' },
  { label: 'LinkedIn — DM / connection note', source: 'linkedin', medium: 'outreach' },
  { label: 'LinkedIn — company page', source: 'linkedin', medium: 'profile' },
  { label: 'Email — outreach', source: 'email', medium: 'outreach' },
  { label: 'Newsletter', source: 'newsletter', medium: 'email' },
  { label: 'Other / custom', source: '', medium: '' },
];

const BASE = 'https://ensolabs.ai';

// Common destination pages so you don't mistype paths.
const PAGES = ['/', '/services', '/work', '/insights', '/about', '/contact'];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function UtmBuilder() {
  const [preset, setPreset] = useState(PRESETS[0].label);
  const [page, setPage] = useState('/');
  const [source, setSource] = useState(PRESETS[0].source);
  const [medium, setMedium] = useState(PRESETS[0].medium);
  const [campaign, setCampaign] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const onPreset = (label: string) => {
    setPreset(label);
    const p = PRESETS.find((x) => x.label === label);
    if (p) {
      setSource(p.source);
      setMedium(p.medium);
    }
  };

  const url = useMemo(() => {
    const u = new URL(page || '/', BASE);
    if (source) u.searchParams.set('utm_source', slugify(source));
    if (medium) u.searchParams.set('utm_medium', slugify(medium));
    if (campaign) u.searchParams.set('utm_campaign', slugify(campaign));
    if (content) u.searchParams.set('utm_content', slugify(content));
    return u.toString();
  }, [page, source, medium, campaign, content]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — user can select manually */
    }
  };

  const field: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 0.7rem',
    fontSize: '0.95rem',
    border: '1px solid rgba(128,128,128,0.4)',
    borderRadius: 8,
    background: 'transparent',
    color: 'inherit',
    boxSizing: 'border-box',
  };
  const label: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    opacity: 0.7,
    margin: '1rem 0 0.35rem',
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <label style={label}>Channel</label>
      <select style={field} value={preset} onChange={(e) => onPreset(e.target.value)}>
        {PRESETS.map((p) => (
          <option key={p.label} value={p.label}>
            {p.label}
          </option>
        ))}
      </select>

      <label style={label}>Destination page</label>
      <select style={field} value={page} onChange={(e) => setPage(e.target.value)}>
        {PAGES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={label}>Source (utm_source)</label>
          <input style={field} value={source} onChange={(e) => setSource(e.target.value)} placeholder="linkedin" />
        </div>
        <div>
          <label style={label}>Medium (utm_medium)</label>
          <input style={field} value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="social" />
        </div>
      </div>

      <label style={label}>Campaign (utm_campaign) — name the post or push</label>
      <input
        style={field}
        value={campaign}
        onChange={(e) => setCampaign(e.target.value)}
        placeholder="pilot-gap-post"
      />

      <label style={label}>Content (utm_content) — optional, e.g. A/B variant</label>
      <input
        style={field}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="cta-bottom"
      />

      <label style={label}>Tagged link</label>
      <div
        style={{
          padding: '0.7rem 0.8rem',
          border: '1px solid rgba(128,128,128,0.4)',
          borderRadius: 8,
          wordBreak: 'break-all',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          lineHeight: 1.5,
        }}
      >
        {url}
      </div>

      <button
        onClick={copy}
        style={{
          marginTop: '0.9rem',
          padding: '0.6rem 1.1rem',
          fontSize: '0.95rem',
          borderRadius: 8,
          border: '1px solid currentColor',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        {copied ? 'Copied' : 'Copy link'}
      </button>

      <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '1.5rem', lineHeight: 1.6 }}>
        Keep names lowercase and consistent. Reuse the same campaign name across a
        single push so the reports group cleanly. The leading slash on the
        destination keeps everything on ensolabs.ai.
      </p>
    </div>
  );
}
