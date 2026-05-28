import { CodeBlock } from '../../../../components/code-block';
import { PopoverDemo } from './demo';

export const metadata = { title: 'Popover — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Popover</h1>
      <p className="lead">Click-triggered floating panel with focus management. Radix-powered.</p>

      <PopoverDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Popover, Button } from '@bwo-ui/react';

<Popover.Root>
  <Popover.Trigger asChild>
    <Button variant="ghost">Open popover</Button>
  </Popover.Trigger>
  <Popover.Content side="bottom">
    <h4>Quick settings</h4>
    <p>Whatever lives in this little panel.</p>
  </Popover.Content>
</Popover.Root>`}</CodeBlock>
    </>
  );
}
