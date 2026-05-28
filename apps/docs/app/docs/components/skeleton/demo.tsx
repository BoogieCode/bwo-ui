'use client';

import { Skeleton } from '@bwo-ui/react';

export function SkeletonDemo() {
  return (
    <div
      className="demo"
      style={{ alignItems: 'stretch', maxWidth: 380, marginInline: 'auto', flexDirection: 'column', gap: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton circle width={44} height={44} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton height={14} style={{ width: '60%' }} />
          <Skeleton height={12} style={{ width: '40%' }} />
        </div>
      </div>
      <Skeleton height={120} />
      <Skeleton height={12} style={{ width: '90%' }} />
      <Skeleton height={12} style={{ width: '75%' }} />
    </div>
  );
}
