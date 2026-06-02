'use client';

import { ScrollVelocity } from '@bwo-ui/react';

export function ScrollVelocityDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 16,
        padding: 0,
        alignItems: 'stretch',
      }}
    >
      <p
        style={{
          margin: 0,
          padding: '20px 24px 0',
          color: 'var(--bwo-text-body)',
          fontSize: 13,
        }}
      >
        Scroll the outer page — the headline skews with scroll velocity and lerps back to rest
        the moment you stop.
      </p>
      <ScrollVelocity skew={10} scale={1.04}>
        <h2
          style={{
            margin: 0,
            padding: '36px 24px',
            fontSize: 'clamp(40px, 7vw, 80px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.96,
            fontWeight: 800,
            textAlign: 'center',
            backgroundImage:
              'linear-gradient(135deg, #ff481f 0%, #ec4899 50%, #7463ff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Ride the scroll
        </h2>
      </ScrollVelocity>
      <p
        style={{
          margin: 0,
          padding: '0 24px 20px',
          color: 'var(--bwo-text-body)',
          fontSize: 12,
          fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
        }}
      >
        skew=10 · scale=1.04 · ease=0.4s
      </p>
    </div>
  );
}
