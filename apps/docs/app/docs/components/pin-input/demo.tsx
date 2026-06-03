'use client';

import { Badge, PinInput } from '@bwo-ui/react';
import { useState } from 'react';

export function PinInputDemo() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const onComplete = (value: string) => {
    if (value === '123456') {
      setAccepted(true);
      setError(false);
    } else {
      setError(true);
      setAccepted(false);
    }
  };

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 16, padding: 24, alignItems: 'stretch' }}
    >
      <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
        Try the correct code: <code>123456</code>
      </p>
      <PinInput
        length={6}
        value={code}
        onValueChange={(v) => {
          setCode(v);
          if (error) setError(false);
          if (accepted) setAccepted(false);
        }}
        onComplete={onComplete}
        error={error}
        autoFocus
      />
      <div>
        {accepted && <Badge variant="green">Verified ✓</Badge>}
        {error && <Badge variant="red">Wrong code — try 123456</Badge>}
      </div>
    </div>
  );
}
