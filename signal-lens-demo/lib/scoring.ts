import { RULES, DIMENSIONS, stateFactor } from './rules';
import type { RuleId, RuleState, Dimension } from './rules';
import type { Signal } from './data';

// Intent-driven weight multipliers, applied on top of each rule's base weight.
// 1 = unchanged. >1 emphasizes a rule, <1 de-emphasizes it. Produced by the
// intent interpreter (app/api/intent) from the user's stated goal.
export type WeightOverrides = Partial<Record<RuleId, number>>;

export interface ScoredSignal {
  signal: Signal;
  // RWW dimension scores, 0..1.
  rww: Record<Dimension, number>;
  // Composite relevance score, 0..1.
  relevance: number;
}

// Effective weight of a rule under the current lens + intent: base weight, scaled
// by its on/off/review factor and any intent multiplier (clamped to a sane range).
function effectiveWeight(
  ruleWeight: number,
  factor: number,
  override: number | undefined
): number {
  const mult = typeof override === 'number' && override > 0 ? override : 1;
  return ruleWeight * factor * Math.max(0.1, Math.min(3, mult));
}

// Score a single signal against the current lens configuration.
// Each dimension is a weighted mean over its active rules; the composite is the
// mean of the three dimensions. Dimensions with no active rules fall back to a
// neutral 0.5 so the lens degrades gracefully rather than dividing by zero.
export function scoreSignal(
  signal: Signal,
  ruleState: Record<RuleId, RuleState>,
  overrides: WeightOverrides = {}
): ScoredSignal {
  const rww = {} as Record<Dimension, number>;

  for (const { id: dim } of DIMENSIONS) {
    let weightedSum = 0;
    let weightTotal = 0;
    for (const rule of RULES) {
      if (rule.dimension !== dim) continue;
      const factor = stateFactor(ruleState[rule.id]);
      if (factor === 0) continue;
      const w = effectiveWeight(rule.weight, factor, overrides[rule.id]);
      weightedSum += w * signal.attrs[rule.id];
      weightTotal += w;
    }
    rww[dim] = weightTotal > 0 ? weightedSum / weightTotal : 0.5;
  }

  const relevance = (rww.real + rww.win + rww.worth) / 3;
  return { signal, rww, relevance };
}

// Rank all signals with the lens applied (highest relevance first).
export function rankWithLens(
  signals: Signal[],
  ruleState: Record<RuleId, RuleState>,
  overrides: WeightOverrides = {}
): ScoredSignal[] {
  return signals
    .map((s) => scoreSignal(s, ruleState, overrides))
    .sort((a, b) => b.relevance - a.relevance);
}

// Baseline ranking with the lens OFF: naive recency sort. This is what you get
// without expert encoding — newest first, regardless of true relevance.
export function rankBaseline(signals: Signal[]): Signal[] {
  return [...signals].sort((a, b) => a.recencyDays - b.recencyDays);
}

// Mean ground-truth relevance of the top-N items of a ranking. Higher means the
// ranking did a better job surfacing what the expert actually valued.
export function topNQuality<T>(
  ranked: T[],
  getSignal: (t: T) => Signal,
  n = 5
): number {
  const top = ranked.slice(0, n);
  if (top.length === 0) return 0;
  const sum = top.reduce((acc, t) => acc + getSignal(t).groundTruth, 0);
  return sum / top.length;
}

export interface LensLift {
  lensQuality: number;
  baselineQuality: number;
  // Relative lift in top-N quality, as a percentage. Lens vs. naive recency.
  liftPct: number;
}

// The headline metric: how much better the lens surfaces high-relevance signals
// than a naive recency baseline.
export function computeLift(
  signals: Signal[],
  ruleState: Record<RuleId, RuleState>,
  overrides: WeightOverrides = {},
  n = 5
): LensLift {
  const lensQuality = topNQuality(rankWithLens(signals, ruleState, overrides), (s) => s.signal, n);
  const baselineQuality = topNQuality(rankBaseline(signals), (s) => s, n);
  const liftPct =
    baselineQuality > 0 ? ((lensQuality - baselineQuality) / baselineQuality) * 100 : 0;
  return { lensQuality, baselineQuality, liftPct };
}

// Count how many rules are contributing (on or review).
export function activeRuleCount(ruleState: Record<RuleId, RuleState>): number {
  return RULES.filter((r) => ruleState[r.id] !== 'off').length;
}

// ---- Explainability: per-rule contribution to a signal's composite score. ----
// Each active rule contributes (1/3) * (w_rule / W_dimension) * attr to the
// composite relevance, so the contributions sum exactly to `relevance`. This is
// what powers the rule-contribution chart — a defensible, no-black-box breakdown.
export interface RuleContribution {
  ruleId: RuleId;
  label: string;
  dimension: Dimension;
  state: RuleState;
  attr: number;
  contribution: number; // share of composite relevance (0..1)
}

export function ruleContributions(
  signal: Signal,
  ruleState: Record<RuleId, RuleState>,
  overrides: WeightOverrides = {}
): RuleContribution[] {
  const dimWeightTotals = {} as Record<Dimension, number>;
  for (const { id: dim } of DIMENSIONS) {
    let total = 0;
    for (const rule of RULES) {
      if (rule.dimension !== dim) continue;
      const factor = stateFactor(ruleState[rule.id]);
      if (factor === 0) continue;
      total += effectiveWeight(rule.weight, factor, overrides[rule.id]);
    }
    dimWeightTotals[dim] = total;
  }

  return RULES.map((rule) => {
    const factor = stateFactor(ruleState[rule.id]);
    const w = effectiveWeight(rule.weight, factor, overrides[rule.id]);
    const dimTotal = dimWeightTotals[rule.dimension];
    const contribution =
      factor === 0 || dimTotal === 0
        ? 0
        : (1 / 3) * (w / dimTotal) * signal.attrs[rule.id];
    return {
      ruleId: rule.id,
      label: rule.label,
      dimension: rule.dimension,
      state: ruleState[rule.id],
      attr: signal.attrs[rule.id],
      contribution,
    };
  });
}
