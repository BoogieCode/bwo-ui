'use client';

import { TextGlitch } from '@bwo-ui/react';

export function TextGlitchDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, fontSize: 28, fontWeight: 700 }}
    >
      <TextGlitch trigger="mount" duration={1.6} intensity={0.5}>
        Boots up like a CRT
      </TextGlitch>
      <TextGlitch trigger="hover" duration={0.8} intensity={0.45}>
        Hover to glitch
      </TextGlitch>
    </div>
  );
}
