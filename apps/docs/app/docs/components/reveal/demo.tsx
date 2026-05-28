'use client';

import { Reveal } from '@bwo-ui/react';

const block = {
  height: 80,
  borderRadius: 12,
  display: 'grid',
  placeItems: 'center',
  color: 'var(--bwo-white)',
  fontWeight: 600,
};

export function RevealDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      <Reveal direction="left">
        <div style={{ ...block, background: 'var(--bwo-black)' }}>From left</div>
      </Reveal>
      <Reveal direction="bottom">
        <div style={{ ...block, background: 'var(--bwo-red)' }}>From bottom</div>
      </Reveal>
      <Reveal direction="right">
        <div style={{ ...block, background: 'var(--bwo-green)' }}>From right</div>
      </Reveal>
    </div>
  );
}
