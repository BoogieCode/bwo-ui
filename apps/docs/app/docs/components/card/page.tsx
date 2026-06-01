import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  CardAnatomyDemo,
  CardDemo,
  CardFooterAlignDemo,
  CardInteractiveDemo,
  CardPadDemo,
  CardProfileDemo,
  CardQuoteDemo,
  CardRadiusDemo,
  CardStatDemo,
  CardTileDemo,
} from './demo';

export const metadata = { title: 'Card — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Card</h1>
      <p className="lead">
        A composable surface for grouping related content — pricing tiers, profile blocks,
        stats, callouts, project tiles. The header / body / footer slots compose freely, and the
        footer anchors to the bottom whenever the card has vertical slack (which makes pricing
        rows and stat grids line up without any extra wrapper).
      </p>

      <CardDemo />

      <h2>Anatomy</h2>
      <p>
        A Card is just a flex column. The named subcomponents — <code>CardHeader</code>,{' '}
        <code>CardTitle</code>, <code>CardDescription</code>, <code>CardFooter</code> — give
        you typography and spacing defaults that match the rest of the kit, but everything
        is optional. Drop in whatever children you want; the only structural rule is that{' '}
        <code>CardFooter</code> auto-pins to the bottom of the card.
      </p>
      <CardAnatomyDemo />
      <CodeBlock lang="tsx">{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from '@bwo-ui/react';

<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <p>Body content sits between the header and the footer.</p>
  <CardFooter>
    <Button size="sm" variant="ghost">Action</Button>
    <Button size="sm" variant="primary">Primary</Button>
  </CardFooter>
</Card>`}</CodeBlock>

      <h2>Interactive</h2>
      <p>
        Add the <code>interactive</code> prop to opt into the hover lift treatment — pointer
        cursor, a deeper shadow, and a 2 px <code>translateY</code> on hover. Use it whenever the
        entire card is clickable. For accessibility, wire up the click target yourself
        (typically by wrapping the card in a <code>Link</code> or attaching{' '}
        <code>onClick</code> + <code>role=&quot;button&quot;</code> + <code>tabIndex</code>; see
        the Accessibility section below).
      </p>
      <CardInteractiveDemo />
      <CodeBlock lang="tsx">{`<Card>{/* static */}</Card>
<Card interactive>{/* hover-lifted */}</Card>`}</CodeBlock>

      <h2>Padding modes</h2>
      <p>
        <code>pad</code> controls the inner padding. The default (24 px) is sized for prose-heavy
        layouts; <code>compact</code> (12 px) packs cards into dense grids; <code>none</code>{' '}
        lets edge-to-edge content like <code>CardMedia</code> bleed to the card&apos;s rounded
        corners.
      </p>
      <CardPadDemo />
      <CodeBlock lang="tsx">{`<Card>{/* default — 24 px */}</Card>
<Card pad="compact">{/* 12 px */}</Card>
<Card pad="none">
  <CardMedia aspect="4 / 3">…</CardMedia>
  <div style={{ padding: 14 }}>edge-to-edge media + manually padded text</div>
</Card>`}</CodeBlock>

      <h2>Corner radius</h2>
      <p>
        The <code>radius</code> prop accepts the shared radius scale
        (<code>none</code> / <code>sm</code> / <code>md</code> / <code>lg</code>). Omit it to
        inherit <code>--bwo-radius-current</code> (defaults to 6 px). Picking a sharper radius
        is a common cue for editorial / project tiles; rounder cards feel softer and more
        consumer-app.
      </p>
      <CardRadiusDemo />
      <CodeBlock lang="tsx">{`<Card radius="none">…</Card>
<Card radius="sm">…</Card>
<Card radius="md">…</Card>
<Card radius="lg">…</Card>`}</CodeBlock>

      <h2>Footer alignment</h2>
      <p>
        <code>CardFooter</code> uses <code>margin-top: auto</code> inside the card&apos;s flex
        column. The practical effect: whenever the card has any vertical slack (typically because
        its parent stretches sibling cards to equal height — the default for CSS grids), the
        footer hugs the bottom. The cards below all have different body lengths, but their
        footers line up.
      </p>
      <CardFooterAlignDemo />
      <CodeBlock lang="tsx">{`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
  <Card>
    <CardHeader><CardTitle>Starter</CardTitle></CardHeader>
    <p>Short body.</p>
    <CardFooter><Button size="sm">Pick</Button></CardFooter>
  </Card>
  <Card>
    <CardHeader><CardTitle>Growth</CardTitle></CardHeader>
    <p>Medium body that wraps over two or three lines.</p>
    <CardFooter><Button size="sm">Pick</Button></CardFooter>
  </Card>
  <Card>
    <CardHeader><CardTitle>Scale</CardTitle></CardHeader>
    <p>A noticeably longer paragraph of body copy that wraps across many lines…</p>
    <CardFooter><Button size="sm">Pick</Button></CardFooter>
  </Card>
</div>`}</CodeBlock>
      <p>
        The behaviour kicks in automatically when the card has slack. In a standalone card
        sized purely by content, the footer simply sits beneath the body — same as before. No
        prop required.
      </p>

      <h2>Tile layout</h2>
      <p>
        For project / template tiles where the media bleeds to the card edges, switch to{' '}
        <code>pad=&quot;none&quot;</code> and use the dedicated tile subcomponents:{' '}
        <code>CardMedia</code>, <code>CardTab</code>, <code>CardEyebrow</code>,{' '}
        <code>CardName</code>, <code>CardCaption</code>.
      </p>
      <CardTileDemo />
      <CodeBlock lang="tsx">{`import {
  Card,
  CardMedia,
  CardTab,
  CardEyebrow,
  CardName,
  CardCaption,
  MediaZoom,
} from '@bwo-ui/react';

<Card pad="none" radius="sm" interactive>
  <CardMedia aspect="3 / 4">
    <MediaZoom>
      <img src="/tile.jpg" alt="" />
    </MediaZoom>
  </CardMedia>
  <CardTab>
    <CardEyebrow>BOOGIE 0001</CardEyebrow>
    <CardName>Agency</CardName>
    <CardCaption>Studio · Light</CardCaption>
  </CardTab>
</Card>`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>Stat card</h3>
      <p>
        A common analytics pattern: uppercase eyebrow + display-font value + small delta line.
        Compose it directly from a Card — no special prop required.
      </p>
      <CardStatDemo />
      <CodeBlock lang="tsx">{`<Card pad="compact">
  <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--bwo-text-body)' }}>
    Monthly visitors
  </p>
  <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '6px 0 4px' }}>
    128.4k
  </p>
  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--bwo-green)' }}>
    +12.3% vs last month
  </p>
</Card>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Profile card</h3>
      <p>
        Avatar + name + role on top, action buttons in the footer. The footer&apos;s automatic
        bottom-alignment is what makes these cards line up cleanly in a directory grid.
      </p>
      <CardProfileDemo />
      <CodeBlock lang="tsx">{`<Card>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Avatar />
    <div>
      <p style={{ fontSize: 15, fontWeight: 600 }}>Ana Radu</p>
      <p style={{ fontSize: 13, color: 'var(--bwo-text-body)' }}>Lead motion designer</p>
    </div>
  </div>
  <CardFooter>
    <Button size="sm" variant="outline">Message</Button>
    <Button size="sm" variant="primary">Follow</Button>
  </CardFooter>
</Card>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Quote / callout</h3>
      <p>
        For testimonial blocks or pull quotes, drop the structured subcomponents and just write
        prose. The Card&apos;s padding and shadow do the visual work.
      </p>
      <CardQuoteDemo />
      <CodeBlock lang="tsx">{`<Card radius="md">
  <p style={{ fontSize: 18, lineHeight: 1.45, fontWeight: 500 }}>
    “bwo-ui shipped 60 components in a month. Every primitive is ours…”
  </p>
  <div style={{ display: 'flex', gap: 10, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--bwo-border)' }}>
    <Avatar />
    <div>
      <p style={{ fontSize: 13, fontWeight: 600 }}>Mihai Stoica</p>
      <p style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>Frontend lead · boogie.ro</p>
    </div>
  </div>
</Card>`}</CodeBlock>

      <h2>Aligning footer actions</h2>
      <p>
        <code>CardFooter</code> is a flexbox row. It defaults to left-aligned content — override
        with <code>justifyContent</code> when you want actions on the right or split across both
        sides.
      </p>
      <CodeBlock lang="tsx">{`{/* Right-aligned actions */}
<CardFooter style={{ justifyContent: 'flex-end' }}>
  <Button size="sm" variant="ghost">Cancel</Button>
  <Button size="sm" variant="primary">Save</Button>
</CardFooter>

{/* Split — meta info on the left, primary action on the right */}
<CardFooter style={{ justifyContent: 'space-between' }}>
  <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>Updated 2 h ago</span>
  <Button size="sm" variant="primary">Open</Button>
</CardFooter>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          A card without <code>interactive</code> is a passive surface and needs no extra
          a11y wiring. Use it for grouping, not for actions.
        </li>
        <li>
          When the whole card is clickable, the cleanest pattern is to wrap the Card in a{' '}
          <code>{'<Link>'}</code> (or <code>{'<a>'}</code>) — the link is the focusable, screen-reader-readable
          interactive element, and the Card just supplies the visual surface.
        </li>
        <li>
          If you must make the card itself the click target, add <code>role=&quot;button&quot;</code>,{' '}
          <code>tabIndex={0}</code>, and a keyboard handler (<code>Enter</code> /{' '}
          <code>Space</code> → click). Otherwise keyboard users cannot activate it.
        </li>
        <li>
          Avoid nesting interactive elements (e.g. a Button inside an interactive Card) without
          stopping propagation — clicking the inner button will also trigger the card&apos;s
          handler, which is rarely what users want.
        </li>
        <li>
          Decorative <code>CardMedia</code> images should carry <code>alt=&quot;&quot;</code>; meaningful
          ones (photos with context relevant to the card body) should carry descriptive alt
          text.
        </li>
      </ul>

      <h2>Card props</h2>
      <PropsTable
        rows={[
          {
            name: 'interactive',
            type: 'boolean',
            defaultValue: 'false',
            description:
              'Adds the hover lift effect — pointer cursor, deeper shadow, 2 px translateY. Does not add a11y wiring; see the Accessibility section.',
          },
          {
            name: 'radius',
            type: "'none' | 'sm' | 'md' | 'lg' | 'pill'",
            description:
              'Corner radius preset. Omit to inherit `--bwo-radius-current` (defaults to 6 px).',
          },
          {
            name: 'pad',
            type: "'default' | 'compact' | 'none'",
            defaultValue: "'default'",
            description:
              "'default' = 24 px, 'compact' = 12 px, 'none' = no padding (use with `CardMedia` for edge-to-edge media).",
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description: 'Every native div attribute is forwarded — `onClick`, `style`, etc.',
          },
        ]}
      />

      <h2>Subcomponents</h2>
      <PropsTable
        rows={[
          {
            name: 'CardHeader',
            type: '<div>',
            description: 'Top section above the body. 12 px margin-bottom.',
          },
          {
            name: 'CardTitle',
            type: '<h3>',
            description: '18 px / 600 weight heading.',
          },
          {
            name: 'CardDescription',
            type: '<p>',
            description: '14 px muted line under the title.',
          },
          {
            name: 'CardFooter',
            type: '<div>',
            description:
              'Bottom section. Auto-pins to the bottom of the card (margin-top: auto) and has a 1 px top divider. Flex row with 8 px gap; align actions via `justifyContent` in inline style.',
          },
          {
            name: 'CardMedia',
            type: '<div aspect>',
            description:
              'Top media slot. Wraps an inner `<img>` / `<video>` with object-fit: cover. Aspect defaults to 3/4. Pairs with `pad="none"` for edge-to-edge media.',
          },
          {
            name: 'CardTab',
            type: '<div>',
            description: 'Strip beneath `CardMedia` — typically eyebrow + name + caption.',
          },
          {
            name: 'CardEyebrow',
            type: '<p>',
            description: 'Small uppercase code or label above the name.',
          },
          {
            name: 'CardName',
            type: '<p>',
            description: 'Display-font name line.',
          },
          {
            name: 'CardCaption',
            type: '<p>',
            description: 'Tiny uppercase category / status tag.',
          },
        ]}
      />
    </>
  );
}
