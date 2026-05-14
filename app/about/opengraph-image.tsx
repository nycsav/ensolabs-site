import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Enso Labs — About';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'oklch(0.18 0.015 250)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {/* Teal glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-150px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(79,152,163,0.22) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        {/* Page counter */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '80px',
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '0.06em',
            color: 'oklch(0.55 0.012 80)',
            textTransform: 'uppercase',
          }}
        >
          ABOUT / 04
        </div>
        {/* Enso mark */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              border: '1px solid oklch(0.96 0.005 80)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'oklch(0.82 0.13 195)',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.02em',
              color: 'oklch(0.96 0.005 80)',
              fontWeight: 600,
            }}
          >
            ENSO LABS
          </span>
        </div>
        {/* Headline */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 0.98,
            color: 'oklch(0.96 0.005 80)',
            marginBottom: '28px',
          }}
        >
          An AI advisor{' '}
          <span style={{ color: 'oklch(0.82 0.13 195)', fontStyle: 'italic', fontWeight: 400 }}>who</span>
          {' '}builds.
        </div>
        {/* Credential strip */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: 'oklch(0.55 0.012 80)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '0px',
          }}
        >
          <span>15+ Yrs Experience</span>
          <span style={{ color: 'oklch(0.32 0.018 250)' }}>—</span>
          <span>AI Strategy</span>
          <span style={{ color: 'oklch(0.32 0.018 250)' }}>—</span>
          <span>New York</span>
        </div>
        {/* Bottom divider */}
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'oklch(0.32 0.018 250)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '80px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'oklch(0.55 0.012 80)',
            letterSpacing: '0.04em',
          }}
        >
          ensolabs.ai/about
        </div>
      </div>
    ),
    { ...size }
  );
}
