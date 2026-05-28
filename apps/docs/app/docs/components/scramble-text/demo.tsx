'use client';

import { Button, ScrambleText } from '@bwo-ui/react';
import { useState } from 'react';

export function ScrambleTextDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16 }}>
      <ScrambleText
        key={key}
        as="h2"
        chars="!@#$%^&*01"
        duration={1.6}
        style={{ fontSize: 32, letterSpacing: '-0.02em', textAlign: 'center' }}
      >
        Motion that reads as craft.
      </ScrambleText>
      <ScrambleText
        trigger="hover"
        chars="01"
        duration={0.6}
        style={{
          fontSize: 14,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--bwo-text-body)',
          cursor: 'pointer',
        }}
      >
        HOVER FOR A SCRAMBLE
      </ScrambleText>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
    </div>
  );
}
