'use client';

import { Badge } from '@bwo-ui/react';

export function BadgeDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <Badge>Default</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="green">New</Badge>
      <Badge variant="yellow">Beta</Badge>
      <Badge variant="red">Hot</Badge>
      <Badge variant="soft">Soft</Badge>
    </div>
  );
}
