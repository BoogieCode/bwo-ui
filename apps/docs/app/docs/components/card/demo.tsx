'use client';

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@bwo-ui/react';

export function CardDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: 24,
        minHeight: 'auto',
        alignItems: 'stretch',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Free</CardTitle>
          <CardDescription>Get started in a minute.</CardDescription>
        </CardHeader>
        <p style={{ marginBottom: 0 }}>1 site, watermarked, hosted on boogie.ro.</p>
        <CardFooter>
          <Button variant="ghost">Continue free</Button>
        </CardFooter>
      </Card>
      <Card interactive>
        <CardHeader>
          <CardTitle>
            Boogie Pro <Badge variant="green">New</Badge>
          </CardTitle>
          <CardDescription>For teams who ship motion-rich sites.</CardDescription>
        </CardHeader>
        <p style={{ marginBottom: 0 }}>
          Unlimited sites, custom domain, AI rewrites, stock photos, no watermark.
        </p>
        <CardFooter>
          <Button variant="solid">Subscribe</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
