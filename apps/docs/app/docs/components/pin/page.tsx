import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PinDemo } from './demo';

export const metadata = { title: 'Pin — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Pin</h1>
      <p className="lead">
        Thin ergonomic wrapper around ScrollTrigger's <code>pin</code> option — keeps a
        section visible while you scroll past it.
      </p>

      <PinDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Pin } from '@bwo-ui/react';

<Pin end="+=200%">
  <section className="hero">...</section>
</Pin>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'start', type: 'string', defaultValue: "'top top'", description: 'ScrollTrigger start.' },
          {
            name: 'end',
            type: 'string',
            defaultValue: "'+=100%'",
            description: "Distance to keep pinned (any ScrollTrigger end value).",
          },
          {
            name: 'pinSpacing',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Add padding so following content does not jump.',
          },
          {
            name: 'enableMedia',
            type: 'string',
            description: 'Media query gate — pin only when matched.',
          },
          { name: 'anticipatePin', type: 'number', defaultValue: '0', description: 'Smoother handling on fast scroll.' },
        ]}
      />
    </>
  );
}
