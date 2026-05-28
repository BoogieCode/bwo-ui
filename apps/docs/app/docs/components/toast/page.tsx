import { CodeBlock } from '../../../../components/code-block';
import { ToastDemo } from './demo';

export const metadata = { title: 'Toast — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Toast</h1>
      <p className="lead">
        Bottom-right notification stack. Includes <code>&lt;Toaster /&gt;</code> provider and a{' '}
        <code>useToast()</code> hook for imperative triggering.
      </p>

      <ToastDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`// 1. Mount Toaster once near the app root.
import { Toaster } from '@bwo-ui/react';

<Toaster>
  <App />
</Toaster>

// 2. Anywhere below, call useToast().
import { useToast, Button } from '@bwo-ui/react';

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => toast({ title: 'Saved', description: 'Changes are live.' })}
    >
      Save
    </Button>
  );
}`}</CodeBlock>

      <p>
        For finer control, use the Radix-style primitives directly:{' '}
        <code>Toast.Provider</code>, <code>Toast.Root</code>, <code>Toast.Title</code>,
        <code>Toast.Description</code>, <code>Toast.Close</code>, <code>Toast.Viewport</code>.
      </p>
    </>
  );
}
