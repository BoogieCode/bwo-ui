'use client';

import { ScrollArea } from '@bwo-ui/react';

const LONG = Array.from({ length: 30 }).map((_, i) => `Line ${String(i + 1).padStart(2, '0')} — keep scrolling, the wrapper handles the overflow.`);

export function ScrollAreaDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <ScrollArea
        maxHeight={220}
        style={{
          border: '1px solid var(--bwo-border)',
          borderRadius: 12,
          padding: 16,
          background: 'var(--bwo-surface)',
        }}
      >
        {LONG.map((line) => (
          <div
            key={line}
            style={{ fontSize: 13.5, color: 'var(--bwo-text-body)', padding: '4px 0' }}
          >
            {line}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
