'use client';

import { BootScreen, Skeleton } from '@bwo-ui/react';
import { useState } from 'react';

export function BootScreenDemo() {
  const [key, setKey] = useState(0);

  return (
    <div
      className="demo"
      style={{ padding: 0, height: 360, position: 'relative', overflow: 'hidden' }}
    >
      <BootScreen key={key} timeout={1200} maxWidth={520}>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <Skeleton width={120} height={22} />
            <Skeleton width={80} height={28} />
          </div>
          <Skeleton width={180} height={14} style={{ marginBottom: 16, borderRadius: 9999 }} />
          <Skeleton height={36} style={{ width: '70%', marginBottom: 8 }} />
          <Skeleton height={36} style={{ width: '85%', marginBottom: 8 }} />
          <Skeleton height={36} style={{ width: '60%' }} />
        </div>
      </BootScreen>

      <div
        style={{
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--bwo-grey-4)',
          color: 'var(--bwo-text-body)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 16 }}>Real content shows after the boot screen fades out.</p>
          <button
            onClick={() => setKey((k) => k + 1)}
            className="bwo-btn bwo-btn--ghost bwo-btn--sm"
            type="button"
          >
            Replay boot
          </button>
        </div>
      </div>
    </div>
  );
}
