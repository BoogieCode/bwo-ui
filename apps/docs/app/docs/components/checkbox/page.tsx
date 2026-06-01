import { CodeBlock } from '../../../../components/code-block';
import { CheckboxDemo } from './demo';

export const metadata = { title: 'Checkbox — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Checkbox</h1>
      <p className="lead">
        Accessible checkbox built from scratch. Supports the indeterminate state. Pair with a{' '}
        <code>&lt;label&gt;</code> using the standard <code>htmlFor</code> association.
      </p>

      <CheckboxDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Checkbox } from '@bwo-ui/react';

<label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
  <Checkbox defaultChecked /> Accept terms
</label>`}</CodeBlock>

      <p>
        Props: <code>checked</code>, <code>defaultChecked</code> (accepts{' '}
        <code>boolean | &apos;indeterminate&apos;</code>), <code>onCheckedChange</code>,{' '}
        <code>disabled</code>, <code>name</code>, <code>value</code>, <code>required</code>.
      </p>
    </>
  );
}
