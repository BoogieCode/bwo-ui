'use client';

import { Pulse, Badge } from '@bwo-ui/react';

export function PulseDemo() {
  const dotStyle = (color: string) => ({
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: 9999,
    background: color,
  } as const);
  return (
    <div className="demo" style={{ gap: 24, alignItems: 'center' }}>
      <Badge variant="solid" radius="pill" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <Pulse style={dotStyle('#f59e0b')} />
        În curând
      </Badge>
      <Badge variant="green" radius="pill" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <Pulse style={dotStyle('#10b981')} duration={1.2} />
        Live
      </Badge>
      <Badge variant="red" radius="pill" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <Pulse style={dotStyle('#ffffff')} duration={0.9} />
        Recording
      </Badge>
    </div>
  );
}
