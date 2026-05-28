import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { IconButtonDemo } from './demo';

export const metadata = { title: 'IconButton — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>IconButton</h1>
      <p className="lead">
        Round icon-only button using the same boogie pill style. The slow cubic-bezier hover
        transition is the same one used on <code>.tp-btn-black-circle</code> in boogie-next.
      </p>

      <IconButtonDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { IconButton } from '@bwo-ui/react';

<IconButton aria-label="Search">
  <SearchIcon />
</IconButton>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'variant', type: "'primary' | 'ghost'", defaultValue: "'primary'", description: 'Visual style.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: '32 / 40 / 48 px.' },
          {
            name: 'aria-label',
            type: 'string',
            description:
              'Required. Describes the action for screen readers — icon-only buttons have no visible label.',
          },
        ]}
      />
    </>
  );
}
