import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CircleRevealDemo } from './demo';

export const metadata = { title: 'CircleReveal / PageIris — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>CircleReveal</h1>
      <p className="lead">
        Iris/circle-wipe transition — animates <code>clip-path: circle(…)</code> from a point
        outward (<code>open</code>) or from full coverage back to a point (<code>close</code>).
        Use it as a one-shot reveal on any element, or wire it into route changes with the
        companion <code>PageIris</code> wrapper for full page transitions.
      </p>

      <CircleRevealDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { CircleReveal } from '@bwo-ui/react';

// One-shot iris-open on a hero image
<CircleReveal mode="open" duration={0.9}>
  <img src="/hero.jpg" alt="" />
</CircleReveal>

// Off-center origin (15% from the left, 15% from the top)
<CircleReveal mode="open" origin={{ x: '15%', y: '15%' }}>
  <Card />
</CircleReveal>

// Close-iris dismissal — fires onComplete when finished
<CircleReveal mode="close" duration={0.5} onComplete={() => setShown(false)}>
  <Modal />
</CircleReveal>`}</CodeBlock>

      <h2>Page transitions with PageIris</h2>
      <p>
        <code>PageIris</code> wraps your route content with a <code>CircleReveal</code> that
        replays whenever its <code>pathname</code> prop changes — so every navigation gets a
        fresh iris-open. It&apos;s framework-agnostic: pass <code>usePathname()</code> in
        Next.js, <code>useLocation().pathname</code> in React Router, or any string that
        changes per route.
      </p>

      <CodeBlock lang="tsx">{`// app/layout.tsx (Next.js)
'use client';
import { usePathname } from 'next/navigation';
import { PageIris } from '@bwo-ui/react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <PageIris pathname={pathname ?? '/'} duration={0.8}>
          {children}
        </PageIris>
      </body>
    </html>
  );
}`}</CodeBlock>

      <h2>CircleReveal props</h2>
      <PropsTable
        rows={[
          {
            name: 'mode',
            type: "'open' | 'close'",
            defaultValue: "'open'",
            description:
              'open animates the visible circle from origin outward. close shrinks the visible circle back into the origin.',
          },
          {
            name: 'origin',
            type: '{ x?: number | string; y?: number | string }',
            defaultValue: "{ x: '50%', y: '50%' }",
            description:
              'Centre of the circle. Numbers convert to percent, strings pass through (e.g. "120px", "center"). Defaults to the geometric centre of the element.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '0.7',
            description: 'Animation duration in seconds.',
          },
          {
            name: 'ease',
            type: 'string',
            defaultValue: "'expo.inOut'",
            description: 'GSAP ease.',
          },
          {
            name: 'delay',
            type: 'number',
            defaultValue: '0',
            description: 'Initial delay before the tween starts.',
          },
          {
            name: 'onComplete',
            type: '() => void',
            description:
              'Fires when the animation finishes. Use it to unmount the element after a close iris.',
          },
          {
            name: 'prime',
            type: 'boolean',
            defaultValue: 'true',
            description:
              'Synchronously set the start clip-path on mount so the first frame matches. Set to false if you need GSAP to manage the initial state itself.',
          },
          {
            name: 'as',
            type: 'ElementType',
            defaultValue: "'div'",
            description: 'HTML tag or component to render the wrapping element as.',
          },
        ]}
      />

      <h2>PageIris props</h2>
      <PropsTable
        rows={[
          {
            name: 'pathname',
            type: 'string',
            description:
              'Anything that changes on route change. Pass usePathname() / useLocation().pathname / your own key. The iris replays whenever this value changes.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '0.8',
            description: 'Animation duration in seconds.',
          },
          {
            name: 'ease',
            type: 'string',
            defaultValue: "'expo.out'",
            description: 'GSAP ease.',
          },
          {
            name: 'origin',
            type: '{ x?: number | string; y?: number | string }',
            defaultValue: "{ x: '50%', y: '50%' }",
            description: 'Centre of the iris. Same shape as CircleReveal#origin.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'Wrapper className — useful for sizing the iris container.',
          },
          {
            name: 'style',
            type: 'React.CSSProperties',
            description: 'Wrapper inline styles.',
          },
        ]}
      />
    </>
  );
}
