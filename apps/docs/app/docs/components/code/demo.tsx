'use client';

import { Code } from '@bwo-ui/react';

export function CodeDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, padding: 24, alignItems: 'stretch' }}
    >
      <p style={{ margin: 0, fontSize: 14, color: 'var(--bwo-text-body)' }}>
        Inline: install with <Code>pnpm add @bwo-ui/react</Code>, then import primitives from{' '}
        <Code>{`'@bwo-ui/react'`}</Code>.
      </p>
      <Code display="block" lang="tsx">{`import { Button, Card } from '@bwo-ui/react';

export function Cta() {
  return (
    <Card>
      <Button variant="solid">Ship it</Button>
    </Card>
  );
}`}</Code>
    </div>
  );
}
