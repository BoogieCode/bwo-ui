import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TiltDemo } from './demo';

export const metadata = { title: 'Tilt — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Tilt</h1>
      <p className="lead">
        3D mouse-tilt — rotates an element on X/Y based on pointer position. Auto-skips on
        touch-primary devices.
      </p>

      <TiltDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Tilt } from '@bwo-ui/react';

<Tilt max={12} scale={1.04}>
  <div className="card">...</div>
</Tilt>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'max', type: 'number', defaultValue: '14', description: 'Max rotation in degrees per axis.' },
          { name: 'perspective', type: 'number', defaultValue: '800', description: 'Scene perspective in px.' },
          { name: 'scale', type: 'number', defaultValue: '1.04', description: 'Scale while hovered.' },
          { name: 'duration', type: 'number', defaultValue: '0.4', description: 'Tween duration.' },
          { name: 'ease', type: 'string', defaultValue: "'power3.out'", description: 'GSAP ease.' },
          { name: 'reverse', type: 'boolean', defaultValue: 'false', description: 'Invert tilt direction.' },
          {
            name: 'glareSelector',
            type: 'string',
            description: 'Inner element to drive a glare background-position with.',
          },
        ]}
      />
    </>
  );
}
