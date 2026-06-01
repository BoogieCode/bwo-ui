'use client';

import {
  Badge,
  Card,
  Stat,
  StatGroup,
  type StatSize,
  type StatTone,
} from '@bwo-ui/react';

/* ─── Inline icons ─────────────────────────────────────────────────────── */

const UsersIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M16 14a4 4 0 1 0-8 0M2 21c0-3 4-6 10-6s10 3 10 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const DollarIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2v20M17 6H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const BoltIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13 2L4 14h6l-2 8 10-12h-6l1-8z" />
  </svg>
);
const CartIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 4h2l2.5 12h12L22 8H6M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── 1. Hero ──────────────────────────────────────────────────────────── */

export function StatDemo() {
  return (
    <div className="demo" style={{ gap: 28, flexWrap: 'wrap' }}>
      <Stat label="Sites shipped" count={420} />
      <Stat label="Uptime" count={99.9} decimals={1} suffix="%" />
      <Stat label="Avg load" count={42} suffix=" ms" hint="last 30 days" />
      <Stat label="Version" value="v2.0" />
    </div>
  );
}

/* ─── 2. With delta (the classic dashboard pattern) ────────────────────── */

export function StatDeltaDemo() {
  return (
    <div className="demo" style={{ gap: 28, flexWrap: 'wrap' }}>
      <Stat
        label="Monthly visitors"
        count={128400}
        delta={12.3}
        deltaSuffix="%"
        deltaLabel="vs last month"
      />
      <Stat
        label="Conversion rate"
        count={3.4}
        decimals={1}
        suffix="%"
        delta={-0.6}
        deltaSuffix=" pp"
        deltaLabel="vs last month"
      />
      <Stat
        label="Bounce rate"
        count={38}
        suffix="%"
        delta={-2.1}
        deltaSuffix=" pp"
        deltaLabel="vs last month"
        goodWhen="down"
      />
      <Stat label="Errors / day" count={0} delta={0} deltaSuffix="" deltaLabel="vs yesterday" />
    </div>
  );
}

/* ─── 3. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: StatSize[] = ['sm', 'md', 'lg'];

export function StatSizesDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 24 }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <code
            style={{
              fontSize: 11,
              color: 'var(--bwo-text-body)',
              width: 32,
              textAlign: 'right',
            }}
          >
            {s}
          </code>
          <Stat
            size={s}
            label="Monthly visitors"
            count={128400}
            delta={12.3}
            deltaSuffix="%"
          />
        </div>
      ))}
    </div>
  );
}

/* ─── 4. With icons ────────────────────────────────────────────────────── */

export function StatIconsDemo() {
  return (
    <div className="demo" style={{ gap: 32, flexWrap: 'wrap' }}>
      <Stat icon={UsersIcon} label="Active users" count={4910} />
      <Stat icon={DollarIcon} label="MRR" count={48230} prefix="$" />
      <Stat icon={CartIcon} label="Orders" count={372} />
      <Stat icon={BoltIcon} label="API calls" count={1.24} decimals={2} suffix=" M" />
    </div>
  );
}

/* ─── 5. Tone (state-driven colour) ────────────────────────────────────── */

const TONES: StatTone[] = ['default', 'success', 'warning', 'danger'];

export function StatTonesDemo() {
  return (
    <div className="demo" style={{ gap: 28, flexWrap: 'wrap' }}>
      {TONES.map((t) => (
        <Stat key={t} tone={t} label={`tone=${t}`} count={t === 'danger' ? 12 : 4910} />
      ))}
    </div>
  );
}

/* ─── 6. Alignment ─────────────────────────────────────────────────────── */

export function StatAlignDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: 16,
      }}
    >
      <Card pad="compact">
        <Stat align="start" label="Start" count={420} delta={5} deltaSuffix="%" />
      </Card>
      <Card pad="compact">
        <Stat align="center" label="Center" count={420} delta={5} deltaSuffix="%" />
      </Card>
      <Card pad="compact">
        <Stat align="end" label="End" count={420} delta={5} deltaSuffix="%" />
      </Card>
    </div>
  );
}

/* ─── 7. StatGroup with dividers ───────────────────────────────────────── */

export function StatGroupDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 26, alignItems: 'stretch' }}>
      <div>
        <code
          style={{
            fontSize: 11,
            color: 'var(--bwo-text-body)',
            display: 'block',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          Plain group
        </code>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StatGroup>
            <Stat label="Visitors" count={12834} />
            <Stat label="Conversions" count={420} />
            <Stat label="Revenue" count={48230} prefix="$" />
          </StatGroup>
        </div>
      </div>
      <div>
        <code
          style={{
            fontSize: 11,
            color: 'var(--bwo-text-body)',
            display: 'block',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          divided
        </code>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StatGroup divided>
            <Stat label="Visitors" count={12834} delta={8.2} deltaSuffix="%" />
            <Stat label="Conversions" count={420} delta={-1.4} deltaSuffix="%" />
            <Stat label="Revenue" count={48230} prefix="$" delta={12.7} deltaSuffix="%" />
          </StatGroup>
        </div>
      </div>
    </div>
  );
}

/* ─── 8. Dashboard recipe (cards + tones + deltas) ─────────────────────── */

export function StatDashboardDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        padding: 16,
        alignItems: 'stretch',
      }}
    >
      <Card pad="compact">
        <Stat
          size="sm"
          icon={UsersIcon}
          label="Active users"
          count={4910}
          delta={6.2}
          deltaSuffix="%"
        />
      </Card>
      <Card pad="compact">
        <Stat
          size="sm"
          icon={DollarIcon}
          label="MRR"
          count={48230}
          prefix="$"
          delta={12.7}
          deltaSuffix="%"
        />
      </Card>
      <Card pad="compact">
        <Stat
          size="sm"
          icon={CartIcon}
          label="Bounce rate"
          count={38}
          suffix="%"
          delta={-2.1}
          deltaSuffix=" pp"
          goodWhen="down"
        />
      </Card>
      <Card pad="compact">
        <Stat
          size="sm"
          icon={BoltIcon}
          tone="danger"
          label="Errors"
          count={37}
          delta={9}
          deltaSuffix=""
          goodWhen="down"
        />
      </Card>
    </div>
  );
}

/* ─── 9. Hero stat (single, oversized) ─────────────────────────────────── */

export function StatHeroDemo() {
  return (
    <div className="demo" style={{ padding: 24 }}>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <Stat
            size="lg"
            label="Total revenue this quarter"
            count={482310}
            prefix="$"
            delta={18.4}
            deltaSuffix="%"
            deltaLabel="vs last quarter"
          />
          <Badge variant="green" size="sm">
            Live
          </Badge>
        </div>
      </Card>
    </div>
  );
}
