'use client';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@bwo-ui/react';

export function SelectDemo() {
  return (
    <div className="demo">
      <SelectRoot defaultValue="apple">
        <SelectTrigger style={{ width: 240 }}>
          <SelectValue placeholder="Pick a fruit…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="durian">Durian</SelectItem>
          <SelectItem value="elderberry">Elderberry</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
