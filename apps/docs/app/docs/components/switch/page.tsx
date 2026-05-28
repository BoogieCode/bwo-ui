import { CodeBlock } from '../../../../components/code-block';
import { SwitchDemo } from './demo';

export const metadata = { title: 'Switch — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Switch</h1>
      <p className="lead">Toggle built on Radix. Spring-eased thumb, ARIA-correct.</p>

      <SwitchDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Switch } from '@bwo-ui/react';

<label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
  <Switch defaultChecked /> Enable cookies
</label>`}</CodeBlock>
      <p>
        Props: <code>checked</code>, <code>defaultChecked</code>, <code>onCheckedChange</code>,{' '}
        <code>disabled</code> (all forwarded to Radix).
      </p>
    </>
  );
}
