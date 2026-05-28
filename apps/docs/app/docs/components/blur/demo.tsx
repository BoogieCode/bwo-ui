'use client';

import { Blur } from '@bwo-ui/react';

export function BlurDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch' }}>
      <Blur from={20} fade>
        <div
          style={{
            padding: 28,
            borderRadius: 12,
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Sharpens into focus on enter.
        </div>
      </Blur>
      <Blur from={28} duration={1.4} fade={false}>
        <div
          style={{
            padding: 28,
            borderRadius: 12,
            background: 'var(--bwo-grey-4)',
            color: 'var(--bwo-black)',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          No fade, just blur.
        </div>
      </Blur>
    </div>
  );
}
