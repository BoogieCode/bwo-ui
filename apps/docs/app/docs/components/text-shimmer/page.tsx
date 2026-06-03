import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TextShimmerDemo } from './demo';

export const metadata = { title: 'TextShimmer — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>TextShimmer</h1>
      <p className="lead">
        Looping gradient sweep over text. CSS-only — animates the
        <code> background-position</code> of a 3× linear gradient clipped to the text via
        <code> background-clip: text</code>. Use it for "loading…" labels, headline accent,
        skeleton text states.
      </p>

      <TextShimmerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { TextShimmer } from '@bwo-ui/react';

<TextShimmer as="h2" color="var(--bwo-text)" highlight="#ff481f">
  Ship the boogie.
</TextShimmer>

// Slower, narrower band
<TextShimmer duration={3.2} bandWidth={20}>Loading…</TextShimmer>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'as', type: 'ElementType', defaultValue: "'span'", description: 'Tag to render.' },
          { name: 'color', type: 'string', defaultValue: "'currentColor'", description: 'Base text colour.' },
          { name: 'highlight', type: 'string', defaultValue: "'#ffffff'", description: 'Sweeping highlight colour.' },
          { name: 'duration', type: 'number', defaultValue: '1.8', description: 'Sweep duration in seconds.' },
          { name: 'bandWidth', type: 'number', defaultValue: '40', description: 'Width of the highlight band as %.' },
          { name: 'delay', type: 'number', defaultValue: '0', description: 'Delay before the first sweep starts.' },
          { name: 'paused', type: 'boolean', defaultValue: 'false', description: 'Pause the animation.' },
        ]}
      />
    </>
  );
}
