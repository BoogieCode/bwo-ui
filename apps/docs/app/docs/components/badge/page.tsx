import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  BadgeCountDemo,
  BadgeDemo,
  BadgeDotDemo,
  BadgeFilterDemo,
  BadgeHeadingDemo,
  BadgeIconsDemo,
  BadgeNavDemo,
  BadgeRadiusDemo,
  BadgeSizesDemo,
  BadgeVersionDemo,
} from './demo';

export const metadata = { title: 'Badge — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Badge</h1>
      <p className="lead">
        Compact inline label — pill or rectangle, uppercase, six colour variants, three sizes,
        optional status dot, and full radius control. Use it to flag state (
        <code>New</code>, <code>Beta</code>, <code>Hot</code>), count things (
        <code>12 unread</code>), tag entities (<code>EU · Pro</code>), or call out a fresh
        release.
      </p>

      <h2>Variants</h2>
      <p>
        Six visual styles cover the common semantic palette: <code>default</code> (a quiet
        outlined pill), <code>solid</code> (the loud monochrome stamp), <code>green</code> /{' '}
        <code>yellow</code> / <code>red</code> (semantic status), and <code>soft</code> (a
        neutral grey for ambient meta info).
      </p>
      <BadgeDemo />
      <CodeBlock lang="tsx">{`<Badge>Default</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="green">New</Badge>
<Badge variant="yellow">Beta</Badge>
<Badge variant="red">Hot</Badge>
<Badge variant="soft">Soft</Badge>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Choosing a variant</h3>
      <ul>
        <li>
          <code>green</code> — positive state, successful action, &quot;new&quot; or &quot;live&quot;.
        </li>
        <li>
          <code>yellow</code> — warning state, &quot;beta&quot;, &quot;in progress&quot;, &quot;pending&quot;.
        </li>
        <li>
          <code>red</code> — error, blocking state, &quot;hot&quot;, urgent count.
        </li>
        <li>
          <code>solid</code> — high-emphasis meta label (versions, &quot;live&quot;), used sparingly
          to avoid visual noise.
        </li>
        <li>
          <code>soft</code> — quiet neutral tag for filters, categories, or auxiliary info.
        </li>
        <li>
          <code>default</code> — the bare outlined pill; safe choice when no semantic tone fits.
        </li>
      </ul>

      <h2>Sizes</h2>
      <p>
        Three sizes — <code>sm</code> (4 × 10 px, 11 px text), <code>md</code> (default — 6 × 14 px,
        12.5 px text), <code>lg</code> (8 × 18 px, 14 px text). Reach for <code>sm</code> when
        the badge sits inline with body copy or as a nav-item indicator; reserve{' '}
        <code>lg</code> for hero areas where the badge is the focal element.
      </p>
      <BadgeSizesDemo />
      <CodeBlock lang="tsx">{`<Badge size="sm">Small</Badge>
<Badge>Medium</Badge>
<Badge size="lg">Large</Badge>`}</CodeBlock>

      <h2>Status dot</h2>
      <p>
        Pass the <code>dot</code> boolean to render a small leading dot in the badge&apos;s
        foreground colour. This is the canonical status-indicator pattern — pair it with a colour
        variant that matches the state and keep the label short.
      </p>
      <BadgeDotDemo />
      <CodeBlock lang="tsx">{`<Badge dot variant="green">Online</Badge>
<Badge dot variant="yellow">Idle</Badge>
<Badge dot variant="red">Offline</Badge>
<Badge dot variant="soft">Draft</Badge>
<Badge dot variant="solid">Live</Badge>`}</CodeBlock>

      <h2>With icons</h2>
      <p>
        Badge children can be anything. Drop an inline SVG before the label and the badge&apos;s
        flex layout will space it correctly — <code>gap</code> is already set on the container.
        Keep icons small (≈ 11 px) and use <code>currentColor</code> so they inherit the badge
        text colour.
      </p>
      <BadgeIconsDemo />
      <CodeBlock lang="tsx">{`<Badge variant="green">
  <CheckIcon />
  Verified
</Badge>
<Badge variant="yellow">
  <SparkleIcon />
  Featured
</Badge>
<Badge variant="red">
  <BoltIcon />
  Trending
</Badge>`}</CodeBlock>

      <h2>Corner radius</h2>
      <p>
        The <code>radius</code> prop accepts the shared scale
        (<code>none</code> / <code>sm</code> / <code>md</code> / <code>lg</code> /{' '}
        <code>pill</code>). Omit it to inherit <code>--bwo-radius-current</code> (defaults to
        6 px). <code>pill</code> is the conventional choice for filter / category badges;{' '}
        <code>sm</code> or <code>md</code> reads as more technical / version-tag.
      </p>
      <BadgeRadiusDemo />
      <CodeBlock lang="tsx">{`<Badge radius="none">radius=none</Badge>
<Badge radius="sm">radius=sm</Badge>
<Badge radius="md">radius=md</Badge>
<Badge radius="lg">radius=lg</Badge>
<Badge radius="pill">radius=pill</Badge>`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>Count badge</h3>
      <p>
        Numeric badges sit beside a label to flag pending counts. Use <code>red</code> for
        urgent / unread, <code>yellow</code> for pending, <code>green</code> for done, and{' '}
        <code>solid</code> for overflow counts (<code>99+</code>).
      </p>
      <BadgeCountDemo />
      <CodeBlock lang="tsx">{`<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  Inbox <Badge variant="red">12</Badge>
</span>
<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  Notifications <Badge variant="solid">99+</Badge>
</span>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Nav indicator</h3>
      <p>
        Pair <code>size=&quot;sm&quot;</code> badges with nav items to flag new features, beta
        sections, or unread counts. Keep the badge subordinate to the nav label — small size,
        understated colour where possible.
      </p>
      <BadgeNavDemo />
      <CodeBlock lang="tsx">{`<NavItem label="Inbox" badge={<Badge size="sm" variant="red">12</Badge>} />
<NavItem label="Reports" badge={<Badge size="sm" variant="green">New</Badge>} />
<NavItem label="Billing" badge={<Badge size="sm" variant="soft">Beta</Badge>} />`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Inline with a heading</h3>
      <p>
        Slip a badge into a heading or title to flag a state change. Use{' '}
        <code>display: inline-flex</code> with a small <code>gap</code> so the badge sits on
        the same baseline as the text.
      </p>
      <BadgeHeadingDemo />
      <CodeBlock lang="tsx">{`<CardTitle>
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    Pricing changes
    <Badge variant="green" size="sm">Updated</Badge>
  </span>
</CardTitle>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Version tag</h3>
      <p>
        For package version strings, monospace-style tags, and release callouts. Combine a
        pill-radius soft badge with a dotted &quot;Latest&quot; flag for an at-a-glance state of
        a release line.
      </p>
      <BadgeVersionDemo />
      <CodeBlock lang="tsx">{`<Badge variant="soft" size="sm" radius="pill">v0.4.0</Badge>
<Badge dot variant="green" size="sm">Latest</Badge>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Filter / category tags</h3>
      <p>
        Pill-radius soft badges read as quiet category tags or active-filter indicators. For
        interactive removable chips (filter pills with an × button), badge is display-only — use
        a regular button styled to match, or open an issue if a closable mode would help.
      </p>
      <BadgeFilterDemo />
      <CodeBlock lang="tsx">{`<Badge variant="soft" radius="pill">Region · EU</Badge>
<Badge variant="soft" radius="pill">Plan · Pro</Badge>
<Badge variant="soft" radius="pill">Created · last 30 d</Badge>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Badge renders a <code>{'<span>'}</code> — it has no implicit semantic role. Screen
          readers will read the text content inline with whatever surrounds it. That&apos;s the
          right default for label / tag use cases.
        </li>
        <li>
          For counts (<code>Inbox 12</code>), the surrounding label already provides context;
          no extra ARIA is needed.
        </li>
        <li>
          For status badges that update live (<code>Online</code> ↔ <code>Offline</code>), wrap
          the badge in a region with <code>aria-live=&quot;polite&quot;</code> so screen readers
          announce the change.
        </li>
        <li>
          Don&apos;t rely on colour alone. The <code>dot</code> prop is a visual aid — the badge
          text must independently convey the state (<code>Online</code> instead of just a green
          circle).
        </li>
        <li>
          If the badge is decorative (e.g. a coloured stamp duplicating information that&apos;s
          already in the surrounding text), add <code>aria-hidden=&quot;true&quot;</code> to
          avoid double-announcement.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft'",
            defaultValue: "'default'",
            description: 'Visual style. See the variant guidance above for when to use each.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description:
              'Padding + font-size preset. Small for nav indicators, medium for general use, large for hero callouts.',
          },
          {
            name: 'dot',
            type: 'boolean',
            defaultValue: 'false',
            description:
              'Render a small leading dot in the badge’s foreground colour — for status indicators (online / offline / live).',
          },
          {
            name: 'radius',
            type: "'none' | 'sm' | 'md' | 'lg' | 'pill'",
            description:
              'Corner radius preset. Omit to inherit `--bwo-radius-current` (defaults to 6 px globally).',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLSpanElement>',
            description:
              'All native span attributes are forwarded — `onClick`, `aria-label`, `style`, etc.',
          },
        ]}
      />
    </>
  );
}
