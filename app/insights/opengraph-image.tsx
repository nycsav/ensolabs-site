import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Enso Labs Insights — Signal to Noise';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#f8f6f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {/* Amber glow for light theme */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-150px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(80,130,100,0.12) 0%, transparent 70%)',
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
          INSIGHTS / 06
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
              border: '1px solid oklch(0.22 0.020 80)',
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
                background: 'oklch(0.50 0.13 195)',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.02em',
              color: 'oklch(0.22 0.020 80)',
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
            color: 'oklch(0.22 0.020 80)',
            marginBottom: '28px',
          }}
        >
          Signal{' '}
          <span style={{ color: 'oklch(0.50 0.13 195)', fontStyle: 'italic', fontWeight: 400 }}>to</span>
          {' '}Noise.
        </div>
        {/* Pillar strip */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'oklch(0.55 0.012 80)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <span>AI Strategy</span>
          <span style={{ color: 'oklch(0.78 0.014 80)' }}>—</span>
          <span>Automation</span>
          <span style={{ color: 'oklch(0.78 0.014 80)' }}>—</span>
          <span>Data</span>
          <span style={{ color: 'oklch(0.78 0.014 80)' }}>—</span>
          <span>Growth</span>
        </div>
        {/* Bottom divider */}
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'oklch(0.86 0.012 80)',
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
          ensolabs.ai/insights
        </div>
      </div>
    ),
    { ...size }
  );
}
