import type { RuleId } from './rules';

export type SourceType = 'peer-reviewed' | 'patent' | 'commercial' | 'preprint';

export interface Signal {
  id: string;
  title: string;
  source: SourceType;
  recencyDays: number;
  // How well this signal satisfies each rule, 0..1, as scored by the pipeline.
  attrs: Record<RuleId, number>;
  // Expert-validated "true" relevance, 0..1. Used only to measure how well a
  // ranking surfaces what the lead scientist actually cared about. Never shown
  // to the scorer — it is the ground truth the lens is trying to approximate.
  groundTruth: number;
}

// 14 fictional advanced-materials signals. No real company or product data.
export const SIGNALS: Signal[] = [
  {
    id: 's01',
    title: 'High-temp PTFE alternative · pilot-scale data',
    source: 'peer-reviewed',
    recencyDays: 4,
    attrs: { chemistryScope: 0.95, materialClass: 0.9, recency: 0.92, marketSize: 0.88, liability: 0.7, novelty: 0.85, tempFloor: 0.96, pfasSensitivity: 0.4, gap200c: 0.9 },
    groundTruth: 0.94,
  },
  {
    id: 's02',
    title: 'Aerospace insulation · novel fluoropolymer chemistry',
    source: 'patent',
    recencyDays: 12,
    attrs: { chemistryScope: 0.9, materialClass: 0.85, recency: 0.7, marketSize: 0.82, liability: 0.6, novelty: 0.93, tempFloor: 0.88, pfasSensitivity: 0.35, gap200c: 0.8 },
    groundTruth: 0.86,
  },
  {
    id: 's03',
    title: 'Battery separator · 200°C threshold beaten in cycling test',
    source: 'preprint',
    recencyDays: 9,
    attrs: { chemistryScope: 0.78, materialClass: 0.8, recency: 0.8, marketSize: 0.9, liability: 0.75, novelty: 0.8, tempFloor: 0.92, pfasSensitivity: 0.85, gap200c: 0.97 },
    groundTruth: 0.88,
  },
  {
    id: 's04',
    title: 'Consumer apparel membrane · breathability marketing claim',
    source: 'commercial',
    recencyDays: 2,
    attrs: { chemistryScope: 0.4, materialClass: 0.55, recency: 0.96, marketSize: 0.45, liability: 0.5, novelty: 0.25, tempFloor: 0.2, pfasSensitivity: 0.6, gap200c: 0.15 },
    groundTruth: 0.22,
  },
  {
    id: 's05',
    title: 'Sealant gasket recall · PFAS contamination litigation',
    source: 'commercial',
    recencyDays: 1,
    attrs: { chemistryScope: 0.6, materialClass: 0.6, recency: 0.98, marketSize: 0.5, liability: 0.15, novelty: 0.3, tempFloor: 0.4, pfasSensitivity: 0.1, gap200c: 0.3 },
    groundTruth: 0.31,
  },
  {
    id: 's06',
    title: 'Ceramic-matrix composite · sustained 1200°C operation',
    source: 'peer-reviewed',
    recencyDays: 21,
    attrs: { chemistryScope: 0.7, materialClass: 0.92, recency: 0.5, marketSize: 0.78, liability: 0.8, novelty: 0.88, tempFloor: 0.99, pfasSensitivity: 0.95, gap200c: 0.95 },
    groundTruth: 0.83,
  },
  {
    id: 's07',
    title: 'Generic polymer review article · no new data',
    source: 'peer-reviewed',
    recencyDays: 3,
    attrs: { chemistryScope: 0.5, materialClass: 0.5, recency: 0.94, marketSize: 0.3, liability: 0.7, novelty: 0.1, tempFloor: 0.35, pfasSensitivity: 0.7, gap200c: 0.2 },
    groundTruth: 0.18,
  },
  {
    id: 's08',
    title: 'Hydrogen fuel-cell membrane · durability breakthrough',
    source: 'preprint',
    recencyDays: 7,
    attrs: { chemistryScope: 0.82, materialClass: 0.86, recency: 0.84, marketSize: 0.94, liability: 0.78, novelty: 0.9, tempFloor: 0.7, pfasSensitivity: 0.8, gap200c: 0.6 },
    groundTruth: 0.85,
  },
  {
    id: 's09',
    title: 'Textile coating startup · seed round announcement',
    source: 'commercial',
    recencyDays: 5,
    attrs: { chemistryScope: 0.45, materialClass: 0.4, recency: 0.9, marketSize: 0.6, liability: 0.6, novelty: 0.4, tempFloor: 0.25, pfasSensitivity: 0.55, gap200c: 0.2 },
    groundTruth: 0.34,
  },
  {
    id: 's10',
    title: 'Semiconductor packaging · low-CTE high-temp adhesive',
    source: 'patent',
    recencyDays: 15,
    attrs: { chemistryScope: 0.8, materialClass: 0.83, recency: 0.62, marketSize: 0.89, liability: 0.82, novelty: 0.82, tempFloor: 0.9, pfasSensitivity: 0.9, gap200c: 0.85 },
    groundTruth: 0.82,
  },
  {
    id: 's11',
    title: 'Industrial filtration media · incremental porosity gain',
    source: 'commercial',
    recencyDays: 8,
    attrs: { chemistryScope: 0.65, materialClass: 0.7, recency: 0.82, marketSize: 0.66, liability: 0.7, novelty: 0.35, tempFloor: 0.55, pfasSensitivity: 0.5, gap200c: 0.45 },
    groundTruth: 0.47,
  },
  {
    id: 's12',
    title: 'Solid-state electrolyte · thermal-runaway suppression',
    source: 'peer-reviewed',
    recencyDays: 6,
    attrs: { chemistryScope: 0.76, materialClass: 0.78, recency: 0.86, marketSize: 0.92, liability: 0.8, novelty: 0.87, tempFloor: 0.88, pfasSensitivity: 0.88, gap200c: 0.9 },
    groundTruth: 0.87,
  },
  {
    id: 's13',
    title: 'Press release · rebranded legacy gasket line',
    source: 'commercial',
    recencyDays: 1,
    attrs: { chemistryScope: 0.35, materialClass: 0.45, recency: 0.99, marketSize: 0.4, liability: 0.65, novelty: 0.08, tempFloor: 0.3, pfasSensitivity: 0.45, gap200c: 0.2 },
    groundTruth: 0.12,
  },
  {
    id: 's14',
    title: 'Refractory coating · aerospace re-entry thermal shield',
    source: 'patent',
    recencyDays: 18,
    attrs: { chemistryScope: 0.74, materialClass: 0.88, recency: 0.55, marketSize: 0.8, liability: 0.85, novelty: 0.86, tempFloor: 0.97, pfasSensitivity: 0.92, gap200c: 0.94 },
    groundTruth: 0.81,
  },
];
