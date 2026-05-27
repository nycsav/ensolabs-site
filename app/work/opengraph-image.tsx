import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Enso Labs — Work';
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
          WORK / 02
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
            marginBottom: '32px',
          }}
        >
          Selected{' '}
          <span style={{ color: '#5ce0d2', fontStyle: 'italic', fontWeight: 400 }}>Work.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            'AI Automation — Pharma Insights Platform',
            'Growth Intelligence — D2C Revenue Engine',
            'Agent Build — CX Automation Stack',
            'Strategy — Enterprise AI Roadmap',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#5ce0d2',
                  letterSpacing: '0.08em',
                  minWidth: '28px',
                }}
              >
                CS/{String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '17px', color: '#c5c2bc', fontWeight: 400 }}>
                {item}
              </span>
            </div>
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
          ensolabs.ai/work
        </div>
      </div>
    ),
    { ...size }
  );
}
