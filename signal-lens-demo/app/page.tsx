'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_RULE_STATE } from '@/lib/rules';
import type { RuleId, RuleState } from '@/lib/rules';
import { SIGNALS } from '@/lib/data';
import type { Signal } from '@/lib/data';
import { rankWithLens, computeLift, activeRuleCount } from '@/lib/scoring';
import LensRules from '@/components/LensRules';
import SignalList from '@/components/SignalList';
import DeltaPanel from '@/components/DeltaPanel';
import LiveControls from '@/components/LiveControls';
import type { FetchMode } from '@/components/LiveControls';

export default function Page() {
  const [ruleState, setRuleState] =
    useState<Record<RuleId, RuleState>>(DEFAULT_RULE_STATE);

  const [signals, setSignals] = useState<Signal[]>(SIGNALS);
  const [mode, setMode] = useState<FetchMode>('sample');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ranked = useMemo(() => rankWithLens(signals, ruleState), [signals, ruleState]);
  const lift = useMemo(() => computeLift(signals, ruleState), [signals, ruleState]);
  const activeCount = useMemo(() => activeRuleCount(ruleState), [ruleState]);

  function handleToggle(id: RuleId, next: RuleState) {
    setRuleState((prev) => ({ ...prev, [id]: next }));
  }

  async function handleFetch(topic: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status}).`);
      }
      if (!Array.isArray(data.signals) || data.signals.length === 0) {
        throw new Error('No signals returned.');
      }
      setSignals(data.signals as Signal[]);
      setMode('live');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSignals(SIGNALS);
    setMode('sample');
    setError(null);
  }

  return (
    <main className="wrap">
      <header className="head">
        <span className="eyebrow">Signal Lens · interactive demo</span>
        <h1>Expert knowledge, encoded as toggleable rules.</h1>
        <p>
          A scientist will never trust a black-box relevance score. The Signal Lens
          encodes expert judgment as rules you can reason about — and turn off — one
          at a time. Toggle the rules and watch the ranking, the RWW scores, and the
          relevance lift recompute live — over local sample data, or real signals
          sourced by Perplexity and scored by Claude.
        </p>
      </header>

      <LiveControls
        mode={mode}
        loading={loading}
        error={error}
        onFetch={handleFetch}
        onReset={handleReset}
      />

      <div className="dash">
        <LensRules ruleState={ruleState} onToggle={handleToggle} activeCount={activeCount} />
        <SignalList ranked={ranked} />
        <DeltaPanel lift={lift} signalCount={signals.length} />
      </div>

      <footer className="foot">
        Powered by <span className="teal">Enso Labs</span> ·{' '}
        {mode === 'live'
          ? 'Live signals via Perplexity + Claude.'
          : 'Sample data is fictional and contains no client information.'}
      </footer>
    </main>
  );
}
