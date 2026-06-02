'use client';

import type { ScoredSignal } from '@/lib/scoring';

export default function SignalList({
  ranked,
  selectedId,
  onSelect,
}: {
  ranked: ScoredSignal[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="col">
      <h2>
        Surfaced signals <span className="count">{ranked.length}</span>
      </h2>
      {ranked.map((item, i) => (
        <button
          type="button"
          className={`signal ${item.signal.id === selectedId ? 'is-selected' : ''}`}
          key={item.signal.id}
          onClick={() => onSelect?.(item.signal.id)}
          aria-pressed={item.signal.id === selectedId}
        >
          <div className="tt">
            <span className="rank">{String(i + 1).padStart(2, '0')}</span>
            {item.signal.title}
          </div>
          <div className="meta">
            <span className="rww">RWW {item.relevance.toFixed(2)}</span>
            <span>R {item.rww.real.toFixed(2)}</span>
            <span>W {item.rww.win.toFixed(2)}</span>
            <span>W {item.rww.worth.toFixed(2)}</span>
            <span>recency {item.signal.recencyDays}d</span>
            <span className="src">{item.signal.source}</span>
          </div>
          <div className="bar">
            <span style={{ width: `${Math.round(item.relevance * 100)}%` }} />
          </div>
        </button>
      ))}
      <p className="hint">Click a signal to inspect its RWW profile and rule contribution.</p>
    </div>
  );
}
