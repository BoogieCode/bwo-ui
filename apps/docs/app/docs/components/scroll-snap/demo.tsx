'use client';

import { ScrollSnap } from '@bwo-ui/react';

const TILES = [
  { label: 'Snap · 1', accent: '#ff481f' },
  { label: 'Snap · 2', accent: '#7463ff' },
  { label: 'Snap · 3', accent: '#16a34a' },
  { label: 'Snap · 4', accent: '#0ea5e9' },
  { label: 'Snap · 5', accent: '#ffc446' },
  { label: 'Snap · 6', accent: '#ec4899' },
];

export function ScrollSnapDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 14,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      <p style={{ margin: 0, color: 'var(--bwo-text-body)', fontSize: 13 }}>
        Swipe / scroll horizontally — every tile snaps to the start of the viewport.
      </p>
      <ScrollSnap
        axis="x"
        strictness="mandatory"
        align="start"
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          padding: '4px 0 18px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {TILES.map((t) => (
          <div
            key={t.label}
            style={{
              flex: '0 0 70%',
              height: 180,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)`,
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.015em',
            }}
          >
            {t.label}
          </div>
        ))}
      </ScrollSnap>
    </div>
  );
}
