import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { NumberInputDemo } from './demo';

export const metadata = { title: 'NumberInput — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>NumberInput</h1>
      <p className="lead">
        Numeric input with +/- stepper buttons, keyboard arrow control (Shift = large step),
        PageUp/Down, Home/End to clamp, and optional mouse-wheel adjust.
      </p>

      <NumberInputDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { NumberInput } from '@bwo-ui/react';

const [qty, setQty] = useState<number | null>(1);

<NumberInput value={qty} onValueChange={setQty} min={0} max={99} step={1} />

<NumberInput defaultValue={19.99} step={0.01} precision={2} prefix="$" />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'number | null', description: 'Controlled value.' },
          { name: 'defaultValue', type: 'number | null', description: 'Initial uncontrolled value.' },
          { name: 'onValueChange', type: '(value: number | null) => void', description: 'Change handler.' },
          { name: 'min / max', type: 'number', description: 'Bounds for stepping and clamping.' },
          { name: 'step', type: 'number', defaultValue: '1', description: 'Increment for ArrowUp/Down and the stepper buttons.' },
          { name: 'largeStep', type: 'number', description: 'Step applied with Shift / PageUp / PageDown. Default: step × 10.' },
          {
            name: 'precision',
            type: 'number',
            description: 'Decimal places. Default: derived from step.',
          },
          { name: 'showSteppers', type: 'boolean', defaultValue: 'true', description: 'Render the +/- stepper buttons.' },
          { name: 'clampOnBlur', type: 'boolean', defaultValue: 'true', description: 'Clamp to [min, max] on blur.' },
          { name: 'prefix / suffix', type: 'string', description: 'Adornments rendered inside the field.' },
          { name: 'disableWheel', type: 'boolean', description: 'Disable mouse-wheel value changes.' },
        ]}
      />
    </>
  );
}
