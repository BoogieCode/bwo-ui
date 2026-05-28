'use client';

import { Card, Lean } from '@bwo-ui/react';

export function LeanDemo() {
  const angles = [-1.5, 1.2, -0.8, 1.8];
  return (
    <div className="demo" style={{ gap: 16, padding: 32 }}>
      {angles.map((a, i) => (
        <Lean key={i} angle={a}>
          <Card
            radius="sm"
            interactive
            style={{
              width: 140,
              height: 180,
              display: 'grid',
              placeItems: 'center',
              background: ['#d4e4f7', '#d4f0e8', '#f7e0d4', '#f7e8f0'][i],
            }}
          >
            <span style={{ fontWeight: 600 }}>{a}°</span>
          </Card>
        </Lean>
      ))}
    </div>
  );
}
