'use client';

import { Slider } from '@bwo-ui/react';
import { useState } from 'react';

export function SliderDemo() {
  const [single, setSingle] = useState([40]);
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 24, alignItems: 'stretch', maxWidth: 420, marginInline: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>Volume</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{single[0]}</span>
        </div>
        <Slider value={single} onValueChange={setSingle} min={0} max={100} step={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>Price range</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            {range[0]} – {range[1]} €
          </span>
        </div>
        <Slider value={range} onValueChange={setRange} min={0} max={100} step={1} />
      </div>
    </div>
  );
}
