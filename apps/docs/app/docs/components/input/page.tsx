import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { InputDemo } from './demo';

export const metadata = { title: 'Input — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Input</h1>
      <p className="lead">Text input with boogie&apos;s soft grey background and black focus border.</p>

      <InputDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Input } from '@bwo-ui/react';

<Input placeholder="Type something…" />
<Input invalid placeholder="With error" />`}</CodeBlock>

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
      <p>
        All native <code>&lt;input&gt;</code> attributes are forwarded.
      </p>
    </>
  );
}
