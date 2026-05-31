'use client';

import { useState } from 'react';
import { NumberInput } from '@bwo-ui/react';

export function NumberInputDemo() {
  const [qty, setQty] = useState<number | null>(1);
  const [price, setPrice] = useState<number | null>(19.99);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch', maxWidth: 320, marginInline: 'auto' }}>
      <div className="bwo-field">
        <label className="bwo-label">Quantity</label>
        <NumberInput value={qty} onValueChange={setQty} min={0} max={99} step={1} />
      </div>
      <div className="bwo-field">
        <label className="bwo-label">Price</label>
        <NumberInput
          value={price}
          onValueChange={setPrice}
          step={0.01}
          precision={2}
          min={0}
          prefix="$"
        />
      </div>
      <div className="bwo-field">
        <label className="bwo-label">No steppers</label>
        <NumberInput
          defaultValue={0.5}
          step={0.1}
          min={0}
          max={1}
          showSteppers={false}
          suffix="L"
        />
      </div>
    </div>
  );
}
