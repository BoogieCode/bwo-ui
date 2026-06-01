import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  SeparatorAuthDemo,
  SeparatorDemo,
  SeparatorLabelDemo,
  SeparatorMetaDemo,
  SeparatorSizesDemo,
  SeparatorSpacingDemo,
  SeparatorToolbarDemo,
  SeparatorTonesDemo,
  SeparatorVariantsDemo,
} from './demo';

export const metadata = { title: 'Separator — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Separator</h1>
      <p className="lead">
        Thin divider for stacking sections, breaking inline groups, or framing a labelled
        section header (&quot;OR&quot;, &quot;TODAY&quot;). Three line styles, three thicknesses,
        three tones, built-in spacing presets, and an optional inline label that auto-flips the
        ARIA semantics so screen readers announce the section transition.
      </p>

      <SeparatorDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Separator } from '@bwo-ui/react';

<Separator />
<Separator orientation="vertical" />
<Separator label="Or continue with" />
<Separator variant="dashed" tone="muted" />`}</CodeBlock>

      <h2>Variants</h2>
      <p>
        Three line styles map straight to <code>border-style</code> — <code>solid</code>{' '}
        (default), <code>dashed</code>, <code>dotted</code>. Use solid for hard section breaks;
        dashed for &quot;optional / cut here&quot; semantics (settings sections, draft markers);
        dotted for the lightest possible separation when two regions are otherwise visually
        cohesive.
      </p>
      <SeparatorVariantsDemo />
      <CodeBlock lang="tsx">{`<Separator variant="solid" />
<Separator variant="dashed" />
<Separator variant="dotted" />`}</CodeBlock>

      <h2>Sizes</h2>
      <p>
        <code>sm</code> (1 px, default), <code>md</code> (2 px), <code>lg</code> (4 px).
        Thicker separators read as bigger structural breaks — chapter dividers, between major
        sections in a long page, or framing a key callout.
      </p>
      <SeparatorSizesDemo />
      <CodeBlock lang="tsx">{`<Separator size="sm" />  {/* default */}
<Separator size="md" />
<Separator size="lg" />`}</CodeBlock>

      <h2>Tones</h2>
      <p>
        <code>default</code> uses the kit&apos;s standard border colour; <code>muted</code>{' '}
        steps the opacity down for a barely-there divider; <code>strong</code> jumps to the body
        text colour for editorial pull-quotes and high-emphasis breaks.
      </p>
      <SeparatorTonesDemo />
      <CodeBlock lang="tsx">{`<Separator tone="default" />
<Separator tone="muted"   />
<Separator tone="strong"  />`}</CodeBlock>

      <h2>Labelled</h2>
      <p>
        Pass a <code>label</code> and the separator renders as line / label / line. Use it for
        the &quot;OR&quot; between sign-in methods, &quot;TODAY&quot; / &quot;YESTERDAY&quot;
        chunkers in a feed, or year markers in a timeline. <code>labelAlign</code> shifts the
        label off-centre — <code>start</code> for left-aligned (typical for date markers),{' '}
        <code>end</code> for right-aligned (less common but useful for annotations).
      </p>
      <p>
        When a label is set, the separator is no longer decorative — it auto-acquires{' '}
        <code>role=&quot;separator&quot;</code> and the label becomes its accessible name.
        Override with <code>decorative=&#123;true&#125;</code> if it&apos;s genuinely purely
        visual.
      </p>
      <SeparatorLabelDemo />
      <CodeBlock lang="tsx">{`<Separator label="Or continue with" />
<Separator label="Today" labelAlign="start" />
<Separator label="2026"  labelAlign="end" tone="muted" />
<Separator label="Dashed group" variant="dashed" size="md" />`}</CodeBlock>

      <h2>Spacing</h2>
      <p>
        <code>spacing</code> adds built-in margin around the separator so you don&apos;t have
        to wrap it. <code>sm</code> = 8 px, <code>md</code> = 16 px, <code>lg</code> = 24 px
        — applied to the top/bottom on horizontal separators and left/right on vertical ones.
      </p>
      <SeparatorSpacingDemo />
      <CodeBlock lang="tsx">{`<Separator spacing="sm" />
<Separator spacing="md" />
<Separator spacing="lg" />`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>Auth form &quot;OR&quot; divider</h3>
      <p>
        The classic use case — separating social sign-in buttons from a magic-link / password
        form. <code>label=&quot;Or&quot;</code> plus <code>spacing=&quot;md&quot;</code>{' '}
        handles the layout in one node.
      </p>
      <SeparatorAuthDemo />
      <CodeBlock lang="tsx">{`<Card>
  <CardHeader><CardTitle>Sign in to Boogie</CardTitle></CardHeader>
  <Button variant="outline">Continue with GitHub</Button>
  <Button variant="outline">Continue with Google</Button>
  <Separator label="Or" spacing="md" />
  <input className="bwo-input" placeholder="you@boogie.ro" />
  <Button variant="primary">Send magic link</Button>
</Card>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Toolbar group dividers</h3>
      <p>
        Vertical separators chunk a horizontal toolbar into related action groups — text
        styling, links / code, embeds. Pair with <code>spacing=&quot;sm&quot;</code> for the
        tight 8 px gutter that reads as &quot;same control surface, different group&quot;.
      </p>
      <SeparatorToolbarDemo />
      <CodeBlock lang="tsx">{`<div role="toolbar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Button size="sm" variant="ghost">Bold</Button>
  <Button size="sm" variant="ghost">Italic</Button>
  <Separator orientation="vertical" style={{ height: 22 }} spacing="sm" />
  <Button size="sm" variant="ghost">Link</Button>
  <Button size="sm" variant="ghost">Code</Button>
  <Separator orientation="vertical" style={{ height: 22 }} spacing="sm" />
  <Button size="sm" variant="ghost">Image</Button>
  <Button size="sm" variant="ghost">Embed</Button>
</div>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Article meta row</h3>
      <p>
        Inline metadata rows (author · read time · status badge) use vertical separators between
        items. Give them an explicit height (~14 px) so they don&apos;t collapse to 0 inside
        small text.
      </p>
      <SeparatorMetaDemo />
      <CodeBlock lang="tsx">{`<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
  <Avatar fallback="AR" size="xs" />
  <span>Ana Radu</span>
  <Separator orientation="vertical" style={{ height: 14 }} />
  <span>8 min read</span>
  <Separator orientation="vertical" style={{ height: 14 }} />
  <Badge size="sm" variant="green">New</Badge>
</div>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          A plain Separator is purely decorative by default — it renders <code>aria-hidden</code>{' '}
          and screen readers skip it. That&apos;s correct for visual chunkers between unrelated
          regions.
        </li>
        <li>
          When you pass <code>label</code>, the separator becomes a real section marker:{' '}
          <code>role=&quot;separator&quot;</code> with the label as the accessible name. Screen
          readers will announce &quot;Or, separator&quot;.
        </li>
        <li>
          Override with <code>decorative=&#123;false&#125;</code> on a plain Separator if it
          marks a meaningful structural break that screen readers should pause on (e.g. between
          two distinct article sections that don&apos;t have their own headings).
        </li>
        <li>
          Conversely, set <code>decorative=&#123;true&#125;</code> on a labelled separator if
          the label is purely cosmetic (a decorative timeline year marker that&apos;s already
          part of the visible UI elsewhere).
        </li>
        <li>
          Don&apos;t rely on a separator alone to convey hierarchy. If two regions are
          genuinely separate, they should also have headings, regions, or list roles — the
          separator is the visual cue on top of that semantic structure.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description:
              'Axis of the line. Vertical separators need a height — either from a flex parent (`align-self: stretch`) or an inline `style={{ height: … }}`.',
          },
          {
            name: 'variant',
            type: "'solid' | 'dashed' | 'dotted'",
            defaultValue: "'solid'",
            description: 'Line style. Maps to `border-style`.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'sm'",
            description: '1 / 2 / 4 px thickness.',
          },
          {
            name: 'tone',
            type: "'default' | 'muted' | 'strong'",
            defaultValue: "'default'",
            description:
              'Colour weight — `muted` is barely there, `strong` jumps to the body-text colour.',
          },
          {
            name: 'spacing',
            type: "'none' | 'sm' | 'md' | 'lg'",
            defaultValue: "'none'",
            description:
              'Built-in margin (8 / 16 / 24 px) on the axis perpendicular to the line. Skips the need for a wrapper.',
          },
          {
            name: 'label',
            type: 'ReactNode',
            description:
              'Inline label that breaks the line on either side. Horizontal-only. Auto-flips ARIA to `role="separator"`.',
          },
          {
            name: 'labelAlign',
            type: "'start' | 'center' | 'end'",
            defaultValue: "'center'",
            description: 'Where the label sits in the line. Only used with `label`.',
          },
          {
            name: 'decorative',
            type: 'boolean',
            description:
              'When true, the separator is hidden from assistive tech (`aria-hidden`). Defaults to true for plain separators and false for labelled ones — override either way as needed.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description:
              'Native div attributes are forwarded — `style`, `id`, `className`, etc.',
          },
        ]}
      />
    </>
  );
}
