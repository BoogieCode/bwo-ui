import { CodeBlock } from '../../../../components/code-block';
import { TabsDemo } from './demo';

export const metadata = { title: 'Tabs — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Tabs</h1>
      <p className="lead">Segmented pill tabs. Keyboard nav (arrow keys, Home/End) via Radix.</p>

      <TabsDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Tabs } from '@bwo-ui/react';

<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="analytics">Analytics content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs.Root>`}</CodeBlock>
    </>
  );
}
