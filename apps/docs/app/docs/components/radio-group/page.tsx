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
      <CodeBlock lang="tsx">{`import { RadioGroupRoot, RadioGroupItem } from '@bwo-ui/react';

const [billing, setBilling] = useState('monthly');

<RadioGroupRoot value={billing} onValueChange={setBilling}>
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <RadioGroupItem value="monthly" /> Monthly — €19/mo
  </label>
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <RadioGroupItem value="annual" /> Annual — €182/yr (save 20%)
  </label>
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <RadioGroupItem value="lifetime" /> Lifetime — €499 once
  </label>
</RadioGroupRoot>`}</CodeBlock>
    </>
  );
}
