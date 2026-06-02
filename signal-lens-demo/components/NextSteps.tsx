'use client';

import type { ScoredSignal } from '@/lib/scoring';
import type { Priority, Recommendation } from '@/lib/advisor';

const PRIORITY_LABEL: Record<Priority, string> = {
  'act-now': 'ACT NOW',
  monitor: 'MONITOR',
  pass: 'PASS',
};

export default function NextSteps({
  top,
  recommendations,
  loading,
  error,
  hasIntent,
  onGenerate,
}: {
  top: ScoredSignal[];
  recommendations: Recommendation[] | null;
  loading: boolean;
  error: string | null;
  hasIntent: boolean;
  onGenerate: () => void;
}) {
  const byIndex = new Map<number, Recommendation>();
  (recommendations || []).forEach((r) => byIndex.set(r.index, r));

  return (
    <section className="steps">
      <div className="steps-head">
        <h2>Recommended next steps</h2>
        <button className="ctl-btn primary" type="button" onClick={onGenerate} disabled={loading}>
          {loading ? 'Thinking…' : recommendations ? 'Regenerate' : 'Generate next steps'}
        </button>
      </div>
      <p className="steps-sub">
        Claude turns the top {top.length} ranked signals
        {hasIntent ? ', tuned to your intent,' : ''} into decision-ready actions.
      </p>

      {error && <div className="ctl-error">{error}</div>}

      {!recommendations && !loading && !error && (
        <div className="steps-empty">No recommendations yet — generate them from the current ranking.</div>
      )}

      {recommendations && (
        <div className="steps-list">
          {top.map((s, i) => {
            const rec = byIndex.get(i);
            if (!rec) return null;
            return (
              <div className={`step ${rec.priority}`} key={s.signal.id}>
                <div className="step-top">
                  <span className="rank">{String(i + 1).padStart(2, '0')}</span>
                  <span className="step-title">{s.signal.title}</span>
                  <span className={`step-prio ${rec.priority}`}>{PRIORITY_LABEL[rec.priority]}</span>
                </div>
                <div className="step-action">{rec.action}</div>
                <div className="step-why">{rec.rationale}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
