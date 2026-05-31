'use client';

import { Card, CardTitle, SimpleGrid } from '@bwo-ui/react';

export function SimpleGridDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={16}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} style={{ padding: 16, textAlign: 'center' }}>
            <CardTitle>Cell {i + 1}</CardTitle>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}
