import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PulseDemo } from './demo';

export const metadata = { title: 'Pulse — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Pulse</h1>
      <p className="lead">
        Breathing pulse — fades opacity and shrinks slightly on each beat. Good for
        "live" / "recording" indicators or notification dots. CSS-only, respects{' '}
        <code>prefers-reduced-motion</code>.
      </p>

      <PulseDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Pulse } from '@bwo-ui/react';

<Pulse style={{ width: 8, height: 8, borderRadius: 9999, background: '#f59e0b' }} />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'duration', type: 'number', defaultValue: '1.8', description: 'Seconds per pulse cycle.' },
          { name: 'as', type: 'ElementType', defaultValue: "'span'", description: 'Element to render.' },
        ]}
      />
    </>
  );
}
