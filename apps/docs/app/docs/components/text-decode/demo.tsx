'use client';

import { Button, TextDecode } from '@bwo-ui/react';
import { useState } from 'react';

export function TextDecodeDemo() {
  const [seed, setSeed] = useState(0);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 22, padding: 32, alignItems: 'center' }}
    >
      <TextDecode
        key={seed}
        as="h2"
        duration={1.6}
        speed={0.05}
        style={{
          margin: 0,
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--bwo-text)',
        }}
      >
        Decoding the boogie
      </TextDecode>
      <Button size="sm" onClick={() => setSeed((s) => s + 1)}>
        Replay
      </Button>
    </div>
  );
}
