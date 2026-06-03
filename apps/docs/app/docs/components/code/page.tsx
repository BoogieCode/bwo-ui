import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CodeDemo } from './demo';

export const metadata = { title: 'Code — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Code</h1>
      <p className="lead">
        Display code in two shapes — an inline <code>{`<code>`}</code> pill for prose, or a
        block <code>{`<pre>`}</code> with optional language label and a copy-to-clipboard
        button. The block flavour preserves whitespace and scrolls horizontally on overflow.
      </p>

      <CodeDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Code } from '@bwo-ui/react';

// Inline
<p>Run <Code>npx bwo init</Code> to scaffold.</p>

// Block with copy
<Code display="block" lang="tsx">
  {snippet}
</Code>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'display', type: "'inline' | 'block'", defaultValue: "'inline'", description: 'Inline pill or block with copy button.' },
          { name: 'copy', type: 'boolean', defaultValue: 'true', description: 'When display="block", render the copy button.' },
          { name: 'lang', type: 'string', description: 'Optional language label rendered above block code.' },
        ]}
      />
    </>
  );
}
