import { CodeBlock } from '../../../../components/code-block';
import { DialogDemo } from './demo';

export const metadata = { title: 'Dialog — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Dialog</h1>
      <p className="lead">
        Modal dialog built from scratch. Focus trap, escape-to-close, scroll lock, backdrop
        blur, scale-in animation.
      </p>

      <DialogDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@bwo-ui/react';

<DialogRoot>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Confirm subscription</DialogTitle>
    <DialogDescription>
      You'll be charged €19/month starting today. Cancel anytime from settings.
    </DialogDescription>
    <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="solid">Subscribe</Button>
      </DialogClose>
    </div>
  </DialogContent>
</DialogRoot>`}</CodeBlock>

      <p>
        Anatomy: <code>DialogRoot</code>, <code>DialogTrigger</code>, <code>DialogContent</code>,
        <code>DialogTitle</code>, <code>DialogDescription</code>, <code>DialogClose</code>.
      </p>
    </>
  );
}
