import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { RevealDemo } from './demo';

export const metadata = { title: 'Reveal — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Reveal</h1>
      <p className="lead">
        Clip-path reveal — the element is hidden behind a mask that opens in the requested
        direction when it scrolls into view. Good for images and section reveals.
      </p>

      <RevealDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Reveal } from '@bwo-ui/react';

<Reveal direction="bottom" duration={1.0}>
  <img src="..." />
</Reveal>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'direction',
            type: "'left' | 'right' | 'top' | 'bottom'",
            defaultValue: "'bottom'",
            description: 'Side the content emerges from.',
          },
          { name: 'duration', type: 'number', defaultValue: '1.0', description: 'Seconds.' },
          { name: 'ease', type: 'string', defaultValue: "'expo.out'", description: 'GSAP ease.' },
          { name: 'start', type: 'string', defaultValue: "'top 85%'", description: 'ScrollTrigger start.' },
          { name: 'once', type: 'boolean', defaultValue: 'true', description: 'Play only once.' },
          { name: 'delay', type: 'number', defaultValue: '0', description: 'Pre-tween delay.' },
        ]}
      />
    </>
  );
}
