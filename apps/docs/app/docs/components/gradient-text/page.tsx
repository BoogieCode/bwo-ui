import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { GradientTextDemo } from './demo';

export const metadata = { title: 'GradientText — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>GradientText</h1>
      <p className="lead">
        Animated gradient text fill. Applies <code>background-clip: text</code> with a wide
        gradient that scrolls on a loop.
      </p>

      <GradientTextDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { GradientText } from '@bwo-ui/react';

<GradientText
  as="h1"
  gradient="linear-gradient(90deg, #ff481f, #ff9d00, #ff481f)"
  duration={5}
>
  Liquid hot
</GradientText>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'gradient',
            type: 'string',
            description: 'Any CSS gradient (no `background-image:` prefix).',
          },
          { name: 'duration', type: 'number', defaultValue: '6', description: 'Cycle duration in seconds.' },
          { name: 'angle', type: 'number', defaultValue: '90', description: 'Gradient angle (when using default gradient).' },
          { name: 'size', type: 'number', defaultValue: '300', description: 'Background size as %.' },
          {
            name: 'direction',
            type: "'left' | 'right'",
            defaultValue: "'right'",
            description: 'Direction the gradient flows.',
          },
          { name: 'animate', type: 'boolean', defaultValue: 'true', description: 'Set false to hold the gradient still.' },
        ]}
      />
    </>
  );
}
