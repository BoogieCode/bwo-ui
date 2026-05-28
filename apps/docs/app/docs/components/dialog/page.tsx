import { CodeBlock } from '../../../../components/code-block';
import { DialogDemo } from './demo';

export const metadata = { title: 'Dialog — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Dialog</h1>
      <p className="lead">
        Modal dialog built on Radix. Focus trap, escape-to-close, scroll lock, backdrop blur,
        scale-in animation.
      </p>

      <DialogDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Button,
} from '@bwo-ui/react';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Are you sure?</Dialog.Title>
    <Dialog.Description>This action cannot be undone.</Dialog.Description>
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      <Dialog.Close asChild>
        <Button variant="ghost">Cancel</Button>
      </Dialog.Close>
      <Button variant="solid">Confirm</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>`}</CodeBlock>

      <p>
        Anatomy: <code>Dialog.Root</code>, <code>Dialog.Trigger</code>, <code>Dialog.Content</code>,
        <code>Dialog.Title</code>, <code>Dialog.Description</code>, <code>Dialog.Close</code>. All
        Radix Dialog props are passed through.
      </p>
    </>
  );
}
