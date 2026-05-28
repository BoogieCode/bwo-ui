'use client';

import { Input } from '@bwo-ui/react';

export function InputDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch', maxWidth: 380, marginInline: 'auto' }}>
      <div className="bwo-field">
        <label className="bwo-label" htmlFor="demo-email">
          Email
        </label>
        <Input id="demo-email" type="email" placeholder="you@boogie.ro" />
      </div>
      <div className="bwo-field">
        <label className="bwo-label" htmlFor="demo-error">
          Invalid example
        </label>
        <Input id="demo-error" invalid placeholder="Invalid" defaultValue="not-an-email" />
        <span className="bwo-error">Please enter a valid email address.</span>
      </div>
    </div>
  );
}
