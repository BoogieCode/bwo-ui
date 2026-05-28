import { CodeBlock } from '../../../../components/code-block';
import { ParallaxDemo } from './demo';

export const metadata = { title: 'Parallax — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Parallax</h1>
      <p className="lead">
        Scroll-linked translate. Positive <code>speed</code> drifts up (slower than scroll),
        negative drifts down (faster).
      </p>

      <ParallaxDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Parallax } from '@bwo-ui/react';

<Parallax speed={80}>
  <img src="/hero.jpg" alt="" />
</Parallax>`}</CodeBlock>

      <p>
        Props: <code>speed</code> (px of total travel), <code>axis</code>{' '}
        (<code>&apos;y&apos;</code> or <code>&apos;x&apos;</code>), <code>scrub</code>{' '}
        (true / number), plus standard ScrollTrigger <code>start</code> / <code>end</code>.
      </p>
    </>
  );
}
