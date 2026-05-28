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
      <CodeBlock lang="tsx">{`import { Accordion } from '@bwo-ui/react';

<Accordion.Root type="single" collapsible defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is bwo-ui free?</Accordion.Trigger>
    <Accordion.Content>Yes — MIT licensed, ship anything.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Do I need GSAP?</Accordion.Trigger>
    <Accordion.Content>Only for the motion package. UI works standalone.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}</CodeBlock>
    </>
  );
}
