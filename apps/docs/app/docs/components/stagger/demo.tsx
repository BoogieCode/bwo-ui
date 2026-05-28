'use client';

import { Stagger } from '@bwo-ui/react';

const tile = {
  height: 80,
  borderRadius: 12,
  background: 'var(--bwo-grey-4)',
  display: 'grid',
  placeItems: 'center',
  fontWeight: 600,
  color: 'var(--bwo-black)',
};

export function StaggerDemo() {
  return (
    <div className="demo" style={{ padding: 12 }}>
      <Stagger
        stagger={0.08}
        from={{ y: 40, opacity: 0 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          width: '100%',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={tile}>
            {i + 1}
          </div>
        ))}
      </Stagger>
    </div>
  );
}
