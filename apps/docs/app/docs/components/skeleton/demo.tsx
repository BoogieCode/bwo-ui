'use client';

import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
  Switch,
  type SkeletonAnimation,
  type SkeletonVariant,
} from '@bwo-ui/react';

/* ─── 1. Hero (existing card-like layout) ──────────────────────────────── */

export function SkeletonDemo() {
  return (
    <div
      className="demo"
      style={{
        alignItems: 'stretch',
        maxWidth: 380,
        marginInline: 'auto',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton variant="circle" width={44} height={44} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton height={14} style={{ width: '60%' }} />
          <Skeleton height={12} style={{ width: '40%' }} />
        </div>
      </div>
      <Skeleton height={120} />
      <Skeleton variant="text" lines={2} />
    </div>
  );
}

/* ─── 2. Variants ──────────────────────────────────────────────────────── */

const VARIANTS: SkeletonVariant[] = ['rect', 'circle', 'text'];

export function SkeletonVariantsDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {VARIANTS.map((v) => (
        <div
          key={v}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            width: 140,
          }}
        >
          {v === 'circle' ? (
            <Skeleton variant="circle" width={56} height={56} />
          ) : v === 'text' ? (
            <Skeleton variant="text" lines={3} />
          ) : (
            <Skeleton width={140} height={56} />
          )}
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>variant={v}</code>
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Animation modes ───────────────────────────────────────────────── */

const ANIMATIONS: SkeletonAnimation[] = ['shimmer', 'pulse', 'none'];

export function SkeletonAnimationsDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 18 }}>
      {ANIMATIONS.map((a) => (
        <div
          key={a}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            maxWidth: 420,
            marginInline: 'auto',
            width: '100%',
          }}
        >
          <code
            style={{
              fontSize: 11,
              color: 'var(--bwo-text-body)',
              width: 70,
              textAlign: 'right',
            }}
          >
            {a}
          </code>
          <Skeleton animation={a} height={14} style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  );
}

/* ─── 4. Text lines ────────────────────────────────────────────────────── */

export function SkeletonLinesDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 22, alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ fontSize: 11, color: 'var(--bwo-text-body)', marginBottom: 6 }}>
          lines=1 (single)
        </div>
        <Skeleton variant="text" />
      </div>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ fontSize: 11, color: 'var(--bwo-text-body)', marginBottom: 6 }}>
          lines=3
        </div>
        <Skeleton variant="text" lines={3} />
      </div>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ fontSize: 11, color: 'var(--bwo-text-body)', marginBottom: 6 }}>
          lines=5
        </div>
        <Skeleton variant="text" lines={5} />
      </div>
    </div>
  );
}

/* ─── 5. Sizing ────────────────────────────────────────────────────────── */

export function SkeletonSizingDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch' }}>
      <Skeleton width={160} height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="80%" height={20} style={{ marginInline: 'auto' }} />
      <Skeleton width={200} height={80} radius="16px" />
      <div style={{ display: 'flex', gap: 14 }}>
        <Skeleton variant="circle" width={36} height={36} />
        <Skeleton variant="circle" width={48} height={48} />
        <Skeleton variant="circle" width={64} height={64} />
      </div>
    </div>
  );
}

/* ─── 6. List item recipe ──────────────────────────────────────────────── */

export function SkeletonListDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', alignItems: 'stretch', padding: 16, gap: 14 }}
    >
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Skeleton variant="circle" width={40} height={40} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton height={12} style={{ width: '45%' }} />
            <Skeleton height={10} style={{ width: '65%' }} />
          </div>
          <Skeleton width={64} height={28} radius="14px" />
        </div>
      ))}
    </div>
  );
}

/* ─── 7. Card recipe ───────────────────────────────────────────────────── */

export function SkeletonCardDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: 20,
        alignItems: 'stretch',
      }}
    >
      {[0, 1].map((i) => (
        <Card key={i}>
          <Skeleton height={120} radius="8px" style={{ marginBottom: 14 }} />
          <Skeleton height={16} style={{ width: '60%', marginBottom: 8 }} />
          <Skeleton variant="text" lines={2} />
          <CardFooter>
            <Skeleton width={88} height={32} radius="16px" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

/* ─── 8. Article paragraph recipe ──────────────────────────────────────── */

export function SkeletonArticleDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch', padding: 20 }}
    >
      <Skeleton height={28} style={{ width: '70%' }} />
      <Skeleton height={14} style={{ width: '40%' }} />
      <div style={{ marginTop: 8 }}>
        <Skeleton variant="text" lines={6} />
      </div>
    </div>
  );
}

/* ─── 9. Toggle real <-> loading (the common live pattern) ─────────────── */

interface Person {
  name: string;
  role: string;
  initials: string;
  accent: string;
}

const PEOPLE: Person[] = [
  { name: 'Ana Radu', role: 'Lead motion designer', initials: 'AR', accent: '#ff481f' },
  { name: 'Mihai Stoica', role: 'Frontend lead', initials: 'MS', accent: '#7463ff' },
  { name: 'Ioana Lupu', role: 'Product manager', initials: 'IL', accent: '#16a34a' },
];

export function SkeletonToggleDemo() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Person[] | null>(null);

  useEffect(() => {
    if (!loading) {
      setData(PEOPLE);
      return;
    }
    setData(null);
    const id = window.setTimeout(() => {
      setData(PEOPLE);
      setLoading(false);
    }, 1100);
    return () => window.clearTimeout(id);
  }, [loading]);

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, alignItems: 'stretch', padding: 20 }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          alignSelf: 'center',
          fontSize: 13,
        }}
      >
        <Switch checked={loading} onCheckedChange={setLoading} /> Loading
      </div>
      <Card>
        <CardHeader>
          {loading || !data ? (
            <Skeleton height={20} style={{ width: '45%' }} />
          ) : (
            <CardTitle>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Team
                <Badge size="sm" variant="green">
                  {data.length}
                </Badge>
              </span>
            </CardTitle>
          )}
        </CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} aria-busy={loading}>
          {(loading || !data ? Array.from({ length: 3 }) : data).map((person, i) => {
            const p = person as Person | undefined;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {loading || !p ? (
                  <>
                    <Skeleton variant="circle" width={40} height={40} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <Skeleton height={12} style={{ width: '45%' }} />
                      <Skeleton height={10} style={{ width: '60%' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar
                      fallback={p.initials}
                      style={{ background: p.accent, color: '#fff' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--bwo-text-body)' }}>
                        {p.role}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <CardFooter>
          {loading || !data ? (
            <Skeleton width={92} height={28} radius="14px" />
          ) : (
            <Button size="sm" variant="ghost">
              Manage team
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
