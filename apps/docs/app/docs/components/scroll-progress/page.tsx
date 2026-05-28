import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ScrollProgressDemo } from './demo';

export const metadata = { title: 'ScrollProgress — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrollProgress</h1>
      <p className="lead">
        Binds an element's scale to scroll progress through the page (or a specific section).
        Usually pinned at the top of the viewport as a progress bar.
      </p>

      <ScrollProgressDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrollProgress } from '@bwo-ui/react';

<ScrollProgress
  className="progress-bar"
  style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 3, background: 'var(--bwo-red)' }}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'start', type: 'string', defaultValue: "'top top'", description: 'ScrollTrigger start.' },
          { name: 'end', type: 'string', defaultValue: "'bottom bottom'", description: 'ScrollTrigger end.' },
          {
            name: 'axis',
            type: "'x' | 'y'",
            defaultValue: "'x'",
            description: 'Axis the bar scales on.',
          },
          {
            name: 'origin',
            type: 'string',
            description: 'Transform-origin (defaults to left/top center based on axis).',
          },
        ]}
      />
    </>
  );
}
