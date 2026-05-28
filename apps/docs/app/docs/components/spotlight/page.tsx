import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SpotlightDemo } from './demo';

export const metadata = { title: 'Spotlight — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Spotlight</h1>
      <p className="lead">
        Renders a soft radial light that follows the cursor inside the target. The element
        must be positioned (relative/absolute/fixed); clipping is up to you.
      </p>

      <SpotlightDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Spotlight } from '@bwo-ui/react';

<Spotlight size={320} color="rgba(255,72,31,0.18)">
  <div className="card">...</div>
</Spotlight>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'size', type: 'number', defaultValue: '320', description: 'Spotlight radius in px.' },
          {
            name: 'color',
            type: 'string',
            defaultValue: "'rgba(255,255,255,0.12)'",
            description: 'Any CSS colour the radial-gradient accepts.',
          },
          { name: 'duration', type: 'number', defaultValue: '0.4', description: 'Tween duration.' },
          { name: 'ease', type: 'string', defaultValue: "'power3.out'", description: 'GSAP ease.' },
          {
            name: 'hideOnLeave',
            type: 'boolean',
            defaultValue: 'true',
            description: 'When false, the spotlight stays visible after pointerleave.',
          },
        ]}
      />
    </>
  );
}
