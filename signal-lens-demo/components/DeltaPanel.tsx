'use client';

import type { LensLift } from '@/lib/scoring';

export default function DeltaPanel({
  lift,
  signalCount,
}: {
  lift: LensLift;
  signalCount: number;
}) {
  const sign = lift.liftPct >= 0 ? '+' : '';
  return (
    <div className="col">
      <h2>Lens on vs. off</h2>

      <div className="metric">
        <div className="big">
          {sign}
          {lift.liftPct.toFixed(0)}%
        </div>
        <div className="lbl">
          relevance lift in the top 5 — Signal Lens vs. a naive recency baseline,
          measured against expert-validated ground truth.
        </div>
      </div>

      <div className="tl">
        <span>top-5 quality · lens</span>
        <span className="v">{lift.lensQuality.toFixed(2)}</span>
      </div>
      <div className="tl">
        <span>top-5 quality · baseline</span>
        <span className="a">{lift.baselineQuality.toFixed(2)}</span>
      </div>

      <h2 style={{ marginTop: 28 }}>Pipeline · canned</h2>
      <div className="tl"><span>fetch · arxiv</span><span className="v">OK</span></div>
      <div className="tl"><span>fetch · uspto</span><span className="v">OK</span></div>
      <div className="tl"><span>fetch · tradepubs</span><span className="v">OK</span></div>
      <div className="tl"><span>react · screen</span><span className="v">731</span></div>
      <div className="tl"><span>react · cluster</span><span className="v">111</span></div>
      <div className="tl"><span>react · score</span><span className="v">{signalCount}</span></div>
      <div className="tl"><span>review · lead-sci</span><span className="a">QUEUE</span></div>
    </div>
  );
}
