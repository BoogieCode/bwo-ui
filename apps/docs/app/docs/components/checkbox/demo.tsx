'use client';

import { Checkbox } from '@bwo-ui/react';
import { useState } from 'react';

export function CheckboxDemo() {
  const [terms, setTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14, alignItems: 'flex-start', maxWidth: 360, marginInline: 'auto' }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <Checkbox checked={terms} onCheckedChange={(v) => setTerms(v === true)} />
        Accept terms of service
      </label>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <Checkbox checked={newsletter} onCheckedChange={(v) => setNewsletter(v === true)} />
        Send me the BOOGIE.RO newsletter
      </label>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#888' }}>
        <Checkbox disabled /> Disabled option
      </label>
    </div>
  );
}
