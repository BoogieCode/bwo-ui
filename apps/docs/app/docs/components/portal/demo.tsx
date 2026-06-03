'use client';

import { Button, Portal } from '@bwo-ui/react';
import { useState } from 'react';

export function PortalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
        The toast below renders into <code>document.body</code> — even though the trigger is
        nested deep in this demo card.
      </p>
      <div>
        <Button onClick={() => setOpen((v) => !v)}>
          {open ? 'Hide portalled overlay' : 'Show portalled overlay'}
        </Button>
      </div>
      {open && (
        <Portal>
          <div
            role="status"
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              padding: '12px 16px',
              background: 'var(--bwo-text)',
              color: 'var(--bwo-surface)',
              borderRadius: 12,
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
              fontSize: 13.5,
              zIndex: 200,
            }}
          >
            ✨ Rendered via &lt;Portal /&gt;
          </div>
        </Portal>
      )}
    </div>
  );
}
