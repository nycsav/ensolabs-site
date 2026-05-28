import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Google I/O After-Hours: Two Nights With Google DeepMind — Enso Labs Insights';

// V2: Photo split-panel — left text, right event photo
// Photo is fetched from the production URL at render time by Satori.
// Palette: all hex, no oklch
const C = {
  bg: '#0d1321',
  fg: '#f3efe7',
  fg2: '#b8b3aa',
  fg3: '#7c7770',
  teal: '#2cd6dc',
  overlay: 'rgba(13,19,33,0.72)',
} as const;

const PHOTO_URL =
  'https://ensolabs.ai/images/insights/google-io-afterhours-02.jpg';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: C.bg,
          fontFamily: 'sans-serif',
        }}
      >
        {/* LEFT TEXT PANEL — 58% */}
        <div
          style={{
            width: '58%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 60px 52px 72px',
            background: C.bg,
            color: C.fg,
          }}
        >
          {/* Top: wordmark + category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  border: `1.5px solid ${C.fg}`,
                }}
              />
              <div style={{ fontSize: 18, letterSpacing: '0.06em', fontWeight: 700 }}>
                ENSO LABS
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                letterSpacing: '0.13em',
                color: C.teal,
                textTransform: 'uppercase',
              }}
            >
              CONSULT · PART 2 OF 2
            </div>
          </div>

          {/* Middle: headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 3,
                background: C.teal,
              }}
            />
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 0.94,
                color: C.fg,
              }}
            >
              Google I/O{'\n'}After-Hours.
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: C.fg2,
                lineHeight: 1.35,
                maxWidth: 540,
                marginTop: 4,
              }}
            >
              Two nights with Google DeepMind.
              The strategy lives between the demos.
            </div>
          </div>

          {/* Bottom: byline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 14,
              color: C.fg3,
              letterSpacing: '0.04em',
            }}
          >
            <span style={{ color: C.fg2, fontWeight: 600, fontSize: 15 }}>SAV BANERJEE</span>
            <span>MAY 2026 · ensolabs.ai</span>
          </div>
        </div>

        {/* RIGHT PHOTO PANEL — 42% */}
        <div
          style={{
            width: '42%',
            height: '100%',
            display: 'flex',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_URL}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt=""
          />
          {/* Left-edge fade overlay so photo blends into text panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(to right, ${C.bg}, transparent)`,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
