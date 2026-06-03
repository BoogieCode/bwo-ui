'use client';

import { PasswordInput } from '@bwo-ui/react';

export function PasswordInputDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 12, padding: 24, alignItems: 'stretch' }}
    >
      <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
        Type a password — the meter scores it 0–4. Click the eye to toggle visibility.
      </p>
      <PasswordInput placeholder="At least 8 characters" />
    </div>
  );
}
