'use client';

import { CountUp } from '@bwo-ui/react';

export function CountUpDemo() {
  return (
    <div className="demo" style={{ gap: 40, justifyContent: 'space-around', fontSize: 40, fontWeight: 700 }}>
      <CountUp to={2_500_000} duration={2} />
      <CountUp to={98} suffix="%" duration={1.6} />
      <CountUp to={4200} prefix="$" separator="," />
    </div>
  );
}
