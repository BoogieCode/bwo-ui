import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CarouselDemo } from './demo';

export const metadata = { title: 'Carousel — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Carousel</h1>
      <p className="lead">
        Horizontal slide rotator built on CSS scroll-snap. Arrows, pagination dots, optional
        autoplay with pause-on-hover.
      </p>

      <CarouselDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Carousel } from '@bwo-ui/react';

<Carousel aspectRatio="16 / 9" autoplay={4000}>
  <img src="/1.jpg" alt="Slide one" />
  <img src="/2.jpg" alt="Slide two" />
  <img src="/3.jpg" alt="Slide three" />
</Carousel>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'showArrows', type: 'boolean', defaultValue: 'true', description: 'Toggle the prev/next arrows.' },
          { name: 'showDots', type: 'boolean', defaultValue: 'true', description: 'Toggle the pagination dots.' },
          { name: 'loop', type: 'boolean', defaultValue: 'true', description: 'Wrap around at the ends.' },
          {
            name: 'autoplay',
            type: 'number',
            description: 'Auto-advance interval in ms. Omit / 0 to disable.',
          },
          {
            name: 'pauseOnHover',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Pause autoplay while the cursor is over the carousel.',
          },
          { name: 'index', type: 'number', description: 'Controlled active index (0-based).' },
          { name: 'defaultIndex', type: 'number', defaultValue: '0', description: 'Uncontrolled initial index.' },
          { name: 'onIndexChange', type: '(i: number) => void', description: 'Called when the active slide changes.' },
          { name: 'aspectRatio', type: 'string', description: 'Forwarded to the viewport (e.g. "16 / 9").' },
        ]}
      />

      <p>
        The exposed ref implements <code>{`{ next(), prev(), goTo(i) }`}</code> for imperative
        control.
      </p>
    </>
  );
}
