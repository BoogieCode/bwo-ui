'use client';

import { Button, MagneticCursor } from '@bwo-ui/react';
import { useState } from 'react';

export function MagneticCursorDemo() {
  const [on, setOn] = useState(false);

  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14 }}>
      {on && <MagneticCursor color="#ff481f" hoverSize={48} />}
      <p style={{ marginBottom: 0, textAlign: 'center', maxWidth: 460 }}>
        Toggle the cursor and move around the page. It grows when hovering any link or button.
      </p>
      <Button onClick={() => setOn((v) => !v)} variant={on ? 'outline' : 'primary'}>
        {on ? 'Disable cursor' : 'Enable cursor'}
      </Button>
    </div>
  );
}
