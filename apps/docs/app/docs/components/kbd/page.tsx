import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { KbdDemo } from './demo';

export const metadata = { title: 'Kbd — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Kbd</h1>
      <p className="lead">
        Inline keyboard key. Use it to surface shortcuts (⌘K) inside copy, command palettes,
        and onboarding hints.
      </p>

      <KbdDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Kbd } from '@bwo-ui/react';

<p>Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open.</p>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Visual size preset.',
          },
        ]}
      />
    </>
  );
}
