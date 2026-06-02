'use client';

import { useState } from 'react';
import { RULES } from '@/lib/rules';
import type { RuleId } from '@/lib/rules';
import type { WeightOverrides } from '@/lib/scoring';

const RULE_LABEL: Record<RuleId, string> = RULES.reduce((acc, r) => {
  acc[r.id] = r.label;
  return acc;
}, {} as Record<RuleId, string>);

const PRESETS = [
  'Find near-term commercial licensing targets',
  'Prioritize defensible, novel IP',
  'Flag regulatory / PFAS liability risk',
];

export default function IntentBar({
  loading,
  error,
  summary,
  overrides,
  onApply,
  onClear,
}: {
  loading: boolean;
  error: string | null;
  summary: string | null;
  overrides: WeightOverrides;
  onApply: (intent: string) => void;
  onClear: () => void;
}) {
  const [intent, setIntent] = useState('');

  const changed = (Object.entries(overrides) as [RuleId, number][])
    .filter(([, v]) => Math.abs(v - 1) > 0.05)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="intent">
      <form
        className="intent-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (intent.trim()) onApply(intent.trim());
        }}
      >
        <input
          className="ctl-input"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="State your intent — e.g. find licensing targets, prioritize novel IP…"
          aria-label="Analyst intent"
          disabled={loading}
        />
        <button className="ctl-btn primary" type="submit" disabled={loading || !intent.trim()}>
          {loading ? 'Tuning…' : 'Apply intent'}
        </button>
        {summary && (
          <button className="ctl-btn" type="button" onClick={onClear} disabled={loading}>
            Clear
          </button>
        )}
      </form>

      <div className="intent-presets">
        {PRESETS.map((p) => (
          <button key={p} className="chip" type="button" disabled={loading} onClick={() => { setIntent(p); onApply(p); }}>
            {p}
          </button>
        ))}
      </div>

      {summary && (
        <div className="intent-summary">
          <span className="mono tag">LENS RETUNED</span> {summary}
          {changed.length > 0 && (
            <div className="intent-weights">
              {changed.map(([id, v]) => (
                <span key={id} className={`wchip ${v >= 1 ? 'up' : 'down'}`}>
                  {RULE_LABEL[id]} {v >= 1 ? '↑' : '↓'}{v.toFixed(2)}×
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {error && <div className="ctl-error">{error}</div>}
    </div>
  );
}
