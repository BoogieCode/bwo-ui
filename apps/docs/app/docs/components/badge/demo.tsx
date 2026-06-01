'use client';

import { Badge, Card, CardHeader, CardTitle, type Radius } from '@bwo-ui/react';

/* ─── Inline icons ─────────────────────────────────────────────────────── */

const Sparkle = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
  </svg>
);
const Bolt = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13 2L4 14h6l-2 8 10-12h-6l1-8z" />
  </svg>
);
const Check = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12l4 4 10-10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── 1. Variants (main hero) ──────────────────────────────────────────── */

export function BadgeDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <Badge>Default</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="green">New</Badge>
      <Badge variant="yellow">Beta</Badge>
      <Badge variant="red">Hot</Badge>
      <Badge variant="soft">Soft</Badge>
    </div>
  );
}

/* ─── 2. Sizes ─────────────────────────────────────────────────────────── */

export function BadgeSizesDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge>Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge variant="solid" size="sm">
        S · Solid
      </Badge>
      <Badge variant="solid">M · Solid</Badge>
      <Badge variant="solid" size="lg">
        L · Solid
      </Badge>
    </div>
  );
}

/* ─── 3. Dot (status indicator) ────────────────────────────────────────── */

export function BadgeDotDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <Badge dot variant="green">
        Online
      </Badge>
      <Badge dot variant="yellow">
        Idle
      </Badge>
      <Badge dot variant="red">
        Offline
      </Badge>
      <Badge dot variant="soft">
        Draft
      </Badge>
      <Badge dot variant="solid">
        Live
      </Badge>
    </div>
  );
}

/* ─── 4. Icons inside ──────────────────────────────────────────────────── */

export function BadgeIconsDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <Badge variant="green">
        {Check}
        Verified
      </Badge>
      <Badge variant="yellow">
        {Sparkle}
        Featured
      </Badge>
      <Badge variant="red">
        {Bolt}
        Trending
      </Badge>
      <Badge variant="solid">
        {Sparkle}
        Pro
      </Badge>
    </div>
  );
}

/* ─── 5. Corner radius ─────────────────────────────────────────────────── */

const RADII: Radius[] = ['none', 'sm', 'md', 'lg', 'pill'];

export function BadgeRadiusDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      {RADII.map((r) => (
        <Badge key={r} variant="solid" radius={r}>
          radius={r}
        </Badge>
      ))}
    </div>
  );
}

/* ─── 6. Recipe — count badge (numeric) ────────────────────────────────── */

export function BadgeCountDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Inbox <Badge variant="red">12</Badge>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Notifications <Badge variant="solid">99+</Badge>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Pending <Badge variant="yellow">3</Badge>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Done <Badge variant="green">28</Badge>
      </span>
    </div>
  );
}

/* ─── 7. Recipe — nav item with "New" indicator ────────────────────────── */

function NavItem({
  label,
  badge,
  active,
}: {
  label: string;
  badge?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        borderRadius: 8,
        background: active ? 'var(--bwo-grey-4)' : 'transparent',
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--bwo-text)',
      }}
    >
      {label}
      {badge}
    </span>
  );
}

export function BadgeNavDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 4 }}>
      <NavItem label="Overview" active />
      <NavItem
        label="Inbox"
        badge={
          <Badge size="sm" variant="red">
            12
          </Badge>
        }
      />
      <NavItem
        label="Reports"
        badge={
          <Badge size="sm" variant="green">
            New
          </Badge>
        }
      />
      <NavItem
        label="Billing"
        badge={
          <Badge size="sm" variant="soft">
            Beta
          </Badge>
        }
      />
      <NavItem label="Settings" />
    </div>
  );
}

/* ─── 8. Recipe — inline with heading ──────────────────────────────────── */

export function BadgeHeadingDemo() {
  return (
    <div className="demo" style={{ padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <Card>
          <CardHeader>
            <CardTitle>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                Pricing changes
                <Badge variant="green" size="sm">
                  Updated
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--bwo-text-body)' }}>
            We&apos;ve restructured the Pro tier — see the new breakdown below.
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ─── 9. Recipe — version tag ──────────────────────────────────────────── */

export function BadgeVersionDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch', padding: 18 }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
          @bwo-ui/react
        </span>
        <Badge variant="soft" size="sm" radius="pill">
          v0.4.0
        </Badge>
        <Badge dot variant="green" size="sm">
          Latest
        </Badge>
      </div>
      <div style={{ display: 'inline-flex', gap: 8, justifyContent: 'center' }}>
        <Badge variant="default" size="sm">
          v0.3.1
        </Badge>
        <Badge variant="default" size="sm">
          v0.3.0
        </Badge>
        <Badge variant="default" size="sm">
          v0.2.1
        </Badge>
      </div>
    </div>
  );
}

/* ─── 10. Recipe — filter chips (display only) ─────────────────────────── */

export function BadgeFilterDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
      <span style={{ fontSize: 12, color: 'var(--bwo-text-body)', textAlign: 'center' }}>
        Active filters
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        <Badge variant="soft" radius="pill">
          Region · EU
        </Badge>
        <Badge variant="soft" radius="pill">
          Plan · Pro
        </Badge>
        <Badge variant="soft" radius="pill">
          Created · last 30 d
        </Badge>
        <Badge variant="soft" radius="pill">
          Status · Active
        </Badge>
      </div>
    </div>
  );
}
