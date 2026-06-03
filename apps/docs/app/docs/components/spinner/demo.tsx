'use client';

import { Spinner } from '@bwo-ui/react';

export function SpinnerDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, padding: 24, alignItems: 'stretch' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Spinner color="#ff481f" />
        <Spinner color="#7463ff" />
        <Spinner color="#16a34a" />
        <Spinner strokeWidth={3} size="lg" />
      </div>
    </div>
  );
}
