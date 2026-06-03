import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { EmptyDemo } from './demo';

export const metadata = { title: 'Empty — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Empty</h1>
      <p className="lead">
        Empty-state block — icon + title + description + CTA. Drop into list views, search
        results, dashboards before the first record exists.
      </p>

      <EmptyDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Empty, Button } from '@bwo-ui/react';

<Empty
  icon={<InboxIcon />}
  title="Nothing here yet"
  description="Once a request lands, it'll show up."
  action={<Button>Invite a teammate</Button>}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'icon', type: 'ReactNode', description: 'Optional illustration / icon above the title.' },
          { name: 'title', type: 'ReactNode', description: 'Heading.' },
          { name: 'description', type: 'ReactNode', description: 'Supporting copy.' },
          { name: 'action', type: 'ReactNode', description: 'CTA area — usually a Button.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Vertical padding + font scale.' },
        ]}
      />
    </>
  );
}
