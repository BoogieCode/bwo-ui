'use client';

import { Button, Shake, type ShakeHandle } from '@bwo-ui/react';
import { useRef, useState } from 'react';

export function ShakeDemo() {
  const ref = useRef<ShakeHandle>(null);
  const [errKey, setErrKey] = useState(0);
  const [pin, setPin] = useState('');

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 22, padding: 32, alignItems: 'stretch' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Shake ref={ref} intensity={10} cycles={6}>
          <Button>Click me, then shake</Button>
        </Shake>
        <Button variant="outline" onClick={() => ref.current?.shake()}>
          Trigger via ref
        </Button>
      </div>

      <div>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--bwo-text-body)',
            marginBottom: 8,
          }}
        >
          Reactive trigger — submit empty to shake the field
        </div>
        <Shake trigger={errKey} intensity={6}>
          <input
            type="text"
            className="bwo-input"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter a PIN…"
            style={{ width: 240 }}
          />
        </Shake>
        <Button
          size="sm"
          style={{ marginLeft: 8 }}
          onClick={() => {
            if (!pin) setErrKey((k) => k + 1);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
