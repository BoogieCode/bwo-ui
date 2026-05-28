'use client';

import { Typewriter } from '@bwo-ui/react';
import { useState } from 'react';

export function TypewriterDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="bwo-btn bwo-btn--ghost bwo-btn--sm"
        style={{ alignSelf: 'flex-start' }}
      >
        Replay
      </button>

      <Typewriter
        key={run}
        as="h2"
        lines={[
          { text: '· site tip 2010', strike: true },
          { text: '· site generic AI', strike: true },
          { text: '· site memorabil', color: 'var(--bwo-red)' },
        ]}
        style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.015em' }}
      />
    </div>
  );
}
