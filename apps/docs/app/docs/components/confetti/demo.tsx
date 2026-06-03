'use client';

import { Button, Confetti, type ConfettiHandle } from '@bwo-ui/react';
import { useRef } from 'react';

export function ConfettiDemo() {
  const burst = useRef<ConfettiHandle>(null);
  const cone = useRef<ConfettiHandle>(null);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 22, padding: 32, alignItems: 'center' }}
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Confetti ref={burst} count={80} spread={360} velocity={420}>
          <Button size="md" onClick={() => burst.current?.fire()}>
            🎉 Burst from centre
          </Button>
        </Confetti>
        <Confetti ref={cone} count={60} spread={70} angle={0} velocity={600}>
          <Button size="md" variant="outline" onClick={() => cone.current?.fire()}>
            ⬆ Upward cone
          </Button>
        </Confetti>
      </div>
      <p style={{ margin: 0, fontSize: 12.5, color: 'var(--bwo-text-body)' }}>
        Each click mounts a fresh particle layer at the button. Particles clean themselves up
        after the lifetime expires.
      </p>
    </div>
  );
}
