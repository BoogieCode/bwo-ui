'use client';

import { ColorPicker } from '@bwo-ui/react';
import { useState } from 'react';

export function ColorPickerDemo() {
  const [color, setColor] = useState('#ff481f');
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, padding: 24, alignItems: 'stretch' }}
    >
      <ColorPicker label="Accent" value={color} onValueChange={setColor} />
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          background: color,
          color: '#fff',
          fontWeight: 600,
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
        }}
      >
        --bwo-accent: {color}
      </div>
    </div>
  );
}
