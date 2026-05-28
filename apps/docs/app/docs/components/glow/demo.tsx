'use client';

import { Glow } from '@bwo-ui/react';

export function GlowDemo() {
  return (
    <div className="demo" style={{ padding: 0, position: 'relative', overflow: 'hidden', height: 320 }}>
      <Glow x="80%" y="20%" base="var(--bwo-white)" />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          padding: 24,
        }}
      >
        <div>
          <h3 style={{ marginBottom: 8 }}>Content sits above the glow</h3>
          <p style={{ color: 'var(--bwo-text-body)' }}>
            Transparent surfaces show the radial gradient through them.
          </p>
        </div>
      </div>
    </div>
  );
}
