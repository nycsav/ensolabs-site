import { ImageResponse } from 'next/og';
import { stsOgFonts, STS } from '@/lib/og/fonts';

export const runtime = 'nodejs';
export const alt = 'Strategy to Ship — Insights from Enso Labs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const fonts = await stsOgFonts();
  const c = STS.color;
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: c.inkDeep,
          color: c.paperOnDark,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter Tight',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-180px',
            right: '-140px',
            width: '620px',
            height: '620px',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(240,81,46,0.16) 0%, transparent 70%)',
          }}
        />
        {/* kicker */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'JetBrains Mono',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: c.slateOnDark,
          }}
        >
          <span style={{ width: '9px', height: '9px', background: c.coral, display: 'block' }} />
          INSIGHTS · FROM ENSO LABS
        </div>
        {/* headline — Space Mono 700 + coral swept ribbon (brand lock §1) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontFamily: 'Space Mono',
            fontWeight: 700,
            fontSize: '86px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: c.paperOnDark,
            marginBottom: '24px',
          }}
        >
          <span>Strategy</span>
          <svg width="76" height="49" viewBox="0 0 50 32">
            <path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill={c.coral} />
          </svg>
          <span>Ship.</span>
        </div>
        {/* dek */}
        <div
          style={{
            fontSize: '24px',
            color: c.slateOnDark,
            lineHeight: 1.4,
            maxWidth: '720px',
            marginBottom: '28px',
          }}
        >
          Daily AI intelligence — scored, curated, and shipped for marketing strategists.
        </div>
        {/* lenses */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            fontFamily: 'JetBrains Mono',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: c.slateOnDark,
          }}
        >
          {['Brand', 'Financial', 'Client', 'Signal'].map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: c.lineOnDark,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '80px',
            fontFamily: 'JetBrains Mono',
            fontSize: '12px',
            color: c.slateOnDark,
            letterSpacing: '0.06em',
          }}
        >
          ensolabs.ai/insights
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
