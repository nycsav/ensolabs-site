'use client';

import { ruleContributions } from '@/lib/scoring';
import type { ScoredSignal, LensLift, WeightOverrides } from '@/lib/scoring';
import type { RuleId, RuleState, Dimension } from '@/lib/rules';
import type { SourceType } from '@/lib/data';

const DIM_COLOR: Record<Dimension, string> = {
  real: 'var(--teal)',
  win: 'var(--amber)',
  worth: 'var(--teal-dim)',
};

const SOURCE_COLOR: Record<SourceType, string> = {
  'peer-reviewed': 'var(--teal)',
  patent: 'var(--amber)',
  preprint: 'var(--teal-dim)',
  commercial: 'var(--fg-3)',
};

// ---- RWW radar (3-axis) for the selected signal ----
function Radar({ scored }: { scored: ScoredSignal }) {
  const cx = 100;
  const cy = 98;
  const R = 68;
  const axes: { dim: Dimension; label: string; ux: number; uy: number }[] = [
    { dim: 'real', label: 'Real', ux: 0, uy: -1 },
    { dim: 'win', label: 'Win', ux: 0.866, uy: 0.5 },
    { dim: 'worth', label: 'Worth', ux: -0.866, uy: 0.5 },
  ];
  const pt = (v: number, ux: number, uy: number) => [cx + R * v * ux, cy + R * v * uy];
  const ring = (v: number) =>
    axes.map((a) => pt(v, a.ux, a.uy).join(',')).join(' ');
  const poly = axes.map((a) => pt(scored.rww[a.dim], a.ux, a.uy).join(',')).join(' ');

  return (
    <svg viewBox="0 0 200 190" className="chart-svg" role="img" aria-label="RWW radar">
      {[0.5, 1].map((v) => (
        <polygon key={v} points={ring(v)} fill="none" stroke="var(--line)" strokeWidth={1} />
      ))}
      {axes.map((a) => {
        const [x, y] = pt(1, a.ux, a.uy);
        const [lx, ly] = pt(1.22, a.ux, a.uy);
        return (
          <g key={a.dim}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" strokeWidth={1} />
            <text
              x={lx}
              y={ly + 4}
              textAnchor="middle"
              fontSize={11}
              fontFamily="'JetBrains Mono', monospace"
              fill="var(--fg-3)"
            >
              {a.label} {scored.rww[a.dim].toFixed(2)}
            </text>
          </g>
        );
      })}
      <polygon
        points={poly}
        fill="color-mix(in oklab, var(--teal) 24%, transparent)"
        stroke="var(--teal)"
        strokeWidth={1.6}
      />
      {axes.map((a) => {
        const [x, y] = pt(scored.rww[a.dim], a.ux, a.uy);
        return <circle key={a.dim} cx={x} cy={y} r={2.6} fill="var(--teal)" />;
      })}
    </svg>
  );
}

// ---- Lens vs. baseline top-5 quality ----
function LiftBars({ lift }: { lift: LensLift }) {
  const H = 110;
  const base = 134;
  const bars = [
    { label: 'Lens', q: lift.lensQuality, color: 'var(--teal)' },
    { label: 'Baseline', q: lift.baselineQuality, color: 'var(--amber)' },
  ];
  const sign = lift.liftPct >= 0 ? '+' : '';
  return (
    <svg viewBox="0 0 200 175" className="chart-svg" role="img" aria-label="Lens vs baseline">
      <line x1={20} y1={base} x2={180} y2={base} stroke="var(--line)" strokeWidth={1} />
      {bars.map((b, i) => {
        const x = 46 + i * 76;
        const h = Math.max(2, b.q * H);
        return (
          <g key={b.label}>
            <rect x={x} y={base - h} width={42} height={h} rx={4} fill={b.color} opacity={0.85} />
            <text x={x + 21} y={base - h - 7} textAnchor="middle" fontSize={12}
              fontFamily="'JetBrains Mono', monospace" fill={b.color}>
              {b.q.toFixed(2)}
            </text>
            <text x={x + 21} y={base + 15} textAnchor="middle" fontSize={11}
              fontFamily="'JetBrains Mono', monospace" fill="var(--fg-3)">
              {b.label}
            </text>
          </g>
        );
      })}
      <text x={100} y={20} textAnchor="middle" fontSize={15} fontWeight={600}
        fontFamily="'JetBrains Mono', monospace" fill="var(--teal)">
        {sign}{lift.liftPct.toFixed(0)}% lift
      </text>
    </svg>
  );
}

// ---- Per-rule contribution to the selected signal's composite ----
function Contributions({
  scored,
  ruleState,
  overrides,
}: {
  scored: ScoredSignal;
  ruleState: Record<RuleId, RuleState>;
  overrides: WeightOverrides;
}) {
  const contribs = ruleContributions(scored.signal, ruleState, overrides)
    .filter((c) => c.contribution > 0)
    .sort((a, b) => b.contribution - a.contribution);
  const max = Math.max(0.0001, ...contribs.map((c) => c.contribution));

  return (
    <div className="contrib">
      {contribs.map((c) => (
        <div className="contrib-row" key={c.ruleId}>
          <span className="contrib-label">
            {c.label}
            {c.state === 'review' && <span className="contrib-rev"> ½</span>}
          </span>
          <span className="contrib-track">
            <span
              className="contrib-fill"
              style={{ width: `${(c.contribution / max) * 100}%`, background: DIM_COLOR[c.dimension] }}
            />
          </span>
          <span className="contrib-val">{(c.contribution * 100).toFixed(0)}</span>
        </div>
      ))}
      <p className="chart-cap">Share of composite relevance · summed = {(scored.relevance * 100).toFixed(0)}/100</p>
    </div>
  );
}

// ---- Signal landscape: relevance × recency, sized by market, colored by source ----
function Landscape({ ranked }: { ranked: ScoredSignal[] }) {
  const W = 360;
  const Hgt = 210;
  const padL = 34;
  const padR = 14;
  const padT = 16;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = Hgt - padT - padB;
  const maxRec = Math.max(30, ...ranked.map((r) => r.signal.recencyDays));
  const x = (rec: number) => padL + (rec / maxRec) * plotW;
  const y = (rel: number) => padT + (1 - rel) * plotH;

  return (
    <svg viewBox={`0 0 ${W} ${Hgt}`} className="chart-svg" role="img" aria-label="Signal landscape">
      {/* axes */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--line)" strokeWidth={1} />
      <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} stroke="var(--line)" strokeWidth={1} />
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="var(--line)" strokeWidth={0.5} strokeDasharray="2 4" />
      ))}
      <text x={6} y={padT + 6} fontSize={9} fontFamily="'JetBrains Mono', monospace" fill="var(--fg-3)">rel</text>
      <text x={6} y={padT + 6} transform={`rotate(0)`} fontSize={9} />
      <text x={padL} y={Hgt - 8} fontSize={9} fontFamily="'JetBrains Mono', monospace" fill="var(--fg-3)">← newer</text>
      <text x={W - padR} y={Hgt - 8} textAnchor="end" fontSize={9} fontFamily="'JetBrains Mono', monospace" fill="var(--fg-3)">older →</text>
      {ranked.map((r) => {
        const rad = 4 + r.signal.attrs.marketSize * 9;
        return (
          <circle
            key={r.signal.id}
            cx={x(r.signal.recencyDays)}
            cy={y(r.relevance)}
            r={rad}
            fill={SOURCE_COLOR[r.signal.source]}
            fillOpacity={0.55}
            stroke={SOURCE_COLOR[r.signal.source]}
            strokeWidth={1}
          >
            <title>{r.signal.title} · rel {r.relevance.toFixed(2)} · {r.signal.recencyDays}d</title>
          </circle>
        );
      })}
    </svg>
  );
}

function SourceLegend() {
  const items: SourceType[] = ['peer-reviewed', 'patent', 'preprint', 'commercial'];
  return (
    <div className="legend">
      {items.map((s) => (
        <span key={s} className="legend-item">
          <span className="legend-dot" style={{ background: SOURCE_COLOR[s] }} />
          {s}
        </span>
      ))}
      <span className="legend-item legend-note">bubble = market size</span>
    </div>
  );
}

export default function IntelligencePanel({
  ranked,
  selected,
  lift,
  ruleState,
  overrides,
}: {
  ranked: ScoredSignal[];
  selected: ScoredSignal | undefined;
  lift: LensLift;
  ruleState: Record<RuleId, RuleState>;
  overrides: WeightOverrides;
}) {
  if (!selected) return null;
  return (
    <section className="intel">
      <div className="intel-head">
        <h2>Intelligence · analytics</h2>
        <span className="intel-sub">
          Selected: <span className="teal">{selected.signal.title}</span>
        </span>
      </div>
      <div className="charts">
        <div className="chart-card">
          <h3>RWW profile</h3>
          <Radar scored={selected} />
        </div>
        <div className="chart-card">
          <h3>Lens vs. baseline</h3>
          <LiftBars lift={lift} />
        </div>
        <div className="chart-card">
          <h3>Rule contribution</h3>
          <Contributions scored={selected} ruleState={ruleState} overrides={overrides} />
        </div>
        <div className="chart-card chart-wide">
          <h3>Signal landscape</h3>
          <Landscape ranked={ranked} />
          <SourceLegend />
        </div>
      </div>
    </section>
  );
}
