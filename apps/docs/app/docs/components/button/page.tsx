import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  ButtonAsLinkDemo,
  ButtonClickDemo,
  ButtonDisabledDemo,
  ButtonGroupDemo,
  ButtonIconsDemo,
  ButtonLoadingDemo,
  ButtonRadiusDemo,
  ButtonSizesDemo,
  ButtonVariantsDemo,
} from './demo';

export const metadata = { title: 'Button — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Button</h1>
      <p className="lead">
        The boogie button. Pill-shaped by default, with six built-in variants, three sizes,
        loading state, icon slots, a configurable corner radius, and a ButtonGroup primitive
        for stacking related actions.
      </p>

      <p>
        Buttons communicate the actions users can take. They show up everywhere — forms, cards,
        toolbars, modals, navigation bars. Pick a variant that matches the action&apos;s
        emphasis level: <code>solid</code> for the page&apos;s primary CTA,{' '}
        <code>primary</code> for inline confirms, <code>ghost</code> / <code>outline</code> for
        secondary actions, <code>green</code> / <code>yellow</code> for status-coded actions.
      </p>

      <h2>Variants</h2>
      <p>
        Six built-in variants. <code>primary</code> is the default — a black pill that turns red
        on hover (the boogie signature). <code>solid</code> is the uppercase CTA pill with a
        deeper shadow for hero/landing use. <code>ghost</code> and <code>outline</code> are
        lower-emphasis alternatives.
      </p>
      <ButtonVariantsDemo />
      <CodeBlock lang="tsx">{`<Button>Primary</Button>
<Button variant="green">Green</Button>
<Button variant="yellow">Yellow</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="solid">Solid</Button>`}</CodeBlock>

      <h2>Sizes</h2>
      <p>
        Three presets: <code>sm</code> (compact toolbars / inline actions), <code>md</code>{' '}
        (default), <code>lg</code> (hero CTAs).
      </p>
      <ButtonSizesDemo />
      <CodeBlock lang="tsx">{`<Button size="sm">SM</Button>
<Button size="md">MD</Button>     {/* default */}
<Button size="lg">LG</Button>`}</CodeBlock>

      <h2>Icons</h2>
      <p>
        Pass any node to <code>leftIcon</code> or <code>rightIcon</code>. They render in their
        own slot with sensible spacing — no extra wrapper needed in your JSX. Set{' '}
        <code>iconBadge</code> to render the icon inside a circular badge (matches the
        boogie.ro CTA style — a small pill on the left of the label).
      </p>
      <ButtonIconsDemo />
      <CodeBlock lang="tsx">{`<Button leftIcon={<PlusIcon />}>New item</Button>

<Button variant="outline" rightIcon={<ArrowRightIcon />}>
  Continue
</Button>

<Button variant="ghost" leftIcon={<DownloadIcon />}>
  Download
</Button>

{/* iconBadge wraps the icon in a circular pill */}
<Button variant="solid" leftIcon={<ArrowRightIcon />} iconBadge>
  Get started
</Button>`}</CodeBlock>

      <h2>Loading</h2>
      <p>
        Set <code>loading</code> to swap the label for a spinner and disable interaction. The
        button keeps its dimensions so the layout doesn&apos;t shift. Use this for any
        action that fires a request — submit forms, save, fetch, refresh.
      </p>
      <ButtonLoadingDemo />
      <CodeBlock lang="tsx">{`const [loading, setLoading] = useState(false);

async function onSubmit() {
  setLoading(true);
  try {
    await save();
  } finally {
    setLoading(false);
  }
}

<Button variant="primary" loading={loading} onClick={onSubmit}>
  Save changes
</Button>`}</CodeBlock>

      <h2>Disabled</h2>
      <p>
        Standard <code>disabled</code> attribute. The button shows a dimmed appearance and won&apos;t
        fire <code>onClick</code>. Prefer <code>loading</code> over <code>disabled</code> when
        the reason is &quot;waiting for a request&quot; — <code>loading</code> communicates
        that the action is in flight, not that it&apos;s unavailable.
      </p>
      <ButtonDisabledDemo />
      <CodeBlock lang="tsx">{`<Button disabled>Disabled primary</Button>
<Button variant="outline" disabled>Disabled outline</Button>
<Button variant="ghost" disabled leftIcon={<TrashIcon />}>
  Disabled ghost
</Button>`}</CodeBlock>

      <h2>Corner radius</h2>
      <p>
        Buttons inherit <code>--bwo-radius-current</code> by default (matches every other
        primitive). Override per-button with the <code>radius</code> prop — values are{' '}
        <code>none</code>, <code>sm</code> (4px), <code>md</code> (6px, default),{' '}
        <code>lg</code> (12px), <code>pill</code> (9999px). The boogie signature is{' '}
        <code>pill</code> for everything.
      </p>
      <ButtonRadiusDemo />
      <CodeBlock lang="tsx">{`<Button radius="none">none</Button>
<Button radius="sm">sm</Button>
<Button radius="md">md</Button>     {/* default */}
<Button radius="lg">lg</Button>
<Button radius="pill">pill</Button>`}</CodeBlock>

      <h2>ButtonGroup</h2>
      <p>
        Pair related actions in a row. Default <code>ButtonGroup</code> just lays them out with
        a small gap. Add <code>attached</code> to remove the gap and let adjacent buttons share
        a seamless edge — useful for segmented controls, formatting toolbars, etc. The{' '}
        <code>radius</code> prop on ButtonGroup cascades to its child buttons via a CSS
        variable.
      </p>
      <ButtonGroupDemo />
      <CodeBlock lang="tsx">{`import { Button, ButtonGroup } from '@bwo-ui/react';

{/* Standard — small gap between buttons */}
<ButtonGroup>
  <Button variant="ghost">Day</Button>
  <Button variant="primary">Week</Button>
  <Button variant="ghost">Month</Button>
</ButtonGroup>

{/* Attached — seamless segmented control */}
<ButtonGroup attached>
  <Button variant="outline">Bold</Button>
  <Button variant="outline">Italic</Button>
  <Button variant="outline">Underline</Button>
</ButtonGroup>`}</CodeBlock>

      <h2>As a link</h2>
      <p>
        <code>Button</code> renders a native <code>&lt;button&gt;</code>. To navigate, wrap the
        button in an anchor (or your router&apos;s <code>Link</code>). The anchor handles
        navigation; the button handles the visual. Reset the anchor&apos;s underline.
      </p>
      <ButtonAsLinkDemo />
      <CodeBlock lang="tsx">{`{/* External link */}
<a href="https://github.com/BoogieCode/bwo-ui" style={{ textDecoration: 'none' }}>
  <Button variant="outline" rightIcon={<ArrowRightIcon />}>
    GitHub
  </Button>
</a>

{/* Next.js / React Router */}
import Link from 'next/link';

<Link href="/dashboard" style={{ textDecoration: 'none' }}>
  <Button variant="primary">Open dashboard</Button>
</Link>`}</CodeBlock>

      <h2>Handling clicks</h2>
      <p>
        Standard <code>onClick</code>. All native <code>&lt;button&gt;</code> props are
        forwarded — <code>type</code>, <code>form</code>, <code>onMouseEnter</code>,{' '}
        <code>aria-*</code>, etc.
      </p>
      <ButtonClickDemo />
      <CodeBlock lang="tsx">{`<Button onClick={() => alert('clicked')}>Click me</Button>`}</CodeBlock>

      <h2>Button props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'primary' | 'green' | 'yellow' | 'ghost' | 'outline' | 'solid'",
            defaultValue: "'primary'",
            description:
              'Visual variant. `solid` is the uppercase CTA pill from boogie-next. `ghost` / `outline` are lower-emphasis alternatives.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Padding + font-size preset.',
          },
          {
            name: 'radius',
            type: "'none' | 'light' | 'sm' | 'md' | 'lg' | 'pill'",
            description:
              'Corner-radius preset. Omit to inherit the global default via the `--bwo-radius-current` CSS variable.',
          },
          {
            name: 'loading',
            type: 'boolean',
            description:
              'Show a spinner and disable the button. Width stays stable so the layout doesn’t shift.',
          },
          {
            name: 'leftIcon',
            type: 'ReactNode',
            description: 'Icon (or any node) placed before the label.',
          },
          {
            name: 'rightIcon',
            type: 'ReactNode',
            description: 'Icon (or any node) placed after the label.',
          },
          {
            name: 'iconBadge',
            type: 'boolean',
            description:
              'Wrap `leftIcon` / `rightIcon` in a circular badge — matches the boogie.ro CTA style.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Standard. Dims the button and disables interactions.',
          },
        ]}
      />
      <p>
        All other props are forwarded to the underlying <code>&lt;button&gt;</code>.
      </p>

      <h2>ButtonGroup props</h2>
      <PropsTable
        rows={[
          {
            name: 'attached',
            type: 'boolean',
            description:
              'Remove the gap between children so they share edges (seamless segmented control).',
          },
          {
            name: 'radius',
            type: "'none' | 'light' | 'sm' | 'md' | 'lg' | 'pill'",
            description:
              'Cascade a radius preset to every Button inside via `data-radius` + the `--bwo-radius-current` CSS variable.',
          },
        ]}
      />
      <p>
        All other props are forwarded to the underlying <code>&lt;div role=&quot;group&quot;&gt;</code>.
      </p>
    </>
  );
}
