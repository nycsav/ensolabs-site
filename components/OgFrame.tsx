import { readFileSync } from 'node:fs';
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
  /** Top-left eyebrow (uppercase, monospaced look). e.g. "THE BUILD LENS" */
  eyebrow: string;
  /** Headline rendered large. */
  title: string;
  /** Optional subtitle in muted color, rendered below title. */
  subtitle?: string;
  /** Bottom-left strap (studio theme only). e.g. "AI transformation · agentic systems" */
  strap?: string;
  /**
   * 'studio' (default) = navy Enso studio card.
   * 'publication' = warm Strategy to Ship card (ink ground, Space Mono headline + ribbon
   * wordmark, Ship Coral accent) per docs/brand/STRATEGY-TO-SHIP-BRAND-LOCK.md.
   */
  theme?: Theme;
  /**
   * Publication theme only: when set, the footer credits the source (e.g.
   * "Claude Managed Agents") next to the Claude sunburst. Gate behind this so
   * insights NOT sourced from Claude omit the credit.
   */
  sourceCredit?: string;
};

// Read a bundled asset as a base64 data URI for Satori <img>. `new URL(..., import.meta.url)`
// lets Next file-trace the asset into the serverless function bundle (nodejs runtime).
function dataUri(relPath: string, mime: string): string {
  const buf = readFileSync(new URL(relPath, import.meta.url));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// The locked swept-ribbon mark — coral on light/paper, white on coral.
// viewBox 0 0 50 32 (inline wordmark). See STRATEGY-TO-SHIP-BRAND-LOCK §1.
const RIBBON_PATH = 'M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z';
// App-icon ribbon, viewBox 0 0 60 60 (centered on the coral tile). §2.
const RIBBON_TILE_PATH = 'M15 39 C 26 37 35 32 45 21 C 41 30 41 38 45 45 C 36 41 26 39 15 39 Z';

/**
 * Shared OG image renderer for case-study and insight detail pages.
 * Fonts are EMBEDDED (Space Mono · Lora · Inter Tight · JetBrains Mono) — no system fallback.
 * Returns a 1200x630 PNG via next/og's ImageResponse.
 */
export async function renderOg({ eyebrow, title, subtitle, strap, theme = 'studio', sourceCredit }: Options) {
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

  const ensoLogo = pub ? dataUri('../public/images/logo-white.svg', 'image/svg+xml') : null;
  const claudeIcon = pub && sourceCredit ? dataUri('../public/og/claude-icon.png', 'image/png') : null;

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
          padding: '60px 80px',
          fontFamily: 'Inter Tight',
        }}
      >
        {/* Top — wordmark + eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {pub ? (
            // Locked Strategy▸Ship lockup: coral ribbon tile + Space Mono wordmark.
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: STS.color.coral,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="29" height="29" viewBox="0 0 60 60">
                  <path d={RIBBON_TILE_PATH} fill="#fff" />
                </svg>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  fontFamily: 'Space Mono',
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  fontSize: 30,
                  color: col.fg,
                }}
              >
                <span>Strategy</span>
                <svg width="29" height="19" viewBox="0 0 50 32">
                  <path d={RIBBON_PATH} fill={STS.color.coral} />
                </svg>
                <span>Ship</span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, border: `1.5px solid ${col.fg}` }} />
              <div style={{ fontSize: 22, letterSpacing: '0.04em', fontWeight: 600 }}>ENSO LABS</div>
              <div style={{ fontSize: 16, color: col.fg3, marginLeft: 8 }}>/ STRATEGY-TO-SHIP</div>
            </div>
          )}
          <div
            style={{
              fontSize: 16,
              fontFamily: 'JetBrains Mono',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: col.accent,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: pub ? 46 : 70,
              fontFamily: pub ? 'Space Mono' : 'Inter Tight',
              fontWeight: pub ? 700 : 500,
              letterSpacing: pub ? '-0.03em' : '-0.02em',
              lineHeight: pub ? 1.12 : 1.05,
              maxWidth: 1010,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 24,
                color: col.fg2,
                fontStyle: 'italic',
                fontWeight: 400,
                maxWidth: 920,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Bottom — footer */}
        {pub ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Left — Enso Labs logo + hairline + insights URL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ensoLogo!} alt="Enso Labs" width={96} height={24} />
              <div style={{ width: 1, height: 22, background: STS.color.lineOnDark }} />
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 17,
                  letterSpacing: '0.02em',
                  color: col.fg3,
                }}
              >
                ensolabs.ai/insights
              </span>
            </div>
            {/* Right — source credit (only when the insight is sourced from Claude) */}
            {claudeIcon ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: 15,
                    letterSpacing: '0.12em',
                    color: col.fg3,
                  }}
                >
                  ON
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={claudeIcon} alt="" width={26} height={26} />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: 15,
                    letterSpacing: '0.12em',
                    color: col.fg2,
                    textTransform: 'uppercase',
                  }}
                >
                  {sourceCredit}
                </span>
              </div>
            ) : null}
          </div>
        ) : (
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
        )}
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
