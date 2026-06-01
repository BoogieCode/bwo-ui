'use client';

import { useState } from 'react';
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  type DialogSize,
} from '@bwo-ui/react';

/* ─── 1. Hero — confirm subscription ───────────────────────────────────── */

export function DialogDemo() {
  return (
    <div className="demo">
      <DialogRoot>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm subscription</DialogTitle>
            <DialogDescription>
              You&apos;ll be charged €19/month starting today. Cancel anytime from settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="solid">Subscribe</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

/* ─── 2. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: { value: DialogSize; label: string }[] = [
  { value: 'sm', label: 'Small (360 px)' },
  { value: 'md', label: 'Medium (480 px)' },
  { value: 'lg', label: 'Large (640 px)' },
  { value: 'xl', label: 'XL (800 px)' },
  { value: 'full', label: 'Full (92 vw)' },
];

export function DialogSizesDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      {SIZES.map((s) => (
        <DialogRoot key={s.value}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              {s.label}
            </Button>
          </DialogTrigger>
          <DialogContent size={s.value}>
            <DialogHeader>
              <DialogTitle>size = &quot;{s.value}&quot;</DialogTitle>
              <DialogDescription>
                This dialog is rendered at the <code>{s.value}</code> width preset. Try resizing
                the window — it&apos;ll cap at 92 vw on narrow screens.
              </DialogDescription>
            </DialogHeader>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--bwo-text-body)' }}>
              Sizes go sm (360) → md (480 default) → lg (640) → xl (800) → full (92 vw, capped
              at 1100). Pick by content density, not by importance.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      ))}
    </div>
  );
}

/* ─── 3. Position — top vs center ──────────────────────────────────────── */

export function DialogPositionDemo() {
  return (
    <div className="demo" style={{ gap: 12, flexWrap: 'wrap' }}>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">Open centered (default)</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Centered dialog</DialogTitle>
            <DialogDescription>
              Vertically centred — the default. Best for short confirmations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <DialogRoot>
        <DialogTrigger asChild>
          <Button>Open top-positioned</Button>
        </DialogTrigger>
        <DialogContent position="top" size="lg">
          <DialogHeader>
            <DialogTitle>Top-positioned dialog</DialogTitle>
            <DialogDescription>
              Pinned 12 vh from the top of the viewport. Use for tall forms and command
              palettes where vertical centring would push content off-screen.
            </DialogDescription>
          </DialogHeader>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--bwo-text-body)' }}>
            The slide-down animation reads as &quot;dropping in&quot; — a different rhythm from
            the centred scale-in. Pair with <code>size=&quot;lg&quot;</code> or{' '}
            <code>&quot;xl&quot;</code> for forms.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

/* ─── 4. With header + footer (anatomy) ────────────────────────────────── */

export function DialogAnatomyDemo() {
  return (
    <div className="demo">
      <DialogRoot>
        <DialogTrigger asChild>
          <Button>Open structured dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move 3 items to trash</DialogTitle>
            <DialogDescription>
              They&apos;ll stay in trash for 30 days before being permanently deleted. You can
              restore them from the trash bin at any time.
            </DialogDescription>
          </DialogHeader>
          <p style={{ margin: 0, fontSize: 14 }}>
            <strong>What&apos;s included:</strong>
          </p>
          <ul
            style={{
              margin: '8px 0 0',
              paddingLeft: 18,
              fontSize: 13,
              color: 'var(--bwo-text-body)',
            }}
          >
            <li>hero-shot.png</li>
            <li>landing-v2.fig</li>
            <li>copy-deck.md</li>
          </ul>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="solid">Move to trash</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

/* ─── 5. Form modal recipe ─────────────────────────────────────────────── */

const ROLES: { value: string; label: string }[] = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' },
];

export function DialogFormDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<string>('editor');

  return (
    <div className="demo">
      <DialogRoot
        onOpenChange={(open) => {
          if (open) {
            setSubmitted(false);
            setRole('editor');
          }
        }}
      >
        <DialogTrigger asChild>
          <Button>Invite a teammate</Button>
        </DialogTrigger>
        <DialogContent size="lg" position="top">
          <DialogHeader>
            <DialogTitle>Invite a teammate</DialogTitle>
            <DialogDescription>
              They&apos;ll get an email with a link to join your workspace.
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <p
              style={{
                margin: 0,
                padding: 14,
                background: 'rgba(160, 255, 39, 0.12)',
                border: '1px solid rgba(160, 255, 39, 0.32)',
                color: '#4d7a00',
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              ✓ Invite sent. They&apos;ll show up in your team list within a minute.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
                <span style={{ fontWeight: 500 }}>Email</span>
                <input
                  type="email"
                  placeholder="hello@boogie.ro"
                  className="bwo-input"
                  required
                />
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
                <span style={{ fontWeight: 500 }}>Role</span>
                <SelectRoot value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a role…" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="primary" type="submit">
                  Send invite
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

/* ─── 6. Image preview (unpadded + full) ───────────────────────────────── */

export function DialogImagePreviewDemo() {
  return (
    <div className="demo">
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">View image</Button>
        </DialogTrigger>
        <DialogContent size="full" unpadded>
          <div
            style={{
              aspectRatio: '16 / 9',
              background:
                'linear-gradient(135deg, #1a1b1e 0%, #ff481f 35%, #7463ff 70%, #ffc446 100%)',
              borderRadius: 'var(--bwo-radius-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 28,
                color: '#fff',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.8,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                BOOGIE 0042 · Hero composition
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginTop: 6,
                }}
              >
                Edge-to-edge media inside a Dialog
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

/* ─── 7. Controlled / external state ───────────────────────────────────── */

export function DialogControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => setOpen(true)}>Open via state</Button>
        <Button variant="ghost" onClick={() => setOpen(false)} disabled={!open}>
          Force close
        </Button>
      </div>
      <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
        State: {open ? 'open' : 'closed'}
      </span>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled from outside</DialogTitle>
            <DialogDescription>
              This dialog&apos;s open state is owned by the parent component. The buttons above
              and any in-dialog close all set the same React state.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

/* ─── 8. Escape hatches (closeOnOverlayClick / closeOnEscape) ──────────── */

export function DialogEscapeHatchesDemo() {
  return (
    <div className="demo" style={{ gap: 10, flexWrap: 'wrap' }}>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">Default (both on)</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Standard dismiss behaviour</DialogTitle>
            <DialogDescription>
              Click outside or press Escape to close. This is the default.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <DialogRoot>
        <DialogTrigger asChild>
          <Button>Locked (must click close)</Button>
        </DialogTrigger>
        <DialogContent closeOnOverlayClick={false} closeOnEscape={false}>
          <DialogHeader>
            <DialogTitle>Confirm-only dismiss</DialogTitle>
            <DialogDescription>
              Overlay click and Escape are disabled — the user must click an explicit button
              to dismiss. Use for destructive actions or forms with in-progress work.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="solid">Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
