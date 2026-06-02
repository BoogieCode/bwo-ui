'use client';

import { ScrollMask } from '@bwo-ui/react';

const TILES: { direction: 'left' | 'right' | 'top' | 'bottom' | 'center'; gradient: string }[] = [
  { direction: 'center', gradient: 'linear-gradient(135deg, #ff481f, #ffc446)' },
  { direction: 'left', gradient: 'linear-gradient(135deg, #7463ff, #0ea5e9)' },
  { direction: 'right', gradient: 'linear-gradient(135deg, #16a34a, #84cc16)' },
  { direction: 'top', gradient: 'linear-gradient(135deg, #ec4899, #ff481f)' },
];

export function ScrollMaskDemo() {
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
        Four tiles, four mask directions. The clip-path scrubs from <code>from</code>% to{' '}
        <code>0</code>% with scroll progress.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}
      >
        {TILES.map((t) => (
          <ScrollMask key={t.direction} direction={t.direction} from={48} scrub={0.5}>
            <div
              style={{
                aspectRatio: '4 / 3',
                borderRadius: 14,
                background: t.gradient,
                position: 'relative',
                color: '#fff',
                display: 'grid',
                placeItems: 'end start',
                padding: 16,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {t.direction}
              </span>
            </div>
          </ScrollMask>
        ))}
      </div>
    </div>
  );
}
