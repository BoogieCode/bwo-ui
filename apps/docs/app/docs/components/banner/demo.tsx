'use client';

import { Banner, Button } from '@bwo-ui/react';

const Info = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v6M12 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const Warn = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l10 17H2L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10v5M12 17.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export function BannerDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 10, padding: 0, alignItems: 'stretch' }}
    >
      <Banner
        tone="info"
        icon={Info}
        title="Heads up"
        action={<Button size="sm" variant="ghost">Learn more</Button>}
      >
        We&apos;ll be rotating API tokens at midnight UTC.
      </Banner>
      <Banner tone="success" icon={Info} onDismiss={() => {}}>
        Plan upgraded — Boogie Pro is now active on your workspace.
      </Banner>
      <Banner tone="warning" icon={Warn} title="Plan limit">
        You&apos;ve used 92% of this month&apos;s API quota.
      </Banner>
      <Banner tone="danger" icon={Warn} title="Build failed">
        Type error in <code>components/Login.tsx</code> · see CI log #4218.
      </Banner>
    </div>
  );
}
