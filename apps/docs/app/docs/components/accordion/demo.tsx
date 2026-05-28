'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@bwo-ui/react';

export function AccordionDemo() {
  return (
    <div className="demo" style={{ alignItems: 'stretch', maxWidth: 560, marginInline: 'auto' }}>
      <AccordionRoot type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is bwo-ui free for commercial use?</AccordionTrigger>
          <AccordionContent>
            Yes. MIT-licensed for the library itself, and GSAP is free for commercial use since
            Webflow&apos;s acquisition.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need GSAP if I only use UI components?</AccordionTrigger>
          <AccordionContent>
            No. GSAP is a peer dependency only loaded when you import a motion component or
            effect.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I theme the components?</AccordionTrigger>
          <AccordionContent>
            Override the <code>--bwo-*</code> CSS variables in your own stylesheet. See the
            Theming guide for the full token list.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  );
}
