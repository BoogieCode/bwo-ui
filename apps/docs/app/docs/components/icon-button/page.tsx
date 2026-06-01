import Link from 'next/link';
import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  IconButtonRadiusDemo,
  IconButtonSizesDemo,
  IconButtonToolbarDemo,
  IconButtonVariantsDemo,
  IconButtonVsButtonDemo,
} from './demo';

export const metadata = { title: 'IconButton — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>IconButton</h1>
      <p className="lead">
        A square, icon-only button. Same visual language as <code>Button</code> — six variants,
        three sizes, the same radius scale — but optimised for label-less actions in toolbars and
        action rails. The required <code>aria-label</code> prop is enforced at the TypeScript level
        so missing accessible names get caught at build time.
      </p>

      <IconButtonVariantsDemo />

      <h2>When to use IconButton vs Button leftIcon</h2>
      <p>
        Both <code>IconButton</code> and{' '}
        <Link href="/docs/components/button">
          <code>{'<Button leftIcon>'}</code>
        </Link>{' '}
        render an icon inside a clickable surface — but they read very differently and serve
        different jobs.
      </p>
      <IconButtonVsButtonDemo />
      <ul>
        <li>
          Reach for <strong>IconButton</strong> when the icon alone is unambiguous (cards, tables,
          toolbars, media controls, chat composer rails) and you want a tight square hit target. A
          row of IconButtons reads as a control surface.
        </li>
        <li>
          Reach for <strong>{'<Button leftIcon>'}</strong> when the action benefits from a verbal
          label and you want a forgiving rectangular target — primary CTAs, form submits, and
          stand-alone actions on a page.
        </li>
        <li>
          The <strong>aria-label requirement</strong> is the deciding accessibility tell. If the
          icon has no text companion, <code>IconButton</code>&apos;s required prop catches missing
          labels at the type level. With <code>{'<Button leftIcon>'}</code> and no text child, the
          missing-label bug is silent.
        </li>
      </ul>

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { IconButton } from '@bwo-ui/react';

<IconButton aria-label="Search">
  <SearchIcon />
</IconButton>`}</CodeBlock>

      <h2>Variants</h2>
      <p>
        IconButton mirrors every variant from <code>Button</code>: <code>primary</code>,{' '}
        <code>green</code>, <code>yellow</code>, <code>ghost</code>, <code>outline</code>, and{' '}
        <code>solid</code>. Pick the colour weighting that matches the action&apos;s
        emphasis — primary for default actions, ghost for ambient toolbars, green for confirm,
        yellow for callouts, outline for secondary, solid for the loud hero icon.
      </p>
      <IconButtonVariantsDemo />
      <CodeBlock lang="tsx">{`<IconButton variant="primary" aria-label="Next"><Arrow /></IconButton>
<IconButton variant="green"   aria-label="Confirm"><Check /></IconButton>
<IconButton variant="yellow"  aria-label="Highlight"><Star /></IconButton>
<IconButton variant="ghost"   aria-label="Menu"><Menu /></IconButton>
<IconButton variant="outline" aria-label="Edit"><Pencil /></IconButton>
<IconButton variant="solid"   aria-label="Action"><Bolt /></IconButton>`}</CodeBlock>
      <p>
        <strong>Note on <code>solid</code>:</strong> Button&apos;s solid variant gets its weight
        from extra padding and uppercase typography, neither of which applies to a square
        icon-only button. The IconButton equivalent keeps the primary colour and adds an
        elevation shadow, so it reads as the louder cousin of <code>primary</code>.
      </p>

      <h2>Sizes</h2>
      <p>
        Three sizes — <code>sm</code> (32 px), <code>md</code> (40 px, default), <code>lg</code>{' '}
        (48 px). The icon itself does not auto-scale; pass a larger inline SVG when you bump up
        the size if you need the visual to grow with the hit target.
      </p>
      <IconButtonSizesDemo />
      <CodeBlock lang="tsx">{`<IconButton size="sm" aria-label="Next"><Arrow /></IconButton>
<IconButton            aria-label="Next"><Arrow /></IconButton>
<IconButton size="lg" aria-label="Next"><Arrow /></IconButton>`}</CodeBlock>

      <h2>Corner radius</h2>
      <p>
        The <code>radius</code> prop accepts the shared <code>Radius</code> scale
        (<code>none</code> / <code>sm</code> / <code>md</code> / <code>lg</code> /{' '}
        <code>pill</code>). Omit it to inherit whatever <code>--bwo-radius-current</code>{' '}
        evaluates to in context.
      </p>
      <IconButtonRadiusDemo />
      <CodeBlock lang="tsx">{`<IconButton radius="none" aria-label="Add"><Plus /></IconButton>
<IconButton radius="sm"   aria-label="Add"><Plus /></IconButton>
<IconButton radius="md"   aria-label="Add"><Plus /></IconButton>
<IconButton radius="lg"   aria-label="Add"><Plus /></IconButton>
<IconButton radius="pill" aria-label="Add"><Plus /></IconButton>`}</CodeBlock>

      <h2>Toolbar pattern</h2>
      <p>
        IconButton was built for tight horizontal action rails. Wrap them in a{' '}
        <code>role=&quot;toolbar&quot;</code> container with a single <code>aria-label</code>{' '}
        describing the group, then let each button carry its own action-level label.
      </p>
      <IconButtonToolbarDemo />
      <CodeBlock lang="tsx">{`<div role="toolbar" aria-label="Item actions" style={{ display: 'inline-flex', gap: 6 }}>
  <IconButton variant="ghost" size="sm" aria-label="Like"><Heart /></IconButton>
  <IconButton variant="ghost" size="sm" aria-label="Share"><Share /></IconButton>
  <IconButton variant="ghost" size="sm" aria-label="Delete"><Trash /></IconButton>
</div>`}</CodeBlock>

      <h2>Disabled</h2>
      <p>
        IconButton forwards every native <code>button</code> attribute, including{' '}
        <code>disabled</code>. For async actions, prefer disabling alongside a separate loading
        indicator — IconButton has no built-in <code>loading</code> prop because there is no
        label slot to swap with a spinner.
      </p>
      <CodeBlock lang="tsx">{`<IconButton aria-label="Delete" disabled>
  <Trash />
</IconButton>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          <strong>aria-label is required.</strong> The TypeScript signature enforces it — your
          build will fail before missing labels can ship.
        </li>
        <li>
          Keep labels <strong>verb-first</strong> and action-specific
          (&quot;Delete row&quot;, not &quot;Trash icon&quot;).
        </li>
        <li>
          Mark inline SVG with <code>aria-hidden</code> so screen readers do not announce the
          glyph alongside the button&apos;s label.
        </li>
        <li>
          Native focus, hover, and disabled behaviour are preserved — IconButton renders a real{' '}
          <code>button</code> element.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'primary' | 'green' | 'yellow' | 'ghost' | 'outline' | 'solid'",
            defaultValue: "'primary'",
            description: 'Visual style. Mirrors the Button variants.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: '32 / 40 / 48 px square.',
          },
          {
            name: 'radius',
            type: "'none' | 'sm' | 'md' | 'lg' | 'pill'",
            description:
              'Corner radius preset. Omit to inherit `--bwo-radius-current` (defaults to 6 px globally).',
          },
          {
            name: 'aria-label',
            type: 'string',
            description:
              'Required. Describes the action for screen readers — icon-only buttons have no visible label.',
          },
          {
            name: '…rest',
            type: 'ButtonHTMLAttributes<HTMLButtonElement>',
            description:
              'All native button attributes are forwarded — `onClick`, `disabled`, `type`, `form`, `name`, etc.',
          },
        ]}
      />
    </>
  );
}
