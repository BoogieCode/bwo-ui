import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  AvatarCommentDemo,
  AvatarDemo,
  AvatarFallbackDemo,
  AvatarGroupDemo,
  AvatarShapesDemo,
  AvatarSizesDemo,
  AvatarStatusDemo,
} from './demo';

export const metadata = { title: 'Avatar — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Avatar</h1>
      <p className="lead">
        Round (or rounded / square) user picture with five sizes, an automatic initials fallback
        when the image fails or is still loading, and a paired <code>AvatarGroup</code> for stacked
        rows with a built-in <code>+N</code> overflow pill.
      </p>

      <AvatarDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Avatar, AvatarGroup } from '@bwo-ui/react';

<Avatar src="/me.jpg" alt="Cristian Cuna" fallback="CC" />
<Avatar fallback="JS" size="lg" />

<AvatarGroup max={3}>
  <Avatar fallback="AR" />
  <Avatar fallback="MS" />
  <Avatar fallback="IL" />
  <Avatar fallback="CT" />
  <Avatar fallback="DV" />
</AvatarGroup>`}</CodeBlock>

      <h2>Sizes</h2>
      <p>
        Five sizes — <code>xs</code> (24 px) → <code>xl</code> (80 px). <code>xs</code> is built
        for inline-with-text density (mentions, comment rails); <code>sm</code> and{' '}
        <code>md</code> are general purpose; <code>lg</code> reads as a profile callout;{' '}
        <code>xl</code> is the hero size for profile pages and onboarding.
      </p>
      <AvatarSizesDemo />
      <CodeBlock lang="tsx">{`<Avatar size="xs" fallback="AR" />
<Avatar size="sm" fallback="AR" />
<Avatar             fallback="AR" />  {/* md, default */}
<Avatar size="lg" fallback="AR" />
<Avatar size="xl" fallback="AR" />`}</CodeBlock>

      <h2>Shapes</h2>
      <p>
        The default <code>circle</code> works for human avatars. <code>rounded</code> (8 px
        radius) reads better for brand / company / product avatars; <code>square</code> is the
        editorial choice — handy for project-thumbnail rows that want a hard-edged look.
      </p>
      <AvatarShapesDemo />
      <CodeBlock lang="tsx">{`<Avatar shape="circle"  src="/u.jpg" fallback="WK" />
<Avatar shape="rounded" src="/u.jpg" fallback="WK" />
<Avatar shape="square"  src="/u.jpg" fallback="WK" />`}</CodeBlock>

      <h2>Image + fallback</h2>
      <p>
        Pass an <code>src</code> and Avatar will render the image once it loads. While loading,
        the fallback is shown after a brief delay (<code>fallbackDelay</code>, default 300 ms) to
        avoid a flicker on fast networks. If the image errors, the fallback persists.
      </p>
      <p>
        The <code>fallback</code> prop accepts anything — initials (the convention), an emoji,
        an inline SVG icon. If you don&apos;t pass it, children are used instead.
      </p>
      <AvatarFallbackDemo />
      <CodeBlock lang="tsx">{`{/* Initials (most common) */}
<Avatar src="/u.jpg" alt="Ana Radu" fallback="AR" />

{/* Loading delay tuned for slow networks */}
<Avatar src="/large.jpg" fallback="AR" fallbackDelay={600} />

{/* Decorative emoji */}
<Avatar fallback="🎵" />

{/* Custom icon */}
<Avatar
  fallback={<UserIcon />}
  style={{ background: 'var(--bwo-grey-4)' }}
/>`}</CodeBlock>
      <p>
        For coloured initial bubbles like a directory listing, set the <code>background</code>{' '}
        and <code>color</code> via inline <code>style</code> — Avatar forwards every native span
        attribute.
      </p>
      <CodeBlock lang="tsx">{`<Avatar
  fallback="AR"
  style={{ background: '#ff481f', color: '#fff' }}
/>`}</CodeBlock>

      <h2>AvatarGroup</h2>
      <p>
        Stack avatars in an overlapping row. Use <code>max</code> to cap the visible count — any
        extras collapse into a <code>+N</code> pill. Every member gets a 2 px white ring so the
        overlap reads cleanly even on tinted backgrounds. The size and shape on the group
        cascade to children that don&apos;t set their own.
      </p>
      <AvatarGroupDemo />
      <CodeBlock lang="tsx">{`{/* No cap — show every avatar */}
<AvatarGroup>
  <Avatar fallback="AR" />
  <Avatar fallback="MS" />
  <Avatar fallback="IL" />
  <Avatar fallback="CT" />
</AvatarGroup>

{/* Cap at 3 — extras become +N */}
<AvatarGroup max={3}>
  <Avatar fallback="AR" />
  <Avatar fallback="MS" />
  <Avatar fallback="IL" />
  <Avatar fallback="CT" />
  <Avatar fallback="DV" />
  <Avatar fallback="AP" />
  <Avatar fallback="EV" />
</AvatarGroup>

{/* Large size cascades to children */}
<AvatarGroup max={5} size="lg">
  {/* … */}
</AvatarGroup>

{/* Explicit total when children are only a sample */}
<AvatarGroup max={2} size="sm" total={28}>
  <Avatar fallback="AR" />
  <Avatar fallback="MS" />
</AvatarGroup>`}</CodeBlock>
      <p>
        Hover an avatar in the stack to lift it forward — every member animates independently,
        which is useful for revealing names on hover via a tooltip layer.
      </p>

      <h2>Status indicator (recipe)</h2>
      <p>
        Avatars commonly carry a tiny status dot (online / idle / busy / offline). There&apos;s no
        dedicated prop — the avatar&apos;s <code>overflow: hidden</code> would clip any
        absolutely-positioned child anyway — so the canonical recipe is to wrap the avatar in a
        positioned span and drop a coloured dot at the bottom-right corner. The dot wears a 2 px
        white ring so it pops off the avatar even on busy photos.
      </p>
      <AvatarStatusDemo />
      <CodeBlock lang="tsx">{`function AvatarWithStatus({ status, ...avatarProps }) {
  const color = {
    online:  '#16a34a',
    idle:    '#ffc446',
    busy:    '#ff481f',
    offline: 'var(--bwo-grey-3)',
  }[status];
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <Avatar {...avatarProps} />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: color,
          boxShadow: '0 0 0 2px var(--bwo-white)',
        }}
      />
    </span>
  );
}`}</CodeBlock>

      <h2>Comment / message recipe</h2>
      <p>
        The classic comment-row layout: <code>md</code> avatar on the left, a name + relative
        timestamp on the first line, body text on the second. <code>xs</code> works well here
        when the surrounding text is dense.
      </p>
      <AvatarCommentDemo />
      <CodeBlock lang="tsx">{`<div style={{ display: 'flex', gap: 12 }}>
  <Avatar fallback="AR" style={{ background: '#ff481f', color: '#fff' }} />
  <div style={{ flex: 1 }}>
    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
      <span style={{ fontWeight: 600 }}>Ana Radu</span>
      <span style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>2 min ago</span>
    </div>
    <p>Pushed the new IconButton parity branch…</p>
  </div>
</div>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Always pair <code>src</code> with a meaningful <code>alt</code>. Avatar forwards{' '}
          <code>alt</code> directly to the inner <code>{'<img>'}</code>.
        </li>
        <li>
          When the avatar is purely decorative (e.g. it sits next to the person&apos;s name),
          pass <code>alt=&quot;&quot;</code> so screen readers don&apos;t double-announce.
        </li>
        <li>
          For initials-only avatars, the visible letters carry the meaning — they&apos;re inside
          a <code>{'<span>'}</code>, not an image, so screen readers will read them. If they
          should be skipped, wrap them in a parent with <code>aria-hidden</code>.
        </li>
        <li>
          For status indicators, use <code>aria-hidden=&quot;true&quot;</code> on the dot and
          convey the state with adjacent text (the dot is a visual aid, not the source of
          truth). The recipe above follows this rule.
        </li>
        <li>
          AvatarGroup&apos;s overflow pill carries <code>aria-label=&quot;{'{N} more'}&quot;</code>{' '}
          so screen readers announce the hidden count.
        </li>
      </ul>

      <h2>Avatar props</h2>
      <PropsTable
        rows={[
          {
            name: 'src',
            type: 'string',
            description: 'Image source URL. Falls back to `fallback` while loading or on error.',
          },
          {
            name: 'alt',
            type: 'string',
            description:
              'Image alt text. Pass an empty string for decorative avatars (e.g. next to a visible name).',
          },
          {
            name: 'fallback',
            type: 'ReactNode',
            description:
              'What to render while the image is loading or has errored — initials, emoji, icon. Falls back to children if omitted.',
          },
          {
            name: 'fallbackDelay',
            type: 'number',
            defaultValue: '300',
            description:
              'Milliseconds before the fallback shows while the image is still loading — prevents flicker on fast networks.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            defaultValue: "'md'",
            description: '24 / 32 / 40 / 56 / 80 px square.',
          },
          {
            name: 'shape',
            type: "'circle' | 'rounded' | 'square'",
            defaultValue: "'circle'",
            description:
              '`circle` = 50 % radius, `rounded` = 8 px radius (good for brand avatars), `square` = no radius.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLSpanElement>',
            description:
              'All native span attributes — `onClick`, `style`, `aria-*` — are forwarded. Use `style` for coloured initial bubbles.',
          },
        ]}
      />

      <h2>AvatarGroup props</h2>
      <PropsTable
        rows={[
          {
            name: 'max',
            type: 'number',
            description:
              'Maximum number of visible avatars. Remaining children collapse into a `+N` overflow pill. Omit to show every child.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            defaultValue: "'md'",
            description:
              'Cascaded to every child avatar (and the overflow pill) that doesn’t set its own size.',
          },
          {
            name: 'shape',
            type: "'circle' | 'rounded' | 'square'",
            defaultValue: "'circle'",
            description: 'Cascaded to every child avatar that doesn’t set its own shape.',
          },
          {
            name: 'total',
            type: 'number',
            description:
              'Explicit total when the rendered children are only a sample of a larger set — the overflow pill will read `+(total − visible)` instead of `+(children − visible)`.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description: 'Native div attributes are forwarded.',
          },
        ]}
      />
    </>
  );
}
