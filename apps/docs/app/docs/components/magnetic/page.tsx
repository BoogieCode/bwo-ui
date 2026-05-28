import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { MagneticDemo } from './demo';

export const metadata = { title: 'Magnetic — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Magnetic</h1>
      <p className="lead">
        Wraps a child element and pulls it toward the cursor when nearby. Smooth via GSAP&apos;s{' '}
        <code>quickTo</code>.
      </p>

      <MagneticDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Magnetic } from '@bwo-ui/react';

<Magnetic strength={0.4} radius={140}>
  <button>Get started</button>
</Magnetic>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'strength',
            type: 'number',
            defaultValue: '0.35',
            description: 'How strongly the element follows the cursor (0 = none, 1 = full).',
          },
          {
            name: 'radius',
            type: 'number',
            defaultValue: '120',
            description: 'Radius in px where the magnetic field is active.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '0.5',
            description: 'Tween duration on each pointer update.',
          },
          {
            name: 'ease',
            type: 'string',
            defaultValue: "'power3.out'",
            description: 'GSAP ease.',
          },
          {
            name: 'child',
            type: 'string',
            description:
              'Optional child selector. When set, the transform is applied to the child instead of the wrapper — useful when the wrapper has hover effects you want to stay in place.',
          },
        ]}
      />
    </>
  );
}
