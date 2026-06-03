import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ScrollAreaDemo } from './demo';

export const metadata = { title: 'ScrollArea — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrollArea</h1>
      <p className="lead">
        Bounded scroll container with a subtle top/bottom fade so the edges blend into the
        surrounding layout. Thin scrollbar, touch-friendly inertia.
      </p>

      <ScrollAreaDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrollArea } from '@bwo-ui/react';

<ScrollArea maxHeight={400}>
  {messages.map(m => <Message key={m.id} {...m} />)}
</ScrollArea>

<ScrollArea axis="x" maxWidth="100%">
  <Toolbar />
</ScrollArea>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'axis', type: "'x' | 'y' | 'both' | 'auto'", defaultValue: "'y'", description: 'Axis allowed to scroll on overflow.' },
          { name: 'maxHeight', type: 'number | string', description: 'Cap on height. Number → px.' },
          { name: 'maxWidth', type: 'number | string', description: 'Cap on width.' },
          { name: 'fade', type: 'boolean', defaultValue: 'true', description: 'Render a soft top/bottom mask gradient.' },
        ]}
      />
    </>
  );
}
