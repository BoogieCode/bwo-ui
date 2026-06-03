'use client';

import { Button, Empty } from '@bwo-ui/react';

const Inbox = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 13l3-8h12l3 8M3 13v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 13h5l2 3h4l2-3h5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export function EmptyDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, padding: 0, alignItems: 'stretch' }}
    >
      <div
        style={{
          border: '1px solid var(--bwo-border)',
          borderRadius: 'var(--bwo-radius-md)',
        }}
      >
        <Empty
          icon={Inbox}
          title="Nothing in your inbox"
          description="Once an invite lands, it'll show up here. We'll also email you."
          action={<Button size="sm">Send an invite</Button>}
        />
      </div>
    </div>
  );
}
