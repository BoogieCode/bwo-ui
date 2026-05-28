import { CodeBlock } from '../../../../components/code-block';
import { CheckboxDemo } from './demo';

export const metadata = { title: 'Checkbox — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Checkbox</h1>
      <p className="lead">
        Accessible checkbox built on Radix. Supports the indeterminate state. Pair with a{' '}
        <code>&lt;label&gt;</code> using the standard <code>htmlFor</code> association.
      </p>

      <CheckboxDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Checkbox } from '@bwo-ui/react';

<label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
  <Checkbox defaultChecked /> Accept terms
</label>`}</CodeBlock>

      <p>
        All props from Radix&apos;s{' '}
        <code>
          <a href="https://www.radix-ui.com/primitives/docs/components/checkbox#root" target="_blank" rel="noopener noreferrer">
            Checkbox.Root
          </a>
        </code>{' '}
        are forwarded — <code>checked</code>, <code>defaultChecked</code>, <code>onCheckedChange</code>,{' '}
        <code>disabled</code>, etc.
      </p>
    </>
  );
}
