import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

// Default OG image for the entire site — Next 14 will pick this up
// for /, /services, /work, /about, /insights, /contact unless a route
// defines its own opengraph-image.tsx.
//
// 1200x630 is the canonical OG card size.

export const runtime = 'edge';
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Hex equivalents of the OKLCH values in globals.css.
// Satori (the renderer inside next/og) does not support oklch() yet,
// so the OG image uses sRGB approximations of the brand palette.
const COLORS = {
  bg: '#0d1321',       // deep navy-charcoal (≈ oklch(0.18 0.015 250))
  fg: '#f3efe7',       // warm off-white     (≈ oklch(0.96 0.005 80))
  fg2: '#b8b3aa',      // secondary text     (≈ oklch(0.78 0.008 80))
  fg3: '#7c7770',      // tertiary / labels  (≈ oklch(0.58 0.010 80))
  teal: '#2cd6dc',     // electric teal      (≈ oklch(0.82 0.13 195))
};

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: COLORS.bg,
          color: COLORS.fg,
          padding: '72px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top — wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              border: `1.5px solid ${COLORS.fg}`,
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.04em',
              fontWeight: 600,
            }}
          >
            ENSO LABS
          </div>
          <div
            style={{
              fontSize: 16,
              color: COLORS.fg3,
              marginLeft: 8,
            }}
          >
            / STRATEGY-TO-SHIP
          </div>
        </div>

        {/* Center — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 124,
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Strategy</span>
            <span style={{ display: 'flex' }}>
              <span style={{ color: COLORS.fg2, fontStyle: 'italic', fontWeight: 400 }}>to&nbsp;</span>
              <span style={{ color: COLORS.teal }}>Ship.</span>
            </span>
          </div>
        </div>

        {/* Bottom — strap */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            color: COLORS.fg3,
            letterSpacing: '0.02em',
          }}
        >
          <span>AI transformation · agentic systems · financial AI</span>
          <span>ensolabs.ai</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
