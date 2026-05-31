'use client';

import { FloatingActionButton } from '@bwo-ui/react';

const PlusIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export function FloatingActionButtonDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 32,
        alignItems: 'center',
        padding: '32px 16px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <FloatingActionButton icon={PlusIcon} size="sm" position="static" />
        <FloatingActionButton icon={PlusIcon} size="md" position="static" />
        <FloatingActionButton icon={PlusIcon} size="lg" position="static" />
        <FloatingActionButton icon={PlusIcon} label="New item" position="static" />
        <FloatingActionButton icon={PlusIcon} label="Accent" variant="accent" position="static" />
        <FloatingActionButton icon={PlusIcon} variant="surface" position="static" />
      </div>
      <p style={{ fontSize: 13, color: 'var(--bwo-text-muted)', margin: 0 }}>
        Pass <code>position</code> to anchor the FAB to a viewport edge (default:{' '}
        <code>bottom-right</code>). Use <code>position="static"</code> to place inline.
      </p>
    </div>
  );
}
