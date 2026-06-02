import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ScrollRevealDemo } from './demo';

export const metadata = { title: 'ScrollReveal — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ScrollReveal</h1>
      <p className="lead">
        Scroll-triggered entrance animation with five named flavours — <code>lift</code>,{' '}
        <code>glide</code>, <code>pop</code>, <code>slide</code>, <code>mist</code>. Each tunes
        opacity, transform, and ease for a different feel. Use it instead of <code>Reveal</code>{' '}
        when you want a softer, transform-based entrance rather than a clip-path mask.
      </p>

      <ScrollRevealDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ScrollReveal } from '@bwo-ui/react';

<ScrollReveal flavor="lift">
  <h2>This lifts in from below as it enters view.</h2>
</ScrollReveal>

<ScrollReveal flavor="mist" duration={1.1}>
  <p>This unblurs from a 14px blur as it enters view.</p>
</ScrollReveal>

<ScrollReveal flavor="pop" once={false}>
  <Card>Replays every time it re-enters the viewport.</Card>
</ScrollReveal>`}</CodeBlock>

      <h2>Flavours</h2>
      <p>
        <code>lift</code> — fades + translates 32px up. The default.
        <br />
        <code>glide</code> — fades + translates 24px up & 32px from the left. Use for sidebar
        items entering laterally.
        <br />
        <code>pop</code> — fades + scales 0.92 → 1 with a back-out ease. Use for badges,
        avatars, small accent tiles.
        <br />
        <code>slide</code> — fades + translates 64px from the right. Use for off-canvas
        side-rails.
        <br />
        <code>mist</code> — fades + blurs 14px → 0. Use for hero copy and feature blocks where
        you want the entrance to feel atmospheric.
      </p>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'flavor',
            type: "'lift' | 'glide' | 'pop' | 'slide' | 'mist'",
            defaultValue: "'lift'",
            description: 'Which named entrance preset to apply.',
          },
          {
            name: 'start',
            type: 'string',
            defaultValue: "'top 88%'",
            description: 'ScrollTrigger start value — when the element begins animating.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '0.9',
            description: 'Animation duration in seconds.',
          },
          {
            name: 'delay',
            type: 'number',
            defaultValue: '0',
            description: 'Initial delay before the tween starts.',
          },
          {
            name: 'once',
            type: 'boolean',
            defaultValue: 'true',
            description:
              'When false, the animation reverses on scroll-out and replays on re-entry.',
          },
          {
            name: 'ease',
            type: 'string',
            description: 'GSAP ease override. Defaults to a curve appropriate per flavour.',
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
