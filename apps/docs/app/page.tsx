import { HeroDemo } from './hero-demo';

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <p
          style={{
            color: 'var(--bwo-text-body)',
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 22,
            opacity: 0.7,
          }}
        >
          UI Kit · GSAP motion · React / Vue / Svelte
        </p>
        <HeroDemo />
      </section>

      <section className="shell">
        <div className="landing-grid">
          <div className="feature">
            <h3>UI primitives</h3>
            <p>
              Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Slider, Badge, Card —
              built on Radix UI (and Reka UI in Vue) for full a11y, then themed with boogie
              tokens.
            </p>
          </div>
          <div className="feature">
            <h3>Motion effects</h3>
            <p>
              SplitReveal, Magnetic, Marquee, FlipList — every effect is a vanilla TS factory in{' '}
              <code>@bwo-ui/core</code>, with thin React, Vue, and Svelte wrappers.
            </p>
          </div>
          <div className="feature">
            <h3>One stylesheet</h3>
            <p>
              Import <code>@bwo-ui/react/styles.css</code> once. Override CSS variables
              (<code>--bwo-accent</code>, <code>--bwo-radius-md</code>, etc.) to theme.
            </p>
          </div>
          <div className="feature">
            <h3>Tiny by default</h3>
            <p>
              React bundle is ~10 KB ESM (gzipped much smaller). GSAP is a peer dependency, so
              you only pay for what you import.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
