import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { RippleDemo } from './demo';

export const metadata = { title: 'Ripple — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Ripple</h1>
      <p className="lead">
        Material-style click ripple. Adds a <code>&lt;span&gt;</code> per click that radiates
        from the click point, fades out, and removes itself.
      </p>

      <RippleDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Ripple } from '@bwo-ui/react';

<Ripple color="rgba(255,255,255,0.5)">
  <button>Tap me</button>
</Ripple>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'color', type: 'string', defaultValue: "'rgba(255,255,255,0.45)'", description: 'Ripple colour.' },
          { name: 'duration', type: 'number', defaultValue: '0.7', description: 'Per-ripple duration.' },
          { name: 'opacity', type: 'number', defaultValue: '0', description: 'End opacity.' },
          { name: 'ease', type: 'string', defaultValue: "'power2.out'", description: 'GSAP ease.' },
          {
            name: 'respectDisabled',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Ignore clicks on disabled / aria-disabled elements.',
          },
        ]}
      />
    </>
  );
}
