'use client';

import { FlipList } from '@bwo-ui/react';
import { useState } from 'react';

const INITIAL = [1, 2, 3, 4, 5, 6, 7, 8];

export function FlipListDemo() {
  const [items, setItems] = useState(INITIAL);

  const shuffle = () => setItems((xs) => [...xs].sort(() => Math.random() - 0.5));
  const reset = () => setItems(INITIAL);

  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 18 }}>
      <FlipList
        flipKey={items.join(',')}
        duration={0.55}
        ease="power3.inOut"
        absolute
        stagger={0.02}
        className="flip-grid"
      >
        {items.map((n) => (
          <div key={n} className="flip-tile">
            {n}
          </div>
        ))}
      </FlipList>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={shuffle}>
          Shuffle
        </button>
        <button className="btn ghost" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
