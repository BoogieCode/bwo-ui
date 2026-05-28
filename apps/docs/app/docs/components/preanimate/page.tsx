import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PreanimateDemo } from './demo';

export const metadata = { title: 'Preanimate — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Preanimate</h1>
      <p className="lead">
        Per-component skeleton swap. Renders a placeholder until <code>ready</code>{' '}
        flips, then <strong>mounts the real content</strong> — so its entrance
        animations (SplitReveal, Stagger, etc.) fire exactly when the skeleton
        disappears, not while it's still on screen.
      </p>

      <PreanimateDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { PreanimateProvider, Preanimate, Skeleton, SplitReveal } from '@bwo-ui/react';

<PreanimateProvider duration={900}>
  <Preanimate skeleton={<Skeleton height={48} style={{ width: 320 }} />}>
    <SplitReveal as="h1" type="words" stagger={0.04}>
      Real title that animates in
    </SplitReveal>
  </Preanimate>
</PreanimateProvider>`}</CodeBlock>

      <p>
        Pair multiple <code>Preanimate</code> swaps under a single{' '}
        <code>PreanimateProvider</code> so they share one <code>ready</code> signal
        and flip in sync.
      </p>

      <h2>PreanimateProvider props</h2>
      <PropsTable
        rows={[
          { name: 'duration', type: 'number', defaultValue: '1000', description: 'Auto-flip ready=true after this many ms.' },
          { name: 'ready', type: 'boolean', description: 'External control. When set, `duration` is ignored.' },
        ]}
      />

      <h2>Preanimate props</h2>
      <PropsTable
        rows={[
          { name: 'skeleton', type: 'ReactNode', description: 'Rendered while not ready. Should occupy the same dimensions as the real content.' },
          { name: 'children', type: 'ReactNode', description: 'Real content. Not mounted until ready — entrance animations fire on swap.' },
          {
            name: 'delay',
            type: 'number',
            description:
              "Extra ms to wait *after* the provider's base ready flips before mounting children. Use to cascade entrances (e.g. cards waiting for the hero typewriter to finish).",
          },
        ]}
      />

      <h2>Cascading entrances</h2>
      <p>
        Each <code>Preanimate</code> under one provider can stage its own
        ready time with <code>delay</code>. Total wait per section is{' '}
        <code>provider.duration + delay</code>.
      </p>
      <CodeBlock lang="tsx">{`<PreanimateProvider duration={900}>
  {/* mounts at 900ms — hero starts typing */}
  <Preanimate skeleton={<TitleSkeleton />}>
    <Typewriter lines={[...]} />
  </Preanimate>

  {/* mounts at 900 + 1500 = 2400ms — by then the typewriter is well into reveal */}
  <Preanimate skeleton={<ShowcaseSkeleton />} delay={1500}>
    <Stagger>...cards...</Stagger>
  </Preanimate>
</PreanimateProvider>`}</CodeBlock>

      <h2>usePreanimate()</h2>
      <p>
        Drop-in hook returning the shared <code>ready</code> boolean. Useful when
        you need to conditionally swap parts of a single component:
      </p>
      <CodeBlock lang="tsx">{`function Card() {
  const ready = usePreanimate();
  return ready ? <RealCard /> : <CardSkeleton />;
}`}</CodeBlock>
    </>
  );
}
