'use client';

import { TextShimmer } from '@bwo-ui/react';

export function TextShimmerDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 24, padding: 32, alignItems: 'center' }}
    >
      <TextShimmer
        as="h2"
        color="var(--bwo-text)"
        highlight="#ff481f"
        duration={2.4}
        style={{
          margin: 0,
          fontSize: 'clamp(28px, 6vw, 56px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        Ship the boogie.
      </TextShimmer>
      <TextShimmer
        color="var(--bwo-text-body)"
        highlight="var(--bwo-text)"
        duration={1.8}
        bandWidth={30}
        style={{ fontSize: 14, fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)' }}
      >
        npx bwo-ui add text-shimmer
      </TextShimmer>
    </div>
  );
}
