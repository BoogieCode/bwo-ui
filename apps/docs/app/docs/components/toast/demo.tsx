'use client';

import { Button, Toaster, useToast } from '@bwo-ui/react';

function TriggerButtons() {
  const { toast } = useToast();
  return (
    <>
      <Button onClick={() => toast({ title: 'Saved', description: 'Your changes are live.' })}>
        Show toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            title: 'Network error',
            description: 'Retry in a moment.',
            duration: 7000,
          })
        }
      >
        Show longer
      </Button>
    </>
  );
}

export function ToastDemo() {
  return (
    <div className="demo">
      <Toaster>
        <TriggerButtons />
      </Toaster>
    </div>
  );
}
