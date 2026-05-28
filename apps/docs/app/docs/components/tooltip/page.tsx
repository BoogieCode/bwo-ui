import { CodeBlock } from '../../../../components/code-block';
import { TooltipDemo } from './demo';

export const metadata = { title: 'Tooltip — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Tooltip</h1>
      <p className="lead">
        Hover/focus tooltip. Use the shorthand <code>&lt;Tooltip content=&quot;…&quot;&gt;</code>{' '}
        or the granular Radix-style anatomy.
      </p>

      <TooltipDemo />

      <h2>Usage (shorthand)</h2>
      <CodeBlock lang="tsx">{`import { Tooltip, IconButton } from '@bwo-ui/react';

<Tooltip content="Copy to clipboard" side="top">
  <IconButton aria-label="Copy"><CopyIcon /></IconButton>
</Tooltip>`}</CodeBlock>

      <h2>Anatomy</h2>
      <CodeBlock lang="tsx">{`import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@bwo-ui/react';

<TooltipProvider delayDuration={150}>
  <TooltipRoot>
    <TooltipTrigger asChild><button>Hover me</button></TooltipTrigger>
    <TooltipContent side="bottom">Hello!</TooltipContent>
  </TooltipRoot>
</TooltipProvider>`}</CodeBlock>
    </>
  );
}
