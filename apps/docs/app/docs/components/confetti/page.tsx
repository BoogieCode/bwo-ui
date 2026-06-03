import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ConfettiDemo } from './demo';

export const metadata = { title: 'Confetti — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Confetti</h1>
      <p className="lead">
        DOM-based particle burst — no canvas, no third-party lib, no extra runtime dep. The
        component renders an invisible anchor; call <code>ref.current.fire()</code> to spawn a
        fresh particle layer at that anchor. Each particle follows projectile motion (initial
        velocity + gravity), with randomised colour, size, and rotation. GSAP-backed.
      </p>

      <ConfettiDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Confetti, ConfettiHandle, Button } from '@bwo-ui/react';
import { useRef } from 'react';

const ref = useRef<ConfettiHandle>(null);

<Confetti ref={ref} count={80} spread={360}>
  <Button onClick={() => ref.current?.fire()}>🎉</Button>
</Confetti>

// Override per-fire — for "wins go faster, losses go slower" etc.
ref.current?.fire({ velocity: 800, colors: ['#16a34a'] });`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'count', type: 'number', defaultValue: '60', description: 'Number of particles per fire.' },
          { name: 'spread', type: 'number', defaultValue: '90', description: 'Spread arc in degrees. 360 = burst in all directions.' },
          { name: 'angle', type: 'number', defaultValue: '0', description: 'Origin angle in degrees (0 = up).' },
          { name: 'velocity', type: 'number', defaultValue: '560', description: 'Initial velocity in pixels per second.' },
          { name: 'gravity', type: 'number', defaultValue: '1400', description: 'Downward pull on particles (px / s²).' },
          { name: 'duration', type: 'number', defaultValue: '1.6', description: 'Particle lifetime in seconds.' },
          { name: 'size', type: '[min, max]', defaultValue: '[6, 12]', description: 'Particle size range in pixels.' },
          { name: 'colors', type: 'string[]', description: 'Palette to randomise from.' },
          { name: 'origin', type: '{ x: number; y: number }', description: 'Origin offset within the anchor (default = centre).' },
          { name: 'zIndex', type: 'number', defaultValue: '9999', description: 'Z-index for the particle layer.' },
        ]}
      />
    </>
  );
}
