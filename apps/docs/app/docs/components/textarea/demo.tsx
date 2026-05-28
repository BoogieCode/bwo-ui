'use client';

import { Textarea } from '@bwo-ui/react';

export function TextareaDemo() {
  return (
    <div className="demo" style={{ alignItems: 'stretch', maxWidth: 480, marginInline: 'auto' }}>
      <Textarea placeholder="Spune-ne ce ai în minte…" rows={5} defaultValue="Salut! Aș vrea să discutăm despre…" />
    </div>
  );
}
