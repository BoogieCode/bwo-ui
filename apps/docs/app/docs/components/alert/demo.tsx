'use client';

import { useState } from 'react';
import {
  Alert,
  Button,
  type AlertAppearance,
  type AlertVariant,
} from '@bwo-ui/react';

/* ─── 1. Hero (all variants) ───────────────────────────────────────────── */

export function AlertDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      <Alert variant="info" title="Heads up">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Saved" onDismiss={() => {}}>
        Your changes have been published.
      </Alert>
      <Alert variant="warning" title="Heads up">
        This action cannot be undone.
      </Alert>
      <Alert variant="error" title="Something went wrong">
        Please try again in a moment.
      </Alert>
    </div>
  );
}

/* ─── 2. Variants ──────────────────────────────────────────────────────── */

const VARIANTS: { value: AlertVariant; title: string; body: string }[] = [
  { value: 'info', title: 'Heads up', body: 'A neutral note about the system.' },
  { value: 'success', title: 'Published', body: 'Your post is now live.' },
  { value: 'warning', title: 'Approaching limit', body: 'You have used 92 % of your storage.' },
  { value: 'error', title: "Couldn't connect", body: 'Check your network and try again.' },
];

export function AlertVariantsDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      {VARIANTS.map((v) => (
        <Alert key={v.value} variant={v.value} title={v.title}>
          {v.body}
        </Alert>
      ))}
    </div>
  );
}

/* ─── 3. Appearance ────────────────────────────────────────────────────── */

const APPEARANCES: AlertAppearance[] = ['soft', 'solid', 'outline'];

export function AlertAppearanceDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 18 }}>
      {APPEARANCES.map((a) => (
        <div
          key={a}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}
        >
          <code
            style={{
              fontSize: 11,
              color: 'var(--bwo-text-body)',
              textAlign: 'center',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            appearance = {a}
          </code>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Alert appearance={a} variant="info" title="Info" />
            <Alert appearance={a} variant="success" title="Success" />
            <Alert appearance={a} variant="warning" title="Warning" />
            <Alert appearance={a} variant="error" title="Error" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 4. With actions ──────────────────────────────────────────────────── */

export function AlertActionsDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      <Alert
        variant="warning"
        title="Unsaved changes"
        actions={
          <>
            <Button size="sm" variant="primary">
              Save changes
            </Button>
            <Button size="sm" variant="ghost">
              Discard
            </Button>
          </>
        }
      >
        You have edits that haven&apos;t been published yet.
      </Alert>
      <Alert
        variant="error"
        title="Couldn't load activity"
        actions={
          <>
            <Button size="sm" variant="primary">
              Retry
            </Button>
            <Button size="sm" variant="ghost">
              Open status page
            </Button>
          </>
        }
        onDismiss={() => {}}
      >
        The dashboard data hasn&apos;t reached us. Network error 503.
      </Alert>
    </div>
  );
}

/* ─── 5. Dismissible (live) ────────────────────────────────────────────── */

export function AlertDismissibleDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      {visible ? (
        <Alert
          variant="success"
          title="Plan upgraded"
          onDismiss={() => setVisible(false)}
        >
          You now have unlimited builds and Boogie Pro features.
        </Alert>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 16px',
            border: '1px dashed var(--bwo-border)',
            borderRadius: 8,
            background: 'var(--bwo-grey-4)',
            color: 'var(--bwo-text-body)',
            fontSize: 13,
          }}
        >
          Dismissed.
        </div>
      )}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setVisible(true)}
        disabled={visible}
        style={{ alignSelf: 'center' }}
      >
        Show again
      </Button>
    </div>
  );
}

/* ─── 6. Custom icon ───────────────────────────────────────────────────── */

const SparkleIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
  </svg>
);

const RocketIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 13l3 3 8-8m1-7c4 0 5 1 5 5 0 4-9 11-9 11s-4-1-4-4 0-3 8-12z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export function AlertIconDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      <Alert
        variant="info"
        icon={SparkleIcon}
        title="What's new"
      >
        We just shipped IconButton parity, Card footer alignment, and the new Avatar group.
      </Alert>
      <Alert
        variant="success"
        appearance="solid"
        icon={RocketIcon}
        title="Boogie Pro launched"
        actions={
          <Button size="sm" variant="ghost" style={{ color: '#fff' }}>
            See the release notes
          </Button>
        }
      >
        Everything in Free, plus stock photos, AI rewrites, and unlimited builds.
      </Alert>
    </div>
  );
}

/* ─── 7. Compact / inline (title-less) ─────────────────────────────────── */

export function AlertCompactDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
      <Alert variant="info">Tip — press ⌘K from anywhere to open the command bar.</Alert>
      <Alert variant="warning">Your trial expires in 3 days.</Alert>
      <Alert variant="error" appearance="outline">
        Unable to save — your session has expired. Sign in again to retry.
      </Alert>
    </div>
  );
}

/* ─── 8. Banner / hero alert ───────────────────────────────────────────── */

export function AlertBannerDemo() {
  return (
    <div className="demo" style={{ padding: 16 }}>
      <Alert
        variant="info"
        appearance="solid"
        icon={SparkleIcon}
        title="bwo-ui 0.5 is coming"
        actions={
          <>
            <Button size="sm" variant="ghost" style={{ color: '#fff' }}>
              Read the changelog
            </Button>
            <Button size="sm" variant="ghost" style={{ color: '#fff' }}>
              Migrate
            </Button>
          </>
        }
        onDismiss={() => {}}
        style={{ width: '100%' }}
      >
        Date pickers, command palettes, and a redesigned <code>Toast</code> — all from-scratch,
        zero new dependencies.
      </Alert>
    </div>
  );
}
