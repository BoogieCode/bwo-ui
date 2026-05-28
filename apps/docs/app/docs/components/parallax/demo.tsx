'use client';

import { Parallax } from '@bwo-ui/react';

export function ParallaxDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 12,
        minHeight: 320,
        overflow: 'hidden',
      }}
    >
      <Parallax speed={100}>
        <div
          style={{
            width: '100%',
            padding: '40px 24px',
            background: 'linear-gradient(135deg, var(--bwo-red), var(--bwo-yellow))',
            color: 'var(--bwo-white)',
            borderRadius: 'var(--bwo-radius-md)',
            fontSize: 22,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Scroll the page — I&apos;ll drift up.
        </div>
      </Parallax>
      <Parallax speed={-60}>
        <div
          style={{
            width: '100%',
            padding: '24px',
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            borderRadius: 'var(--bwo-radius-md)',
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          And I drift down (negative speed).
        </div>
      </Parallax>
    </div>
  );
}
