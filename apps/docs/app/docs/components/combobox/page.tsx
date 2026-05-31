import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ComboboxDemo } from './demo';

export const metadata = { title: 'Combobox — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Combobox</h1>
      <p className="lead">
        Searchable select with keyboard navigation. Type to filter, ArrowUp/Down to move, Enter to
        select, Escape to dismiss.
      </p>

      <ComboboxDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Combobox } from '@bwo-ui/react';

const [value, setValue] = useState<string | null>(null);

<Combobox
  options={[
    { value: 'next', label: 'Next.js' },
    { value: 'remix', label: 'Remix' },
  ]}
  value={value}
  onValueChange={setValue}
  placeholder="Pick a framework…"
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'options', type: 'ComboboxOption[]', description: 'List of selectable options.' },
          { name: 'value', type: 'string | null', description: 'Controlled selected value.' },
          {
            name: 'onValueChange',
            type: '(value: string | null) => void',
            description: 'Called when the selection changes.',
          },
          {
            name: 'filter',
            type: '(option, query) => boolean',
            description: 'Custom matcher (default: case-insensitive substring on label).',
          },
          {
            name: 'emptyState',
            type: 'ReactNode',
            description: 'Rendered when no options match the current query.',
          },
        ]}
      />
    </>
  );
}
