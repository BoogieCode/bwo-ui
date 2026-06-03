'use client';

import { Container } from '@bwo-ui/react';

export function ContainerDemo() {
  const tile = {
    background: 'var(--bwo-grey-4)',
    border: '1px dashed var(--bwo-border)',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 13,
    color: 'var(--bwo-text-body)',
    textAlign: 'center' as const,
  };
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 12, padding: 0, alignItems: 'stretch' }}
    >
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Container key={s} size={s} style={tile}>
          size = <strong>{s}</strong>
        </Container>
      ))}
    </div>
  );
}
