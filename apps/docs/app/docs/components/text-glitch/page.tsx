import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TextGlitchDemo } from './demo';

export const metadata = { title: 'TextGlitch — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>TextGlitch</h1>
      <p className="lead">
        Quick, jittery character corruption — faster + denser than{' '}
        <code>ScrambleText</code>. A percentage of characters glitch per frame and the noise
        decays to zero.
      </p>

      <TextGlitchDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { TextGlitch } from '@bwo-ui/react';

<TextGlitch trigger="hover" duration={0.9} intensity={0.45}>
  Hover me
</TextGlitch>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'text', type: 'string', description: "Final text (defaults to the element's textContent)." },
          { name: 'fps', type: 'number', defaultValue: '12', description: 'Glitch frames per second.' },
          { name: 'duration', type: 'number', defaultValue: '1.2', description: 'Total duration in seconds.' },
          {
            name: 'trigger',
            type: "'mount' | 'hover' | 'scroll'",
            defaultValue: "'hover'",
            description: 'When the glitch plays.',
          },
          { name: 'chars', type: 'string', description: 'Pool of glitch glyphs.' },
          {
            name: 'intensity',
            type: 'number',
            defaultValue: '0.4',
            description: 'Probability per frame that a given char glitches (0–1).',
          },
          { name: 'once', type: 'boolean', description: 'Defaults to true for mount/scroll, false for hover.' },
        ]}
      />
    </>
  );
}
