'use client';

import { GradientText } from '@bwo-ui/react';

export function GradientTextDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, fontSize: 56, fontWeight: 800, lineHeight: 1 }}
    >
      <GradientText gradient="linear-gradient(90deg, #ff481f, #ff9d00, #ff481f)" duration={5}>
        Liquid hot
      </GradientText>
      <GradientText
        gradient="linear-gradient(90deg, #00b894, #00cec9, #6c5ce7, #00b894)"
        duration={6}
      >
        Northern lights
      </GradientText>
    </div>
  );
}
