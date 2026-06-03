'use client';

import { Avatar, Button, HoverCard } from '@bwo-ui/react';

export function HoverCardDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 24, padding: 32, alignItems: 'center' }}
    >
      <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
        Hover the avatar — a card portals to the body with a 200ms enter delay.
      </p>
      <HoverCard
        side="bottom"
        trigger={
          <span style={{ display: 'inline-block', cursor: 'pointer' }}>
            <Avatar
              fallback="AR"
              size="lg"
              style={{ background: '#ff481f', color: '#fff' }}
            />
          </span>
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <Avatar fallback="AR" size="md" style={{ background: '#ff481f', color: '#fff' }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Ana Radu</div>
            <div style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
              Lead motion designer
            </div>
          </div>
        </div>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--bwo-text-body)', lineHeight: 1.5 }}>
          Shipped the new motion playbook last quarter. Currently hiring a junior on her team.
        </p>
        <Button size="sm" variant="outline">View profile</Button>
      </HoverCard>
    </div>
  );
}
