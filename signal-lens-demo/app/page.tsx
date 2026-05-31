'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_RULE_STATE } from '@/lib/rules';
import type { RuleId, RuleState } from '@/lib/rules';
import { SIGNALS } from '@/lib/data';
import { rankWithLens, computeLift, activeRuleCount } from '@/lib/scoring';
import LensRules from '@/components/LensRules';
import SignalList from '@/components/SignalList';
import DeltaPanel from '@/components/DeltaPanel';

export default function Page() {
  const [ruleState, setRuleState] =
    useState<Record<RuleId, RuleState>>(DEFAULT_RULE_STATE);

  const ranked = useMemo(() => rankWithLens(SIGNALS, ruleState), [ruleState]);
  const lift = useMemo(() => computeLift(SIGNALS, ruleState), [ruleState]);
  const activeCount = useMemo(() => activeRuleCount(ruleState), [ruleState]);

  function handleToggle(id: RuleId, next: RuleState) {
    setRuleState((prev) => ({ ...prev, [id]: next }));
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
          relevance lift recompute live.
        </p>
      </header>

      <div className="dash">
        <LensRules ruleState={ruleState} onToggle={handleToggle} activeCount={activeCount} />
        <SignalList ranked={ranked} />
        <DeltaPanel lift={lift} signalCount={SIGNALS.length} />
      </div>

      <footer className="foot">
        Powered by <span className="teal">Enso Labs</span> · Sample data is fictional and
        contains no client information.
      </footer>
    </main>
  );
}
