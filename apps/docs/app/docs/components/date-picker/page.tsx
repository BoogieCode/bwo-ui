import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { DatePickerDemo } from './demo';

export const metadata = { title: 'DatePicker — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>DatePicker</h1>
      <p className="lead">
        Calendar in a Popover, anchored to an input-style trigger. Selection closes the popover.
      </p>

      <DatePickerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { DatePicker } from '@bwo-ui/react';

const [date, setDate] = useState<Date | null>(null);

<DatePicker value={date} onValueChange={setDate} />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'Date | null', description: 'Controlled selected date.' },
          { name: 'defaultValue', type: 'Date | string | number | null', description: 'Initial uncontrolled date.' },
          { name: 'onValueChange', type: '(value: Date | null) => void', description: 'Selection change handler.' },
          {
            name: 'placeholder',
            type: 'string',
            defaultValue: "'Pick a date'",
            description: 'Shown when no date is selected.',
          },
          {
            name: 'formatLabel',
            type: '(date: Date) => string',
            description: 'Custom formatter. Default: locale date string.',
          },
          {
            name: 'calendarProps',
            type: 'CalendarProps (subset)',
            description: 'Forwarded to the underlying Calendar (min/max, isDateDisabled, etc.).',
          },
        ]}
      />
    </>
  );
}
