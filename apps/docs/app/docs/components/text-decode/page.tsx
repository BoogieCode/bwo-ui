import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TextDecodeDemo } from './demo';

export const metadata = { title: 'TextDecode — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>TextDecode</h1>
      <p className="lead">
        Character-by-character decode — each glyph cycles through a pool of random characters
        before settling on the target. The element&apos;s text content is captured on mount
        and used as the destination. GSAP-backed.
      </p>

      <TextDecodeDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { TextDecode } from '@bwo-ui/react';

<TextDecode as="h1" duration={1.6}>
  Welcome aboard.
</TextDecode>

// Looping with a custom pool
<TextDecode
  loop
  chars="01"
  duration={2}
>
  System online
</TextDecode>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'duration', type: 'number', defaultValue: '1.4', description: 'Total animation duration in seconds.' },
          { name: 'chars', type: 'string', description: 'Pool of characters used for the scramble. Defaults to alphanumerics + symbols.' },
          { name: 'speed', type: 'number', defaultValue: '0.04', description: 'Seconds per character swap during the scramble.' },
          { name: 'delay', type: 'number', defaultValue: '0', description: 'Delay before the decode begins.' },
          { name: 'loop', type: 'boolean', defaultValue: 'false', description: 'Replay forever.' },
          { name: 'onComplete', type: '() => void', description: 'Fires when every character has settled.' },
          { name: 'as', type: 'ElementType', defaultValue: "'span'", description: 'Tag to render.' },
        ]}
      />
    </>
  );
}
