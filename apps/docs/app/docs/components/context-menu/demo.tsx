'use client';

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@bwo-ui/react';

export function ContextMenuDemo() {
  return (
    <div className="demo">
      <ContextMenuTrigger
        menu={
          <ContextMenuContent>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuItem onSelect={() => alert('Copy')}>Copy</ContextMenuItem>
            <ContextMenuItem onSelect={() => alert('Cut')}>Cut</ContextMenuItem>
            <ContextMenuItem onSelect={() => alert('Paste')}>Paste</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => alert('Delete')}>Delete</ContextMenuItem>
          </ContextMenuContent>
        }
      >
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            padding: 32,
            border: '2px dashed var(--bwo-border)',
            borderRadius: 'var(--bwo-radius-md)',
            textAlign: 'center',
            color: 'var(--bwo-text-muted)',
            cursor: 'context-menu',
          }}
        >
          Right-click anywhere inside this box
        </div>
      </ContextMenuTrigger>
    </div>
  );
}
