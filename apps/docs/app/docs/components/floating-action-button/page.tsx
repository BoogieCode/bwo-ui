import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { FloatingActionButtonDemo } from './demo';

export const metadata = { title: 'FloatingActionButton — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>FloatingActionButton</h1>
      <p className="lead">
        Persistent action button that floats above the page. Three sizes, three variants, optional
        extended pill with label.
      </p>

      <FloatingActionButtonDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { FloatingActionButton, FAB } from '@bwo-ui/react';

<FAB icon={<PlusIcon />} label="New item" />

<FAB icon={<PlusIcon />} variant="accent" position="bottom-right" />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'icon', type: 'ReactNode', description: 'Icon element rendered inside the button.' },
          {
            name: 'label',
            type: 'ReactNode',
            description: 'When present, the FAB renders in extended pill mode.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Size preset.',
          },
          {
            name: 'variant',
            type: "'primary' | 'accent' | 'surface'",
            defaultValue: "'primary'",
            description: 'Color variant.',
          },
          {
            name: 'position',
            type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center' | 'static'",
            defaultValue: "'bottom-right'",
            description: 'Viewport anchor. Use static to render inline.',
          },
          {
            name: 'offset',
            type: 'number',
            defaultValue: '24',
            description: 'Distance (px) from the viewport edge.',
          },
        ]}
      />
    </>
  );
}
