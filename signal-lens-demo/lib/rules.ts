// The Signal Lens — expert-knowledge encoding as toggleable relevance rules.
// Each rule maps a domain-expert judgment onto a measurable signal attribute.
// Generalized for the demo: neutral advanced-materials domain, no client data.

export type RuleId =
  | 'tempFloor'
  | 'materialClass'
  | 'chemistryScope'
  | 'pfasSensitivity'
  | 'marketSize'
  | 'liability'
  | 'recency'
  | 'novelty'
  | 'gap200c';

// Three relevance dimensions, composed into an RWW (Real / Win / Worth) score.
//   Real  — is the signal credible and in-scope?
//   Win   — can we commercially win on it?
//   Worth — is it technically worth pursuing?
export type Dimension = 'real' | 'win' | 'worth';

// A rule can be fully on, excluded, or held for expert review (half weight).
export type RuleState = 'on' | 'off' | 'review';

export interface Rule {
  id: RuleId;
  label: string;
  dimension: Dimension;
  weight: number;
  blurb: string;
}

export const RULES: Rule[] = [
  { id: 'chemistryScope', label: 'Chemistry scope',   dimension: 'real',  weight: 1.1, blurb: 'In-scope chemistry families the lab actually works in.' },
  { id: 'materialClass',  label: 'Material class',     dimension: 'real',  weight: 1.0, blurb: 'Membranes, fibers, composites — the right material class.' },
  { id: 'recency',        label: 'Recency',            dimension: 'real',  weight: 0.7, blurb: 'How fresh the development is. Old news ranks lower.' },
  { id: 'marketSize',     label: 'Market size',        dimension: 'win',   weight: 1.3, blurb: 'Addressable market large enough to matter commercially.' },
  { id: 'liability',      label: 'Liability',          dimension: 'win',   weight: 0.8, blurb: 'Regulatory / liability exposure of pursuing the signal.' },
  { id: 'novelty',        label: 'Novelty',            dimension: 'win',   weight: 1.1, blurb: 'Genuinely new vs. incremental rehash of known work.' },
  { id: 'tempFloor',      label: 'Temp floor',         dimension: 'worth', weight: 1.2, blurb: 'Clears the high-temperature performance floor.' },
  { id: 'pfasSensitivity',label: 'PFAS sensitivity',   dimension: 'worth', weight: 0.9, blurb: 'PFAS exposure — flagged for expert review by default.' },
  { id: 'gap200c',        label: '200°C gap',          dimension: 'worth', weight: 1.0, blurb: 'Beats the 200°C threshold competitors cannot reach.' },
];

export const RULE_MAP: Record<RuleId, Rule> = RULES.reduce((acc, r) => {
  acc[r.id] = r;
  return acc;
}, {} as Record<RuleId, Rule>);

export const DIMENSIONS: { id: Dimension; label: string }[] = [
  { id: 'real', label: 'Real' },
  { id: 'win', label: 'Win' },
  { id: 'worth', label: 'Worth' },
];

// Default lens configuration — matches the studio's reference dashboard:
// everything on, PFAS held for expert review.
export const DEFAULT_RULE_STATE: Record<RuleId, RuleState> = {
  chemistryScope: 'on',
  materialClass: 'on',
  recency: 'on',
  marketSize: 'on',
  liability: 'on',
  novelty: 'on',
  tempFloor: 'on',
  pfasSensitivity: 'review',
  gap200c: 'on',
};

// Weight contribution of each state.
export function stateFactor(state: RuleState): number {
  if (state === 'on') return 1;
  if (state === 'review') return 0.5;
  return 0;
}
