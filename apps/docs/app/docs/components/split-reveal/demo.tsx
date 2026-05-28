'use client';

import { SplitReveal } from '@bwo-ui/react';
import { useState } from 'react';

export function SplitRevealDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 18 }}>
      <SplitReveal
        key={key}
        as="h2"
        type="words,chars"
        stagger={0.018}
        from={{ y: 32, opacity: 0 }}
        style={{ fontSize: 36, letterSpacing: '-0.02em', textAlign: 'center' }}
      >
        The quick brown fox jumps.
      </SplitReveal>
      <button className="btn ghost" onClick={() => setKey((k) => k + 1)}>
        Replay
      </button>
    </div>
  );
}
