import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { MarqueeDemo } from './demo';

export const metadata = { title: 'Marquee — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Marquee</h1>
      <p className="lead">
        Seamless infinite scroll strip. Clones direct children until the track fills the
        container at least twice, then loops via GSAP modifiers. Optional drag-with-inertia.
      </p>

      <MarqueeDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Marquee } from '@bwo-ui/react';

<Marquee speed={120} direction="left" draggable>
  <span>One</span>
  <span>Two</span>
  <span>Three</span>
</Marquee>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'speed',
            type: 'number',
            defaultValue: '80',
            description: 'Pixels per second.',
          },
          {
            name: 'direction',
            type: "'left' | 'right' | 'up' | 'down'",
            defaultValue: "'left'",
            description: 'Scroll direction.',
          },
          {
            name: 'draggable',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Allow user to drag/throw the strip.',
          },
          {
            name: 'pauseOnHover',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Pause when the cursor is over the strip.',
          },
          {
            name: 'itemSelector',
            type: 'string',
            defaultValue: "':scope > *'",
            description: 'Selector for items inside the container.',
          },
        ]}
      />

      <h2>Notes</h2>
      <ul>
        <li>
          The container is given <code>overflow: hidden</code> automatically.
        </li>
        <li>
          For vertical marquees (<code>direction=&quot;up&quot;</code> or{' '}
          <code>&quot;down&quot;</code>), give the container a height.
        </li>
        <li>Items are cloned at mount; they are restored to the original container on destroy.</li>
      </ul>
    </>
  );
}
