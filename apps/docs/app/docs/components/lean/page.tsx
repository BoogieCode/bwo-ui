import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { LeanDemo } from './demo';

export const metadata = { title: 'Lean — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Lean</h1>
      <p className="lead">
        Static CSS rotation that snaps back to <code>0deg</code> with a slight lift
        when hovered or focused. Useful for resting card tilts where pointing at a
        tile "fixes" the angle. Pure CSS — respects{' '}
        <code>prefers-reduced-motion</code>.
      </p>

      <LeanDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Lean, Card } from '@bwo-ui/react';

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
  <Lean angle={-1.2}><Card>Card A</Card></Lean>
  <Lean angle={ 1.5}><Card>Card B</Card></Lean>
  <Lean angle={-0.8}><Card>Card C</Card></Lean>
</div>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'angle', type: 'number', description: 'Resting rotation in degrees. Snaps to 0deg on hover/focus.' },
          { name: 'as', type: 'ElementType', defaultValue: "'div'", description: 'Element to render.' },
        ]}
      />
    </>
  );
}
