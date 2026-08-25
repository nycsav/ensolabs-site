/* Strategy → Ship — distinct geometric glyphs, one per concept.
 * Rings encode magnitude (crossing, benchmark). These encode *kind*.
 * Every glyph is hairline, same weight, same negative space, and animates
 * on a single 0..1 progress value so the deck can loop subtly.
 */
const { PALETTE } = require('./_sts-geo');

const P = PALETTE.paper;
const C = PALETTE.coral;

/** 01 — THE BRIEF: concentric squares. A boundary drawn around a centre. */
function glyphBrief(p = 1) {
  const n = 6;
  let s = '';
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const r = 150 - t * 112;
    const a = Math.max(0, Math.min(1, (p - i * 0.07) / 0.3));
    const rot = (1 - a) * 14 + i * 1.5;
    s += `<rect x="${200 - r}" y="${150 - r}" width="${r * 2}" height="${r * 2}"
      fill="none" stroke="${P}" stroke-width="2.2" opacity="${a}"
      transform="rotate(${rot} 200 150)"/>`;
  }
  s += `<circle cx="200" cy="150" r="15" fill="${C}" opacity="${Math.max(0, (p - 0.55) / 0.25)}"/>`;
  return { vw: 400, vh: 300, svg: s };
}

/** 02 — THE JOURNEY MAP: chevrons advancing, one branching off (the escalation). */
function glyphJourney(p = 1) {
  let s = '';
  const chev = (x, y, w, h, col, op, sw) =>
    `<path d="M${x} ${y - h} L${x + w} ${y} L${x} ${y + h}" fill="none"
      stroke="${col}" stroke-width="${sw}" stroke-linecap="round"
      stroke-linejoin="round" opacity="${op}"/>`;
  for (let i = 0; i < 5; i++) {
    const a = Math.max(0, Math.min(1, (p - i * 0.09) / 0.3));
    const dx = (1 - a) * -18;
    s += chev(60 + i * 62 + dx, 150, 42, 52, P, a * 0.95, 2.4);
  }
  // the branch — escalate to a human
  const b = Math.max(0, Math.min(1, (p - 0.5) / 0.32));
  s += `<path d="M300 150 L344 96" fill="none" stroke="${C}" stroke-width="2.6"
    stroke-linecap="round" stroke-dasharray="70" stroke-dashoffset="${70 * (1 - b)}"/>`;
  s += chev(336, 78, 30, 36, C, b, 2.6);
  return { vw: 400, vh: 300, svg: s };
}

/** 03 — THE MEASUREMENT PLAN: a scale of bars against a coral threshold. */
function glyphMeasure(p = 1) {
  const bars = [0.42, 0.63, 0.55, 0.86, 0.74, 0.94];
  let s = '';
  bars.forEach((v, i) => {
    const a = Math.max(0, Math.min(1, (p - i * 0.075) / 0.32));
    const w = 250 * v * a;
    const y = 58 + i * 34;
    s += `<line x1="66" y1="${y}" x2="${66 + w}" y2="${y}" stroke="${P}"
      stroke-width="7" stroke-linecap="round" opacity="0.92"/>`;
  });
  // threshold — the number that defines success
  const t = Math.max(0, Math.min(1, (p - 0.5) / 0.3));
  s += `<line x1="286" y1="34" x2="286" y2="${34 + 226 * t}" stroke="${C}" stroke-width="3"
    stroke-dasharray="7 7"/>`;
  s += `<circle cx="286" cy="34" r="7" fill="${C}" opacity="${t}"/>`;
  return { vw: 400, vh: 300, svg: s };
}

/** 04 — THE SEGMENTATION: a grid partitioned, one cell selected. */
function glyphSegment(p = 1) {
  let s = '';
  const cell = 62, ox = 108, oy = 58;
  let i = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++, i++) {
      const a = Math.max(0, Math.min(1, (p - i * 0.045) / 0.28));
      const hot = r === 1 && c === 2;
      const sc = 0.86 + 0.14 * a;
      const x = ox + c * cell, y = oy + r * cell;
      s += `<rect x="${x}" y="${y}" width="${cell - 10}" height="${cell - 10}"
        fill="${hot ? C : 'none'}" stroke="${hot ? C : P}" stroke-width="2.2"
        opacity="${a * (hot ? 1 : 0.9)}"
        transform="translate(${(x + (cell - 10) / 2) * (1 - sc)} ${(y + (cell - 10) / 2) * (1 - sc)}) scale(${sc})"/>`;
    }
  }
  return { vw: 400, vh: 300, svg: s };
}

/** Wrap a glyph as a sized <svg>. */
const render = (g, w, h) =>
  `<svg class="fig" viewBox="0 0 ${g.vw} ${g.vh}" width="${w}" height="${h}">${g.svg}</svg>`;

module.exports = { glyphBrief, glyphJourney, glyphMeasure, glyphSegment, render };
