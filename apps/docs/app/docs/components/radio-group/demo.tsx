'use client';

import { RadioGroupItem, RadioGroupRoot } from '@bwo-ui/react';
import { useState } from 'react';

export function RadioGroupDemo() {
  const [billing, setBilling] = useState('monthly');
  return (
    <div className="demo" style={{ alignItems: 'flex-start', maxWidth: 360, marginInline: 'auto' }}>
      <RadioGroupRoot value={billing} onValueChange={setBilling}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <RadioGroupItem value="monthly" /> Monthly &mdash; €19/mo
        </label>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <RadioGroupItem value="annual" /> Annual &mdash; €182/yr (save 20%)
        </label>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <RadioGroupItem value="lifetime" /> Lifetime &mdash; €499 once
        </label>
      </RadioGroupRoot>
    </div>
  );
}
