'use client';

import { useState } from 'react';
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetRoot,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
} from '@bwo-ui/react';

const sides: SheetSide[] = ['right', 'left', 'top', 'bottom'];

export function SheetDemo() {
  const [side, setSide] = useState<SheetSide>('right');
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {sides.map((s) => (
          <Button key={s} variant={s === side ? 'primary' : 'ghost'} size="sm" onClick={() => setSide(s)}>
            {s}
          </Button>
        ))}
      </div>
      <SheetRoot>
        <SheetTrigger asChild>
          <Button>Open {side} sheet</Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Slide-over panel</SheetTitle>
            <SheetDescription>
              Use a Sheet for filters, profile menus, or any context that should overlay the page.
            </SheetDescription>
          </SheetHeader>
          <p style={{ fontSize: 14, color: 'var(--bwo-text-muted)' }}>
            Sheet content goes here. Press <kbd>Esc</kbd> or click the overlay to dismiss.
          </p>
        </SheetContent>
      </SheetRoot>
    </div>
  );
}
