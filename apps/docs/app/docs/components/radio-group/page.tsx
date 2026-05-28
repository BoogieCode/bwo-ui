import { CodeBlock } from '../../../../components/code-block';
import { RadioGroupDemo } from './demo';

export const metadata = { title: 'RadioGroup — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>RadioGroup</h1>
      <p className="lead">Single-selection group of radio buttons.</p>

      <RadioGroupDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { RadioGroup } from '@bwo-ui/react';

<RadioGroup.Root defaultValue="monthly">
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <RadioGroup.Item value="monthly" /> Monthly
  </label>
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <RadioGroup.Item value="annual" /> Annual (save 20%)
  </label>
</RadioGroup.Root>`}</CodeBlock>
    </>
  );
}
