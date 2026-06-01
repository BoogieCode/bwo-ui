import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  StatAlignDemo,
  StatDashboardDemo,
  StatDeltaDemo,
  StatDemo,
  StatGroupDemo,
  StatHeroDemo,
  StatIconsDemo,
  StatSizesDemo,
  StatTonesDemo,
} from './demo';

export const metadata = { title: 'Stat — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Stat</h1>
      <p className="lead">
        Big-number display with a label, optional icon, trend delta (▲ ▼), tone-coloured value,
        and three sizes. Wraps <code>CountUp</code> automatically when given a numeric{' '}
        <code>count</code>, so the value animates in on mount. Pair with{' '}
        <code>StatGroup</code> to lay out a row with optional vertical dividers.
      </p>

      <StatDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Stat, StatGroup } from '@bwo-ui/react';

<Stat label="Sites shipped" count={420} />
<Stat label="Uptime" count={99.9} decimals={1} suffix="%" />
<Stat label="Version" value="v2.0" />

<Stat
  label="Monthly visitors"
  count={128400}
  delta={12.3}
  deltaSuffix="%"
  deltaLabel="vs last month"
/>`}</CodeBlock>

      <h2>Delta indicator</h2>
      <p>
        Pass <code>delta</code> as a positive or negative number to render a trend line below
        the value — <code>▲</code> for up, <code>▼</code> for down, <code>→</code> for zero.
        Colour follows the sign by default (positive → green, negative → red). For metrics where
        a lower number is better — bounce rate, error rate, page load time — pass{' '}
        <code>goodWhen=&quot;down&quot;</code> to flip the colour mapping so a falling number
        reads as success.
      </p>
      <StatDeltaDemo />
      <CodeBlock lang="tsx">{`{/* Higher is better (default) — positive delta is green */}
<Stat label="Monthly visitors" count={128400} delta={12.3} deltaSuffix="%" deltaLabel="vs last month" />

{/* Lower is better — negative delta is green */}
<Stat
  label="Bounce rate"
  count={38}
  suffix="%"
  delta={-2.1}
  deltaSuffix=" pp"
  deltaLabel="vs last month"
  goodWhen="down"
/>`}</CodeBlock>

      <h2>Sizes</h2>
      <p>
        <code>sm</code> (24 px value) for table cells and dense dashboards, <code>md</code>{' '}
        (44 px, default) for general use, <code>lg</code> (56 px) for hero positions like the
        top of a report or a single-stat callout.
      </p>
      <StatSizesDemo />
      <CodeBlock lang="tsx">{`<Stat size="sm" label="Monthly visitors" count={128400} delta={12.3} deltaSuffix="%" />
<Stat           label="Monthly visitors" count={128400} delta={12.3} deltaSuffix="%" />
<Stat size="lg" label="Monthly visitors" count={128400} delta={12.3} deltaSuffix="%" />`}</CodeBlock>

      <h2>With icons</h2>
      <p>
        Pass an inline SVG via <code>icon</code> to add a leading visual category cue. Keep
        icons at about 20 × 20 px and use <code>currentColor</code> so they pick up the
        surrounding muted colour automatically.
      </p>
      <StatIconsDemo />
      <CodeBlock lang="tsx">{`<Stat icon={<UsersIcon />}  label="Active users" count={4910} />
<Stat icon={<DollarIcon />} label="MRR"          count={48230} prefix="$" />
<Stat icon={<CartIcon />}   label="Orders"       count={372} />
<Stat icon={<BoltIcon />}   label="API calls"    count={1.24} decimals={2} suffix=" M" />`}</CodeBlock>

      <h2>Tone</h2>
      <p>
        Colour the value itself when the stat&apos;s state itself is meaningful — green when a
        target&apos;s been hit, yellow as a warning, red as a problem. Tone applies only to the
        value; delta colours continue to follow <code>goodWhen</code>.
      </p>
      <StatTonesDemo />
      <CodeBlock lang="tsx">{`<Stat tone="default" label="tone=default" count={4910} />
<Stat tone="success" label="tone=success" count={4910} />
<Stat tone="warning" label="tone=warning" count={4910} />
<Stat tone="danger"  label="tone=danger"  count={12} />`}</CodeBlock>

      <h2>Alignment</h2>
      <p>
        <code>align</code> controls how the value, label, and delta line up within the Stat&apos;s
        own box. <code>start</code> (default) is the natural left-rail layout;{' '}
        <code>center</code> is for symmetric dashboard cards; <code>end</code> right-aligns
        everything for a table&apos;s last column or a number column in a report.
      </p>
      <StatAlignDemo />
      <CodeBlock lang="tsx">{`<Stat align="start"  label="Start"  count={420} delta={5} deltaSuffix="%" />
<Stat align="center" label="Center" count={420} delta={5} deltaSuffix="%" />
<Stat align="end"    label="End"    count={420} delta={5} deltaSuffix="%" />`}</CodeBlock>

      <h2>StatGroup</h2>
      <p>
        Wrap multiple Stats in a <code>StatGroup</code> to lay them out as a row. The{' '}
        <code>divided</code> prop adds a 1 px vertical line between each item — useful for
        report headers and the &quot;at a glance&quot; row at the top of a dashboard.
      </p>
      <StatGroupDemo />
      <CodeBlock lang="tsx">{`{/* Plain row */}
<StatGroup>
  <Stat label="Visitors"    count={12834} />
  <Stat label="Conversions" count={420} />
  <Stat label="Revenue"     count={48230} prefix="$" />
</StatGroup>

{/* With vertical dividers between items */}
<StatGroup divided>
  <Stat label="Visitors"    count={12834} delta={8.2}  deltaSuffix="%" />
  <Stat label="Conversions" count={420}   delta={-1.4} deltaSuffix="%" />
  <Stat label="Revenue"     count={48230} prefix="$" delta={12.7} deltaSuffix="%" />
</StatGroup>`}</CodeBlock>

      <h2>Dashboard recipe</h2>
      <p>
        The canonical dashboard layout: a 4-up grid of <code>Card</code>-wrapped stats. Use{' '}
        <code>size=&quot;sm&quot;</code>, icons for visual scanning, deltas with appropriate{' '}
        <code>goodWhen</code>, and <code>tone=&quot;danger&quot;</code> on the error counter so
        problems stand out.
      </p>
      <StatDashboardDemo />
      <CodeBlock lang="tsx">{`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
  <Card pad="compact">
    <Stat size="sm" icon={<UsersIcon />}  label="Active users" count={4910}
          delta={6.2}  deltaSuffix="%" />
  </Card>
  <Card pad="compact">
    <Stat size="sm" icon={<DollarIcon />} label="MRR"          count={48230} prefix="$"
          delta={12.7} deltaSuffix="%" />
  </Card>
  <Card pad="compact">
    <Stat size="sm" icon={<CartIcon />}   label="Bounce rate"  count={38}    suffix="%"
          delta={-2.1} deltaSuffix=" pp" goodWhen="down" />
  </Card>
  <Card pad="compact">
    <Stat size="sm" icon={<BoltIcon />}  tone="danger" label="Errors" count={37}
          delta={9} goodWhen="down" />
  </Card>
</div>`}</CodeBlock>

      <h2>Hero stat</h2>
      <p>
        Single, oversized stat for the top of a report. Combine <code>size=&quot;lg&quot;</code>
        with a contextual badge or status pill on the side.
      </p>
      <StatHeroDemo />
      <CodeBlock lang="tsx">{`<Card>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Stat
      size="lg"
      label="Total revenue this quarter"
      count={482310}
      prefix="$"
      delta={18.4}
      deltaSuffix="%"
      deltaLabel="vs last quarter"
    />
    <Badge variant="green" size="sm">Live</Badge>
  </div>
</Card>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          The label is rendered after the value but is the most important text for screen
          readers — keep it specific (&quot;Monthly visitors&quot;, not just
          &quot;Visitors&quot;).
        </li>
        <li>
          The delta arrow (<code>▲ ▼ →</code>) is decorative and rendered{' '}
          <code>aria-hidden</code>. The numeric value and the <code>deltaLabel</code> carry the
          actual meaning.
        </li>
        <li>
          Don&apos;t rely on colour alone for delta direction. The arrow itself is part of the
          message — a colour-blind user reading &quot;▲ 12.3 % vs last month&quot; still gets
          the trend.
        </li>
        <li>
          <code>CountUp</code> animates the value on mount. The animation respects{' '}
          <code>prefers-reduced-motion: reduce</code> at the CSS / GSAP layer (the underlying
          factory honours the OS setting).
        </li>
        <li>
          For live-updating stats (real-time data), wrap the dashboard region in an element with{' '}
          <code>aria-live=&quot;polite&quot;</code> so screen readers announce changes when the
          number ticks.
        </li>
      </ul>

      <h2>Stat props</h2>
      <PropsTable
        rows={[
          { name: 'label', type: 'ReactNode', description: 'Caption — what the number measures.' },
          {
            name: 'count',
            type: 'number',
            description: 'Numeric value — animates from 0 via `CountUp`. Use `value` for non-numeric.',
          },
          {
            name: 'value',
            type: 'ReactNode',
            description:
              'Static value for non-numeric stats (e.g. `"v2.0"`). Mutually exclusive with `count`.',
          },
          {
            name: 'decimals',
            type: 'number',
            defaultValue: '0',
            description: 'Decimal places — used by `count` and the `delta` display.',
          },
          {
            name: 'prefix',
            type: 'string',
            description: 'Prepended to the count (e.g. `"$"`).',
          },
          {
            name: 'suffix',
            type: 'string',
            description: 'Appended to the count (e.g. `"%"`, `" ms"`).',
          },
          { name: 'hint', type: 'ReactNode', description: 'Optional small sub-line under the label.' },
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Leading inline SVG. Renders `aria-hidden`; ~20 × 20 px.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: '24 / 44 / 56 px value font.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            defaultValue: "'start'",
            description: 'Content alignment within the stat.',
          },
          {
            name: 'tone',
            type: "'default' | 'success' | 'warning' | 'danger'",
            defaultValue: "'default'",
            description:
              'Colour the value itself for state-driven stats. Does not affect the delta colour.',
          },
          {
            name: 'delta',
            type: 'number',
            description:
              'Trend amount. Renders `▲`/`▼`/`→` based on sign; colour follows `goodWhen`.',
          },
          {
            name: 'deltaPrefix',
            type: 'string',
            description: 'Prepended to the delta value (e.g. `"$"`).',
          },
          {
            name: 'deltaSuffix',
            type: 'string',
            description: 'Appended to the delta value (e.g. `"%"`, `" pp"`).',
          },
          {
            name: 'deltaLabel',
            type: 'ReactNode',
            description: 'Context text after the delta — e.g. `"vs last month"`.',
          },
          {
            name: 'goodWhen',
            type: "'up' | 'down'",
            defaultValue: "'up'",
            description:
              'Whether higher or lower is good. Drives delta colour. Use `"down"` for bounce rate, error rate, load time, etc.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description: 'Native div attributes are forwarded.',
          },
        ]}
      />

      <h2>StatGroup props</h2>
      <PropsTable
        rows={[
          {
            name: 'divided',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Render a 1 px vertical line between each child stat.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            description:
              'Adjusts the gap between items. Children still set their own `size` individually.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description: 'Native div attributes are forwarded.',
          },
        ]}
      />
    </>
  );
}
