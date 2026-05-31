'use client';

import { RULES } from '@/lib/rules';
import type { RuleId, RuleState } from '@/lib/rules';

const NEXT_STATE: Record<RuleState, RuleState> = {
  on: 'off',
  off: 'review',
  review: 'on',
};

const STATE_LABEL: Record<RuleState, string> = {
  on: 'ON',
  off: 'OFF',
  review: 'REVIEW',
};

export default function LensRules({
  ruleState,
  onToggle,
  activeCount,
}: {
  ruleState: Record<RuleId, RuleState>;
  onToggle: (id: RuleId, next: RuleState) => void;
  activeCount: number;
}) {
  return (
    <div className="col">
      <h2>
        Signal Lens · {RULES.length} rules <span className="count">{activeCount} active</span>
      </h2>
      {RULES.map((rule) => {
        const state = ruleState[rule.id];
        return (
          <button
            key={rule.id}
            className={`rule ${state === 'off' ? 'is-off' : ''}`}
            onClick={() => onToggle(rule.id, NEXT_STATE[state])}
            aria-label={`${rule.label} is ${STATE_LABEL[state]}. Click to change.`}
          >
            <span>
              <span className="label">{rule.label}</span>
              <span className="blurb">{rule.blurb}</span>
            </span>
            <span className={`state ${state}`}>{STATE_LABEL[state]}</span>
          </button>
        );
      })}
      <p className="hint">
        Click any rule to cycle ON → OFF → REVIEW. The signal ranking and relevance
        lift recompute instantly — this is the &ldquo;Lens on vs. off&rdquo; story, live.
      </p>
    </div>
  );
}
