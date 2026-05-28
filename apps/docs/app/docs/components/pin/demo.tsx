'use client';

import { Pin } from '@bwo-ui/react';

export function PinDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', padding: 0, alignItems: 'stretch' }}>
      <div style={{ padding: 24, color: 'var(--bwo-text-body)' }}>
        Scroll down — the orange band stays pinned for one viewport.
      </div>
      <Pin end="+=100%">
        <div
          style={{
            height: 220,
            display: 'grid',
            placeItems: 'center',
            background: 'var(--bwo-red)',
            color: 'var(--bwo-white)',
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          Pinned section
        </div>
      </Pin>
      <div
        style={{
          height: 360,
          display: 'grid',
          placeItems: 'center',
          color: 'var(--bwo-text-body)',
          background: 'var(--bwo-grey-4)',
        }}
      >
        Content after the pin.
      </div>
    </div>
  );
}
