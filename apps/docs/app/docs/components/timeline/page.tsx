import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  TimelineAlignDemo,
  TimelineChangelogDemo,
  TimelineConnectorDemo,
  TimelineDemo,
  TimelineHorizontalDemo,
  TimelineMarkersDemo,
  TimelineNumberedDemo,
  TimelineProcessDemo,
  TimelineSizesDemo,
  TimelineStatusesDemo,
} from './demo';

export const metadata = { title: 'Timeline — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Timeline</h1>
      <p className="lead">
        Vertical or horizontal sequence of events with status-coloured markers, optional
        timestamps, and a continuous connecting line that runs uninterrupted between markers.
        Four statuses cover the standard lifecycle (pending → active → completed / error),
        three sizes, three line styles, and a slot for custom markers (avatars, numbers,
        icons).
      </p>

      <TimelineDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Timeline, TimelineItem } from '@bwo-ui/react';

<Timeline>
  <TimelineItem status="completed" time="Mar 1" title="Order placed">
    Confirmation email sent.
  </TimelineItem>
  <TimelineItem status="completed" time="Mar 2" title="Shipped" />
  <TimelineItem status="active"    time="Mar 5" title="Out for delivery">
    On the truck — expected today.
  </TimelineItem>
  <TimelineItem status="pending"   time="—"     title="Delivered" />
</Timeline>`}</CodeBlock>

      <h2>Statuses</h2>
      <p>
        Four <code>TimelineItem</code> statuses map to a colour treatment, a default marker
        icon, and the colour of the outgoing line:
      </p>
      <ul>
        <li>
          <code>pending</code> — empty bordered marker, muted grey line. Hasn&apos;t started.
        </li>
        <li>
          <code>active</code> — accent-coloured marker with a pulsing ring. The user is here.
        </li>
        <li>
          <code>completed</code> — green marker, ✓ icon, green line. Done.
        </li>
        <li>
          <code>error</code> — red marker, × icon, red line. Failed.
        </li>
      </ul>
      <TimelineStatusesDemo />
      <CodeBlock lang="tsx">{`<TimelineItem status="completed" title="Completed" />
<TimelineItem status="active"    title="Active" />
<TimelineItem status="error"     title="Error" />
<TimelineItem status="pending"   title="Pending" />`}</CodeBlock>
      <p>
        The line that runs <em>out</em> of an item takes that item&apos;s status colour. So a
        completed-then-pending sequence renders as green-to-grey on the boundary.
      </p>

      <h2>Sizes</h2>
      <p>
        <code>sm</code> (10 px marker) for dense lists like settings audit logs and ambient
        activity feeds; <code>md</code> (14 px, default) for general use; <code>lg</code>{' '}
        (20 px) for hero positions like onboarding walkthroughs and big-process pages. Marker
        size, line thickness, and inter-item spacing all scale together.
      </p>
      <TimelineSizesDemo />
      <CodeBlock lang="tsx">{`<Timeline size="sm">…</Timeline>
<Timeline>…</Timeline>          {/* md */}
<Timeline size="lg">…</Timeline>`}</CodeBlock>

      <h2>Connector style</h2>
      <p>
        <code>solid</code> (default) for confirmed sequences; <code>dashed</code> for
        upcoming / tentative steps (changelog drafts, soft milestones);{' '}
        <code>dotted</code> for the lightest, most ambient line.
      </p>
      <TimelineConnectorDemo />
      <CodeBlock lang="tsx">{`<Timeline connectorStyle="solid">…</Timeline>
<Timeline connectorStyle="dashed">…</Timeline>
<Timeline connectorStyle="dotted">…</Timeline>`}</CodeBlock>

      <h2>Alignment</h2>
      <p>
        Vertical timelines default to <code>align=&quot;right&quot;</code> (content on the
        right of the line). Switch to <code>align=&quot;left&quot;</code> when the timeline
        sits on the right edge of a page, or when an RTL layout calls for it. Horizontal
        timelines default to <code>align=&quot;bottom&quot;</code> (content under the line);{' '}
        <code>align=&quot;top&quot;</code> flips that.
      </p>
      <TimelineAlignDemo />
      <CodeBlock lang="tsx">{`<Timeline align="right">…</Timeline>  {/* default */}
<Timeline align="left">…</Timeline>

<Timeline orientation="horizontal">…</Timeline>           {/* align="bottom" */}
<Timeline orientation="horizontal" align="top">…</Timeline>`}</CodeBlock>

      <h2>Horizontal</h2>
      <p>
        For stepper-style flows where the user scans left-to-right — checkout, multi-step
        sign-up, shipment milestones. The container automatically overflows on small screens,
        keeping every step reachable via horizontal scroll.
      </p>
      <TimelineHorizontalDemo />
      <CodeBlock lang="tsx">{`<Timeline orientation="horizontal">
  <TimelineItem status="completed" time="Mar 1" title="Placed" />
  <TimelineItem status="completed" time="Mar 2" title="Shipped" />
  <TimelineItem status="active"    time="Mar 5" title="Out" />
  <TimelineItem status="pending"   time="—"     title="Delivered" />
</Timeline>`}</CodeBlock>

      <h2>Custom markers</h2>
      <p>
        Pass any node to <code>marker</code> on a <code>TimelineItem</code> to replace the
        default dot — avatars for who-did-what feeds, numbers for stepper UIs, custom icons for
        domain-specific events. The marker box still respects the timeline&apos;s{' '}
        <code>size</code> so the line stays aligned.
      </p>
      <TimelineMarkersDemo />
      <CodeBlock lang="tsx">{`<Timeline size="lg">
  <TimelineItem
    status="completed"
    time="2 days ago"
    title="Ana approved"
    marker={<Avatar size="xs" fallback="AR" style={{ background: '#ff481f' }} />}
  />
  <TimelineItem
    status="active"
    time="now"
    title="Mihai reviewing"
    marker={<Avatar size="xs" fallback="MS" style={{ background: '#7463ff' }} />}
  />
  …
</Timeline>`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>Numbered stepper</h3>
      <p>
        Onboarding flows commonly want numbered markers — &quot;step 1 of 4&quot;. Use the{' '}
        <code>marker</code> slot with a small bold number; let the <code>completed</code>{' '}
        status keep its default ✓ icon so finished steps stand out.
      </p>
      <TimelineNumberedDemo />
      <CodeBlock lang="tsx">{`<Timeline size="lg">
  <TimelineItem status="completed" title="Account details" time="Done" />
  <TimelineItem status="active"    title="Profile info"    time="In progress"
                marker={<NumberMarker n={2} />} />
  <TimelineItem status="pending"   title="Invite team"      time="Step 3"
                marker={<NumberMarker n={3} />} />
  <TimelineItem status="pending"   title="Review & finish"  time="Step 4"
                marker={<NumberMarker n={4} />} />
</Timeline>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Changelog</h3>
      <p>
        Release notes lay out cleanly as a timeline — the newest entry is the active node, past
        entries are completed, and dashed connectors signal &quot;still in motion&quot; for the
        ongoing line.
      </p>
      <TimelineChangelogDemo />
      <CodeBlock lang="tsx">{`<Timeline connectorStyle="dashed">
  <TimelineItem status="active" time="0.5.0 · today" title={<>Next milestone <Badge>Live</Badge></>}>
    Date picker, command palette, redesigned Toast.
  </TimelineItem>
  <TimelineItem status="completed" time="0.4.0 · last week" title="Select + Multi">
    Select grew \`multiple\` + \`searchable\` modes…
  </TimelineItem>
  <TimelineItem status="completed" time="0.3.0" title="From-scratch rewrite">
    Dropped every \`@radix-ui/*\` dependency.
  </TimelineItem>
</Timeline>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Process / hiring funnel</h3>
      <p>
        Multi-stage processes (interviews, deal pipelines, approval flows) read naturally as a
        timeline. Mix statuses to convey where things stand without an extra status legend.
      </p>
      <TimelineProcessDemo />
      <CodeBlock lang="tsx">{`<Timeline>
  <TimelineItem status="completed" time="Step 1" title="Submit application">…</TimelineItem>
  <TimelineItem status="completed" time="Step 2" title="Screening call">…</TimelineItem>
  <TimelineItem status="active"    time="Step 3" title="Technical interview">…</TimelineItem>
  <TimelineItem status="pending"   time="Step 4" title="Offer">…</TimelineItem>
</Timeline>`}</CodeBlock>

      <h2>Continuous line</h2>
      <p>
        The connecting line is rendered as a <code>::before</code> pseudo-element on each item,
        positioned absolutely from the bottom of its marker through to the top of the next
        item&apos;s marker. There&apos;s no break at the padding boundary — what you see is one
        line per item, with no visible seam where one ends and the next begins. The last item
        auto-hides its connector; pass <code>hideConnector</code> on any earlier item if you
        need to terminate a branch mid-list.
      </p>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Timeline renders as an ordered list (<code>{'<ol>'}</code>) of items
          (<code>{'<li>'}</code>) — screen readers announce position (&quot;item 2 of 4&quot;).
        </li>
        <li>
          Status colour is reinforced by the marker shape (✓ for completed, × for error, empty
          for pending, accent dot for active). Colour-blind users still get the meaning from
          the icons and the title text.
        </li>
        <li>
          The active-item pulse animation is paused under{' '}
          <code>prefers-reduced-motion: reduce</code>.
        </li>
        <li>
          For truly dynamic timelines (a build log that ticks new entries in), wrap the list in
          a region with <code>aria-live=&quot;polite&quot;</code> so new items get announced as
          they appear.
        </li>
        <li>
          Custom markers should carry <code>aria-hidden</code> if they duplicate information
          that&apos;s already in the title (e.g. an icon for &quot;deployment&quot; next to a
          title that already says &quot;Deployed&quot;).
        </li>
      </ul>

      <h2>Timeline props</h2>
      <PropsTable
        rows={[
          {
            name: 'orientation',
            type: "'vertical' | 'horizontal'",
            defaultValue: "'vertical'",
            description: 'Layout direction.',
          },
          {
            name: 'align',
            type: "'left' | 'right' | 'top' | 'bottom'",
            description:
              "Content position relative to the line. Defaults to 'right' for vertical, 'bottom' for horizontal.",
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: '10 / 14 / 20 px marker. Line thickness and inter-item spacing scale together.',
          },
          {
            name: 'connectorStyle',
            type: "'solid' | 'dashed' | 'dotted'",
            defaultValue: "'solid'",
            description: 'Visual style of the connecting line.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLOListElement>',
            description:
              'Native attributes are forwarded to the `<ol>` — `style`, `className`, `aria-*`.',
          },
        ]}
      />

      <h2>TimelineItem props</h2>
      <PropsTable
        rows={[
          {
            name: 'status',
            type: "'pending' | 'active' | 'completed' | 'error'",
            defaultValue: "'pending'",
            description:
              'Marker fill, default icon, and the colour of the line running out of this item.',
          },
          {
            name: 'title',
            type: 'ReactNode',
            description: 'Headline — the event itself.',
          },
          {
            name: 'time',
            type: 'ReactNode',
            description: 'Timestamp or supporting label rendered above the title.',
          },
          {
            name: 'marker',
            type: 'ReactNode',
            description:
              'Custom marker content (avatar, number, icon). Replaces the default status icon.',
          },
          {
            name: 'hideConnector',
            type: 'boolean',
            description:
              'Suppress the outgoing line. The last item auto-hides; only set this for unusual cases.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLLIElement>',
            description: 'Native `<li>` attributes are forwarded.',
          },
        ]}
      />
    </>
  );
}
