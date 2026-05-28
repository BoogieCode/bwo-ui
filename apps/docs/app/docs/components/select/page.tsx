import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SelectDemo } from './demo';

export const metadata = { title: 'Select — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Select</h1>
      <p className="lead">
        Accessible select built on Radix UI. Keyboard navigation, type-to-select, full ARIA, and
        a popover positioned via <code>position=&quot;popper&quot;</code>.
      </p>

      <SelectDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@bwo-ui/react';

<Select.Root defaultValue="apple">
  <Select.Trigger style={{ width: 240 }}>
    <Select.Value placeholder="Pick a fruit…" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
    <Select.Item value="cherry">Cherry</Select.Item>
  </Select.Content>
</Select.Root>`}</CodeBlock>

      <h2>Anatomy</h2>
      <PropsTable
        rows={[
          { name: 'Select.Root', type: 'Component', description: 'Wraps the entire select. All Radix Select.Root props are passed through.' },
          { name: 'Select.Trigger', type: 'Component', description: 'The visible control. Renders the value plus a chevron.' },
          { name: 'Select.Value', type: 'Component', description: 'Renders the current value or `placeholder` when none.' },
          { name: 'Select.Content', type: 'Component', description: 'The dropdown panel. Portaled to the body.' },
          { name: 'Select.Item', type: 'Component', description: 'One option. Requires `value` prop.' },
        ]}
      />
    </>
  );
}
