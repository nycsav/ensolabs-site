import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Enso Labs — Contact';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0d1321',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '"Inter", sans-serif',
        }}
      >
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
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '80px',
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '0.06em',
            color: '#7e7c75',
            textTransform: 'uppercase',
          }}
        >
          CONTACT / 04
        </div>
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
              border: '1px solid #f5f4f0',
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
                background: '#5ce0d2',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.02em',
              color: '#f5f4f0',
              fontWeight: 600,
            }}
          >
            ENSO LABS
          </span>
        </div>
        <div
          style={{
            fontSize: '80px',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 0.98,
            color: '#f5f4f0',
            marginBottom: '28px',
          }}
        >
          Let&apos;s{' '}
          <span style={{ color: '#5ce0d2', fontStyle: 'italic', fontWeight: 400 }}>scope</span>
          {' '}it.
        </div>
        <div
          style={{
            fontSize: '22px',
            color: '#c5c2bc',
            lineHeight: 1.45,
            maxWidth: '640px',
            fontWeight: 400,
            marginBottom: '24px',
          }}
        >
          Tell us what you&apos;re building. We&apos;ll respond within one business day.
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['hello@ensolabs.ai', 'Response: <24h', 'New York, NY'].map((detail, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#7e7c75',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {detail}
            </span>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: '#3a3d4a',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '80px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#7e7c75',
            letterSpacing: '0.04em',
          }}
        >
          ensolabs.ai/contact
        </div>
      </div>
    ),
    { ...size }
  );
}
