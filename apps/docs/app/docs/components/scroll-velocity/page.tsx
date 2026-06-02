import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ScrollVelocityDemo } from './demo';

export const metadata = { title: 'ScrollVelocity — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrollVelocity</h1>
      <p className="lead">
        Distorts the wrapped element while the user scrolls — skews on one axis and slightly
        scales the other. Reads <code>ScrollTrigger.getVelocity()</code> each tick and lerps
        the transform back to rest the moment scrolling stops. Pairs with oversized headlines,
        gradient text, and marquees.
      </p>

      <ScrollVelocityDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrollVelocity } from '@bwo-ui/react';

<ScrollVelocity skew={8} scale={1.04}>
  <h1>Ride the scroll</h1>
</ScrollVelocity>

// On a horizontal marquee
<ScrollVelocity axis="x" skew={6}>
  <Marquee>…</Marquee>
</ScrollVelocity>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'skew',
            type: 'number',
            defaultValue: '8',
            description: 'Max absolute skew in degrees reached at peak scroll velocity.',
          },
          {
            name: 'scale',
            type: 'number',
            defaultValue: '1.04',
            description:
              'Max scale boost on the opposite axis at peak velocity (1.0 disables scaling).',
          },
          {
            name: 'saturate',
            type: 'number',
            defaultValue: '1200',
            description:
              'Velocity (px / tick) at which the effect reaches its skew/scale ceiling.',
          },
          {
            name: 'ease',
            type: 'number',
            defaultValue: '0.4',
            description: 'Seconds to smooth back to rest after scrolling stops.',
          },
          {
            name: 'axis',
            type: "'x' | 'y'",
            defaultValue: "'y'",
            description:
              'Axis to skew along. The opposite axis receives the scale boost.',
          },
          {
            name: 'as',
            type: 'ElementType',
            defaultValue: "'div'",
            description: 'HTML tag or component to render the wrapping element as.',
          },
        ]}
      />
    </>
  );
}
