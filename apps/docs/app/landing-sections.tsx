'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Alert,
  Avatar,
  Badge,
  Blur,
  Button,
  ButtonGroup,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  CountUp,
  DatePicker,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Magnetic,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Progress,
  Rate,
  Reveal,
  Separator,
  Slider,
  SplitReveal,
  Stat,
  Step,
  Stepper,
  Toaster,
  useToast,
  Switch,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  TextGlitch,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@bwo-ui/react';
import { useEffect, useState } from 'react';

/* ───────────────────────── 1. Stats strip ──────────────────────────────── */

export function StatsStrip() {
  return (
    <section className="shell shell-section">
      <SplitReveal
        as="h2"
        type="words,chars"
        stagger={0.01}
        style={{ fontSize: 28, letterSpacing: '-0.02em', marginBottom: 32, textAlign: 'center' }}
      >
        Built for production at scale.
      </SplitReveal>
      <div
        className="stats-strip-grid"
        style={{
          padding: '32px 0',
          borderTop: '1px solid var(--bwo-border)',
          borderBottom: '1px solid var(--bwo-border)',
        }}
      >
        <Reveal direction="bottom" delay={0} duration={0.8}>
          <Stat label="Components" count={72} />
        </Reveal>
        <Reveal direction="bottom" delay={0.1} duration={0.8}>
          <Stat label="Motion effects" count={22} />
        </Reveal>
        <Reveal direction="bottom" delay={0.2} duration={0.8}>
          <Stat label="Frameworks" count={3} />
        </Reveal>
        <Reveal direction="bottom" delay={0.3} duration={0.8}>
          <Stat label="Runtime deps" value="0" hint="every primitive owned" />
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
    <section className="shell shell-section">
      <Reveal direction="bottom" duration={0.9}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
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
          Every component ships with ARIA, keyboard navigation, focus management, and the same
          boogie tokens — written from scratch, no headless library underneath.
        </p>
      </Reveal>

      <Reveal direction="bottom" delay={0.2} duration={1}>
        <Card
          className="live-demo-card"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: 32,
          }}
        >
          <div className="live-demo-card-inner">
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
            <Separator orientation="vertical" className="live-demo-divider" />
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
          </div>
        </Card>
      </Reveal>
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

/* ───────────────────────── 3. Component gallery (NEW) ───────────────────── */

export function ComponentGallery() {
  return (
    <section className="shell shell-section">
      {/* Title block now blurs-into-focus instead of sliding from below.
          More cinematic, pairs with the staggered Blur on each tile below. */}
      <Blur intensity="strong" duration={1.0}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Badge variant="soft" style={{ marginBottom: 14 }}>
            Component buffet
          </Badge>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            Pop the hood. Every primitive is interactive.
          </h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: '52ch',
              margin: '12px auto 0',
              color: 'var(--bwo-text-body)',
            }}
          >
            Hover, click, drag. Six representative components — all from <code>@bwo-ui/react</code>.
          </p>
        </div>
      </Blur>

      <TooltipProvider delayDuration={150}>
        <Toaster>
        <div className="component-gallery-grid">
          <GalleryTile label="Tooltip" hint="Hover the buttons">
            <div style={{ display: 'inline-flex', gap: 8 }}>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <IconButton aria-label="Search" variant="ghost">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
                      <path d="M19 19l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </TooltipRoot>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <IconButton aria-label="Like" variant="ghost">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.65-9.5 9-9.5 9z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>Like</TooltipContent>
              </TooltipRoot>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <IconButton aria-label="Share" variant="ghost">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </TooltipRoot>
            </div>
          </GalleryTile>

          <GalleryTile label="Popover" hint="Click to open">
            <PopoverRoot>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Quick actions
                </Button>
              </PopoverTrigger>
              <PopoverContent style={{ width: 220 }}>
                <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>Quick actions</p>
                <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--bwo-text-body)' }}>
                  Anchored, focus-trapped, portaled.
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Button size="sm" variant="primary" style={{ flex: 1 }}>
                    Confirm
                  </Button>
                  <Button size="sm" variant="ghost" style={{ flex: 1 }}>
                    Cancel
                  </Button>
                </div>
              </PopoverContent>
            </PopoverRoot>
          </GalleryTile>

          <GalleryTile label="Dropdown menu" hint="Open the menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Account ▾
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </GalleryTile>

          <RateTile />
          <DatePickerTile />
          <StepperTile />
          <SwitchCheckboxTile />
          <SliderTile />
          <ComboboxTile />
          <ToastTile />
          <AlertTile />
          <ButtonGroupTile />
        </div>
        </Toaster>
      </TooltipProvider>
    </section>
  );
}

// Module-level counter so each GalleryTile gets a stable staggered delay
// based on its mount order. Reset on each section re-mount via Provider key.
let galleryTileOrder = 0;

function GalleryTile({
  label,
  hint,
  stretch,
  children,
}: {
  label: string;
  hint?: string;
  /** When true, the stage stretches its child to full width — for inputs, sliders, etc. */
  stretch?: boolean;
  children: React.ReactNode;
}) {
  // Capture mount order so each tile blurs-into-focus 80 ms after the previous.
  // We use a useState lazy initializer so the value is stable across renders
  // and survives strict-mode double-invocation.
  const [order] = useState(() => galleryTileOrder++);
  return (
    <Blur intensity="medium" duration={0.9} delay={order * 0.08}>
      <Card className="component-gallery-tile" style={{ height: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <Badge variant="soft" size="sm">
            {label}
          </Badge>
          {hint && (
            <span style={{ fontSize: 11, color: 'var(--bwo-text-body)', opacity: 0.7 }}>
              {hint}
            </span>
          )}
        </div>
        <div
          className={
            'component-gallery-stage' +
            (stretch ? ' component-gallery-stage--stretch' : '')
          }
        >
          {children}
        </div>
      </Card>
    </Blur>
  );
}

function RateTile() {
  const [value, setValue] = useState(4);
  return (
    <GalleryTile label="Rate" hint="Click a star">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Rate value={value} onValueChange={setValue} icon="star" size="lg" />
        <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
          {value} / 5
        </span>
      </div>
    </GalleryTile>
  );
}

function DatePickerTile() {
  // Initialise to null so the SSR markup is stable. `new Date()` differs between
  // the server render and the client hydration both in value (timestamp) and in
  // format (server locale vs browser locale via `toLocaleDateString`), which
  // would otherwise throw a hydration mismatch warning. We set the live date
  // after mount, by which point React only owns the tree.
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <GalleryTile label="DatePicker" hint="Open the calendar">
      <DatePicker value={date} onValueChange={setDate} />
    </GalleryTile>
  );
}

function StepperTile() {
  const [step, setStep] = useState(1);
  return (
    <GalleryTile label="Stepper" hint="Step through">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'stretch', width: '100%' }}>
        <Stepper activeStep={step} orientation="horizontal">
          <Step index={0} label="Plan" />
          <Step index={1} label="Build" />
          <Step index={2} label="Ship" />
        </Stepper>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setStep((s) => Math.min(2, s + 1))}
            disabled={step === 2}
          >
            Next
          </Button>
        </div>
      </div>
    </GalleryTile>
  );
}

/* ─── 7. Switch + Checkbox ─────────────────────────────────────────────── */

function SwitchCheckboxTile() {
  const [push, setPush] = useState(true);
  const [marketing, setMarketing] = useState(false);
  return (
    <GalleryTile label="Switch · Checkbox" hint="Toggle them">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          fontSize: 13,
          width: '100%',
          maxWidth: 220,
        }}
      >
        <label
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>Push notifications</span>
          <Switch checked={push} onCheckedChange={setPush} />
        </label>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Checkbox
            checked={marketing}
            onCheckedChange={(v) => setMarketing(v === true)}
          />
          <span>Email me product news</span>
        </label>
      </div>
    </GalleryTile>
  );
}

/* ─── 8. Slider ────────────────────────────────────────────────────────── */

function SliderTile() {
  const [value, setValue] = useState([72]);
  return (
    <GalleryTile label="Slider" hint="Drag the thumb" stretch>
      <div className="gallery-slider-wrap">
        <div className="gallery-slider-head">
          <span>Volume</span>
          <span className="gallery-slider-val">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={0} max={100} aria-label="Volume" />
      </div>
    </GalleryTile>
  );
}

/* ─── 9. Combobox ──────────────────────────────────────────────────────── */

const FRAMEWORKS = [
  { value: 'react', label: 'React', description: '@bwo-ui/react' },
  { value: 'vue', label: 'Vue 3', description: '@bwo-ui/vue' },
  { value: 'svelte', label: 'Svelte', description: '@bwo-ui/svelte' },
  { value: 'solid', label: 'Solid', description: 'Coming soon' },
  { value: 'qwik', label: 'Qwik', description: 'Coming soon' },
];

function ComboboxTile() {
  const [value, setValue] = useState<string | null>('react');
  return (
    <GalleryTile label="Combobox" hint="Type to filter">
      <div style={{ width: '100%', maxWidth: 220 }}>
        <Combobox
          options={FRAMEWORKS}
          value={value}
          onValueChange={setValue}
          placeholder="Pick a framework…"
        />
      </div>
    </GalleryTile>
  );
}

/* ─── 10. Toast ────────────────────────────────────────────────────────── */

function ToastTile() {
  const { toast } = useToast();
  const [count, setCount] = useState(0);
  return (
    <GalleryTile label="Toast" hint="Fire a toast">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            const next = count + 1;
            setCount(next);
            toast({
              title: `Saved · #${next}`,
              description: 'Toast fired from the gallery.',
            });
          }}
        >
          Show toast
        </Button>
        <span style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>
          Fired {count} {count === 1 ? 'time' : 'times'}
        </span>
      </div>
    </GalleryTile>
  );
}

/* ─── 11. Alert ────────────────────────────────────────────────────────── */

function AlertTile() {
  return (
    <GalleryTile label="Alert" hint="In-flow message">
      <div style={{ width: '100%' }}>
        <Alert variant="success" title="Plan upgraded">
          You now have unlimited builds.
        </Alert>
      </div>
    </GalleryTile>
  );
}

/* ─── 12. ButtonGroup ──────────────────────────────────────────────────── */

function ButtonGroupTile() {
  const [view, setView] = useState<'list' | 'grid' | 'tree'>('grid');
  return (
    <GalleryTile label="ButtonGroup" hint="Segmented">
      <ButtonGroup attached>
        <Button
          size="sm"
          variant={view === 'list' ? 'primary' : 'ghost'}
          onClick={() => setView('list')}
        >
          List
        </Button>
        <Button
          size="sm"
          variant={view === 'grid' ? 'primary' : 'ghost'}
          onClick={() => setView('grid')}
        >
          Grid
        </Button>
        <Button
          size="sm"
          variant={view === 'tree' ? 'primary' : 'ghost'}
          onClick={() => setView('tree')}
        >
          Tree
        </Button>
      </ButtonGroup>
    </GalleryTile>
  );
}

/* ───────────────────────── 4. Code-side-by-side ──────────────────────────── */

export function CodeSideBySide() {
  return (
    <section className="shell shell-section">
      <Reveal direction="bottom" duration={0.9}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, textAlign: 'center' }}>
          <Badge variant="soft" style={{ alignSelf: 'center' }}>
            One stylesheet
          </Badge>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
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
        <div className="code-side-grid">
          <pre
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              overflowX: 'auto',
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
    </section>
  );
}

/* ───────────────────────── 5. Feature grid (richer) ───────────────────── */

export function FeatureGrid() {
  const features = [
    {
      title: 'GSAP-powered motion',
      desc: 'Scroll reveals, magnetic buttons, marquees, FLIP layouts, parallax, scramble text, custom cursors.',
      tags: ['SplitText', 'ScrollTrigger', 'Flip'],
    },
    {
      title: 'Owned end-to-end',
      desc: 'Every primitive — Dialog, Popover, Tooltip, Select, Tabs, Accordion, Toast, Calendar, Combobox — written from scratch. No headless UI library underneath.',
      tags: ['Zero deps', 'From scratch', 'a11y'],
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
      title: 'ESM-first, tree-shakable',
      desc: 'Ship only what you import. GSAP is a peer dep — pay nothing for effects you don’t use.',
      tags: ['ESM', 'Peer dep', 'Tree-shake'],
    },
    {
      title: 'MIT, public, on npm',
      desc: 'Free for commercial use. Open source. Already shipping on npm under @bwo-ui.',
      tags: ['MIT', 'npm', 'Open'],
    },
  ];

  return (
    <section className="shell shell-section">
      <Reveal direction="bottom" duration={0.8}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          What you get.
        </h2>
      </Reveal>
      <div className="feature-grid-rich">
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
    </section>
  );
}

/* ───────────────────────── 6. Motion showcase ───────────────────────── */

export function MotionShowcase() {
  return (
    <section className="shell shell-section">
      <Reveal direction="bottom" duration={0.9}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Badge variant="green">Motion</Badge>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', letterSpacing: '-0.03em', marginTop: 16 }}>
            Effects that bite.
          </h2>
        </div>
      </Reveal>
      <div className="motion-showcase-grid">
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
    </section>
  );
}

/* ───────────────────────── 7. FAQ (NEW) ──────────────────────────────── */

const FAQS = [
  {
    q: 'Is it really zero runtime dependencies?',
    a: 'Yes — every primitive is written from scratch. No Radix, no cmdk, no react-day-picker, no headless library underneath. GSAP is a peer dep for the motion effects, so you only pay for it if you use them.',
  },
  {
    q: 'Why three frameworks?',
    a: 'The core (CSS + tokens + GSAP factories) is framework-agnostic. The React, Vue, and Svelte packages are thin adapters over the same primitives — same look, same accessibility, same API surface where it makes sense.',
  },
  {
    q: 'Can I theme it?',
    a: 'Override any CSS custom property — colours (`--bwo-accent`, `--bwo-red`, `--bwo-green`), radius scale (`--bwo-radius-sm` through `--bwo-radius-pill`), typography (`--bwo-font-sans`, `--bwo-font-display`), shadows, transitions. Dark mode is opt-in via `:root.boo-dark`.',
  },
  {
    q: 'Is it production-ready?',
    a: 'It powers boogie.ro. The component surface is settled; we still version 0.x because the API shape may change as new primitives land. Pin to the minor version and follow the changelog.',
  },
  {
    q: 'How do I install it?',
    a: 'pnpm add @bwo-ui/react gsap — or npm / yarn / bun. Then import `@bwo-ui/core/styles/index.css` once at your app entry. The CLI (`bwo init`) sets that up for you.',
  },
];

export function FAQ() {
  return (
    <section className="shell shell-section">
      <Reveal direction="bottom" duration={0.9}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Badge variant="soft" style={{ marginBottom: 14 }}>
            FAQ
          </Badge>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Things people ask.
          </h2>
        </div>
      </Reveal>

      <Reveal direction="bottom" delay={0.15} duration={1}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <AccordionRoot type="single" collapsible>
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p style={{ margin: 0, color: 'var(--bwo-text-body)' }}>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 8. Big CTA ───────────────────────── */

export function BigCTA() {
  return (
    <section className="shell shell-section">
      <Reveal direction="bottom" duration={1}>
        <div
          style={{
            position: 'relative',
            padding: 'clamp(48px, 8vw, 80px) clamp(24px, 5vw, 56px)',
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
            <p style={{ maxWidth: '46ch', margin: '0 auto 28px', color: 'rgba(255,255,255,0.75)' }}>
              72 primitives. Three frameworks. Zero runtime dependencies (GSAP is peer).
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
                npm i @bwo-ui/react
              </Button>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 9. Popover marquee bottom strip (small) ──── */

export function FrameworkStrip() {
  return (
    <section className="shell shell-section" style={{ paddingBlockEnd: 0 }}>
      <Reveal direction="bottom" duration={0.9}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            alignItems: 'center',
            paddingBottom: 56,
          }}
        >
          <Badge variant="soft">Three frameworks, one design</Badge>
          <div className="framework-pills">
            <FrameworkBadge label="React" tag="@bwo-ui/react" />
            <FrameworkBadge label="Vue 3" tag="@bwo-ui/vue" />
            <FrameworkBadge label="Svelte" tag="@bwo-ui/svelte" />
            <FrameworkBadge label="CLI" tag="@bwo-ui/cli" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FrameworkBadge({ label, tag }: { label: string; tag: string }) {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="framework-pill"
          aria-label={`${label} package`}
        >
          <span className="framework-pill-label">{label}</span>
          <span className="framework-pill-tag">{tag}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" style={{ width: 240 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600 }}>{label}</p>
        <code style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>{tag}</code>
      </PopoverContent>
    </PopoverRoot>
  );
}
