import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TypewriterDemo } from './demo';

export const metadata = { title: 'Typewriter — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Typewriter</h1>
      <p className="lead">
        Char-by-char text reveal with optional per-line strikethrough. Replicates
        the boogie.ro hero where two "wrong-answer" lines cross themselves out
        before the final accent line lands. Pure CSS animations under the hood —
        no GSAP, no per-frame JS — so it's cheap.
      </p>

      <TypewriterDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Typewriter } from '@bwo-ui/react';

<Typewriter
  as="h1"
  lines={[
    { text: '· site tip 2010',   strike: true },
    { text: '· site generic AI', strike: true },
    { text: '· site memorabil',  color: 'var(--bwo-red)' },
  ]}
/>`}</CodeBlock>

      <p>
        Each character receives its own <code>animation-delay</code>, computed
        cumulatively across all lines. Strike lines wait <code>strikeWait</code>{' '}
        seconds after the line's last char before the bar grows across them.
      </p>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'lines',
            type: 'TypewriterLine[]',
            description: 'Lines to reveal. Each: { text, strike?, color? }.',
          },
          { name: 'as', type: 'ElementType', defaultValue: "'h1'", description: 'Tag to render the outer element as.' },
          { name: 'charSpeed', type: 'number', defaultValue: '0.032', description: 'Seconds between each character.' },
          { name: 'lineGap', type: 'number', defaultValue: '0.18', description: 'Seconds between the end of one line and the next.' },
          { name: 'strikeWait', type: 'number', defaultValue: '0.22', description: 'Seconds after a `strike` line finishes before the bar starts.' },
          { name: 'initialDelay', type: 'number', defaultValue: '0.12', description: 'Delay before the first character animates in.' },
          { name: 'charDuration', type: 'number', defaultValue: '0.6', description: 'Per-character reveal duration.' },
          { name: 'charEase', type: 'string', defaultValue: "'cubic-bezier(.16,1,.3,1)'", description: 'CSS easing for the char reveal.' },
          { name: 'strikeDuration', type: 'number', defaultValue: '0.5', description: 'Strike-bar growth duration.' },
          { name: 'strikeEase', type: 'string', defaultValue: "'cubic-bezier(.4,0,.2,1)'", description: 'CSS easing for the strike bar.' },
          { name: 'fromY', type: 'number', defaultValue: '30', description: 'Initial Y offset in px (each char rises from here).' },
        ]}
      />

      <h2>TypewriterLine</h2>
      <PropsTable
        rows={[
          { name: 'text', type: 'string', description: 'The line to type.' },
          { name: 'strike', type: 'boolean', defaultValue: 'false', description: 'Animate a strikethrough bar across after reveal completes.' },
          { name: 'color', type: 'string', description: 'Per-line colour override (e.g. accent on the final line).' },
        ]}
      />

      <p>
        <strong>Tip:</strong> Pair with <a href="/docs/components/preanimate">Preanimate</a>{' '}
        so the typewriter only mounts (and starts revealing) after the rest of the
        chrome is ready.
      </p>
    </>
  );
}
