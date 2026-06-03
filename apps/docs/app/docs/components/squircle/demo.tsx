'use client';

import { Squircle } from '@bwo-ui/react';

const SAMPLES = [
  { label: 'iOS · n=4', smoothness: 4, gradient: 'linear-gradient(135deg, #ff481f, #ffc446)' },
  { label: 'n=2 · circle', smoothness: 2, gradient: 'linear-gradient(135deg, #7463ff, #0ea5e9)' },
  { label: 'n=6 · squarer', smoothness: 6, gradient: 'linear-gradient(135deg, #16a34a, #84cc16)' },
  { label: 'n=10 · near-square', smoothness: 10, gradient: 'linear-gradient(135deg, #ec4899, #ff481f)' },
];

export function SquircleDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 14,
        }}
      >
        {SAMPLES.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <Squircle smoothness={s.smoothness}>
              <div
                style={{
                  aspectRatio: '1 / 1',
                  background: s.gradient,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: '-0.01em',
                }}
              >
                Squircle
              </div>
            </Squircle>
            <div
              style={{
                marginTop: 8,
                fontSize: 11.5,
                color: 'var(--bwo-text-body)',
                fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
