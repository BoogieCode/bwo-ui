'use client';

import { useState } from 'react';
import { Rate, type RateSymbol } from '@bwo-ui/react';

const SYMBOLS: RateSymbol[] = ['star', 'heart', 'thumb', 'bolt'];

export function RateDemo() {
  const [value, setValue] = useState(3.5);
  const [symbol, setSymbol] = useState<RateSymbol>('star');
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 24, alignItems: 'stretch' }}>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {SYMBOLS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSymbol(s)}
            style={{
              padding: '6px 12px',
              border: '1px solid var(--bwo-border)',
              background: s === symbol ? 'var(--bwo-black)' : 'transparent',
              color: s === symbol ? 'var(--bwo-white)' : 'var(--bwo-text-body)',
              borderRadius: 9999,
              fontFamily: 'inherit',
              fontSize: 12,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        <Rate value={value} onValueChange={setValue} icon={symbol} size="lg" allowHalf showValue />
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Rate defaultValue={4} icon={symbol} size="sm" />
          <Rate defaultValue={3} icon={symbol} size="md" />
          <Rate defaultValue={5} icon={symbol} size="lg" />
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Rate defaultValue={2.5} icon={symbol} allowHalf readOnly />
          <Rate defaultValue={4} icon={symbol} color="var(--bwo-red)" />
          <Rate defaultValue={3} icon={symbol} disabled />
        </div>
      </div>
    </div>
  );
}
