import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ScrollMaskDemo } from './demo';

export const metadata = { title: 'ScrollMask — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrollMask</h1>
      <p className="lead">
        Clip-path reveal scrubbed by scroll progress. The element starts hidden behind an inset
        clip and opens as you scroll past — five directions (<code>left</code>,{' '}
        <code>right</code>, <code>top</code>, <code>bottom</code>, <code>center</code>). Use it
        for image and video reveals where you want the viewer to &quot;open&quot; the media as
        they scroll.
      </p>

      <ScrollMaskDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrollMask } from '@bwo-ui/react';

<ScrollMask direction="center" from={50} scrub={0.5}>
  <img src="/hero.jpg" alt="" />
</ScrollMask>

<ScrollMask direction="left" from={40} scrub={true}>
  <video autoPlay loop muted src="/reel.mp4" />
</ScrollMask>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'direction',
            type: "'left' | 'right' | 'top' | 'bottom' | 'center'",
            defaultValue: "'center'",
            description: 'Where the mask opens from.',
          },
          {
            name: 'trigger',
            type: 'Target',
            description:
              'ScrollTrigger element. Defaults to the target itself. Useful when you want the mask scrub bound to a parent section.',
          },
          {
            name: 'start',
            type: 'string',
            defaultValue: "'top 80%'",
            description: 'ScrollTrigger start value — when the scrub begins.',
          },
          {
            name: 'end',
            type: 'string',
            defaultValue: "'bottom 40%'",
            description: 'ScrollTrigger end value — when the scrub is complete.',
          },
          {
            name: 'scrub',
            type: 'boolean | number',
            defaultValue: '0.6',
            description:
              'Scrub lag. true = follow scroll instantly, a number = lag in seconds.',
          },
          {
            name: 'from',
            type: 'number',
            defaultValue: '50',
            description:
              'Initial inset percentage (0–50). 50 is fully closed (center direction), 0 fully open.',
          },
          {
            name: 'as',
            type: 'ElementType',
            defaultValue: "'div'",
            description: 'HTML tag or component to render the wrapping element as.',
          },
        ]}
      />
    </>
  );
}
