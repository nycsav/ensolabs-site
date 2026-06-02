'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_RULE_STATE } from '@/lib/rules';
import type { RuleId, RuleState } from '@/lib/rules';
import { SIGNALS } from '@/lib/data';
import type { Signal } from '@/lib/data';
import { rankWithLens, computeLift, activeRuleCount } from '@/lib/scoring';
import type { WeightOverrides } from '@/lib/scoring';
import type { Recommendation } from '@/lib/advisor';
import LensRules from '@/components/LensRules';
import SignalList from '@/components/SignalList';
import DeltaPanel from '@/components/DeltaPanel';
import LiveControls from '@/components/LiveControls';
import IntentBar from '@/components/IntentBar';
import IntelligencePanel from '@/components/Charts';
import NextSteps from '@/components/NextSteps';
import type { FetchMode } from '@/components/LiveControls';

const TOP_N = 5;

export default function Page() {
  const [ruleState, setRuleState] =
    useState<Record<RuleId, RuleState>>(DEFAULT_RULE_STATE);

  const [signals, setSignals] = useState<Signal[]>(SIGNALS);
  const [mode, setMode] = useState<FetchMode>('sample');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Intent → weight overrides
  const [overrides, setOverrides] = useState<WeightOverrides>({});
  const [intentSummary, setIntentSummary] = useState<string | null>(null);
  const [intentText, setIntentText] = useState<string>('');
  const [intentLoading, setIntentLoading] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  // Selected signal for the analytics panel
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Recommended next steps
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recsError, setRecsError] = useState<string | null>(null);

  const ranked = useMemo(
    () => rankWithLens(signals, ruleState, overrides),
    [signals, ruleState, overrides]
  );
  const lift = useMemo(
    () => computeLift(signals, ruleState, overrides),
    [signals, ruleState, overrides]
  );
  const activeCount = useMemo(() => activeRuleCount(ruleState), [ruleState]);

  const selected = useMemo(
    () => ranked.find((r) => r.signal.id === selectedId) ?? ranked[0],
    [ranked, selectedId]
  );
  const top = useMemo(() => ranked.slice(0, TOP_N), [ranked]);

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
      if (!res.ok) throw new Error(data?.message || `Request failed (${res.status}).`);
      if (!Array.isArray(data.signals) || data.signals.length === 0) {
        throw new Error('No signals returned.');
      }
      setSignals(data.signals as Signal[]);
      setMode('live');
      setSelectedId(null);
      setRecs(null);
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
    setSelectedId(null);
    setRecs(null);
  }

  async function handleApplyIntent(intent: string) {
    setIntentLoading(true);
    setIntentError(null);
    try {
      const res = await fetch('/api/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Request failed (${res.status}).`);
      setOverrides((data.weights || {}) as WeightOverrides);
      setIntentSummary(typeof data.summary === 'string' ? data.summary : null);
      setIntentText(intent);
      setRecs(null);
    } catch (err) {
      setIntentError(err instanceof Error ? err.message : 'Could not interpret intent.');
    } finally {
      setIntentLoading(false);
    }
  }

  function handleClearIntent() {
    setOverrides({});
    setIntentSummary(null);
    setIntentText('');
    setIntentError(null);
    setRecs(null);
  }

  async function handleGenerateSteps() {
    setRecsLoading(true);
    setRecsError(null);
    try {
      const payload = top.map((s) => ({
        title: s.signal.title,
        source: s.signal.source,
        recencyDays: s.signal.recencyDays,
        relevance: s.relevance,
        real: s.rww.real,
        win: s.rww.win,
        worth: s.rww.worth,
      }));
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signals: payload, intent: intentText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Request failed (${res.status}).`);
      setRecs((data.recommendations || []) as Recommendation[]);
    } catch (err) {
      setRecsError(err instanceof Error ? err.message : 'Could not generate next steps.');
    } finally {
      setRecsLoading(false);
    }
  }

  return (
    <main className="wrap">
      <header className="head">
        <span className="eyebrow">Signal Lens · interactive demo</span>
        <h1>Expert knowledge, encoded as toggleable rules.</h1>
        <p>
          A scientist will never trust a black-box relevance score. The Signal Lens
          encodes expert judgment as rules you can reason about — and turn off — one
          at a time. State your intent to retune the lens, toggle the rules, and watch
          the ranking, the RWW scores, the relevance lift, and the recommended actions
          recompute live — over local sample data, or real signals sourced by
          Perplexity and scored by Claude.
        </p>
      </header>

      <LiveControls
        mode={mode}
        loading={loading}
        error={error}
        onFetch={handleFetch}
        onReset={handleReset}
      />

      <IntentBar
        loading={intentLoading}
        error={intentError}
        summary={intentSummary}
        overrides={overrides}
        onApply={handleApplyIntent}
        onClear={handleClearIntent}
      />

      <div className="dash">
        <LensRules ruleState={ruleState} onToggle={handleToggle} activeCount={activeCount} />
        <SignalList
          ranked={ranked}
          selectedId={selected?.signal.id}
          onSelect={setSelectedId}
        />
        <DeltaPanel lift={lift} signalCount={signals.length} />
      </div>

      <IntelligencePanel
        ranked={ranked}
        selected={selected}
        lift={lift}
        ruleState={ruleState}
        overrides={overrides}
      />

      <NextSteps
        top={top}
        recommendations={recs}
        loading={recsLoading}
        error={recsError}
        hasIntent={!!intentSummary}
        onGenerate={handleGenerateSteps}
      />

      <footer className="foot">
        Powered by <span className="teal">Enso Labs</span> ·{' '}
        {mode === 'live'
          ? 'Live signals via Perplexity + Claude.'
          : 'Sample data is fictional and contains no client information.'}
      </footer>
    </main>
  );
}
