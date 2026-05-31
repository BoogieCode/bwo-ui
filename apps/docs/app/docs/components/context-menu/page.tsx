import { CodeBlock } from '../../../../components/code-block';
import { ContextMenuDemo } from './demo';

export const metadata = { title: 'ContextMenu — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ContextMenu</h1>
      <p className="lead">
        Right-click menu anchored at the cursor position. Same item/keyboard primitives as
        DropdownMenu.
      </p>

      <ContextMenuDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@bwo-ui/react';

<ContextMenuTrigger
  menu={
    <ContextMenuContent>
      <ContextMenuItem onSelect={() => copy()}>Copy</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onSelect={() => del()}>Delete</ContextMenuItem>
    </ContextMenuContent>
  }
>
  <div>Right-click me</div>
</ContextMenuTrigger>`}</CodeBlock>
    </>
  );
}
