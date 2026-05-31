import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { DropdownMenuDemo } from './demo';

export const metadata = { title: 'DropdownMenu — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>DropdownMenu</h1>
      <p className="lead">
        Toggleable menu anchored to a trigger element. Arrow keys to navigate, Enter/Space to select,
        Escape to dismiss.
      </p>

      <DropdownMenuDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@bwo-ui/react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => save()}>Save</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => del()}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</CodeBlock>

      <h2>Props — DropdownMenuContent</h2>
      <PropsTable
        rows={[
          {
            name: 'side',
            type: "'top' | 'right' | 'bottom' | 'left'",
            defaultValue: "'bottom'",
            description: 'Preferred side relative to the trigger; flips if it overflows.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            defaultValue: "'start'",
            description: 'Alignment along the side axis.',
          },
          { name: 'sideOffset', type: 'number', defaultValue: '6', description: 'Gap from the trigger.' },
        ]}
      />
    </>
  );
}
