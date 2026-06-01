import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  AlertActionsDemo,
  AlertAppearanceDemo,
  AlertBannerDemo,
  AlertCompactDemo,
  AlertDemo,
  AlertDismissibleDemo,
  AlertIconDemo,
  AlertVariantsDemo,
} from './demo';

export const metadata = { title: 'Alert — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Alert</h1>
      <p className="lead">
        In-flow message block for system feedback — info notes, success confirmations, warnings,
        and errors. Built-in icon per variant, optional title, dismiss button, and an{' '}
        <code>actions</code> slot for inline retry / view / undo buttons. The ARIA role flips
        between <code>status</code> (polite) and <code>alert</code> (assertive) based on the
        variant&apos;s urgency.
      </p>

      <AlertDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Alert, Button } from '@bwo-ui/react';

<Alert variant="info" title="Heads up">
  This is an informational message.
</Alert>

<Alert
  variant="warning"
  title="Unsaved changes"
  actions={
    <>
      <Button size="sm" variant="primary">Save</Button>
      <Button size="sm" variant="ghost">Discard</Button>
    </>
  }
>
  You have edits that haven't been published yet.
</Alert>

<Alert variant="success" onDismiss={() => setShown(false)}>
  Your changes have been published.
</Alert>`}</CodeBlock>

      <h2>Variants</h2>
      <p>
        Four semantic variants drive both the colour treatment and the default icon. Choose
        based on the user&apos;s next action and the urgency of the situation:
      </p>
      <ul>
        <li>
          <code>info</code> — neutral information the user should know about. Polite ARIA{' '}
          (<code>role=&quot;status&quot;</code>).
        </li>
        <li>
          <code>success</code> — a confirmation that an action completed. Polite ARIA.
        </li>
        <li>
          <code>warning</code> — caution, soft-blocking, or about to expire. Urgent ARIA (
          <code>role=&quot;alert&quot;</code>).
        </li>
        <li>
          <code>error</code> — failure, blocking issue, or recoverable problem. Urgent ARIA.
        </li>
      </ul>
      <AlertVariantsDemo />
      <CodeBlock lang="tsx">{`<Alert variant="info"    title="Heads up">A neutral note about the system.</Alert>
<Alert variant="success" title="Published">Your post is now live.</Alert>
<Alert variant="warning" title="Approaching limit">You have used 92 % of your storage.</Alert>
<Alert variant="error"   title="Couldn't connect">Check your network and try again.</Alert>`}</CodeBlock>

      <h2>Appearance</h2>
      <p>
        Three visual treatments for the same variant:
      </p>
      <ul>
        <li>
          <code>soft</code> — tinted background with coloured text (the default). Reads as a
          gentle in-flow message; safe choice when there&apos;s lots of other content nearby.
        </li>
        <li>
          <code>solid</code> — full-colour background with white text. Use sparingly for the
          loudest hero / banner positions (top of page, post-launch announcement).
        </li>
        <li>
          <code>outline</code> — transparent surface with a coloured border. Quiet and dense;
          works well in compact admin tables where soft tints would feel busy.
        </li>
      </ul>
      <AlertAppearanceDemo />
      <CodeBlock lang="tsx">{`<Alert appearance="soft"    variant="info" title="Info" />
<Alert appearance="solid"   variant="info" title="Info" />
<Alert appearance="outline" variant="info" title="Info" />`}</CodeBlock>

      <h2>Actions</h2>
      <p>
        The <code>actions</code> prop renders a flex row of buttons below the body. Use it
        whenever the alert offers a remedy — Retry, View details, Save now, Roll back. Pair the
        primary action with a ghost dismiss button so users have a quick escape hatch.
      </p>
      <AlertActionsDemo />
      <CodeBlock lang="tsx">{`<Alert
  variant="error"
  title="Couldn't load activity"
  actions={
    <>
      <Button size="sm" variant="primary">Retry</Button>
      <Button size="sm" variant="ghost">Open status page</Button>
    </>
  }
  onDismiss={() => setShown(false)}
>
  The dashboard data hasn't reached us. Network error 503.
</Alert>`}</CodeBlock>

      <h2>Dismissible</h2>
      <p>
        Pass an <code>onDismiss</code> callback to render the × button. The component
        doesn&apos;t manage its own visibility — you&apos;re responsible for removing the alert
        from the tree. This keeps unmount animations / list reflow under your control.
      </p>
      <AlertDismissibleDemo />
      <CodeBlock lang="tsx">{`const [visible, setVisible] = useState(true);

{visible && (
  <Alert
    variant="success"
    title="Plan upgraded"
    onDismiss={() => setVisible(false)}
  >
    You now have unlimited builds and Boogie Pro features.
  </Alert>
)}`}</CodeBlock>

      <h2>Custom icon</h2>
      <p>
        Override the variant&apos;s default icon by passing your own <code>icon</code> node. Any
        inline SVG works — the alert clones the variant colour onto <code>currentColor</code>,
        so the icon will pick it up automatically.
      </p>
      <AlertIconDemo />
      <CodeBlock lang="tsx">{`<Alert
  variant="info"
  icon={<SparkleIcon />}
  title="What's new"
>
  We just shipped IconButton parity, Card footer alignment, and the new Avatar group.
</Alert>`}</CodeBlock>

      <h2>Compact / inline</h2>
      <p>
        Skip the title for a tighter, single-line alert — useful for help tips, trial expiry
        nudges, or transient errors at the top of a form. Children render as the alert&apos;s
        description directly.
      </p>
      <AlertCompactDemo />
      <CodeBlock lang="tsx">{`<Alert variant="info">Tip — press ⌘K from anywhere to open the command bar.</Alert>
<Alert variant="warning">Your trial expires in 3 days.</Alert>
<Alert variant="error" appearance="outline">
  Unable to save — your session has expired. Sign in again to retry.
</Alert>`}</CodeBlock>

      <h2>Banner / hero alert</h2>
      <p>
        For top-of-page announcement banners — release notes, scheduled maintenance, migration
        prompts — combine <code>appearance=&quot;solid&quot;</code> with a custom icon and
        action buttons. Make sure the dismiss handler persists the choice (e.g. in localStorage)
        so the banner doesn&apos;t reappear after a page reload.
      </p>
      <AlertBannerDemo />
      <CodeBlock lang="tsx">{`<Alert
  variant="info"
  appearance="solid"
  icon={<SparkleIcon />}
  title="bwo-ui 0.5 is coming"
  actions={
    <>
      <Button size="sm" variant="ghost">Read the changelog</Button>
      <Button size="sm" variant="ghost">Migrate</Button>
    </>
  }
  onDismiss={dismissBanner}
>
  Date pickers, command palettes, and a redesigned Toast — all from-scratch, zero new deps.
</Alert>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          The component picks the right ARIA role automatically: <code>info</code> /{' '}
          <code>success</code> render as <code>role=&quot;status&quot;</code> with{' '}
          <code>aria-live=&quot;polite&quot;</code>; <code>warning</code> / <code>error</code>{' '}
          render as <code>role=&quot;alert&quot;</code> with{' '}
          <code>aria-live=&quot;assertive&quot;</code>. Polite announcements wait for a pause;
          assertive ones interrupt — pick the right urgency.
        </li>
        <li>
          Override with the <code>urgent</code> prop when the variant&apos;s default doesn&apos;t
          match (e.g. a success message after a long-running deploy might warrant an interrupt;{' '}
          <code>urgent</code>).
        </li>
        <li>
          The default and custom icons are rendered <code>aria-hidden</code> — they&apos;re a
          visual reinforcement of the variant, not the source of truth. Make sure the title or
          body still conveys the state in text.
        </li>
        <li>
          The dismiss button carries <code>aria-label=&quot;Dismiss&quot;</code>. If the alert
          is unique on the page, that&apos;s fine; if you render several at once (e.g. a list of
          notifications), set a more specific label via{' '}
          <code>aria-label=&quot;Dismiss \&quot;Plan upgraded\&quot;&quot;</code> using a wrapping
          element if needed.
        </li>
        <li>
          Don&apos;t leave critical errors as the only feedback. If an action failed and the
          user can&apos;t see the alert (e.g. it appeared below the fold), pair it with another
          channel — a disabled save button, a banner near the action, or a toast.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'info' | 'success' | 'warning' | 'error'",
            defaultValue: "'info'",
            description:
              'Tone — drives icon, colour, and the default ARIA role (`status` for info/success, `alert` for warning/error).',
          },
          {
            name: 'appearance',
            type: "'soft' | 'solid' | 'outline'",
            defaultValue: "'soft'",
            description:
              '`soft` (tinted bg + coloured text, default), `solid` (full-colour bg + white text), `outline` (transparent bg + coloured border).',
          },
          { name: 'title', type: 'ReactNode', description: 'Short headline above the body.' },
          {
            name: 'icon',
            type: 'ReactNode',
            description:
              'Override the variant default icon. Renders `aria-hidden`; inherits the variant colour via `currentColor`.',
          },
          {
            name: 'actions',
            type: 'ReactNode',
            description:
              'Flex row of action buttons rendered below the body — Retry, View details, etc.',
          },
          {
            name: 'onDismiss',
            type: '() => void',
            description:
              'When provided, renders an × button. The component does not manage its own visibility — caller hides the alert.',
          },
          {
            name: 'urgent',
            type: 'boolean',
            description:
              "Override the auto-derived ARIA urgency. Defaults to `true` for warning/error, `false` for info/success.",
          },
          {
            name: 'radius',
            type: "'none' | 'sm' | 'md' | 'lg' | 'pill'",
            description: 'Corner radius preset. Omit to inherit the global default (6 px).',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description: 'Native div attributes are forwarded — `style`, `id`, `className`.',
          },
        ]}
      />
    </>
  );
}
