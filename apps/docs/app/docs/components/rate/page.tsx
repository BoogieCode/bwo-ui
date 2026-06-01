import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { RateDemo } from './demo';

export const metadata = { title: 'Rate — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Rate</h1>
      <p className="lead">
        Star rating with half-step support, keyboard navigation, and four built-in symbols (star,
        heart, thumb, bolt). Pass any node via <code>icon</code> for a custom shape.
      </p>

      <RateDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Rate } from '@bwo-ui/react';

const [value, setValue] = useState(3.5);

<Rate value={value} onValueChange={setValue} allowHalf />

// Custom symbol
<Rate defaultValue={4} icon="heart" color="var(--bwo-red)" />

// Read-only display
<Rate value={4.2} allowHalf readOnly showValue />`}</CodeBlock>

      <h2>Custom icon</h2>
      <CodeBlock lang="tsx">{`<Rate
  defaultValue={3}
  icon={
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 …" />
    </svg>
  }
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'number',
            description: 'Controlled rating (0..count, with halves if allowHalf).',
          },
          {
            name: 'defaultValue',
            type: 'number',
            defaultValue: '0',
            description: 'Initial uncontrolled rating.',
          },
          {
            name: 'onValueChange',
            type: '(value: number) => void',
            description: 'Called when the user clicks or uses keyboard nav.',
          },
          {
            name: 'count',
            type: 'number',
            defaultValue: '5',
            description: 'Total number of icons.',
          },
          {
            name: 'allowHalf',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Enable 0.5 increments.',
          },
          {
            name: 'icon',
            type: "'star' | 'heart' | 'thumb' | 'bolt' | ReactNode",
            defaultValue: "'star'",
            description: 'Built-in symbol or custom node.',
          },
          {
            name: 'emptyIcon',
            type: 'ReactNode',
            description:
              'Override the background (empty) icon — defaults to a faded copy of `icon`.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Icon size preset.',
          },
          {
            name: 'color',
            type: 'string',
            description: 'Override the fill color (any valid CSS color).',
          },
          {
            name: 'readOnly',
            type: 'boolean',
            description: 'Disable interaction; keep visual brightness.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disable interaction and dim the icons.',
          },
          {
            name: 'clearable',
            type: 'boolean',
            description: 'Clicking the current value clears it to 0.',
          },
          { name: 'showValue', type: 'boolean', description: 'Render the numeric value beside the icons.' },
          { name: 'name', type: 'string', description: 'Emit a hidden input with the current value.' },
        ]}
      />

      <h2>Keyboard</h2>
      <ul>
        <li>
          <kbd>←</kbd> / <kbd>↓</kbd> — decrement by step (1, or 0.5 when allowHalf)
        </li>
        <li>
          <kbd>→</kbd> / <kbd>↑</kbd> — increment by step
        </li>
        <li>
          <kbd>Home</kbd> — clear to 0
        </li>
        <li>
          <kbd>End</kbd> — set to maximum
        </li>
      </ul>
    </>
  );
}
