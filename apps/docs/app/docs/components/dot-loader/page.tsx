import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { DotLoaderDemo } from './demo';

export const metadata = { title: 'DotLoader — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>DotLoader</h1>
      <p className="lead">
        Three (or N) bouncing dots — the classic "typing…" loader. Pair with chat threads,
        long-running buttons, optimistic-update feedback.
      </p>

      <DotLoaderDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { DotLoader } from '@bwo-ui/react';

<DotLoader size="md" />
<DotLoader color="#ff481f" dots={4} duration={1.6} />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Dot diameter and gap.' },
          { name: 'color', type: 'string', defaultValue: "'currentColor'", description: 'Dot fill.' },
          { name: 'dots', type: 'number', defaultValue: '3', description: 'How many dots to render.' },
          { name: 'duration', type: 'number', defaultValue: '1.2', description: 'Total cycle length in seconds.' },
          { name: 'label', type: 'string', defaultValue: "'Loading'", description: 'Accessible label.' },
        ]}
      />
    </>
  );
}
