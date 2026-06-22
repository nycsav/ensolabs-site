import { ImageResponse } from 'next/og';
import { stsOgFonts, STS } from '@/lib/og/fonts';

// Hex equivalents of the OKLCH studio palette in globals.css.
// Satori (the renderer inside next/og) does not support oklch().
export const OG_COLORS = {
  bg: '#0d1321',
  fg: '#f3efe7',
  fg2: '#b8b3aa',
  fg3: '#7c7770',
  teal: '#2cd6dc',
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;

type Theme = 'studio' | 'publication';

type Options = {
  /** Top-left eyebrow (uppercase, monospaced look). e.g. "CASE STUDY · CLIENT" */
  eyebrow: string;
  /** Headline rendered large. */
  title: string;
  /** Optional subtitle in muted color, rendered below title. */
  subtitle?: string;
  /** Bottom-left strap. e.g. "AI transformation · agentic systems · financial AI" */
  strap?: string;
  /**
   * 'studio' (default) = navy Enso studio card.
   * 'publication' = warm Strategy to Ship card (ink ground, Lora headline, Ship Coral accent).
   */
  theme?: Theme;
};

/**
 * Shared OG image renderer for case-study and insight detail pages.
 * Fonts are EMBEDDED (Lora · Inter Tight · JetBrains Mono) — no system fallback.
 * Returns a 1200x630 PNG via next/og's ImageResponse.
 */
export async function renderOg({ eyebrow, title, subtitle, strap, theme = 'studio' }: Options) {
  const fonts = await stsOgFonts();
  const pub = theme === 'publication';
  const col = pub
    ? {
        bg: STS.color.inkDeep,
        fg: STS.color.paperOnDark,
        fg2: STS.color.slateOnDark,
        fg3: STS.color.slateOnDark,
        accent: STS.color.coral,
      }
    : { bg: OG_COLORS.bg, fg: OG_COLORS.fg, fg2: OG_COLORS.fg2, fg3: OG_COLORS.fg3, accent: OG_COLORS.teal };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: col.bg,
          color: col.fg,
          padding: '64px 84px',
          fontFamily: 'Inter Tight',
        }}
      >
        {/* Top — wordmark + eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, border: `1.5px solid ${col.fg}` }} />
            <div style={{ fontSize: 22, letterSpacing: '0.04em', fontWeight: 600 }}>ENSO LABS</div>
            <div style={{ fontSize: 16, color: col.fg3, marginLeft: 8 }}>/ STRATEGY-TO-SHIP</div>
          </div>
          <div
            style={{
              fontSize: 16,
              fontFamily: 'JetBrains Mono',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: col.accent,
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
              fontSize: pub ? 64 : 70,
              fontFamily: pub ? 'Lora' : 'Inter Tight',
              fontWeight: pub ? 600 : 500,
              letterSpacing: '-0.02em',
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
                color: col.fg2,
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
            fontFamily: 'JetBrains Mono',
            fontSize: 18,
            color: col.fg3,
            letterSpacing: '0.02em',
          }}
        >
          <span>{strap ?? 'AI transformation · agentic systems · financial AI'}</span>
          <span>ensolabs.ai</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
