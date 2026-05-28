import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TextareaDemo } from './demo';

export const metadata = { title: 'Textarea — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Textarea</h1>
      <p className="lead">Multi-line input, same styling family as <code>Input</code>.</p>

      <TextareaDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Textarea } from '@bwo-ui/react';

<Textarea placeholder="Tell us more…" rows={4} />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'invalid',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Adds the error border + sets `aria-invalid`.',
          },
        ]}
      />
    </>
  );
}
