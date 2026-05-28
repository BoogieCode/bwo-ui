'use client';

import { Button, Progress } from '@bwo-ui/react';
import { useEffect, useState } from 'react';

export function ProgressDemo() {
  const [value, setValue] = useState(33);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 5));
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch', maxWidth: 360, marginInline: 'auto' }}
    >
      <Progress value={value} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span>Uploading…</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}%</span>
      </div>
      <Button onClick={() => setValue(0)} variant="ghost" size="sm">
        Reset
      </Button>
    </div>
  );
}
