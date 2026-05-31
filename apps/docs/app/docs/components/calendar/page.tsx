import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CalendarDemo } from './demo';

export const metadata = { title: 'Calendar — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Calendar</h1>
      <p className="lead">
        Month grid with single or range selection. Arrow keys move by day, PageUp/Down by month,
        Home/End jump to the month edges.
      </p>

      <CalendarDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Calendar } from '@bwo-ui/react';

const [date, setDate] = useState<Date | null>(null);

<Calendar
  mode="single"
  value={date}
  onValueChange={(v) => setDate(v as Date | null)}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'mode',
            type: "'single' | 'range'",
            defaultValue: "'single'",
            description: 'Single date or range selection.',
          },
          {
            name: 'value',
            type: 'Date | null | DateRange',
            description: 'Controlled selection.',
          },
          {
            name: 'onValueChange',
            type: '(value: Date | null | DateRange) => void',
            description: 'Selection change handler.',
          },
          {
            name: 'minDate / maxDate',
            type: 'Date | string | number',
            description: 'Disable dates outside the range.',
          },
          {
            name: 'isDateDisabled',
            type: '(date: Date) => boolean',
            description: 'Predicate to disable specific dates.',
          },
          {
            name: 'weekStartsOn',
            type: '0 | 1',
            defaultValue: '0',
            description: '0 = Sunday, 1 = Monday.',
          },
        ]}
      />
    </>
  );
}
