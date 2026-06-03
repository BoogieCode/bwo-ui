'use client';

import { DotLoader } from '@bwo-ui/react';

export function DotLoaderDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, padding: 24, alignItems: 'stretch' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <DotLoader size="sm" />
        <DotLoader size="md" />
        <DotLoader size="lg" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
        <DotLoader color="#ff481f" />
        <DotLoader color="#7463ff" dots={4} />
        <DotLoader color="#16a34a" dots={5} duration={1.6} />
      </div>
    </div>
  );
}
