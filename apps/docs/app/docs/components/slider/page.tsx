import { CodeBlock } from '../../../../components/code-block';
import { SliderDemo } from './demo';

export const metadata = { title: 'Slider — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Slider</h1>
      <p className="lead">
        Range slider built on Radix. Single-thumb by default; pass an array of two values for a
        range. Full keyboard and pointer support.
      </p>

      <SliderDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Slider } from '@bwo-ui/react';

<Slider defaultValue={[40]} min={0} max={100} step={1} />

// range:
<Slider defaultValue={[20, 80]} min={0} max={100} step={1} />`}</CodeBlock>
      <p>
        All props from Radix&apos;s{' '}
        <code>
          <a href="https://www.radix-ui.com/primitives/docs/components/slider" target="_blank" rel="noopener noreferrer">
            Slider.Root
          </a>
        </code>{' '}
        are forwarded.
      </p>
    </>
  );
}
