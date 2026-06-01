import { CodeBlock } from '../../../../components/code-block';
import { SliderDemo } from './demo';

export const metadata = { title: 'Slider — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Slider</h1>
      <p className="lead">
        Range slider built from scratch. Single-thumb by default; pass an array of two values
        for a range. Full keyboard and pointer support.
      </p>

      <SliderDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Slider } from '@bwo-ui/react';

<Slider defaultValue={[40]} min={0} max={100} step={1} />

// range:
<Slider defaultValue={[20, 80]} min={0} max={100} step={1} />`}</CodeBlock>

      <p>
        Props: <code>value</code>, <code>defaultValue</code>, <code>onValueChange</code>,{' '}
        <code>onValueCommit</code>, <code>min</code>, <code>max</code>, <code>step</code>,{' '}
        <code>largeStep</code>, <code>orientation</code> (<code>&apos;horizontal&apos;</code> /{' '}
        <code>&apos;vertical&apos;</code>), <code>inverted</code>, <code>disabled</code>,{' '}
        <code>name</code>.
      </p>
    </>
  );
}
