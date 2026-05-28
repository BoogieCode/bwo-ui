import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { BlurDemo } from './demo';

export const metadata = { title: 'Blur — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Blur</h1>
      <p className="lead">
        Scroll-driven blur reveal — the element starts blurred and sharpens as it enters the
        viewport. Optional fade.
      </p>

      <BlurDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Blur } from '@bwo-ui/react';

<Blur from={20} fade>
  <img src="..." />
</Blur>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'from', type: 'number', defaultValue: '16', description: 'Initial blur in px.' },
          { name: 'to', type: 'number', defaultValue: '0', description: 'Final blur in px.' },
          { name: 'fade', type: 'boolean', defaultValue: 'true', description: 'Pair the blur with an opacity fade.' },
          { name: 'duration', type: 'number', defaultValue: '1.0', description: 'Seconds.' },
          { name: 'ease', type: 'string', defaultValue: "'power3.out'", description: 'GSAP ease.' },
          { name: 'start', type: 'string', defaultValue: "'top 85%'", description: 'ScrollTrigger start.' },
          { name: 'scrub', type: 'boolean | number', defaultValue: 'false', description: 'Scrub with scroll.' },
          { name: 'once', type: 'boolean', defaultValue: 'true', description: 'Play only once.' },
        ]}
      />
    </>
  );
}
