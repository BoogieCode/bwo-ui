import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ScrollSnapDemo } from './demo';

export const metadata = { title: 'ScrollSnap — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrollSnap</h1>
      <p className="lead">
        Pure-CSS scroll-snap container — sets <code>scroll-snap-type</code> on the host and
        <code> scroll-snap-align</code> on direct children. No GSAP, no JavaScript per-tick.
        Use it for horizontal carousels, full-page section scrollers, and snap galleries.
      </p>

      <ScrollSnapDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrollSnap } from '@bwo-ui/react';

// Horizontal section carousel
<ScrollSnap axis="x" strictness="mandatory" align="start"
  style={{ display: 'flex', overflowX: 'auto' }}>
  <Slide />
  <Slide />
  <Slide />
</ScrollSnap>

// Full-page vertical sections
<ScrollSnap axis="y" align="start"
  style={{ height: '100vh', overflowY: 'auto' }}>
  <Section style={{ height: '100vh' }} />
  <Section style={{ height: '100vh' }} />
</ScrollSnap>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'axis',
            type: "'x' | 'y' | 'both'",
            defaultValue: "'y'",
            description: 'Axis to snap along.',
          },
          {
            name: 'strictness',
            type: "'mandatory' | 'proximity'",
            defaultValue: "'mandatory'",
            description:
              'How aggressively the browser snaps. mandatory locks to the nearest snap point; proximity only snaps if you stop near one.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            defaultValue: "'start'",
            description: 'Snap-align applied to every matched child.',
          },
          {
            name: 'childSelector',
            type: 'string',
            defaultValue: "':scope > *'",
            description: 'CSS selector for the children that should snap.',
          },
          {
            name: 'as',
            type: 'ElementType',
            defaultValue: "'div'",
            description: 'HTML tag or component to render the wrapping element as.',
          },
        ]}
      />
    </>
  );
}
