import { CodeBlock } from '../../../../components/code-block';
import { TabsDemo } from './demo';

export const metadata = { title: 'Tabs — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Tabs</h1>
      <p className="lead">
        Segmented pill tabs. Keyboard nav (arrow keys, Home/End) built in. Written from scratch.
      </p>

      <TabsDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@bwo-ui/react';

<TabsRoot defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p>High-level view of your site — traffic, top pages, last published.</p>
  </TabsContent>
  <TabsContent value="analytics">
    <p>Page views, bounce rate, average time on page.</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Manage your domain, theme, and team access.</p>
  </TabsContent>
</TabsRoot>`}</CodeBlock>
    </>
  );
}
