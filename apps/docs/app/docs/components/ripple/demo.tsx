'use client';

import { Ripple } from '@bwo-ui/react';

export function RippleDemo() {
  return (
    <div className="demo" style={{ gap: 16 }}>
      <Ripple color="rgba(255,255,255,0.55)">
        <button
          style={{
            padding: '14px 28px',
            borderRadius: 9999,
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            border: 0,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Click me
        </button>
      </Ripple>
      <Ripple color="rgba(255,72,31,0.35)">
        <button
          style={{
            padding: '14px 28px',
            borderRadius: 9999,
            background: 'var(--bwo-white)',
            color: 'var(--bwo-black)',
            border: '1px solid var(--bwo-border)',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Ghost button
        </button>
      </Ripple>
    </div>
  );
}
