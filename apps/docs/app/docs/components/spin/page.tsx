import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SpinDemo } from './demo';

export const metadata = { title: 'Spin — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Spin</h1>
      <p className="lead">
        Continuous rotation on a child — CSS-only, constant linear speed. Use for
        sparkles, loaders, accent glyphs. Respects{' '}
        <code>prefers-reduced-motion</code>.
      </p>

      <SpinDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Spin } from '@bwo-ui/react';

<Spin duration={9}>
  <svg width="16" height="16">...</svg>
</Spin>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'duration', type: 'number', defaultValue: '6', description: 'Seconds for one full rotation.' },
          { name: 'as', type: 'ElementType', defaultValue: "'span'", description: 'Element to render.' },
        ]}
      />
    </>
  );
}
