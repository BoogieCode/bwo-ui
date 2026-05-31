import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { BreadcrumbDemo } from './demo';

export const metadata = { title: 'Breadcrumb — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Breadcrumb</h1>
      <p className="lead">
        Hierarchical navigation showing the user's location in the page tree.
      </p>

      <BreadcrumbDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@bwo-ui/react';

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem current>Current page</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>

      <h2>Props — Breadcrumb</h2>
      <PropsTable
        rows={[
          {
            name: 'separator',
            type: 'ReactNode',
            description: 'Custom separator slot (overrides the default chevron).',
          },
        ]}
      />

      <h2>Props — BreadcrumbItem</h2>
      <PropsTable
        rows={[
          {
            name: 'current',
            type: 'boolean',
            description:
              'Marks the item as the current page. Sets aria-current="page" and removes link styling.',
          },
        ]}
      />
    </>
  );
}
