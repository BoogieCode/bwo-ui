import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SegmentedControlDemo } from './demo';

export const metadata = { title: 'SegmentedControl — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>SegmentedControl</h1>
      <p className="lead">
        iOS-style segmented toggle — radio behaviour, animated sliding indicator, full keyboard
        nav (←/→ to move, Enter/Space to select). Use it for view switches, filter buckets,
        small mode toggles.
      </p>

      <SegmentedControlDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { SegmentedControl } from '@bwo-ui/react';

const OPTIONS = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'kanban', label: 'Kanban' },
] as const;

<SegmentedControl
  options={OPTIONS}
  value={view}
  onValueChange={setView}
/>

// Full-width
<SegmentedControl options={OPTIONS} value={view} onValueChange={setView} fullWidth />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'options', type: 'SegmentedOption<V>[]', description: 'Array of { value, label, icon?, disabled? }.' },
          { name: 'value', type: 'V', description: 'Controlled value.' },
          { name: 'defaultValue', type: 'V', description: 'Uncontrolled default.' },
          { name: 'onValueChange', type: '(value: V) => void', description: 'Fires on selection change.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Height + font preset.' },
          { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Stretch each segment to equal share of the container.' },
        ]}
      />
    </>
  );
}
