'use client';

import { ScrollProgress } from '@bwo-ui/react';

export function ScrollProgressDemo() {
  return (
    <div
      className="demo"
      style={{ position: 'relative', height: 80, padding: 0, alignItems: 'stretch' }}
    >
      <div style={{ flex: 1, padding: 20, color: 'var(--bwo-text-body)' }}>
        Scroll the page — the red bar tracks document progress.
      </div>
      <ScrollProgress
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 3,
          background: 'var(--bwo-red)',
          zIndex: 60,
        }}
      />
    </div>
  );
}
