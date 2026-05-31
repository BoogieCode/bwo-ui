'use client';

import { Card, Grid, GridItem } from '@bwo-ui/react';

export function GridDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <Grid
        templateAreas={['"hero hero side"', '"main main side"', '"foot foot foot"']}
        templateColumns="1fr 1fr 280px"
        gap={12}
      >
        <GridItem area="hero">
          <Card style={{ padding: 24, height: '100%' }}>Hero</Card>
        </GridItem>
        <GridItem area="side">
          <Card style={{ padding: 24, height: '100%' }}>Sidebar</Card>
        </GridItem>
        <GridItem area="main">
          <Card style={{ padding: 24, height: '100%' }}>Main</Card>
        </GridItem>
        <GridItem area="foot">
          <Card style={{ padding: 24 }}>Footer</Card>
        </GridItem>
      </Grid>
    </div>
  );
}
