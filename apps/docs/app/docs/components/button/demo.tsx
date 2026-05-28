'use client';

import { Button } from '@bwo-ui/react';

export function ButtonDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap' }}>
      <Button>Primary</Button>
      <Button variant="green">Green</Button>
      <Button variant="yellow">Yellow</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="solid">Solid CTA</Button>
    </div>
  );
}
