'use client';

import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@bwo-ui/react';

export function DialogDemo() {
  return (
    <div className="demo">
      <DialogRoot>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm subscription</DialogTitle>
          <DialogDescription>
            You&apos;ll be charged €19/month starting today. Cancel anytime from settings.
          </DialogDescription>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="solid">Subscribe</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
