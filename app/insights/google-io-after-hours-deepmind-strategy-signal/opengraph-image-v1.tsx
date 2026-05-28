import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Google I/O After-Hours: Two Nights With Google DeepMind — Enso Labs Insights';

// V1: Bold Typographic + Google color accents
// Palette: all hex, no oklch
const C = {
  bg: '#0d1321',
  fg: '#f3efe7',
  fg2: '#b8b3aa',
  fg3: '#7c7770',
  teal: '#2cd6dc',
  card: '#1a2035',
  // Google brand colors
  gRed: '#EA4335',
  gBlue: '#4285F4',
  gYellow: '#FBBC05',
  gGreen: '#34A853',
} as const;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: C.bg,
          color: C.fg,
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row: wordmark + Google color dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  border: `1.5px solid ${C.fg}`,
                }}
              />
              <div style={{ fontSize: 20, letterSpacing: '0.06em', fontWeight: 700 }}>
                ENSO LABS
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.fg3,
                  letterSpacing: '0.05em',
                  marginLeft: 6,
                }}
              >
                / INSIGHTS
              </div>
            </div>
            {/* Part label */}
            <div
              style={{
                fontSize: 13,
                fontFamily: 'monospace',
                letterSpacing: '0.14em',
                color: C.teal,
                textTransform: 'uppercase',
              }}
            >
              CONSULT · PART 2 OF 2 · MAY 2026
            </div>
          </div>

          {/* Google color dots — four circles in Google brand colors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: C.gBlue }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: C.gRed }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: C.gYellow }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: C.gGreen }} />
            <div
              style={{
                fontSize: 13,
                color: C.fg3,
                letterSpacing: '0.08em',
                marginLeft: 8,
                textTransform: 'uppercase',
              }}
            >
              GOOGLE I/O 2026
            </div>
          </div>
        </div>

        {/* Main headline block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Thin teal rule above title */}
          <div
            style={{
              width: 60,
              height: 3,
              background: C.teal,
              marginBottom: 28,
            }}
          />

          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: C.fg,
            }}
          >
            Google I/O
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: C.teal,
              marginBottom: 20,
            }}
          >
            After-Hours.
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: C.fg2,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              maxWidth: 820,
            }}
          >
            Two Nights With Google DeepMind and the Strategic Signal Behind the Demos.
          </div>
        </div>

        {/* Bottom row: byline + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 16,
            color: C.fg3,
            letterSpacing: '0.04em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ color: C.fg2, fontWeight: 500 }}>SAV BANERJEE</span>
            <span>·</span>
            <span>Google DeepMind · Cerebral Valley · AI Strategy</span>
          </div>
          <span style={{ color: C.fg3 }}>ensolabs.ai</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
