'use client';

import { Switch } from '@bwo-ui/react';
import { useState } from 'react';

export function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14, alignItems: 'flex-start', maxWidth: 360, marginInline: 'auto' }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <Switch checked={on} onCheckedChange={setOn} />
        {on ? 'Receiving notifications' : 'Silenced'}
      </label>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: '#888' }}>
        <Switch disabled /> Disabled toggle
      </label>
    </div>
  );
}
