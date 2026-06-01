'use client';

import {
  Avatar,
  Badge,
  Calendar,
  CountUp,
  DataTable,
  Grid,
  GridItem,
  Magnetic,
  Preanimate,
  PreanimateProvider,
  Skeleton,
  Slider,
  SplitReveal,
  Switch,
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

function CmdSkeleton() {
  return (
    <>
      <TileHead label="Command" right={<Skeleton width={32} height={20} />} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}
          >
            <Skeleton width={14} height={14} circle />
            <Skeleton width={`${65 - i * 12}%`} height={12} />
            <Skeleton width={18} height={14} style={{ marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
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

function FormsSkeleton() {
  return (
    <>
      <TileHead label="Forms" right={<Skeleton width={86} height={11} />} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton width={104} height={12} />
          <Skeleton width={36} height={20} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton width={72} height={12} />
          <Skeleton width={36} height={20} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton width={56} height={12} />
            <Skeleton width={30} height={11} />
          </div>
          <Skeleton width="100%" height={6} />
        </div>
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

/* ─── Real tile content ─────────────────────────────────────────────────── */

function StatTile() {
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Components</span>
        <span className="bento-badge-live">
          <span className="bento-dot" /> v0.3.0
        </span>
      </div>
      <div className="bento-stat-number">
        <CountUp to={48} duration={1.8} />+
      </div>
      <p>
        Production primitives — forms, overlays, data, motion. All written from scratch.
        Zero external UI dependencies.
      </p>
      <div className="bento-sparkline" aria-hidden>
        {[3, 5, 4, 7, 6, 9, 8, 11, 10, 14, 13, 17, 16, 20, 22, 27, 30, 35, 41, 48].map((h, i) => (
          <span key={i} style={{ height: `${(h / 50) * 100}%`, opacity: 0.3 + (i / 20) * 0.7 }} />
        ))}
      </div>
    </>
  );
}

function CalendarTile() {
  const [date, setDate] = useState<Date | null>(new Date());
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

function CmdTile() {
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Command</span>
        <kbd className="bento-kbd">⌘K</kbd>
      </div>
      <div className="bento-cmd-rows">
        <div className="bento-cmd-row is-active">
          <span className="bento-cmd-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          New project
          <span className="bento-cmd-meta">N</span>
        </div>
        <div className="bento-cmd-row">
          <span className="bento-cmd-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M19 19l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          Search docs
          <span className="bento-cmd-meta">/</span>
        </div>
        <div className="bento-cmd-row">
          <span className="bento-cmd-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12c2-5 7-5 9 0s7 5 9 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Toggle theme
          <span className="bento-cmd-meta">T</span>
        </div>
      </div>
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

function FormsTile() {
  const [vol, setVol] = useState([72]);
  const [notify, setNotify] = useState(true);
  const [auto, setAuto] = useState(false);
  return (
    <>
      <div className="bento-row-top">
        <span className="bento-eyebrow">Forms</span>
        <span className="bento-tag">Switch · Slider</span>
      </div>
      <div className="bento-forms-grid">
        <label className="bento-forms-row">
          <span>Notifications</span>
          <Switch checked={notify} onCheckedChange={setNotify} />
        </label>
        <label className="bento-forms-row">
          <span>Auto-sync</span>
          <Switch checked={auto} onCheckedChange={setAuto} />
        </label>
        <div className="bento-forms-slider">
          <div className="bento-forms-slider-head">
            <span>Volume</span>
            <span className="bento-forms-slider-val">{vol[0]}%</span>
          </div>
          <Slider value={vol} onValueChange={setVol} min={0} max={100} />
        </div>
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
      48 production primitives. Three frameworks. One stylesheet. Owned end-to-end — no
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
          v0.3.0 — every primitive owned end-to-end
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
            'stat stat cal',
            'cmd  data cal',
            'forms forms theme',
          ]}
          templateColumns="1fr 1fr 1fr"
          templateRows="220px 200px 180px"
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
          <GridItem area="cal">
            <Preanimate
              className="bento-tile bento-tile--cal"
              skeleton={<CalendarSkeleton />}
              delay={380}
            >
              <CalendarTile />
            </Preanimate>
          </GridItem>
          <GridItem area="cmd">
            <Preanimate
              className="bento-tile bento-tile--cmd"
              skeleton={<CmdSkeleton />}
              delay={440}
            >
              <CmdTile />
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
          <GridItem area="forms">
            <Preanimate
              className="bento-tile bento-tile--forms"
              skeleton={<FormsSkeleton />}
              delay={560}
            >
              <FormsTile />
            </Preanimate>
          </GridItem>
          <GridItem area="theme">
            <Preanimate
              className="bento-tile bento-tile--theme"
              skeleton={<ThemeSkeleton />}
              delay={620}
            >
              <ThemeTile />
            </Preanimate>
          </GridItem>
        </Grid>
      </PreanimateProvider>
    </section>
  );
}
