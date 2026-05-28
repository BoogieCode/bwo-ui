import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { FlipListDemo } from './demo';

export const metadata = { title: 'FlipList — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>FlipList</h1>
      <p className="lead">
        Animated layout shifts powered by GSAP&apos;s Flip plugin. Pass a <code>flipKey</code>{' '}
        that changes whenever the list reorders, and the wrapper will capture the previous DOM
        state and animate to the new one.
      </p>

      <FlipListDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { FlipList } from '@bwo-ui/react';
import { useState } from 'react';

const [items, setItems] = useState([1, 2, 3, 4]);
const shuffle = () =>
  setItems((xs) => [...xs].sort(() => Math.random() - 0.5));

<button onClick={shuffle}>Shuffle</button>

<FlipList flipKey={items.join(',')} duration={0.6}>
  {items.map((n) => (
    <div key={n}>{n}</div>
  ))}
</FlipList>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'flipKey',
            type: 'string | number',
            description:
              'Changes whenever the list mutates. The wrapper captures before the next render and commits the Flip animation after.',
          },
          {
            name: 'itemSelector',
            type: 'string',
            defaultValue: "':scope > *'",
            description: 'Selector for items inside the container.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '0.5',
            description: 'Tween duration.',
          },
          {
            name: 'ease',
            type: 'string',
            defaultValue: "'power2.inOut'",
            description: 'GSAP ease.',
          },
          {
            name: 'stagger',
            type: 'number',
            defaultValue: '0.03',
            description: 'Stagger between items.',
          },
          {
            name: 'absolute',
            type: 'boolean',
            defaultValue: 'false',
            description:
              'Use position: absolute during the flip — useful for grids that resize.',
          },
        ]}
      />

      <h2>Imperative handle</h2>
      <p>
        <code>FlipList</code> also exposes a ref handle with <code>flip(mutate)</code>,{' '}
        <code>capture()</code>, and <code>commit()</code> for cases where{' '}
        <code>flipKey</code> isn&apos;t enough.
      </p>
    </>
  );
}
