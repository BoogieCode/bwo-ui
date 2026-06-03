'use client';

import { AspectRatio } from '@bwo-ui/react';

export function AspectRatioDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { label: '16/9', value: 16 / 9, bg: 'linear-gradient(135deg, #ff481f, #ffc446)' },
          { label: '4/3', value: 4 / 3, bg: 'linear-gradient(135deg, #7463ff, #0ea5e9)' },
          { label: '1/1', value: 1, bg: 'linear-gradient(135deg, #16a34a, #84cc16)' },
        ].map((r) => (
          <div key={r.label}>
            <AspectRatio ratio={r.value}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: r.bg,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                {r.label}
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}
