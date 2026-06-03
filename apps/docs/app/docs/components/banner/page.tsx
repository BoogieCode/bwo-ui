import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { BannerDemo } from './demo';

export const metadata = { title: 'Banner — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Banner</h1>
      <p className="lead">
        Page-level message strip — incident notices, plan limits, deprecation warnings. Five
        tones (info / success / warning / danger / neutral), optional icon + title + action +
        dismiss button. Can pin to the top of its scroll container.
      </p>

      <BannerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Banner, Button } from '@bwo-ui/react';

<Banner tone="warning" title="Plan limit" icon={<WarnIcon />}>
  You've used 92% of this month's API quota.
</Banner>

<Banner tone="info" sticky onDismiss={() => mark('seen')}>
  Maintenance window starts 23:00 UTC.
</Banner>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", defaultValue: "'info'", description: 'Visual + accessibility tone.' },
          { name: 'icon', type: 'ReactNode', description: 'Leading icon.' },
          { name: 'title', type: 'ReactNode', description: 'Bold title before the body.' },
          { name: 'action', type: 'ReactNode', description: 'Trailing action — usually a Button or link.' },
          { name: 'onDismiss', type: '() => void', description: 'When provided, renders a close (×) button on the right.' },
          { name: 'sticky', type: 'boolean', defaultValue: 'false', description: 'Pin to the top of the scroll container.' },
        ]}
      />
    </>
  );
}
