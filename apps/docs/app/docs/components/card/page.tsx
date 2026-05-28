import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CardDemo, CardTileDemo } from './demo';

export const metadata = { title: 'Card — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Card</h1>
      <p className="lead">
        Composable surface container. Standard layout pairs with{' '}
        <code>CardHeader</code>, <code>CardTitle</code>, <code>CardDescription</code>,
        <code>CardFooter</code>. Project-tile layout uses <code>pad="none"</code> +{' '}
        <code>CardMedia</code> / <code>CardTab</code> / <code>CardEyebrow</code> /{' '}
        <code>CardName</code> / <code>CardCaption</code>.
      </p>

      <CardDemo />

      <h2>Standard usage</h2>
      <CodeBlock lang="tsx">{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from '@bwo-ui/react';

<Card interactive>
  <CardHeader>
    <CardTitle>Boogie Plan</CardTitle>
    <CardDescription>For teams who ship motion-rich sites.</CardDescription>
  </CardHeader>
  <p>Everything in Free, plus stock photos and AI rewrites.</p>
  <CardFooter>
    <Button variant="solid">Subscribe</Button>
  </CardFooter>
</Card>`}</CodeBlock>

      <h2>Tile layout (media + tab)</h2>
      <p>
        For project / template tiles where the media bleeds to the card edges, set{' '}
        <code>pad="none"</code> and use the dedicated subcomponents.
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

      <h2>Card props</h2>
      <PropsTable
        rows={[
          {
            name: 'interactive',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Adds the hover lift effect (cursor + transform + shadow).',
          },
          {
            name: 'radius',
            type: "'none' | 'sm' | 'md' | 'lg' | 'pill'",
            description: 'Corner radius preset. Omit to inherit the global default (6px).',
          },
          {
            name: 'pad',
            type: "'default' | 'compact' | 'none'",
            defaultValue: "'default'",
            description: 'Inner padding. `none` lets CardMedia bleed to the card edges.',
          },
        ]}
      />

      <h2>Subcomponents</h2>
      <PropsTable
        rows={[
          { name: 'CardHeader', type: '<div>', description: 'Top section above the body.' },
          { name: 'CardTitle', type: '<h3>', description: 'Display-font heading.' },
          { name: 'CardDescription', type: '<p>', description: 'Smaller muted line below the title.' },
          { name: 'CardFooter', type: '<div>', description: 'Bottom section with divider.' },
          { name: 'CardMedia', type: '<div aspect>', description: 'Top media slot (image / colour swatch). Bleeds to edges with `pad="none"`.' },
          { name: 'CardTab', type: '<div>', description: 'Bottom tab strip beneath CardMedia.' },
          { name: 'CardEyebrow', type: '<p>', description: 'Small uppercase code/label.' },
          { name: 'CardName', type: '<p>', description: 'Display-font name.' },
          { name: 'CardCaption', type: '<p>', description: 'Tiny uppercase category/tag.' },
        ]}
      />
    </>
  );
}
