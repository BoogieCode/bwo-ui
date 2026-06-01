'use client';

import { AppShell, BrandMark, Button, type AppShellAlign } from '@bwo-ui/react';
import { useState } from 'react';

const ALIGNS: AppShellAlign[] = ['left', 'center', 'right'];

export function AppShellDemo() {
  const [align, setAlign] = useState<AppShellAlign>('center');

  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {ALIGNS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setAlign(value)}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              border: '1px solid var(--bwo-border)',
              background:
                value === align ? 'var(--bwo-black)' : 'var(--bwo-white)',
              color: value === align ? 'var(--bwo-white)' : 'var(--bwo-text)',
              fontFamily: 'inherit',
              fontSize: 12.5,
              fontWeight: 500,
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            align: {value}
          </button>
        ))}
      </div>

      <div
        style={{
          height: 360,
          background: 'var(--bwo-grey-4)',
          border: '1px dashed var(--bwo-border)',
          borderRadius: 'var(--bwo-radius-md)',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <AppShell
          maxWidth={420}
          align={align}
          header={
            <>
              <BrandMark brand="BOOGIE" tld=".RO" href="#" />
              <div style={{ display: 'inline-flex', gap: 8 }}>
                <Button size="sm" variant="ghost">
                  Ghid
                </Button>
                <Button size="sm" variant="outline">
                  Login
                </Button>
              </div>
            </>
          }
          footer={
            <>
              <span>align = {align}</span>
              <span>@bwo-ui/react</span>
            </>
          }
          style={{ height: '100%', background: 'var(--bwo-white)' }}
        >
          <div style={{ padding: 24, color: 'var(--bwo-text-body)' }}>
            <p style={{ marginBottom: 8 }}>
              This is the scrollable content slot.
            </p>
            <p>
              Header and footer stay pinned while this section scrolls. The shell hugs the{' '}
              <strong>{align}</strong> edge of the parent — open the picker above to flip it.
            </p>
          </div>
        </AppShell>
      </div>
    </div>
  );
}
