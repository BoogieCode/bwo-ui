import { CodeBlock } from '../../../../components/code-block';
import { ScrambleTextDemo } from './demo';

export const metadata = { title: 'ScrambleText — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrambleText</h1>
      <p className="lead">
        Matrix-style scramble reveal. Trigger on mount, hover, or scroll. Zero plugin
        dependencies — runs on raw <code>requestAnimationFrame</code>.
      </p>

      <ScrambleTextDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrambleText } from '@bwo-ui/react';

<ScrambleText as="h2" duration={1.4} chars="!@#$%^&*">
  Hello, world.
</ScrambleText>

// Trigger on hover or scroll:
<ScrambleText trigger="hover" chars="01">SECURE</ScrambleText>`}</CodeBlock>

      <p>
        Props: <code>text</code> (default = current textContent), <code>chars</code>{' '}
        (default <code>&apos;01&apos;</code>), <code>duration</code>, <code>trigger</code>{' '}
        (<code>&apos;mount&apos; | &apos;hover&apos; | &apos;scroll&apos;</code>),{' '}
        <code>once</code>.
      </p>
    </>
  );
}
