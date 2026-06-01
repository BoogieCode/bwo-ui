import { CodeBlock } from '../../../../components/code-block';
import { AccordionDemo } from './demo';

export const metadata = { title: 'Accordion — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Accordion</h1>
      <p className="lead">
        Direct port of <code>.ai-faq-accordion</code> from boogie-next — same dashed dividers,
        chevron-to-minus icon animation, smooth height transitions.
      </p>

      <AccordionDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@bwo-ui/react';

<AccordionRoot type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is bwo-ui free for commercial use?</AccordionTrigger>
    <AccordionContent>
      Yes. MIT-licensed for the library itself, and GSAP is free for commercial
      use since Webflow's acquisition.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Do I need GSAP if I only use UI components?</AccordionTrigger>
    <AccordionContent>
      No. GSAP is a peer dependency only loaded when you import a motion
      component or effect.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>How do I theme the components?</AccordionTrigger>
    <AccordionContent>
      Override the <code>--bwo-*</code> CSS variables in your own stylesheet.
    </AccordionContent>
  </AccordionItem>
</AccordionRoot>`}</CodeBlock>
    </>
  );
}
