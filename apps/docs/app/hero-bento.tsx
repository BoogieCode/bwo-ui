'use client';

import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Calendar,
  CountUp,
  DataTable,
  Grid,
  GridItem,
  Magnetic,
  Preanimate,
  PreanimateProvider,
  Progress,
  Skeleton,
  SplitReveal,
  Switch,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  type DataTableColumn,
} from '@bwo-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const INSTALL = 'npm i @bwo-ui/react';

const ACCENTS = [
  { name: 'red', value: '#ff481f' },
  { name: 'blue', value: '#7463ff' },
  { name: 'green', value: '#a0ff27' },
  { name: 'pink', value: '#ec6fd5' },
  { name: 'yellow', value: '#ffc446' },
];

interface TableRow {
  id: number;
  who: string;
  initials: string;
  role: string;
  status: 'live' | 'review' | 'idle';
}

const ROWS: TableRow[] = [
  { id: 1, who: 'Cris',  initials: 'CC', role: 'Lead',     status: 'live' },
  { id: 2, who: 'Anya',  initials: 'AT', role: 'Frontend', status: 'review' },
  { id: 3, who: 'Mike',  initials: 'MK', role: 'Backend',  status: 'idle' },
];

const COLS: DataTableColumn<TableRow>[] = [
  {
    id: 'who',
    header: 'Member',
    accessor: (r) => r.who,
    cell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Avatar size="sm" fallback={r.initials} />
        <span>{r.who}</span>
      </span>
    ),
  },
  { id: 'role', header: 'Role', accessor: (r) => r.role },
  {
    id: 'status',
    header: 'Status',
    accessor: (r) => r.status,
    align: 'right',
    cell: (r) => (
      <Badge
        variant={r.status === 'live' ? 'green' : r.status === 'review' ? 'yellow' : 'soft'}
        style={{ fontSize: 11 }}
      >
        {r.status}
      </Badge>
    ),
  },
];

function InstallCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
    } catch {
      // ignore — older browsers without clipboard API
    }
  };
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);
  return (
    <button
      type="button"
      className={`install-copy${copied ? ' is-copied' : ''}`}
      onClick={copy}
      aria-label="Copy install command"
    >
      <span className="install-copy-prefix">$</span>
      <span className="install-copy-cmd">{INSTALL}</span>
      <span className="install-copy-btn" aria-hidden>
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
            <path
              d="M5 15V6a2 2 0 012-2h9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

/* ─── Tile skeletons (match each tile's silhouette) ──────────────────────── */

function TileHead({ label, right }: { label?: string; right?: React.ReactNode }) {
  return (
    <div className="bento-row-top">
      <Skeleton width={label ? `${label.length * 7 + 6}px` : 60} height={11} />
      {right ?? <Skeleton width={42} height={18} />}
    </div>
  );
}

function StatSkeleton() {
  return (
    <>
      <TileHead label="Components" right={<Skeleton width={60} height={20} />} />
      <Skeleton width="50%" height={62} style={{ marginTop: 4 }} />
      <Skeleton width="92%" height={12} />
      <Skeleton width="78%" height={12} />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32, marginTop: 4 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={`${20 + (i * 4) % 80}%`} style={{ flex: 1 }} />
        ))}
      </div>
    </>
  );
}

function CalendarSkeleton() {
  return (
    <>
      <TileHead label="Calendar" right={null} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton width={20} height={20} circle />
          <Skeleton width={90} height={12} />
          <Skeleton width={20} height={20} circle />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            flex: 1,
          }}
        >
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} width="100%" height={22} />
          ))}
        </div>
      </div>
    </>
  );
}

function TeamSkeleton() {
  return (
    <>
      <TileHead label="Team" right={<Skeleton width={56} height={20} />} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginTop: 10,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            width={36}
            height={36}
            circle
            style={{ marginLeft: i === 0 ? 0 : -8 }}
          />
        ))}
      </div>
      <Skeleton width="65%" height={12} style={{ marginTop: 12 }} />
      <Skeleton width="40%" height={11} />
    </>
  );
}

function DataSkeleton() {
  return (
    <>
      <TileHead label="DataTable" right={null} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '4px 0',
              borderBottom: i < 3 ? '1px solid var(--bwo-border)' : 'none',
            }}
          >
            <Skeleton width={18} height={18} circle />
            <Skeleton width={`${30 + i * 6}%`} height={11} />
            <Skeleton width={40} height={16} style={{ marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
    </>
  );
}

function SettingsSkeleton() {
  return (
    <>
      <TileHead label="Settings" right={<Skeleton width={76} height={11} />} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
        {[104, 72, 88].map((w, i) => (
          <div
            key={i}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Skeleton width={w} height={12} />
            <Skeleton width={36} height={20} />
          </div>
        ))}
      </div>
    </>
  );
}

function ThemeSkeleton() {
  return (
    <>
      <TileHead label="Theme" right={<Skeleton width={88} height={11} />} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Skeleton width={26} height={26} circle />
        <Skeleton width={72} height={16} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width={22} height={22} circle />
        ))}
      </div>
    </>
  );
}

function ProgressSkeleton() {
  return (
    <>
      <TileHead label="Progress" right={<Skeleton width={48} height={11} />} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
        }}
      >
        <Skeleton width={72} height={72} circle />
      </div>
      <Skeleton width="60%" height={11} style={{ marginTop: 6 }} />
    </>
  );
}

function TabsSkeleton() {
  return (
    <>
      <TileHead label="Tabs" right={<Skeleton width={32} height={11} />} />
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        <Skeleton width={56} height={28} />
        <Skeleton width={56} height={28} />
        <Skeleton width={56} height={28} />
      </div>
      <Skeleton width="92%" height={11} style={{ marginTop: 10 }} />
      <Skeleton width="70%" height={11} />
    </>
  );
}

function AlertSkeleton() {
  return (
    <>
      <TileHead label="Alert" right={<Skeleton width={56} height={11} />} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <Skeleton width={28} height={28} circle />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton width="40%" height={12} />
          <Skeleton width="80%" height={11} />
        </div>
      </div>
    </>
  );
}

/* ─── Real tile content ─────────────────────────────────────────────────── */

function StatTile() {
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Components</span>
        <span className="bento-badge-live">
          <span className="bento-dot" /> v0.6.0
        </span>
      </div>
      <div className="bento-stat-number">
        <CountUp to={72} duration={1.8} />+
      </div>
      <p>
        Production primitives — forms, overlays, data, motion. All written from scratch.
        Zero external UI dependencies.
      </p>
      <div className="bento-sparkline" aria-hidden>
        {[2, 3, 4, 6, 8, 11, 14, 18, 23, 28, 33, 39, 44, 50, 55, 60, 64, 67, 70, 72].map(
          (h, i, arr) => (
            <span
              key={i}
              style={{
                height: `${(h / arr[arr.length - 1]!) * 100}%`,
                opacity: 0.35 + (i / (arr.length - 1)) * 0.65,
              }}
            />
          ),
        )}
      </div>
    </>
  );
}

function CalendarTile() {
  // Same hydration concern as the DatePicker tile — `new Date()` differs between
  // server render and client hydration, which would mismatch the highlighted cell.
  // Initialise to null and set after mount.
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Calendar</span>
      </div>
      <div className="bento-calendar-stage">
        <Calendar
          mode="single"
          value={date}
          onValueChange={(v) => setDate(v instanceof Date ? v : null)}
          hideWeekdays
        />
      </div>
    </>
  );
}

const TEAM = [
  { initials: 'AR', accent: '#ff481f' },
  { initials: 'MS', accent: '#7463ff' },
  { initials: 'IL', accent: '#16a34a' },
  { initials: 'CT', accent: '#0ea5e9' },
  { initials: 'DV', accent: '#ffc446' },
  { initials: 'AP', accent: '#a855f7' },
  { initials: 'EV', accent: '#ec4899' },
];

function TeamTile() {
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Team</span>
        <span className="bento-badge-live" style={{ background: 'rgba(116, 99, 255, 0.18)' }}>
          <span className="bento-dot" style={{ background: '#7463ff' }} /> 12 active
        </span>
      </div>
      <div className="bento-team-stack">
        <AvatarGroup max={4} size="md">
          {TEAM.map((p) => (
            <Avatar
              key={p.initials}
              fallback={p.initials}
              style={{ background: p.accent, color: '#fff' }}
            />
          ))}
        </AvatarGroup>
      </div>
      <p className="bento-team-caption">
        Avatar stacks with a built-in <code>+N</code> overflow pill — drop your team in.
      </p>
    </>
  );
}

function DataTile() {
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">DataTable</span>
      </div>
      <div className="bento-data-stage">
        <DataTable data={ROWS} columns={COLS} hoverable />
      </div>
    </>
  );
}

function SettingsTile() {
  const [notify, setNotify] = useState(true);
  const [auto, setAuto] = useState(false);
  const [marketing, setMarketing] = useState(true);
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Settings</span>
        <span className="bento-tag">Switch · Checkbox</span>
      </div>
      <div className="bento-forms-grid">
        <label className="bento-forms-row">
          <span>Push notifications</span>
          <Switch checked={notify} onCheckedChange={setNotify} />
        </label>
        <label className="bento-forms-row">
          <span>Auto-sync drafts</span>
          <Switch checked={auto} onCheckedChange={setAuto} />
        </label>
        <label className="bento-forms-row">
          <span>Marketing emails</span>
          <Switch checked={marketing} onCheckedChange={setMarketing} />
        </label>
      </div>
    </>
  );
}

function ProgressTile() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    // Tick up to 100 and stop. No restart loop — once the ring is full, it stays full.
    const id = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(id);
          return 100;
        }
        return v + 2;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Progress</span>
        <span className="bento-tag">Circular</span>
      </div>
      <div className="bento-progress-stage">
        <Progress shape="circular" size="lg" variant="primary" value={value}>
          {value}%
        </Progress>
      </div>
      <p className="bento-progress-caption">SVG ring with centred label.</p>
    </>
  );
}

function TabsTile() {
  const [tab, setTab] = useState('today');
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Tabs</span>
        <span className="bento-tag">Sorting</span>
      </div>
      <div className="bento-tabs-stage">
        <TabsRoot value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <div className="bento-tabs-body">
              <strong>14</strong> events &middot; <span>4 unread</span>
            </div>
          </TabsContent>
          <TabsContent value="week">
            <div className="bento-tabs-body">
              <strong>62</strong> events &middot; <span>11 unread</span>
            </div>
          </TabsContent>
          <TabsContent value="month">
            <div className="bento-tabs-body">
              <strong>248</strong> events &middot; <span>32 unread</span>
            </div>
          </TabsContent>
        </TabsRoot>
      </div>
    </>
  );
}

function HeroAlertTile() {
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Alert</span>
        <span className="bento-tag">In-flow message</span>
      </div>
      <div className="bento-alert-stage">
        <Alert variant="success" title="Plan upgraded" appearance="soft">
          Boogie Pro is live on your workspace. Unlimited builds.
        </Alert>
      </div>
    </>
  );
}

function ThemeTile() {
  const [active, setActive] = useState('red');
  const accentValue = ACCENTS.find((a) => a.name === active)?.value ?? '#ff481f';
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Theme</span>
        <code className="bento-token">--bwo-accent</code>
      </div>
      <div className="bento-theme-preview" style={{ color: accentValue }}>
        <span className="bento-theme-dot" style={{ background: accentValue }} />
        <span>{accentValue}</span>
      </div>
      <div className="bento-swatches">
        {ACCENTS.map((a) => (
          <button
            key={a.name}
            type="button"
            aria-label={`Theme ${a.name}`}
            className={`bento-swatch${active === a.name ? ' is-active' : ''}`}
            style={{ background: a.value }}
            onClick={() => setActive(a.name)}
          />
        ))}
      </div>
    </>
  );
}

/* ─── Top-of-hero skeletons (headline, sub, CTAs) ────────────────────────── */

function HeadlineSkeleton() {
  // Two large bars that mimic the two-line wrap of the headline.
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        margin: '0 auto 22px',
        maxWidth: 720,
      }}
    >
      <Skeleton width="78%" height="clamp(40px, 7.6vw, 90px)" />
      <Skeleton width="46%" height="clamp(40px, 7.6vw, 90px)" />
    </div>
  );
}

function SubSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        margin: '0 auto 32px',
        maxWidth: 560,
      }}
    >
      <Skeleton width="92%" height={14} />
      <Skeleton width="86%" height={14} />
      <Skeleton width="54%" height={14} />
    </div>
  );
}

function CtasSkeleton() {
  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 64,
      }}
    >
      <Skeleton width={280} height={46} style={{ borderRadius: 9999 }} />
      <Skeleton width={140} height={42} style={{ borderRadius: 9999 }} />
    </div>
  );
}

function HeroHeadline() {
  return (
    <SplitReveal
      as="h1"
      type="words,chars"
      stagger={0.012}
      duration={0.7}
      from={{ y: 40, opacity: 0 }}
    >
      Your shortcut to a beautiful <span className="accent">UI</span>.
    </SplitReveal>
  );
}

function HeroSub() {
  return (
    <p className="hero-bento-sub">
      72 production primitives. Three frameworks. One stylesheet. Owned end-to-end — no
      wrappers, no headless library underneath.
    </p>
  );
}

function HeroCtas() {
  return (
    <div className="hero-bento-ctas">
      <InstallCopy />
      <Magnetic strength={0.25} radius={120}>
        <Link href="/docs/introduction" className="hero-bento-cta-link">
          Read the docs →
        </Link>
      </Magnetic>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

export function HeroBento() {
  return (
    <section className="hero-bento shell">
      <div className="hero-bento-eyebrow">
        <span className="hero-bento-eyebrow-dot" />
        <span>
          v0.6.0 — every primitive owned end-to-end
        </span>
      </div>

      <PreanimateProvider duration={500}>
        <Preanimate skeleton={<HeadlineSkeleton />} delay={0}>
          <HeroHeadline />
        </Preanimate>

        <Preanimate skeleton={<SubSkeleton />} delay={120}>
          <HeroSub />
        </Preanimate>

        <Preanimate skeleton={<CtasSkeleton />} delay={220}>
          <HeroCtas />
        </Preanimate>

        <Grid
          templateAreas={[
            'stat stat theme',
            'team data theme',
            'cal progress tabs',
            'alert alert settings',
          ]}
          templateColumns="1fr 1fr 1fr"
          templateRows="220px 180px 220px 160px"
          gap={14}
          className="hero-bento-grid"
        >
          <GridItem area="stat">
            <Preanimate
              className="bento-tile bento-tile--stat"
              skeleton={<StatSkeleton />}
              delay={320}
            >
              <StatTile />
            </Preanimate>
          </GridItem>
          <GridItem area="theme">
            <Preanimate
              className="bento-tile bento-tile--theme"
              skeleton={<ThemeSkeleton />}
              delay={380}
            >
              <ThemeTile />
            </Preanimate>
          </GridItem>
          <GridItem area="team">
            <Preanimate
              className="bento-tile bento-tile--team"
              skeleton={<TeamSkeleton />}
              delay={440}
            >
              <TeamTile />
            </Preanimate>
          </GridItem>
          <GridItem area="data">
            <Preanimate
              className="bento-tile bento-tile--data"
              skeleton={<DataSkeleton />}
              delay={500}
            >
              <DataTile />
            </Preanimate>
          </GridItem>
          <GridItem area="cal">
            <Preanimate
              className="bento-tile bento-tile--cal"
              skeleton={<CalendarSkeleton />}
              delay={560}
            >
              <CalendarTile />
            </Preanimate>
          </GridItem>
          <GridItem area="progress">
            <Preanimate
              className="bento-tile bento-tile--progress"
              skeleton={<ProgressSkeleton />}
              delay={600}
            >
              <ProgressTile />
            </Preanimate>
          </GridItem>
          <GridItem area="tabs">
            <Preanimate
              className="bento-tile bento-tile--tabs"
              skeleton={<TabsSkeleton />}
              delay={640}
            >
              <TabsTile />
            </Preanimate>
          </GridItem>
          <GridItem area="alert">
            <Preanimate
              className="bento-tile bento-tile--alert"
              skeleton={<AlertSkeleton />}
              delay={680}
            >
              <HeroAlertTile />
            </Preanimate>
          </GridItem>
          <GridItem area="settings">
            <Preanimate
              className="bento-tile bento-tile--forms"
              skeleton={<SettingsSkeleton />}
              delay={720}
            >
              <SettingsTile />
            </Preanimate>
          </GridItem>
        </Grid>
      </PreanimateProvider>
    </section>
  );
}
