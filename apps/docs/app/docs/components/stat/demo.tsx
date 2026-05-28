'use client';

import { Stat } from '@bwo-ui/react';

export function StatDemo() {
  return (
    <div className="demo" style={{ gap: 28, flexWrap: 'wrap' }}>
      <Stat label="Sites shipped" count={420} />
      <Stat label="Uptime" count={99.9} decimals={1} suffix="%" />
      <Stat label="Avg load" count={42} suffix=" ms" hint="last 30 days" />
      <Stat label="Version" value="v2.0" />
    </div>
  );
}
