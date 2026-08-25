/* Strategy to Ship — geometric figure primitives ("Warm Signal" + concentric-arc system).
 * Shared by every animated insight figure so the visual language stays consistent.
 *
 * The core motif: N concentric circles sharing a single tangent point, which produces
 * the nested crescent/eye form. Rings draw in via stroke-dashoffset.
 */
const PALETTE = {
  paper: '#F7F1E6',
  ink: '#1E1813',
  coral: '#F0512E',
  amber: '#E0A23C',
  mute: '#79705F',
  hair: '#D9CDB8',
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap';

/** Corner registration marks — the small square dot grids from the reference. */
function cornerMarks(w, h, { pad = 34, cell = 9, dot = 4 } = {}) {
  const grid = (cols, rows, ox, oy, flipX, flipY) => {
    let s = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Sparser toward the outer edge for the fading-grid effect.
        if ((c + r) % 2 === 1 && c > 1) continue;
        const x = ox + (flipX ? -1 : 1) * c * cell;
        const y = oy + (flipY ? -1 : 1) * r * cell;
        s += `<rect x="${x - dot / 2}" y="${y - dot / 2}" width="${dot}" height="${dot}" fill="${PALETTE.ink}" opacity="0.55"/>`;
      }
    }
    return s;
  };
  // Top corners only — the footer rule + source line own the bottom band, and
  // bottom-corner grids collided with that text.
  return grid(14, 2, pad, pad, false, false) + grid(8, 2, w - pad, pad, true, false);
}

/**
 * Concentric ring cluster sharing a tangent point on one side.
 * @returns {{svg:string, ids:string[]}} rings ordered outermost -> innermost
 */
function ringCluster({
  id,
  tx,
  cy,
  rMax,
  rMin = 14,
  count = 14,
  side = 'right',
  stroke = PALETTE.ink,
  width = 1.6,
  opacity = 1,
}) {
  const ids = [];
  let svg = '';
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    // Ease the radii so rings bunch near the tangent point, as in the reference.
    const r = rMax - (rMax - rMin) * Math.pow(t, 1.35);
    const cx = side === 'right' ? tx - r : tx + r;
    const rid = `${id}-${i}`;
    ids.push(rid);
    const c = 2 * Math.PI * r;
    svg += `<circle id="${rid}" cx="${cx.toFixed(2)}" cy="${cy}" r="${r.toFixed(2)}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${c.toFixed(2)}" transform="rotate(-90 ${cx.toFixed(2)} ${cy})"/>`;
  }
  return { svg, ids };
}

/** Vertical dashed divider rule. */
function dashRule(x, y1, y2, color = PALETTE.ink) {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${color}" stroke-width="1.4" stroke-dasharray="4 6" opacity="0.5"/>`;
}

/** Micro-label with a pointer arrow, matching the reference's annotation style. */
function microLabel(
  x,
  y,
  lines,
  { arrow = '↙', anchor = 'start', color = PALETTE.ink, id = null, arrowAbove = false } = {}
) {
  const rows = Array.isArray(lines) ? lines : [lines];
  const body = rows
    .map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : 17}">${l}</tspan>`)
    .join('');
  // Arrow sits on whichever side faces the thing it points at.
  const arrowY = arrowAbove ? y - rows.length * 17 - 4 : y + rows.length * 17 + 6;
  return `<g${id ? ` id="${id}"` : ''} opacity="0">
    <text x="${x}" y="${y}" text-anchor="${anchor}" font-family="'JetBrains Mono',monospace" font-size="15" letter-spacing="1.6" fill="${color}">${body}</text>
    <text x="${x}" y="${arrowY}" text-anchor="${anchor}" font-family="'JetBrains Mono',monospace" font-size="17" fill="${PALETTE.coral}">${arrow}</text>
  </g>`;
}

/** Shared page chrome: paper ground, corner marks, footer rule + credit. */
function frame(w, h, inner, { source = '', kicker = '', headline = '' } = {}) {
  return `<!DOCTYPE html><html><head><link href="${FONTS}" rel="stylesheet"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:${w}px;height:${h}px;background:${PALETTE.paper};overflow:hidden}
    svg{display:block}
    .k{font-family:'JetBrains Mono',monospace;font-size:19px;letter-spacing:3.4px;fill:${PALETTE.coral};font-weight:700}
    .hl{font-family:'Lora',Georgia,serif;font-size:40px;fill:${PALETTE.ink}}
    .src{font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:1.6px;fill:${PALETTE.mute}}
    .big{font-family:'Lora',Georgia,serif;fill:${PALETTE.coral}}
    .lbl{font-family:'JetBrains Mono',monospace;letter-spacing:1.6px;fill:${PALETTE.ink}}
  </style></head><body>
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    ${cornerMarks(w, h)}
    ${kicker ? `<text x="64" y="76" class="k">${kicker}</text>` : ''}
    ${headline ? `<text x="64" y="126" class="hl">${headline}</text>` : ''}
    ${inner}
    <line x1="64" y1="${h - 74}" x2="${w - 64}" y2="${h - 74}" stroke="${PALETTE.hair}" stroke-width="1.6"/>
    <text x="${w - 64}" y="${h - 44}" text-anchor="end" class="src">${source}</text>
    <text x="64" y="${h - 44}" class="src" fill="${PALETTE.ink}">STRATEGY &#8594; SHIP</text>
  </svg></body></html>`;
}

module.exports = { PALETTE, FONTS, cornerMarks, ringCluster, dashRule, microLabel, frame };
