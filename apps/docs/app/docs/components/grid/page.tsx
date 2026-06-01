import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { GridDemo } from './demo';

export const metadata = { title: 'Grid — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Grid</h1>
      <p className="lead">
        Full CSS Grid control — template columns/rows/areas, gaps, auto-flow. Pair with{' '}
        <code>GridItem</code> for span and area placement.
      </p>

      <GridDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Grid, GridItem } from '@bwo-ui/react';

<Grid
  templateAreas={[
    'hero hero side',
    'main main side',
    'foot foot foot',
  ]}
  templateColumns="1fr 1fr 220px"
  templateRows="110px 130px 70px"
  gap={12}
>
  <GridItem area="hero">Hero</GridItem>
  <GridItem area="side">Sidebar</GridItem>
  <GridItem area="main">Main</GridItem>
  <GridItem area="foot">Footer</GridItem>
</Grid>`}</CodeBlock>
      <p>
        Tip: <code>GridItem</code> doesn&apos;t style its own box — wrap your content in a{' '}
        <code>Card</code> (or any element with a background/border) so each cell is visible.
        Add <code>templateRows</code> when you want explicit row heights; otherwise rows are
        sized to their content.
      </p>

      <h2>Props — Grid</h2>
      <PropsTable
        rows={[
          { name: 'templateColumns', type: 'string | responsive', description: 'CSS grid-template-columns.' },
          { name: 'templateRows', type: 'string | responsive', description: 'CSS grid-template-rows.' },
          { name: 'templateAreas', type: 'string[]', description: 'One row per string (auto-wrapped in quotes).' },
          { name: 'columns', type: 'number | responsive', description: 'Convenience: repeat(N, 1fr).' },
          { name: 'rows', type: 'number | responsive', description: 'Convenience: repeat(N, auto).' },
          { name: 'autoFlow', type: "'row' | 'column' | 'dense' | 'row dense' | 'column dense'", description: 'grid-auto-flow.' },
          { name: 'autoRows', type: 'string | number', description: 'grid-auto-rows.' },
          { name: 'autoColumns', type: 'string | number', description: 'grid-auto-columns.' },
          { name: 'gap / columnGap / rowGap', type: 'string | number', description: 'Spacing controls.' },
        ]}
      />

      <h2>Props — GridItem</h2>
      <PropsTable
        rows={[
          { name: 'colSpan / rowSpan', type: 'number', description: 'span N tracks.' },
          { name: 'colStart / colEnd', type: 'number', description: 'Grid line placement.' },
          { name: 'rowStart / rowEnd', type: 'number', description: 'Grid line placement.' },
          { name: 'area', type: 'string', description: 'Named grid-area (must match templateAreas).' },
        ]}
      />
    </>
  );
}
