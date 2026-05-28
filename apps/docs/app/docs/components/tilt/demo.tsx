'use client';

import { Tilt } from '@bwo-ui/react';

export function TiltDemo() {
  return (
    <div className="demo" style={{ gap: 24, justifyContent: 'center' }}>
      <Tilt max={14} scale={1.04}>
        <div
          style={{
            width: 220,
            height: 280,
            borderRadius: 16,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--bwo-white)',
            background:
              'linear-gradient(135deg, var(--bwo-red), color-mix(in srgb, var(--bwo-red) 60%, var(--bwo-black)))',
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          }}
        >
          Tilt me
        </div>
      </Tilt>
    </div>
  );
}
