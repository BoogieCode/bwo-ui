import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { HoverCardDemo } from './demo';

export const metadata = { title: 'HoverCard — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>HoverCard</h1>
      <p className="lead">
        Hover-triggered card that portals to <code>document.body</code> so it&apos;s never
        clipped by an ancestor&apos;s <code>overflow</code>. Four sides, configurable enter +
        exit delays, smooth fade-in.
      </p>

      <HoverCardDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { HoverCard, Avatar } from '@bwo-ui/react';

<HoverCard
  side="bottom"
  trigger={<Avatar fallback="AR" />}
>
  <ProfilePreview user={ana} />
</HoverCard>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'trigger', type: 'ReactElement', description: 'Element that opens the card on hover/focus.' },
          { name: 'children', type: 'ReactNode', description: 'Card content.' },
          { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'bottom'", description: 'Anchor side.' },
          { name: 'offset', type: 'number', defaultValue: '10', description: 'Distance from the trigger in px.' },
          { name: 'openDelay', type: 'number', defaultValue: '200', description: 'Hover-in delay in ms.' },
          { name: 'closeDelay', type: 'number', defaultValue: '150', description: 'Hover-out delay in ms.' },
          { name: 'width', type: 'number', defaultValue: '280', description: 'Fixed card width in px.' },
        ]}
      />
    </>
  );
}
