import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SpinnerDemo } from './demo';

export const metadata = { title: 'Spinner — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Spinner</h1>
      <p className="lead">
        Rotating circular loader. Five sizes (xs, sm, md, lg, xl), colour follows
        <code> currentColor</code> by default so you can drop it into Button or Badge without
        wiring a prop.
      </p>

      <SpinnerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Spinner } from '@bwo-ui/react';

<Button disabled>
  <Spinner size="sm" /> Saving…
</Button>

<Spinner color="#ff481f" size="lg" strokeWidth={3} />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Width + height preset.' },
          { name: 'color', type: 'string', defaultValue: "'currentColor'", description: 'CSS colour for the stroke.' },
          { name: 'strokeWidth', type: 'number', defaultValue: '2', description: 'Stroke thickness in px.' },
          { name: 'label', type: 'string', defaultValue: "'Loading'", description: 'Accessible label (aria-label).' },
        ]}
      />
    </>
  );
}
