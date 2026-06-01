'use client';

import {
  Avatar,
  Badge,
  Timeline,
  TimelineItem,
  type TimelineConnectorStyle,
  type TimelineSize,
} from '@bwo-ui/react';

/* ─── 1. Hero — order tracking ─────────────────────────────────────────── */

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
        <TimelineItem status="pending" time="—" title="Delivered" />
      </Timeline>
    </div>
  );
}

/* ─── 2. Statuses ──────────────────────────────────────────────────────── */

export function TimelineStatusesDemo() {
  return (
    <div className="demo">
      <Timeline>
        <TimelineItem status="completed" time="Step 1" title="Completed">
          Green marker, ✓ icon, green outgoing line.
        </TimelineItem>
        <TimelineItem status="active" time="Step 2" title="Active">
          Accent marker, pulsing ring — the user is here.
        </TimelineItem>
        <TimelineItem status="error" time="Step 3" title="Error">
          Red marker, × icon — something broke.
        </TimelineItem>
        <TimelineItem status="pending" time="Step 4" title="Pending">
          Empty marker, muted line. Not started yet.
        </TimelineItem>
      </Timeline>
    </div>
  );
}

/* ─── 3. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: TimelineSize[] = ['sm', 'md', 'lg'];

export function TimelineSizesDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 36, alignItems: 'stretch' }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>size={s}</code>
          <Timeline size={s}>
            <TimelineItem status="completed" time="Mon" title="Kick-off" />
            <TimelineItem status="active" time="Tue" title="Build" />
            <TimelineItem status="pending" time="Wed" title="Ship" />
          </Timeline>
        </div>
      ))}
    </div>
  );
}

/* ─── 4. Connector styles ──────────────────────────────────────────────── */

const STYLES: TimelineConnectorStyle[] = ['solid', 'dashed', 'dotted'];

export function TimelineConnectorDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 36, alignItems: 'stretch' }}>
      {STYLES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>
            connectorStyle={s}
          </code>
          <Timeline connectorStyle={s}>
            <TimelineItem status="completed" time="Mon" title="Kick-off" />
            <TimelineItem status="completed" time="Tue" title="Design" />
            <TimelineItem status="active" time="Wed" title="Build" />
            <TimelineItem status="pending" time="Thu" title="Ship" />
          </Timeline>
        </div>
      ))}
    </div>
  );
}

/* ─── 5. Align (left for vertical) ─────────────────────────────────────── */

export function TimelineAlignDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>align=&quot;right&quot; (default)</code>
        <Timeline>
          <TimelineItem status="completed" time="Mon" title="Kick-off" />
          <TimelineItem status="active" time="Tue" title="Build" />
          <TimelineItem status="pending" time="Wed" title="Ship" />
        </Timeline>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>align=&quot;left&quot;</code>
        <Timeline align="left">
          <TimelineItem status="completed" time="Mon" title="Kick-off" />
          <TimelineItem status="active" time="Tue" title="Build" />
          <TimelineItem status="pending" time="Wed" title="Ship" />
        </Timeline>
      </div>
    </div>
  );
}

/* ─── 6. Horizontal ────────────────────────────────────────────────────── */

export function TimelineHorizontalDemo() {
  return (
    <div className="demo" style={{ padding: '20px 8px' }}>
      <Timeline orientation="horizontal" style={{ width: '100%' }}>
        <TimelineItem status="completed" time="Mar 1" title="Placed" />
        <TimelineItem status="completed" time="Mar 2" title="Shipped" />
        <TimelineItem status="active" time="Mar 5" title="Out" />
        <TimelineItem status="pending" time="—" title="Delivered" />
      </Timeline>
    </div>
  );
}

/* ─── 7. Custom markers ────────────────────────────────────────────────── */

const PEOPLE = [
  { initials: 'AR', accent: '#ff481f' },
  { initials: 'MS', accent: '#7463ff' },
  { initials: 'IL', accent: '#16a34a' },
];

export function TimelineMarkersDemo() {
  return (
    <div className="demo">
      <Timeline size="lg">
        {PEOPLE.map((p, i) => (
          <TimelineItem
            key={p.initials}
            status={i === 0 ? 'completed' : i === 1 ? 'active' : 'pending'}
            time={i === 0 ? '2 days ago' : i === 1 ? 'now' : 'pending'}
            title={
              i === 0 ? 'Ana approved' : i === 1 ? 'Mihai reviewing' : 'Ioana to approve'
            }
            marker={
              <Avatar
                size="xs"
                fallback={p.initials}
                style={{
                  background: p.accent,
                  color: '#fff',
                  width: '100%',
                  height: '100%',
                }}
              />
            }
          />
        ))}
      </Timeline>
    </div>
  );
}

/* ─── 8. Numbered marker recipe ────────────────────────────────────────── */

function NumberMarker({ n }: { n: number }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: 'currentColor',
        lineHeight: 1,
      }}
    >
      {n}
    </span>
  );
}

export function TimelineNumberedDemo() {
  const steps = ['Account details', 'Profile info', 'Invite team', 'Review & finish'];
  return (
    <div className="demo" style={{ padding: 16 }}>
      <Timeline size="lg">
        {steps.map((label, i) => (
          <TimelineItem
            key={label}
            status={i === 0 ? 'completed' : i === 1 ? 'active' : 'pending'}
            title={label}
            time={i === 0 ? 'Done' : i === 1 ? 'In progress' : `Step ${i + 1}`}
            marker={i === 0 ? undefined : <NumberMarker n={i + 1} />}
          />
        ))}
      </Timeline>
    </div>
  );
}

/* ─── 9. Changelog recipe ──────────────────────────────────────────────── */

export function TimelineChangelogDemo() {
  return (
    <div className="demo" style={{ padding: 16, alignItems: 'stretch' }}>
      <Timeline connectorStyle="dashed">
        <TimelineItem
          status="active"
          time="0.5.0 · today"
          title={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Next milestone
              <Badge size="sm" variant="green">
                Live
              </Badge>
            </span>
          }
        >
          Date picker, command palette, redesigned Toast — every primitive from scratch.
        </TimelineItem>
        <TimelineItem status="completed" time="0.4.0 · last week" title="Select + Multi">
          Select grew <code>multiple</code> + <code>searchable</code> modes; AppShell got an{' '}
          <code>align</code> prop; new Rate component.
        </TimelineItem>
        <TimelineItem status="completed" time="0.3.0 · 3 weeks ago" title="From-scratch rewrite">
          Dropped every <code>@radix-ui/*</code> dependency. Owned primitives end-to-end.
        </TimelineItem>
        <TimelineItem status="completed" time="0.2.1" title="Motion + UI expansion">
          GSAP-backed motion primitives, customizable radius, docs site overhaul.
        </TimelineItem>
      </Timeline>
    </div>
  );
}

/* ─── 10. Process steps with mixed connector ───────────────────────────── */

export function TimelineProcessDemo() {
  return (
    <div className="demo" style={{ padding: 16, alignItems: 'stretch' }}>
      <Timeline>
        <TimelineItem status="completed" time="Step 1" title="Submit application">
          Standard form — name, email, link to portfolio.
        </TimelineItem>
        <TimelineItem status="completed" time="Step 2" title="Screening call">
          30-minute intro with the team lead.
        </TimelineItem>
        <TimelineItem status="active" time="Step 3" title="Technical interview">
          Coding session — design + implement a component live.
        </TimelineItem>
        <TimelineItem status="pending" time="Step 4" title="Offer">
          Compensation, start date, paperwork.
        </TimelineItem>
      </Timeline>
    </div>
  );
}
