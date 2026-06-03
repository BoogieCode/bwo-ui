'use client';

import { VisuallyHidden } from '@bwo-ui/react';

const X = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export function VisuallyHiddenDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
        The close button below renders only the × icon — but a screen reader hears
        "Dismiss notification" because the label is wrapped in <code>VisuallyHidden</code>.
      </p>
      <div>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 9999,
            background: 'transparent',
            color: 'var(--bwo-text)',
            border: '1px solid var(--bwo-border)',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
          }}
        >
          {X}
          <VisuallyHidden>Dismiss notification</VisuallyHidden>
        </button>
      </div>
    </div>
  );
}
