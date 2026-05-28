'use client';

import {
  Button,
  Input,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@bwo-ui/react';

export function PopoverDemo() {
  return (
    <div className="demo">
      <PopoverRoot>
        <PopoverTrigger asChild>
          <Button>Edit profile</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="start" style={{ width: 280 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h4 style={{ fontSize: 15, margin: 0 }}>Update name</h4>
            <Input defaultValue="BOOGIE.RO" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
