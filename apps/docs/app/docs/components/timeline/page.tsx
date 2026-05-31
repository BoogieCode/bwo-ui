import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TimelineDemo } from './demo';

export const metadata = { title: 'Timeline — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Timeline</h1>
      <p className="lead">
        Vertical or horizontal sequence of events with markers, timestamps, and connecting lines.
      </p>

      <TimelineDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Timeline, TimelineItem } from '@bwo-ui/react';

<Timeline>
  <TimelineItem status="completed" time="Mar 1" title="Order placed" />
  <TimelineItem status="active"    time="Mar 5" title="Out for delivery" />
  <TimelineItem status="pending"   title="Delivered" hideConnector />
</Timeline>`}</CodeBlock>

      <h2>Props — Timeline</h2>
      <PropsTable
        rows={[
          {
            name: 'orientation',
            type: "'vertical' | 'horizontal'",
            defaultValue: "'vertical'",
            description: 'Layout direction.',
          },
        ]}
      />

      <h2>Props — TimelineItem</h2>
      <PropsTable
        rows={[
          {
            name: 'status',
            type: "'pending' | 'active' | 'completed' | 'error'",
            defaultValue: "'pending'",
            description: 'Visual state for the marker and connector color.',
          },
          { name: 'time', type: 'ReactNode', description: 'Timestamp / label rendered above the title.' },
          { name: 'title', type: 'ReactNode', description: 'Event title.' },
          { name: 'marker', type: 'ReactNode', description: 'Custom marker content.' },
          {
            name: 'hideConnector',
            type: 'boolean',
            description: 'Suppress the connecting line after this item (typically the last one).',
          },
        ]}
      />
    </>
  );
}
