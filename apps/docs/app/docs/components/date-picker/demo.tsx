'use client';

import { useState } from 'react';
import { DatePicker } from '@bwo-ui/react';

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="demo">
      <DatePicker value={date} onValueChange={setDate} />
    </div>
  );
}
