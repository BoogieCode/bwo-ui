import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SplitRevealDemo } from './demo';

export const metadata = { title: 'SplitReveal — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>SplitReveal</h1>
      <p className="lead">
        Splits text into characters, words, or lines and reveals each unit on scroll. Built on{' '}
        <code>SplitText</code> + <code>ScrollTrigger</code>.
      </p>

      <SplitRevealDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { SplitReveal } from '@bwo-ui/react';

<SplitReveal type="words,chars" stagger={0.02} from={{ y: 40, opacity: 0 }}>
  <h1>Motion that reads as craft.</h1>
</SplitReveal>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'type',
            type: "'chars' | 'words' | 'lines' | 'words,chars' | 'chars,words,lines'",
            defaultValue: "'words'",
            description: 'What to split the text into.',
          },
          {
            name: 'stagger',
            type: 'number',
            defaultValue: '0.04',
            description: 'Stagger between units in seconds.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '0.6',
            description: 'Per-unit tween duration.',
          },
          {
            name: 'from',
            type: '{ y?, x?, opacity?, rotate?, scale? }',
            defaultValue: '{ y: 24, opacity: 0 }',
            description: 'Starting transform/opacity for each unit.',
          },
          {
            name: 'ease',
            type: 'string',
            defaultValue: "'power3.out'",
            description: 'GSAP ease.',
          },
          {
            name: 'scrub',
            type: 'boolean | number',
            defaultValue: 'false',
            description: 'When true (or a lag number), the tween scrubs with scroll.',
          },
          {
            name: 'once',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Play only once when entering the viewport.',
          },
          {
            name: 'start',
            type: 'string',
            defaultValue: "'top 85%'",
            description: 'ScrollTrigger start position.',
          },
          {
            name: 'mask',
            type: "'lines' | 'words' | 'chars' | false",
            defaultValue: 'false',
            description: 'Wrap each unit in an overflow-clip mask for clean reveals.',
          },
        ]}
      />

      <h2>Notes</h2>
      <ul>
        <li>
          <code>autoSplit</code> is enabled internally — splits are recomputed when fonts finish
          loading or the container resizes.
        </li>
        <li>
          The component picks the smallest available unit (chars → words → lines) to animate.
        </li>
      </ul>
    </>
  );
}
