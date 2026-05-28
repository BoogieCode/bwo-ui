import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { AlertDemo } from './demo';

export const metadata = { title: 'Alert — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Alert</h1>
      <p className="lead">
        Inline message with a variant-coloured icon and an optional dismiss button.
      </p>

      <AlertDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Alert } from '@bwo-ui/react';

<Alert variant="success" title="Saved" onDismiss={() => {}}>
  Your changes have been published.
</Alert>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'info' | 'success' | 'warning' | 'error'",
            defaultValue: "'info'",
            description: 'Tone of the alert. Drives icon + colour.',
          },
          { name: 'title', type: 'ReactNode', description: 'Short headline.' },
          { name: 'icon', type: 'ReactNode', description: 'Override the default variant icon.' },
          {
            name: 'onDismiss',
            type: '() => void',
            description: 'When provided, renders a close button.',
          },
        ]}
      />
    </>
  );
}
