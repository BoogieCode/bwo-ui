'use client';

import { Avatar, AvatarGroup, Badge, type AvatarShape, type AvatarSize } from '@bwo-ui/react';

/* ─── Sample data ──────────────────────────────────────────────────────── */

const PEOPLE = [
  { initials: 'AR', name: 'Ana Radu', accent: '#ff481f' },
  { initials: 'MS', name: 'Mihai Stoica', accent: '#7463ff' },
  { initials: 'IL', name: 'Ioana Lupu', accent: '#16a34a' },
  { initials: 'CT', name: 'Cosmin Toma', accent: '#0ea5e9' },
  { initials: 'DV', name: 'Diana Vlad', accent: '#ffc446' },
  { initials: 'AP', name: 'Andrei Popa', accent: '#a855f7' },
  { initials: 'EV', name: 'Elena Voicu', accent: '#ec4899' },
];

const PHOTO_URL =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&q=80';

function ColoredAvatar({
  initials,
  accent,
  size,
  shape,
}: {
  initials: string;
  accent: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}) {
  return (
    <Avatar size={size} shape={shape} fallback={initials} style={{ background: accent, color: '#fff' }} />
  );
}

/* ─── 1. Variants hero ─────────────────────────────────────────────────── */

export function AvatarDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
      <Avatar src={PHOTO_URL} alt="A worker" fallback="CC" size="sm" />
      <Avatar fallback="JS" />
      <Avatar fallback="AB" size="lg" />
      <Avatar fallback="🎵" size="lg" />
      <AvatarGroup max={4} size="md">
        {PEOPLE.map((p) => (
          <ColoredAvatar key={p.initials} initials={p.initials} accent={p.accent} />
        ))}
      </AvatarGroup>
    </div>
  );
}

/* ─── 2. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function AvatarSizesDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      {SIZES.map((s) => (
        <div
          key={s}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <Avatar size={s} fallback="AR" style={{ background: '#ff481f', color: '#fff' }} />
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>{s}</code>
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Shapes ────────────────────────────────────────────────────────── */

const SHAPES: AvatarShape[] = ['circle', 'rounded', 'square'];

export function AvatarShapesDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
      {SHAPES.map((s) => (
        <div
          key={s}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <Avatar
            shape={s}
            size="lg"
            src={PHOTO_URL}
            alt="Worker"
            fallback="WK"
          />
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>{s}</code>
        </div>
      ))}
    </div>
  );
}

/* ─── 4. Image + fallback states ───────────────────────────────────────── */

export function AvatarFallbackDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar src={PHOTO_URL} alt="A worker" fallback="WK" size="lg" />
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>image</code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar fallback="AR" size="lg" style={{ background: '#ff481f', color: '#fff' }} />
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>initials</code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar
          src="https://example.invalid/never-loads.jpg"
          fallback="✕"
          size="lg"
          style={{ background: 'var(--bwo-grey-4)' }}
        />
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>broken → fallback</code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar fallback="🎵" size="lg" />
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>emoji</code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar
          fallback={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          size="lg"
        />
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>icon</code>
      </div>
    </div>
  );
}

/* ─── 5. AvatarGroup ───────────────────────────────────────────────────── */

export function AvatarGroupDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarGroup>
          {PEOPLE.slice(0, 4).map((p) => (
            <ColoredAvatar key={p.initials} initials={p.initials} accent={p.accent} />
          ))}
        </AvatarGroup>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarGroup max={3}>
          {PEOPLE.map((p) => (
            <ColoredAvatar key={p.initials} initials={p.initials} accent={p.accent} />
          ))}
        </AvatarGroup>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarGroup max={5} size="lg">
          {PEOPLE.map((p) => (
            <ColoredAvatar key={p.initials} initials={p.initials} accent={p.accent} size="lg" />
          ))}
        </AvatarGroup>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarGroup max={2} size="sm" total={28}>
          {PEOPLE.slice(0, 2).map((p) => (
            <ColoredAvatar key={p.initials} initials={p.initials} accent={p.accent} size="sm" />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

/* ─── 6. Status indicator recipe (no new API) ──────────────────────────── */

function AvatarWithStatus({
  initials,
  accent,
  status,
  size = 'md',
}: {
  initials: string;
  accent: string;
  status: 'green' | 'yellow' | 'red' | 'soft';
  size?: AvatarSize;
}) {
  const dotSize = size === 'lg' ? 14 : size === 'xl' ? 18 : size === 'sm' ? 9 : size === 'xs' ? 7 : 11;
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <ColoredAvatar initials={initials} accent={accent} size={size} />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background:
            status === 'green'
              ? '#16a34a'
              : status === 'yellow'
                ? '#ffc446'
                : status === 'red'
                  ? '#ff481f'
                  : 'var(--bwo-grey-3, #d4d4d8)',
          boxShadow: '0 0 0 2px var(--bwo-white)',
        }}
      />
    </span>
  );
}

export function AvatarStatusDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <AvatarWithStatus initials="AR" accent="#ff481f" status="green" size="lg" />
        <Badge dot variant="green" size="sm">
          Online
        </Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <AvatarWithStatus initials="MS" accent="#7463ff" status="yellow" size="lg" />
        <Badge dot variant="yellow" size="sm">
          Idle
        </Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <AvatarWithStatus initials="IL" accent="#16a34a" status="red" size="lg" />
        <Badge dot variant="red" size="sm">
          Busy
        </Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <AvatarWithStatus initials="CT" accent="#0ea5e9" status="soft" size="lg" />
        <Badge dot variant="soft" size="sm">
          Offline
        </Badge>
      </div>
    </div>
  );
}

/* ─── 7. Comment / message recipe ──────────────────────────────────────── */

export function AvatarCommentDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch', padding: 20 }}
    >
      {[
        {
          name: 'Ana Radu',
          initials: 'AR',
          accent: '#ff481f',
          time: '2 min',
          body: 'Pushed the new IconButton parity branch — variants, sizes, and the toolbar pattern docs are in.',
        },
        {
          name: 'Mihai Stoica',
          initials: 'MS',
          accent: '#7463ff',
          time: '8 min',
          body: 'Love the elevation treatment on solid. Going to wire it into the dashboard hero today.',
        },
      ].map((c) => (
        <div key={c.name} style={{ display: 'flex', gap: 12 }}>
          <ColoredAvatar initials={c.initials} accent={c.accent} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>{c.time} ago</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--bwo-text-body)' }}>
              {c.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
