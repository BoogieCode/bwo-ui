'use client';

import { Timeline, TimelineItem } from '@bwo-ui/react';

export function TimelineDemo() {
  return (
    <div className="demo">
      <Timeline>
        <TimelineItem status="completed" time="Mar 1, 2026" title="Order placed">
          Confirmation email sent.
        </TimelineItem>
        <TimelineItem status="completed" time="Mar 2, 2026" title="Shipped">
          Carrier handed off. Tracking #BWO-29401.
        </TimelineItem>
        <TimelineItem status="active" time="Mar 5, 2026" title="Out for delivery">
          On the truck — expected today.
        </TimelineItem>
        <TimelineItem status="pending" time="—" title="Delivered" hideConnector />
      </Timeline>
    </div>
  );
}
