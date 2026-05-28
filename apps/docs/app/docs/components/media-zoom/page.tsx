import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { MediaZoomDemo } from './demo';

export const metadata = { title: 'MediaZoom — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>MediaZoom</h1>
      <p className="lead">
        Wraps an <code>&lt;img&gt;</code> or <code>&lt;video&gt;</code> so it scales up
        on parent hover. Designed to live inside <code>CardMedia</code> — when the
        card is hovered, the media zooms. CSS-only, GPU-accelerated, respects
        reduced-motion.
      </p>

      <MediaZoomDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Card, CardMedia, MediaZoom } from '@bwo-ui/react';

<Card pad="none" radius="sm">
  <CardMedia aspect="3 / 4">
    <MediaZoom scale={1.08}>
      <img src="/tile.jpg" alt="" />
    </MediaZoom>
  </CardMedia>
</Card>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'scale',
            type: 'number',
            defaultValue: '1.06',
            description: 'Final scale factor on hover.',
          },
        ]}
      />
    </>
  );
}
