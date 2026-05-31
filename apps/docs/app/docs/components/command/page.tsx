import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CommandDemo } from './demo';

export const metadata = { title: 'Command — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Command</h1>
      <p className="lead">
        Filterable command palette with grouped items, shortcuts, and keyboard navigation. Render
        inline or inside a modal CommandDialog (⌘K style).
      </p>

      <CommandDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Command, CommandDialog } from '@bwo-ui/react';

const items = [
  { id: 'new',   label: 'New file', group: 'File', shortcut: '⌘N', onSelect: newFile },
  { id: 'save',  label: 'Save',     group: 'File', shortcut: '⌘S', onSelect: save },
];

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command items={items} />
</CommandDialog>`}</CodeBlock>

      <h2>Props — Command</h2>
      <PropsTable
        rows={[
          { name: 'items', type: 'CommandItemEntry[]', description: 'Items (grouped by their group field).' },
          { name: 'placeholder', type: 'string', description: 'Search input placeholder.' },
          {
            name: 'filter',
            type: '(item, query) => boolean',
            description: 'Custom matcher (default: case-insensitive across label + keywords).',
          },
          { name: 'emptyState', type: 'ReactNode', description: 'Rendered when no items match.' },
          { name: 'search', type: 'string', description: 'Controlled search input value.' },
          { name: 'onSearchChange', type: '(s: string) => void', description: 'Search change handler.' },
        ]}
      />

      <h2>Props — CommandDialog</h2>
      <PropsTable
        rows={[
          { name: 'open', type: 'boolean', description: 'Controlled open state.' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open change handler.' },
          {
            name: 'title',
            type: 'string',
            defaultValue: "'Command Palette'",
            description: 'Accessible (screen-reader-only) title.',
          },
        ]}
      />
    </>
  );
}
