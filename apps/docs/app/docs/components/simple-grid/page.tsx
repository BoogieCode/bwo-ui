import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SimpleGridDemo } from './demo';

export const metadata = { title: 'SimpleGrid — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>SimpleGrid</h1>
      <p className="lead">
        Equal-column responsive grid. Pass a number or a responsive object (
        <code>{`{ sm, md, lg, xl }`}</code>) — or use <code>minChildWidth</code> for auto-fit.
      </p>

      <SimpleGridDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { SimpleGrid } from '@bwo-ui/react';

<SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={16}>
  {items.map((item) => <Card key={item.id} {...item} />)}
</SimpleGrid>

// or auto-fit:
<SimpleGrid minChildWidth={240} gap={16}>{...}</SimpleGrid>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'columns',
            type: 'number | { sm?, md?, lg?, xl? }',
            defaultValue: '1',
            description: 'Equal-width columns. Responsive object opt-in.',
          },
          {
            name: 'minChildWidth',
            type: 'string | number',
            description: 'Auto-fit grid with this minimum column width (overrides columns).',
          },
          { name: 'gap', type: 'string | number', description: 'Gap between cells.' },
          { name: 'columnGap', type: 'string | number', description: 'Overrides gap on x-axis.' },
          { name: 'rowGap', type: 'string | number', description: 'Overrides gap on y-axis.' },
          { name: 'as', type: 'ElementType', defaultValue: "'div'", description: 'Polymorphic element.' },
        ]}
      />
    </>
  );
}
