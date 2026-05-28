import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { GlowDemo } from './demo';

export const metadata = { title: 'Glow — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Glow</h1>
      <p className="lead">
        Tri-color radial gradient backdrop. Drop it as a sibling at the top of a
        positioned container — it fills the parent (or the viewport with{' '}
        <code>fixed</code>) and content layered above shows the gradient through any
        transparent surfaces.
      </p>

      <GlowDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Glow } from '@bwo-ui/react';

<div style={{ position: 'relative', minHeight: 400 }}>
  <Glow x="90%" y="10%" />
  <main>{/* content sits on top */}</main>
</div>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'colors',
            type: '[string, string, string]',
            defaultValue: '[blue.15, yellow.12, red.10]',
            description: 'Three colour stops.',
          },
          { name: 'x', type: 'string', defaultValue: "'90%'", description: 'Gradient center, horizontal.' },
          { name: 'y', type: 'string', defaultValue: "'10%'", description: 'Gradient center, vertical.' },
          { name: 'base', type: 'string', defaultValue: '`var(--bwo-bg)`', description: 'Base color below the gradient.' },
          { name: 'fixed', type: 'boolean', defaultValue: 'false', description: 'Pin to viewport instead of parent.' },
        ]}
      />
    </>
  );
}
