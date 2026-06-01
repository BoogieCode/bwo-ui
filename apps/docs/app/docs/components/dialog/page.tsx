import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  DialogAnatomyDemo,
  DialogControlledDemo,
  DialogDemo,
  DialogEscapeHatchesDemo,
  DialogFormDemo,
  DialogImagePreviewDemo,
  DialogPositionDemo,
  DialogSizesDemo,
} from './demo';

export const metadata = { title: 'Dialog — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Dialog</h1>
      <p className="lead">
        Modal dialog built from scratch — focus trap, escape-to-close, scroll lock, backdrop
        blur, scale-in (centred) or slide-down (top) animation. Five width presets, two
        positions, structured <code>Header</code> + <code>Footer</code> slots, and explicit
        controls for overlay-click and escape dismissal.
      </p>

      <DialogDemo />

      <h2>Anatomy</h2>
      <p>
        Dialogs are composed from a small set of subcomponents:
      </p>
      <ul>
        <li>
          <code>DialogRoot</code> — top-level provider. Owns open state.
        </li>
        <li>
          <code>DialogTrigger</code> — the button that opens the dialog. Pass{' '}
          <code>asChild</code> to clone props onto your own button.
        </li>
        <li>
          <code>DialogContent</code> — the portaled surface. Carries the size / position props.
        </li>
        <li>
          <code>DialogHeader</code>, <code>DialogTitle</code>, <code>DialogDescription</code>{' '}
          — the structured header block. Title + description get the right
          <code>aria-labelledby</code> / <code>aria-describedby</code> wiring automatically.
        </li>
        <li>
          <code>DialogFooter</code> — right-aligned action row with a top divider.
        </li>
        <li>
          <code>DialogClose</code> — dismiss button (use <code>asChild</code> to wrap a real
          button).
        </li>
      </ul>
      <DialogAnatomyDemo />
      <CodeBlock lang="tsx">{`import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@bwo-ui/react';

<DialogRoot>
  <DialogTrigger asChild>
    <Button>Move to trash</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Move 3 items to trash</DialogTitle>
      <DialogDescription>
        They'll stay in trash for 30 days before being permanently deleted.
      </DialogDescription>
    </DialogHeader>

    <p>What's included:</p>
    <ul>{/* file list */}</ul>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="solid">Move to trash</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</DialogRoot>`}</CodeBlock>

      <h2>Sizes</h2>
      <p>
        Five width presets cover the common cases. <code>md</code> (480 px) is the default —
        sized for confirmations and short forms. <code>lg</code> (640 px) and <code>xl</code>{' '}
        (800 px) for forms with more fields or stacked sections. <code>full</code> (92 vw, capped
        at 1100 px) for image previews and dashboards.
      </p>
      <DialogSizesDemo />
      <CodeBlock lang="tsx">{`<DialogContent size="sm">…</DialogContent>     {/* 360 px */}
<DialogContent size="md">…</DialogContent>     {/* 480 px (default) */}
<DialogContent size="lg">…</DialogContent>     {/* 640 px */}
<DialogContent size="xl">…</DialogContent>     {/* 800 px */}
<DialogContent size="full">…</DialogContent>   {/* 92 vw */}`}</CodeBlock>

      <h2>Position</h2>
      <p>
        <code>position=&quot;center&quot;</code> (default) vertically centres the dialog with a
        scale-in animation — the right choice for short confirmations.{' '}
        <code>position=&quot;top&quot;</code> pins 12 vh from the top with a slide-down
        animation — better for taller content (forms with multiple fields, command palettes,
        long lists) where centring would push content out of view.
      </p>
      <DialogPositionDemo />
      <CodeBlock lang="tsx">{`<DialogContent>…</DialogContent>                {/* center, default */}
<DialogContent position="top" size="lg">…</DialogContent>`}</CodeBlock>

      <h2>Form modal</h2>
      <p>
        A common pattern: a <code>lg</code> top-positioned dialog with a form inside. The
        focus trap keeps tab navigation within the dialog; the submit handler closes the dialog
        on success (or swaps content to a success state, as in this demo).
      </p>
      <DialogFormDemo />
      <CodeBlock lang="tsx">{`<DialogRoot onOpenChange={(open) => { if (open) setSubmitted(false); }}>
  <DialogTrigger asChild>
    <Button>Invite a teammate</Button>
  </DialogTrigger>
  <DialogContent size="lg" position="top">
    <DialogHeader>
      <DialogTitle>Invite a teammate</DialogTitle>
      <DialogDescription>They'll get an email with a link to join.</DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit}>
      <input type="email" className="bwo-input" required />

      <SelectRoot value={role} onValueChange={setRole}>
        <SelectTrigger>
          <SelectValue placeholder="Pick a role…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="viewer">Viewer</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </SelectRoot>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" type="button">Cancel</Button>
        </DialogClose>
        <Button type="submit">Send invite</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</DialogRoot>`}</CodeBlock>

      <h2>Image preview</h2>
      <p>
        For media-only modals (image lightboxes, video players, embedded canvases), combine{' '}
        <code>size=&quot;full&quot;</code> with <code>unpadded</code>. The content fills the
        dialog edge-to-edge and the close button switches to a dark, overlay-friendly treatment.
      </p>
      <DialogImagePreviewDemo />
      <CodeBlock lang="tsx">{`<DialogContent size="full" unpadded>
  <img src="/hero.jpg" alt="Hero composition"
       style={{ width: '100%', display: 'block', borderRadius: 'var(--bwo-radius-md)' }} />
</DialogContent>`}</CodeBlock>

      <h2>Controlled</h2>
      <p>
        Pass <code>open</code> + <code>onOpenChange</code> to own the state externally — useful
        when the dialog is triggered by something other than its own trigger (a deep link, a
        keyboard shortcut, a parent component&apos;s effect).
      </p>
      <DialogControlledDemo />
      <CodeBlock lang="tsx">{`const [open, setOpen] = useState(false);

<DialogRoot open={open} onOpenChange={setOpen}>
  <DialogContent>…</DialogContent>
</DialogRoot>

{/* Open from anywhere */}
<Button onClick={() => setOpen(true)}>Open via state</Button>`}</CodeBlock>

      <h2>Escape hatches</h2>
      <p>
        By default a dialog dismisses on overlay click <em>and</em> Escape. For destructive or
        in-progress actions, lock both off so the user has to click an explicit button.
      </p>
      <DialogEscapeHatchesDemo />
      <CodeBlock lang="tsx">{`{/* Standard dismiss (default) */}
<DialogContent>…</DialogContent>

{/* Confirm-only — overlay + Escape disabled */}
<DialogContent closeOnOverlayClick={false} closeOnEscape={false}>
  <DialogHeader>
    <DialogTitle>Delete workspace</DialogTitle>
    <DialogDescription>This cannot be undone.</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
    <DialogClose asChild><Button variant="solid">Delete</Button></DialogClose>
  </DialogFooter>
</DialogContent>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          <strong>Focus trap</strong> — focus moves into the dialog when it opens; Tab cycles
          within the dialog only; focus returns to the trigger on close.
        </li>
        <li>
          <strong>Scroll lock</strong> — the background is non-scrollable while a modal dialog
          is open. Disabled when <code>modal=&#123;false&#125;</code>.
        </li>
        <li>
          <code>DialogTitle</code> wires up <code>aria-labelledby</code> automatically.{' '}
          <code>DialogDescription</code> wires up <code>aria-describedby</code>. If you omit
          the title, pass <code>aria-label</code> directly on <code>DialogContent</code> so
          screen readers have a name.
        </li>
        <li>
          Avoid the <code>closeOnEscape=&#123;false&#125;</code> + no explicit cancel button
          combination — that traps users with no keyboard exit.
        </li>
        <li>
          Don&apos;t nest dialogs. Use a sequenced flow (close one, open the next via{' '}
          <code>onOpenChange</code>) instead.
        </li>
        <li>
          For non-modal popups (no scroll lock, no focus trap), pass{' '}
          <code>modal=&#123;false&#125;</code> on <code>DialogRoot</code>. Consider whether{' '}
          <code>Popover</code> is a better fit — it doesn&apos;t portal.
        </li>
      </ul>

      <h2>DialogContent props</h2>
      <PropsTable
        rows={[
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
            defaultValue: "'md'",
            description: '360 / 480 / 640 / 800 px or 92 vw for `full` (capped at 1100 px).',
          },
          {
            name: 'position',
            type: "'center' | 'top'",
            defaultValue: "'center'",
            description:
              "'center' vertically centres with a scale-in animation. 'top' pins 12 vh from the top with slide-down.",
          },
          {
            name: 'unpadded',
            type: 'boolean',
            description:
              'Remove the inner padding — for image previews / video where the body manages its own layout.',
          },
          {
            name: 'closeOnOverlayClick',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Whether clicking the overlay dismisses the dialog.',
          },
          {
            name: 'closeOnEscape',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Whether pressing Escape dismisses the dialog.',
          },
          {
            name: 'hideOverlay',
            type: 'boolean',
            description:
              'Skip the built-in backdrop. Use for fully custom overlays (e.g. solid colour + custom blur).',
          },
          {
            name: 'hideClose',
            type: 'boolean',
            description: 'Skip the built-in × button — useful when your footer has explicit dismiss buttons only.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Fallback accessible name when you don\'t render a `DialogTitle`.',
          },
        ]}
      />

      <h2>DialogRoot props</h2>
      <PropsTable
        rows={[
          {
            name: 'open',
            type: 'boolean',
            description: 'Controlled open state. Pair with `onOpenChange`.',
          },
          {
            name: 'defaultOpen',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Uncontrolled initial state.',
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Fired whenever the dialog opens or closes (controlled and uncontrolled).',
          },
          {
            name: 'modal',
            type: 'boolean',
            defaultValue: 'true',
            description:
              'When `false`, omit the focus trap and scroll lock. The dialog still portals — but users can interact with the page behind it.',
          },
        ]}
      />

      <h2>Subcomponents</h2>
      <PropsTable
        rows={[
          {
            name: 'DialogTrigger',
            type: '<button>',
            description:
              'Opens the dialog. Use `asChild` to clone props onto your own component (typically a `Button`).',
          },
          {
            name: 'DialogHeader',
            type: '<div>',
            description: 'Wrapper for `DialogTitle` + `DialogDescription`. Adds a 18 px bottom margin.',
          },
          {
            name: 'DialogTitle',
            type: '<h2>',
            description: 'Wires up `aria-labelledby` on the content automatically.',
          },
          {
            name: 'DialogDescription',
            type: '<p>',
            description: 'Wires up `aria-describedby` on the content automatically.',
          },
          {
            name: 'DialogFooter',
            type: '<div>',
            description:
              'Right-aligned flex row for action buttons. Adds a 1 px top divider and 22 px top margin.',
          },
          {
            name: 'DialogClose',
            type: '<button>',
            description:
              'Dismisses the dialog when clicked. Use `asChild` to wrap a real Button. Note: the built-in × button in the top-right also dismisses.',
          },
          {
            name: 'DialogOverlay',
            type: '<div>',
            description:
              "Optional — the overlay is rendered automatically by `DialogContent`. Use this only if you've passed `hideOverlay` and want full control.",
          },
        ]}
      />
    </>
  );
}
