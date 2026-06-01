'use client';

import { Card, CardTitle, SimpleGrid } from '@bwo-ui/react';

const ACCENTS = [
  'var(--bwo-red)',
  'var(--bwo-blue)',
  'var(--bwo-green)',
  'var(--bwo-yellow)',
  'var(--bwo-pink)',
  'var(--bwo-red-bright)',
  'var(--bwo-green-light)',
  'var(--bwo-black)',
];

export function SimpleGridDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', padding: 32 }}>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={14}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            style={{
              padding: 0,
              minHeight: 96,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(60% 80% at 30% 20%, ${ACCENTS[i % ACCENTS.length]}, transparent 70%)`,
                opacity: 0.12,
                pointerEvents: 'none',
              }}
            />
            <CardTitle
              style={{
                margin: 0,
                fontSize: 22,
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </CardTitle>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}
