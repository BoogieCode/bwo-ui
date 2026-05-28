'use client';

import { AppShell, BrandMark, Button } from '@bwo-ui/react';

export function AppShellDemo() {
  return (
    <div
      className="demo"
      style={{
        padding: 0,
        height: 360,
        background: 'var(--bwo-grey-4)',
        alignItems: 'stretch',
      }}
    >
      <AppShell
        maxWidth={520}
        header={
          <>
            <BrandMark brand="BOOGIE" tld=".RO" href="#" />
            <div style={{ display: 'inline-flex', gap: 8 }}>
              <Button size="sm" variant="ghost">Ghid</Button>
              <Button size="sm" variant="outline">Login</Button>
            </div>
          </>
        }
        footer={
          <>
            <span>#crafted-in-ro</span>
            <span>@bwo-ui/react</span>
          </>
        }
        style={{ height: '100%', background: 'var(--bwo-white)' }}
      >
        <div style={{ padding: 24, color: 'var(--bwo-text-body)' }}>
          <p>This is the scrollable content slot.</p>
          <p style={{ marginTop: 12 }}>
            Header and footer stay pinned while this section scrolls.
          </p>
        </div>
      </AppShell>
    </div>
  );
}
