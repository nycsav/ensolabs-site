import { ImageResponse } from 'next/og';

// Hex equivalents of the OKLCH brand palette in globals.css.
// Satori (the renderer inside next/og) does not support oklch().
export const OG_COLORS = {
  bg: '#0d1321',
  fg: '#f3efe7',
  fg2: '#b8b3aa',
  fg3: '#7c7770',
  teal: '#2cd6dc',
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;

type Options = {
  /** Top-left eyebrow (uppercase, monospaced look). e.g. "CASE STUDY · GORE" */
  eyebrow: string;
  /** Headline rendered large. */
  title: string;
  /** Optional subtitle in muted color, rendered below title. */
  subtitle?: string;
  /** Bottom-left strap. e.g. "AI transformation · agentic systems · financial AI" */
  strap?: string;
};

/**
 * Shared OG image renderer for case-study and insight detail pages.
 * Returns a 1200x630 PNG via next/og's ImageResponse.
 */
export function renderOg({ eyebrow, title, subtitle, strap }: Options) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: OG_COLORS.bg,
          color: OG_COLORS.fg,
          padding: '64px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top — wordmark + eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                border: `1.5px solid ${OG_COLORS.fg}`,
              }}
            />
            <div style={{ fontSize: 22, letterSpacing: '0.04em', fontWeight: 600 }}>
              ENSO LABS
            </div>
            <div style={{ fontSize: 16, color: OG_COLORS.fg3, marginLeft: 8 }}>
              / STRATEGY-TO-SHIP
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
              color: OG_COLORS.teal,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 26,
                color: OG_COLORS.fg2,
                fontStyle: 'italic',
                fontWeight: 400,
                maxWidth: 900,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Bottom — strap + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            color: OG_COLORS.fg3,
            letterSpacing: '0.02em',
          }}
        >
          <span>{strap ?? 'AI transformation · agentic systems · financial AI'}</span>
          <span>ensolabs.ai</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
