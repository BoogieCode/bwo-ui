'use client';

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@bwo-ui/react';

export function TabsDemo() {
  return (
    <div className="demo" style={{ alignItems: 'stretch', maxWidth: 520, marginInline: 'auto' }}>
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p style={{ marginTop: 8 }}>
            High-level view of your site — traffic, top pages, last published.
          </p>
        </TabsContent>
        <TabsContent value="analytics">
          <p style={{ marginTop: 8 }}>Page views, bounce rate, average time on page.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p style={{ marginTop: 8 }}>Manage your domain, theme, and team access.</p>
        </TabsContent>
      </TabsRoot>
    </div>
  );
}
