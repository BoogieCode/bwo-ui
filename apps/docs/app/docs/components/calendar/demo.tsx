'use client';

import { useState } from 'react';
import { Calendar, type DateRange } from '@bwo-ui/react';

export function CalendarDemo() {
  const [single, setSingle] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  return (
    <div
      className="demo"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}
    >
      <Calendar
        mode="single"
        value={single}
        onValueChange={(v) => setSingle(v instanceof Date || v === null ? v : null)}
      />
      <Calendar
        mode="range"
        value={range}
        onValueChange={(v) => setRange(v && typeof v === 'object' && 'from' in v ? v : { from: null, to: null })}
      />
    </div>
  );
}
