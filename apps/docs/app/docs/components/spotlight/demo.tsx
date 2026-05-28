'use client';

import { Spotlight } from '@bwo-ui/react';

export function SpotlightDemo() {
  return (
    <div className="demo">
      <Spotlight size={340} color="rgba(255, 72, 31, 0.24)">
        <div
          style={{
            width: '100%',
            minHeight: 220,
            padding: 32,
            borderRadius: 16,
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Move the cursor across this surface.
        </div>
      </Spotlight>
    </div>
  );
}
