import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { SheetDemo } from './demo';

export const metadata = { title: 'Sheet — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Sheet</h1>
      <p className="lead">
        Slide-over panel anchored to any edge of the viewport. Built on the same accessible primitives
        as Dialog.
      </p>

      <SheetDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@bwo-ui/react';

<SheetRoot>
  <SheetTrigger asChild>
    <Button>Open sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Profile</SheetTitle>
      <SheetDescription>Update your account info.</SheetDescription>
    </SheetHeader>
    {/* body */}
  </SheetContent>
</SheetRoot>`}</CodeBlock>

      <h2>Props — SheetContent</h2>
      <PropsTable
        rows={[
          {
            name: 'side',
            type: "'top' | 'right' | 'bottom' | 'left'",
            defaultValue: "'right'",
            description: 'Edge the sheet slides in from.',
          },
          {
            name: 'showClose',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Render the top-right close button.',
          },
        ]}
      />
    </>
  );
}
