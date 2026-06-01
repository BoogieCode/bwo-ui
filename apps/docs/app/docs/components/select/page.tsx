import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SelectDemo } from './demo';

export const metadata = { title: 'Select — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Select</h1>
      <p className="lead">
        Accessible select built from scratch. Three modes: single, searchable (filter input), and
        multi-select (toggle items with checkmarks). Full keyboard navigation, ARIA, and a
        portaled listbox anchored to the trigger.
      </p>

      <SelectDemo />

      <h2>Single</h2>
      <CodeBlock lang="tsx">{`import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@bwo-ui/react';

<SelectRoot defaultValue="apple">
  <SelectTrigger>
    <SelectValue placeholder="Pick a fruit…" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</SelectRoot>`}</CodeBlock>

      <h2>Searchable</h2>
      <CodeBlock lang="tsx">{`<SelectRoot searchable searchPlaceholder="Filter frameworks…">
  <SelectTrigger>
    <SelectValue placeholder="Pick a stack…" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="next">Next.js</SelectItem>
    <SelectItem value="remix">Remix</SelectItem>
    <SelectItem value="vite">Vite</SelectItem>
    {/* …items hide themselves when they don't match */}
  </SelectContent>
</SelectRoot>`}</CodeBlock>
      <p>
        Items filter themselves by their string children. Override with the{' '}
        <code>searchText</code> prop on <code>SelectItem</code> when the children are JSX.
      </p>

      <h2>Multiple</h2>
      <CodeBlock lang="tsx">{`const [picked, setPicked] = useState<string[]>(['design', 'frontend']);

<SelectRoot multiple value={picked} onValueChange={setPicked}>
  <SelectTrigger>
    <SelectValue
      placeholder="Pick roles…"
      formatMultiple={(_, vs) =>
        vs.length <= 2 ? vs.join(', ') : \`\${vs.length} selected\`
      }
    />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="design">Design</SelectItem>
    <SelectItem value="frontend">Frontend</SelectItem>
    <SelectItem value="backend">Backend</SelectItem>
  </SelectContent>
</SelectRoot>`}</CodeBlock>
      <p>
        When <code>multiple</code> is set, <code>value</code> is a <code>string[]</code> and{' '}
        <code>onValueChange</code> receives <code>string[]</code>. The trigger emits one hidden{' '}
        <code>input[name=&quot;{`{name}`}[]&quot;]</code> per selected value for form submission. A
        footer with a clear-all button appears in the content automatically.
      </p>

      <h2>Searchable + Multiple</h2>
      <p>
        Both props compose. <code>SelectContent</code> renders the search input at the top, items
        filter as the user types, and selected items toggle on click without closing the listbox.
      </p>
      <CodeBlock lang="tsx">{`<SelectRoot multiple searchable defaultValue={['design']}>
  <SelectTrigger>
    <SelectValue placeholder="Pick roles…" />
  </SelectTrigger>
  <SelectContent searchPlaceholder="Filter roles…" searchEmpty="No matching roles">
    {ROLES.map(([v, label]) => (
      <SelectItem key={v} value={v}>{label}</SelectItem>
    ))}
  </SelectContent>
</SelectRoot>`}</CodeBlock>

      <h2>Props — SelectRoot</h2>
      <PropsTable
        rows={[
          {
            name: 'multiple',
            type: 'boolean',
            description:
              'Toggle multi-select. Items toggle on click; the listbox stays open until dismissed.',
          },
          {
            name: 'value',
            type: 'string | string[] | null',
            description:
              'Controlled value. `string` (or `null`) when single; `string[]` when `multiple` is on.',
          },
          {
            name: 'defaultValue',
            type: 'string | string[]',
            description: 'Uncontrolled initial value.',
          },
          {
            name: 'onValueChange',
            type: '(value: string | string[]) => void',
            description: 'Fires on selection change. Type matches the `multiple` mode.',
          },
          {
            name: 'searchable',
            type: 'boolean',
            description: 'Render a filter input at the top of the listbox.',
          },
          {
            name: 'searchPlaceholder',
            type: 'string',
            defaultValue: "'Search…'",
            description: 'Placeholder text for the search input.',
          },
          {
            name: 'open / defaultOpen / onOpenChange',
            type: 'boolean / (open) => void',
            description: 'Standard open-state plumbing.',
          },
          { name: 'disabled', type: 'boolean', description: 'Disable the entire select.' },
          { name: 'name', type: 'string', description: 'Emit hidden input(s) for form submission.' },
        ]}
      />

      <h2>Props — SelectValue</h2>
      <PropsTable
        rows={[
          {
            name: 'placeholder',
            type: 'ReactNode',
            description: 'Shown when no value is selected.',
          },
          {
            name: 'formatMultiple',
            type: '(labels: ReactNode[], values: string[]) => ReactNode',
            description:
              'Custom multi-select renderer. Default: labels joined with ", " (e.g. "Design, Frontend").',
          },
        ]}
      />

      <h2>Props — SelectItem</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Required.' },
          { name: 'disabled', type: 'boolean', description: 'Skipped in keyboard nav, not selectable.' },
          {
            name: 'searchText',
            type: 'string',
            description:
              'Override the search-filter text when children are JSX. Default: string children.',
          },
        ]}
      />

      <h2>Anatomy</h2>
      <PropsTable
        rows={[
          { name: 'SelectRoot', type: 'Component', description: 'Wraps the entire select. Accepts value/defaultValue/onValueChange + open/defaultOpen/onOpenChange + multiple/searchable.' },
          { name: 'SelectTrigger', type: 'Component', description: 'The visible control. Renders the value plus a chevron.' },
          { name: 'SelectValue', type: 'Component', description: 'Renders the current value(s) or `placeholder` when none.' },
          { name: 'SelectContent', type: 'Component', description: 'The dropdown panel. Portaled to the body. Renders search + footer when applicable.' },
          { name: 'SelectItem', type: 'Component', description: 'One option. Requires `value` prop.' },
        ]}
      />
    </>
  );
}
