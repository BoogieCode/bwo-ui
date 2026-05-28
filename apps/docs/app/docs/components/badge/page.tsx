import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { BadgeDemo } from './demo';

export const metadata = { title: 'Badge — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Badge</h1>
      <p className="lead">
        Tag/pill component. Direct port of <code>.tp-service-category span</code> from
        boogie-next — uppercase, 20px radius, hover-tinted.
      </p>

      <BadgeDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Badge } from '@bwo-ui/react';

<Badge>Default</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="green">Green</Badge>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft'",
            defaultValue: "'default'",
            description: 'Visual style.',
          },
        ]}
      />
    </>
  );
}
