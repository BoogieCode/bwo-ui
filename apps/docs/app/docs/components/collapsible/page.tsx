import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CollapsibleDemo } from './demo';

export const metadata = { title: 'Collapsible — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Collapsible</h1>
      <p className="lead">
        Single-item expand/collapse with smooth height animation. Lighter than Accordion when
        you just need one toggleable section — sidebar groups, advanced-options panels, FAQ
        items that don&apos;t need single-open enforcement.
      </p>

      <CollapsibleDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Collapsible } from '@bwo-ui/react';

<Collapsible trigger={<span>Advanced options</span>}>
  <Field label="Custom domain" />
  <Field label="Build command" />
</Collapsible>

// Controlled
const [open, setOpen] = useState(false);
<Collapsible trigger={...} open={open} onOpenChange={setOpen}>
  …
</Collapsible>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'trigger', type: 'ReactNode', description: 'Trigger row content rendered inside the button.' },
          { name: 'defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Initial open state (uncontrolled).' },
          { name: 'open', type: 'boolean', description: 'Controlled open state.' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Fires when the state changes.' },
          { name: 'duration', type: 'number', defaultValue: '220', description: 'Transition duration in ms.' },
        ]}
      />
    </>
  );
}
