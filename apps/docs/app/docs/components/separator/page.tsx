import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SeparatorDemo } from './demo';

export const metadata = { title: 'Separator — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Separator</h1>
      <p className="lead">Thin divider for stacking sections or inline groups.</p>

      <SeparatorDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Separator } from '@bwo-ui/react';

<Separator />
<Separator orientation="vertical" />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Axis of the divider.',
          },
          {
            name: 'decorative',
            type: 'boolean',
            defaultValue: 'true',
            description:
              'When true, the separator is hidden from assistive tech; set false to expose role="separator".',
          },
        ]}
      />
    </>
  );
}
