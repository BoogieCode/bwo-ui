'use client';

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CountUp,
  Magnetic,
  Progress,
  Reveal,
  Separator,
  SplitReveal,
  Stat,
  Switch,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  TextGlitch,
} from '@bwo-ui/react';
import { useEffect, useState } from 'react';

/* ───────────────────────── 1. Stats strip ──────────────────────────────── */

export function StatsStrip() {
  return (
    <section className="shell" style={{ padding: '64px 24px' }}>
      <SplitReveal
        as="h2"
        type="words,chars"
        stagger={0.01}
        style={{ fontSize: 28, letterSpacing: '-0.02em', marginBottom: 32, textAlign: 'center' }}
      >
        Built for production at scale.
      </SplitReveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          padding: '32px 0',
          borderTop: '1px solid var(--bwo-border)',
          borderBottom: '1px solid var(--bwo-border)',
        }}
      >
        <Reveal direction="bottom" delay={0} duration={0.8}>
          <Stat label="Components" count={30} />
        </Reveal>
        <Reveal direction="bottom" delay={0.1} duration={0.8}>
          <Stat label="Motion effects" count={10} />
        </Reveal>
        <Reveal direction="bottom" delay={0.2} duration={0.8}>
          <Stat label="Frameworks" count={3} />
        </Reveal>
        <Reveal direction="bottom" delay={0.3} duration={0.8}>
          <Stat label="React bundle" value="10kb" hint="ESM, gzipped" />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── 2. Live demo strip ──────────────────────────── */

export function LiveDemoStrip() {
  const [tab, setTab] = useState('signup');
  const [notify, setNotify] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <section className="shell" style={{ padding: '64px 24px' }}>
      <Reveal direction="bottom" duration={0.9}>
        <h2
          style={{
            fontSize: 36,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            marginBottom: 12,
            lineHeight: 1.05,
          }}
        >
          Not just <span style={{ color: 'var(--bwo-red)' }}>animations</span>.
          <br />
          Real UI primitives, all themed.
        </h2>
        <p
          style={{
            textAlign: 'center',
            maxWidth: '52ch',
            margin: '0 auto 40px',
            color: 'var(--bwo-text-body)',
          }}
        >
          Every component shipped with full ARIA, keyboard navigation, focus management, and the
          same boogie tokens.
        </p>
      </Reveal>

      <Reveal direction="bottom" delay={0.2} duration={1}>
        <Card
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: 32,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            alignItems: 'start',
          }}
          className="live-demo-card"
        >
          <div>
            <TabsRoot value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
                <TabsTrigger value="login">Log in</TabsTrigger>
              </TabsList>
              <TabsContent value="signup">
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Alert variant="info" title="14-day trial">
                    No credit card required.
                  </Alert>
                  <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
                    <Checkbox defaultChecked /> Email me about updates
                  </label>
                  <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
                    <Switch checked={notify} onCheckedChange={setNotify} /> Push notifications
                  </label>
                  <label style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
                    <Switch checked={marketing} onCheckedChange={setMarketing} /> Marketing
                  </label>
                </div>
              </TabsContent>
              <TabsContent value="login">
                <div style={{ marginTop: 16, color: 'var(--bwo-text-body)', fontSize: 14 }}>
                  Welcome back. Use the Sign up tab to see more goodies.
                </div>
              </TabsContent>
            </TabsRoot>
          </div>
          <Separator orientation="vertical" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar fallback="CC" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Cristian C.</div>
                <div style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>boogie.ro</div>
              </div>
              <Badge variant="green" style={{ marginLeft: 'auto' }}>
                Pro
              </Badge>
            </div>
            <Separator />
            <FakeUpload />
            <Magnetic strength={0.3}>
              <Button variant="solid" style={{ marginTop: 'auto' }}>
                Continue
              </Button>
            </Magnetic>
          </div>
        </Card>
      </Reveal>

      <style jsx>{`
        @media (max-width: 700px) {
          :global(.live-demo-card) { grid-template-columns: 1fr !important; }
          :global(.live-demo-card .bwo-separator--vertical) { display: none; }
        }
      `}</style>
    </section>
  );
}

function FakeUpload() {
  const [value, setValue] = useState(33);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 33 : v + 5)), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: 'var(--bwo-text-body)' }}>Uploading…</span>
        <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--bwo-text-body)' }}>
          {value}%
        </span>
      </div>
      <Progress value={value} />
    </div>
  );
}

/* ───────────────────────── 3. Code-side-by-side ──────────────────────────── */

export function CodeSideBySide() {
  return (
    <section className="shell" style={{ padding: '72px 24px' }}>
      <Reveal direction="bottom" duration={0.9}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, textAlign: 'center' }}>
          <Badge variant="soft" style={{ alignSelf: 'center' }}>
            One stylesheet
          </Badge>
          <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Theme everything with{' '}
            <code
              style={{
                background: 'var(--bwo-grey-4)',
                padding: '2px 10px',
                borderRadius: 6,
                fontSize: '0.85em',
              }}
            >
              --bwo-*
            </code>
          </h2>
        </div>
      </Reveal>

      <Reveal direction="bottom" delay={0.2} duration={1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            alignItems: 'stretch',
          }}
          className="code-side-grid"
        >
          <pre
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >{`:root {
  --bwo-accent: #7463ff;
  --bwo-radius-pill: 6px;
  --bwo-radius-md: 16px;
  --bwo-font-sans: 'Geist', sans-serif;
}`}</pre>
          <div
            style={{
              padding: 28,
              background: 'var(--bwo-surface)',
              border: '1px solid var(--bwo-border)',
              borderRadius: 'var(--bwo-radius-md)',
              boxShadow: 'var(--bwo-shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              fontFamily: 'Geist, var(--bwo-font-sans)',
              ['--bwo-accent' as string]: '#7463ff',
              ['--bwo-radius-pill' as string]: '6px',
              ['--bwo-radius-md' as string]: '16px',
            }}
          >
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--bwo-text-body)' }}>
              Live preview
            </span>
            <Button variant="solid" style={{ background: '#7463ff', borderColor: '#7463ff', borderRadius: 6 }}>
              Themed button
            </Button>
            <Card style={{ borderRadius: 16 }}>
              <CardHeader>
                <CardTitle>Themed card</CardTitle>
                <CardDescription>Tokens propagate automatically.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Reveal>
      <style jsx>{`
        @media (max-width: 720px) {
          :global(.code-side-grid) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────── 4. Feature grid (richer) ───────────────────── */

export function FeatureGrid() {
  const features = [
    {
      title: 'GSAP-powered motion',
      desc: 'Scroll reveals, magnetic buttons, marquees, FLIP layouts, parallax, scramble text, custom cursors.',
      tags: ['SplitText', 'ScrollTrigger', 'Flip'],
    },
    {
      title: 'Radix UI under the hood',
      desc: 'Every stateful component is built on Radix primitives (and reka-ui in Vue) for full a11y, focus management, and keyboard navigation.',
      tags: ['Radix', 'a11y', 'Reka UI'],
    },
    {
      title: 'CSS variables for theming',
      desc: 'Override --bwo-accent, --bwo-radius-md, --bwo-font-sans, dozens more. Dark mode built in.',
      tags: ['--bwo-*', 'Dark mode'],
    },
    {
      title: 'Boogie design system',
      desc: 'Cloned token-for-token from boogie-next: the same radial gradient, Inter font, pill buttons, dashed accordion dividers.',
      tags: ['Tokens', 'Inter', 'Pill UI'],
    },
    {
      title: 'Tiny by default',
      desc: 'React 25 KB ESM. GSAP is a peer dependency. Tree-shake what you don’t use.',
      tags: ['25 KB', 'Peer dep', 'Tree-shake'],
    },
    {
      title: 'MIT, public, on npm',
      desc: 'Free for commercial use. Open source. Already shipping on npm under @bwo-ui.',
      tags: ['MIT', 'npm', 'Open'],
    },
  ];

  return (
    <section className="shell" style={{ padding: '72px 24px' }}>
      <Reveal direction="bottom" duration={0.8}>
        <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 40 }}>
          What you get.
        </h2>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }}
        className="feature-grid-rich"
      >
        {features.map((f, i) => (
          <Reveal key={f.title} direction="bottom" delay={(i % 3) * 0.1} duration={0.9}>
            <Card style={{ height: '100%' }}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <p style={{ color: 'var(--bwo-text-body)', fontSize: 14, marginBottom: 14 }}>
                {f.desc}
              </p>
              <CardFooter style={{ borderTop: 'none', paddingTop: 0, marginTop: 0, gap: 6, flexWrap: 'wrap' }}>
                {f.tags.map((t) => (
                  <Badge key={t} variant="soft" style={{ fontSize: 11 }}>
                    {t}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 900px) { :global(.feature-grid-rich) { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { :global(.feature-grid-rich) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ───────────────────────── 5. Motion showcase ───────────────────────── */

export function MotionShowcase() {
  return (
    <section className="shell" style={{ padding: '72px 24px' }}>
      <Reveal direction="bottom" duration={0.9}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Badge variant="green">Motion</Badge>
          <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 16 }}>
            Effects that bite.
          </h2>
        </div>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 18,
        }}
        className="motion-showcase-grid"
      >
        <Reveal direction="left" duration={1}>
          <Card style={{ padding: 32, minHeight: 200 }}>
            <Badge variant="soft" style={{ marginBottom: 12 }}>
              SplitReveal
            </Badge>
            <SplitReveal
              as="h3"
              type="words,chars"
              stagger={0.02}
              style={{ fontSize: 26, letterSpacing: '-0.02em' }}
            >
              Each character lifts in.
            </SplitReveal>
          </Card>
        </Reveal>

        <Reveal direction="right" duration={1}>
          <Card style={{ padding: 32, minHeight: 200, textAlign: 'center' }}>
            <Badge variant="soft" style={{ marginBottom: 12 }}>
              TextGlitch
            </Badge>
            <TextGlitch
              as="h3"
              chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ01!@#"
              trigger="hover"
              duration={0.8}
              style={{ fontSize: 26, letterSpacing: '-0.02em', cursor: 'pointer' }}
            >
              HOVER TO GLITCH
            </TextGlitch>
          </Card>
        </Reveal>

        <Reveal direction="left" duration={1}>
          <Card style={{ padding: 32, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Magnetic strength={0.4} radius={160}>
              <Button variant="solid">Magnetic pull</Button>
            </Magnetic>
          </Card>
        </Reveal>

        <Reveal direction="right" duration={1}>
          <Card style={{ padding: 32, minHeight: 200 }}>
            <Badge variant="soft" style={{ marginBottom: 12 }}>
              CountUp
            </Badge>
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              €<CountUp to={1240} duration={2.4} separator="," />
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'var(--bwo-text-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Saved per year
            </div>
          </Card>
        </Reveal>
      </div>
      <style jsx>{`
        @media (max-width: 700px) { :global(.motion-showcase-grid) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ───────────────────────── 6. Big CTA ───────────────────────── */

export function BigCTA() {
  return (
    <section className="shell" style={{ padding: '96px 24px' }}>
      <Reveal direction="bottom" duration={1}>
        <div
          style={{
            position: 'relative',
            padding: '64px 40px',
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            borderRadius: 'var(--bwo-radius-md)',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(600px 200px at 30% 100%, rgba(255, 72, 31, 0.35), transparent 70%), radial-gradient(500px 220px at 80% 0%, rgba(160, 255, 39, 0.25), transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SplitReveal
              as="h2"
              type="words,chars"
              stagger={0.012}
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: 16,
                color: 'var(--bwo-white)',
              }}
            >
              Ship the boogie.
            </SplitReveal>
            <p style={{ maxWidth: '44ch', margin: '0 auto 28px', color: 'rgba(255,255,255,0.75)' }}>
              Three frameworks. One install. Zero dependencies beyond peer-GSAP.
            </p>
            <Magnetic strength={0.4}>
              <Button
                variant="green"
                size="lg"
                style={{
                  borderRadius: 'var(--bwo-radius-xl)',
                  padding: '18px 36px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                pnpm add @bwo-ui/react
              </Button>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
