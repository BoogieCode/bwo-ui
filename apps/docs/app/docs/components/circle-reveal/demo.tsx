'use client';

import { Button, CircleReveal } from '@bwo-ui/react';
import { useState } from 'react';

export function CircleRevealDemo() {
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState<'open' | 'close'>('open');
  const [originX, setOriginX] = useState<string>('50%');
  const [originY, setOriginY] = useState<string>('50%');

  const replay = (nextMode: 'open' | 'close') => {
    setMode(nextMode);
    setKey((k) => k + 1);
  };

  const setOrigin = (x: string, y: string) => {
    setOriginX(x);
    setOriginY(y);
    setKey((k) => k + 1);
  };

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
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Button size="sm" variant="solid" onClick={() => replay('open')}>
          Open iris
        </Button>
        <Button size="sm" variant="outline" onClick={() => replay('close')}>
          Close iris
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOrigin('50%', '50%')}>
          Center
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOrigin('15%', '15%')}>
          Top-left
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOrigin('85%', '85%')}>
          Bottom-right
        </Button>
      </div>

      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
          color: 'var(--bwo-text-body)',
        }}
      >
        mode=<strong>{mode}</strong> · origin=<strong>{originX} {originY}</strong>
      </div>

      <CircleReveal
        key={`${key}-${mode}-${originX}-${originY}`}
        mode={mode}
        origin={{ x: originX, y: originY }}
        duration={0.85}
      >
        <div
          style={{
            aspectRatio: '16 / 9',
            borderRadius: 14,
            background:
              'linear-gradient(135deg, #ff481f 0%, #ec4899 45%, #7463ff 100%)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            position: 'relative',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(420px 220px at 30% 30%, rgba(255, 255, 255, 0.28), transparent 60%)',
            }}
          />
          <span style={{ position: 'relative' }}>iris {mode}</span>
        </div>
      </CircleReveal>
    </div>
  );
}
