import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TimePickerDemo } from './demo';

export const metadata = { title: 'TimePicker — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>TimePicker</h1>
      <p className="lead">
        Hours + minutes (and optional seconds) input. 24-hour or 12-hour formats with an AM/PM
        toggle, ↑/↓ on the minute field steps by your chosen granularity. Value is always
        emitted as a 24-hour <code>HH:MM</code> string regardless of display format.
      </p>

      <TimePickerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { TimePicker } from '@bwo-ui/react';

const [time, setTime] = useState('14:30');

<TimePicker value={time} onValueChange={setTime} step={5} />

// 12-hour with seconds
<TimePicker format="12h" withSeconds value={time} onValueChange={setTime} />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Controlled 24-hour HH:MM string.' },
          { name: 'defaultValue', type: 'string', defaultValue: "'12:00'", description: 'Uncontrolled default.' },
          { name: 'onValueChange', type: '(value: string) => void', description: 'Fires with the new HH:MM (24-hour) string.' },
          { name: 'withSeconds', type: 'boolean', defaultValue: 'false', description: 'Add a seconds slot.' },
          { name: 'format', type: "'24h' | '12h'", defaultValue: "'24h'", description: 'Display format.' },
          { name: 'step', type: 'number', defaultValue: '1', description: 'Step in minutes for arrow-key changes on the minute field.' },
        ]}
      />
    </>
  );
}
