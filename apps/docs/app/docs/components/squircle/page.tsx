import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SquircleDemo } from './demo';

export const metadata = { title: 'Squircle — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Squircle</h1>
      <p className="lead">
        Superellipse / squircle clip-path container — corners follow the equation
        |x|<sup>n</sup> + |y|<sup>n</sup> = 1. <code>n=2</code> is a circle, <code>n=4</code>
        matches Apple&apos;s app-icon curve, larger n approaches a square. Pure CSS, no
        animation cost.
      </p>

      <SquircleDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Squircle } from '@bwo-ui/react';

<Squircle smoothness={4} style={{ width: 80, height: 80, background: '#ff481f' }}>
  <img src="/avatar.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</Squircle>

// Less curve, more square-ish
<Squircle smoothness={6}>
  <div>Card content…</div>
</Squircle>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'smoothness', type: 'number', defaultValue: '4', description: 'Exponent n. 2 = circle, 4 = iOS, 6+ = squarer.' },
          { name: 'resolution', type: 'number', defaultValue: '48', description: 'Number of points used to render the path. Higher = smoother edge.' },
          { name: 'as', type: 'ElementType', defaultValue: "'div'", description: 'Tag to render.' },
        ]}
      />
    </>
  );
}
