'use client';

import { useState } from 'react';

export type FetchMode = 'sample' | 'live';

export default function LiveControls({
  mode,
  loading,
  error,
  onFetch,
  onReset,
}: {
  mode: FetchMode;
  loading: boolean;
  error: string | null;
  onFetch: (topic: string) => void;
  onReset: () => void;
}) {
  const [topic, setTopic] = useState('high-temperature membrane materials');

  return (
    <div className="controls">
      <form
        className="ctl-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (topic.trim()) onFetch(topic.trim());
        }}
      >
        <input
          className="ctl-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic to source live signals…"
          aria-label="Signal topic"
          disabled={loading}
        />
        <button className="ctl-btn primary" type="submit" disabled={loading}>
          {loading ? 'Sourcing…' : 'Fetch live signals'}
        </button>
        {mode === 'live' && (
          <button className="ctl-btn" type="button" onClick={onReset} disabled={loading}>
            Reset to sample
          </button>
        )}
      </form>
      <div className="ctl-status">
        <span className={`dot ${mode}`} />
        <span className="mono">
          {mode === 'live' ? 'LIVE · Perplexity → Claude' : 'SAMPLE · local fictional data'}
        </span>
      </div>
      {error && <div className="ctl-error">{error}</div>}
    </div>
  );
}
