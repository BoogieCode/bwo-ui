'use client';

import { TimePicker } from '@bwo-ui/react';
import { useState } from 'react';

export function TimePickerDemo() {
  const [time24, setTime24] = useState('14:30');
  const [time12, setTime12] = useState('09:15');
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 22, padding: 24, alignItems: 'stretch' }}
    >
      <div>
        <div style={labelStyle}>24-hour · 5-minute steps</div>
        <TimePicker value={time24} onValueChange={setTime24} step={5} />
        <p style={metaStyle}>
          value = <code>{time24}</code>
        </p>
      </div>
      <div>
        <div style={labelStyle}>12-hour · with seconds</div>
        <TimePicker
          format="12h"
          withSeconds
          value={time12}
          onValueChange={setTime12}
        />
        <p style={metaStyle}>
          value = <code>{time12}</code>
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--bwo-text-body)',
  marginBottom: 8,
};
const metaStyle: React.CSSProperties = {
  margin: '8px 0 0',
  fontSize: 11.5,
  fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
  color: 'var(--bwo-text-body)',
};
