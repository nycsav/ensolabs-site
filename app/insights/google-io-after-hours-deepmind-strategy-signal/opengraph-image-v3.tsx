import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Google I/O After-Hours: Two Nights With Google DeepMind — Enso Labs Insights';

// V3: Editorial / Magazine Minimal — strong typographic hierarchy, watermark "II"
// Palette: all hex, no oklch
const C = {
  bg: '#0d1321',
  bgLift: '#111827',
  fg: '#f3efe7',
  fg2: '#b8b3aa',
  fg3: '#7c7770',
  fgGhost: '#1e2840',   // very faint, used for watermark numeral
  teal: '#2cd6dc',
  tealDim: '#1a8a90',
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
          padding: '58px 88px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Watermark "II" — large faint Roman numeral in background */}
        <div
          style={{
            position: 'absolute',
            right: -10,
            bottom: -60,
            fontSize: 520,
            fontWeight: 900,
            letterSpacing: '-0.06em',
            color: C.fgGhost,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          II
        </div>

        {/* TOP ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                border: `1.5px solid ${C.fg}`,
              }}
            />
            <div style={{ fontSize: 18, letterSpacing: '0.07em', fontWeight: 700 }}>
              ENSO LABS
            </div>
          </div>

          {/* Part pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              border: `1px solid ${C.tealDim}`,
              borderRadius: 4,
              padding: '6px 14px',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                letterSpacing: '0.12em',
                color: C.teal,
                textTransform: 'uppercase',
              }}
            >
              PART 2 / 2 · GOOGLE I/O 2026
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Category label */}
          <div
            style={{
              fontSize: 13,
              fontFamily: 'monospace',
              letterSpacing: '0.14em',
              color: C.teal,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            CONSULT · INSIGHTS
          </div>

          {/* Headline — two visual weights */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 0.92,
              color: C.fg,
              marginBottom: 8,
            }}
          >
            Google I/O
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              color: C.fg2,
              marginBottom: 28,
            }}
          >
            After-Hours.
          </div>

          {/* Thin rule */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: C.fg3,
              marginBottom: 20,
              opacity: 0.4,
            }}
          />

          {/* Subheadline */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: C.fg2,
              letterSpacing: '-0.005em',
              lineHeight: 1.3,
              maxWidth: 700,
            }}
          >
            Two Nights With Google DeepMind and the Strategic Signal Behind the Demos.
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 15,
            color: C.fg3,
            letterSpacing: '0.05em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: C.fg2, fontWeight: 600 }}>SAV BANERJEE</span>
            <span>·</span>
            <span>MAY 2026</span>
            <span>·</span>
            <span>Cerebral Valley · DeepMind · AI Strategy</span>
          </div>
          <span>ensolabs.ai</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
