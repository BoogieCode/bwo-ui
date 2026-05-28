'use client';

import { Separator } from '@bwo-ui/react';

export function SeparatorDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch' }}>
      <div>Section A</div>
      <Separator />
      <div>Section B</div>
      <Separator />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Item 1</span>
        <Separator orientation="vertical" style={{ height: 18 }} />
        <span>Item 2</span>
        <Separator orientation="vertical" style={{ height: 18 }} />
        <span>Item 3</span>
      </div>
    </div>
  );
}
