'use client';

import { Magnetic } from '@bwo-ui/react';

export function MagneticDemo() {
  return (
    <div className="demo" style={{ gap: 24 }}>
      <Magnetic strength={0.45} radius={160}>
        <button className="btn">Hover near me</button>
      </Magnetic>
      <Magnetic strength={0.3} radius={120}>
        <button className="btn ghost">Or me</button>
      </Magnetic>
    </div>
  );
}
