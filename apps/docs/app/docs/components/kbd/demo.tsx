'use client';

import { Kbd } from '@bwo-ui/react';

export function KbdDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 16, padding: 24, alignItems: 'stretch' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13.5 }}>Open the command palette:</span>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13.5 }}>Sizes:</span>
        <Kbd size="sm">esc</Kbd>
        <Kbd size="md">enter</Kbd>
        <Kbd size="lg">shift</Kbd>
        <Kbd size="lg">⌘</Kbd>
      </div>
    </div>
  );
}
