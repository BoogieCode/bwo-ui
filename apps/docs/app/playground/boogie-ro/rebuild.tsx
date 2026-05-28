'use client';

import {
  AppShell,
  Badge,
  BrandMark,
  Button,
  Card,
  CardCaption,
  CardEyebrow,
  CardMedia,
  CardName,
  CardTab,
  Glow,
  Lean,
  MediaZoom,
  Preanimate,
  PreanimateProvider,
  Pulse,
  Skeleton,
  Spin,
  SplitReveal,
  Stagger,
  Typewriter,
} from '@bwo-ui/react';

/**
 * Live rebuild of the boogie.ro homepage — every visible piece is a bwo-ui
 * primitive, no screenshots, no boogie-next imports.
 *
 *   Glow      — tri-color radial backdrop matching boogie.ro's body bg
 *   AppShell  — header + scroll + footer chrome (container-shell clone)
 *   Preanimate — per-component skeleton swap (in-DOM, occupies same space)
 *   Lean      — per-card resting tilt that snaps back on hover
 *   MediaZoom — image scales on tile hover
 *   Button variant="cta" — black pill CTA with icon badge + blue hover
 */
export function BoogieRoRebuild() {
  return (
    <PreanimateProvider duration={900}>
      <div className="brr-stage">
        <Glow x="90%" y="10%" base="var(--bwo-white)" />

        <AppShell
          maxWidth={900}
          header={<BrandHeader />}
          footer={
            <>
              <span>#dezvoltatăînRomânia</span>
              <span>· @bwo-ui/react</span>
            </>
          }
          contentId="brrContent"
          style={{ height: '100%', minHeight: 600, background: 'transparent' }}
        >
          <article className="brr">
            <HeroSection />
            <ShowcaseSection />
            <ServicesSection />
            <LogosSection />
            <CtaBand />
          </article>
        </AppShell>
      </div>
    </PreanimateProvider>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Brand header
// ──────────────────────────────────────────────────────────────────────────

function BrandHeader() {
  return (
    <>
      <BrandMark
        brand="BOOGIE"
        tld=".RO"
        href="/playground/boogie-ro"
      />
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <Button variant="ghost" size="sm" radius="sm">
          Ghid
        </Button>
        <Button variant="outline" size="sm" radius="sm">
          Login
        </Button>
        <Button variant="ghost" size="sm" radius="sm" aria-label="Open menu">
          <MenuIcon />
        </Button>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Boot screen — skeleton scaffold mirroring boogie-next's home-boot-screen
// ──────────────────────────────────────────────────────────────────────────

/**
 * 3-line skeleton occupying the exact space of the hero title. The widths
 * match boogie-next's title rhythm: short → long → medium.
 */
function TitleSkeleton() {
  return (
    <div className="brr-title-skel">
      <Skeleton height={56} style={{ width: 'min(58vw, 430px)' }} />
      <Skeleton height={56} style={{ width: 'min(68vw, 520px)' }} />
      <Skeleton height={56} style={{ width: 'min(60vw, 450px)' }} />
    </div>
  );
}

/**
 * 6-tile grid skeleton occupying the exact space of the project showcase.
 * Same 2-column layout, same 3:4 aspect, same tab strip below each tile.
 */
function ShowcaseSkeleton() {
  return (
    <div className="brr-grid brr-showcase-skel">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="brr-showcase-skel-card" key={i}>
          <Skeleton style={{ aspectRatio: '3 / 4', borderRadius: 0 }} />
          <div className="brr-showcase-skel-tab">
            <Skeleton height={8} style={{ width: '82%', marginBottom: 7 }} />
            <Skeleton height={8} style={{ width: '58%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero-typewriter" className="brr-section brr-hero">
      <p className="brr-eyebrow">Dacă ce îți dorești este un:</p>

      <Preanimate skeleton={<TitleSkeleton />} className="brr-title-stage">
        <Typewriter
          as="h1"
          className="brr-hero-title"
          lines={[
            { text: '· site tip 2010', strike: true },
            { text: '· site generic AI', strike: true },
            { text: '· site memorabil' },
          ]}
        />
      </Preanimate>

      <p className="brr-sub">Noi te putem ajuta!</p>

      <div className="brr-ctas">
        <Button variant="cta" iconBadge leftIcon={<PlayIcon />}>
          Vezi ghidul rapid
        </Button>
        <Button variant="cta" iconBadge leftIcon={<ShowcaseIcon />}>
          Prezentare
        </Button>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Project showcase — exact 2-col grid, with resting tilts
// ──────────────────────────────────────────────────────────────────────────

interface Tile {
  code: string;
  name: string;
  category: string;
  accent: string;
  state?: 'soon' | 'live';
  lean: number;
}

const TILES: Tile[] = [
  { code: 'BOOGIE 0001', name: 'Agency',  category: 'Studio · Light', accent: '#1a1b1e', state: 'live', lean: -1.2 },
  { code: 'BOOGIE 0002', name: 'Basalt',  category: 'Construction',   accent: '#d4e4f7', state: 'live', lean:  1.5 },
  { code: 'BOOGIE 0003', name: 'Silica',  category: 'Tech · Light',   accent: '#d4f0e8', state: 'live', lean:  0.8 },
  { code: 'BOOGIE 0004', name: 'Vintage', category: 'Fashion',        accent: '#f7e0d4', state: 'soon', lean: -1.8 },
  { code: 'BOOGIE 0005', name: 'Coral',   category: 'Beauty',         accent: '#f7e8f0', state: 'soon', lean:  1.0 },
];

function ShowcaseSection() {
  return (
    <section id="project-showcase" className="brr-section">
      {/* Cards cascade in 1.5s after the hero is ready — by then the
          typewriter is in its strikethrough phase and the cards land
          naturally as the last "· site memorabil" line settles. */}
      <Preanimate skeleton={<ShowcaseSkeleton />} delay={1500}>
        <Stagger
          stagger={0.07}
          from={{ y: 28, opacity: 0 }}
          duration={0.65}
          className="brr-grid"
        >
          {TILES.map((tile) => (
            <Lean key={tile.code} angle={tile.lean}>
              <ProjectCard tile={tile} />
            </Lean>
          ))}
          <Lean angle={-0.6}>
            <PromoTile />
          </Lean>
        </Stagger>
      </Preanimate>

      <a className="brr-more-link" href="#">
        Vezi mai multe
        <span className="brr-more-circle" aria-hidden>
          <ArrowIcon />
        </span>
      </a>
    </section>
  );
}

function ProjectCard({ tile }: { tile: Tile }) {
  return (
    <Card radius="light" pad="none" interactive={tile.state === 'live'}>
      <CardMedia aspect="3 / 4" style={{ background: tile.accent }}>
        <MediaZoom>
          {/* Faux preview swatch — replace with <img src=... /> when real thumbnails exist */}
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${tile.accent}, color-mix(in srgb, ${tile.accent} 70%, #000))`,
              opacity: 0.88,
            }}
          />
        </MediaZoom>
        {tile.state === 'soon' && (
          <div className="brr-tile-overlay">
            <Badge variant="solid" radius="pill" className="brr-soon-pill">
              <Pulse
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: 9999,
                  background: '#f59e0b',
                }}
              />
              În curând
            </Badge>
          </div>
        )}
      </CardMedia>
      <CardTab>
        <CardEyebrow>{tile.code}</CardEyebrow>
        <CardName>{tile.name}</CardName>
        <CardCaption>{tile.category}</CardCaption>
      </CardTab>
    </Card>
  );
}

function PromoTile() {
  const colors = [
    '#3b82f6', '#f59e0b', '#ef4444', '#10b981',
    '#8b5cf6', '#f97316', '#ec4899', '#06b6d4',
    '#84cc16', '#6366f1', '#14b8a6', '#e11d48',
  ];
  return (
    <Card radius="light" pad="none" className="brr-tile--promo">
      <CardMedia aspect="3 / 4" style={{ background: 'transparent' }}>
        <div className="brr-tile-swatch--dark">
          <Spin
            duration={9}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1l1.1 4.9L14 8l-4.9 1.1L8 15l-1.1-4.9L2 8l4.9-1.1L8 1Z"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
            </svg>
          </Spin>
          <div className="brr-promo-dots">
            {colors.map((c, i) => (
              <span key={i} style={{ background: c }} />
            ))}
          </div>
          <div className="brr-promo-body">
            <p className="brr-promo-num">30+</p>
            <p className="brr-promo-label">
              template-uri
              <br />
              în pregătire
            </p>
            <p className="brr-promo-sub">urmează curând</p>
          </div>
        </div>
      </CardMedia>
      <CardTab className="brr-tile-tab--dark">
        <CardEyebrow>BOOGIE STUDIO</CardEyebrow>
        <CardName>Mai multe în curând</CardName>
        <CardCaption>toate industriile</CardCaption>
      </CardTab>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Services
// ──────────────────────────────────────────────────────────────────────────

function ServicesSection() {
  const services = [
    { title: 'Site web complet',                tag: 'Web',    body: 'Design, copy, motion, deploy — totul gata de pus online.' },
    { title: 'AI care lucrează pentru tine',    tag: 'AI',     body: 'Boo, chat-ul nostru, scrie copy, sugerează layout-uri, salvează.' },
    { title: 'Branding & identitate',           tag: 'Design', body: 'Paletă, tipografie, ton — toate plecate din template-ul ales.' },
    { title: 'Hosting + domeniu',               tag: 'Infra',  body: 'Boogie te ia de mână până la live, fără DNS bătut din taste.' },
  ];
  return (
    <section id="services" className="brr-section">
      <h2 className="brr-h2">Ce facem</h2>
      <Stagger stagger={0.08} from={{ y: 24, opacity: 0 }} className="brr-services">
        {services.map((s) => (
          <Card key={s.title} radius="sm" interactive className="brr-service">
            <Badge variant="soft" radius="pill">
              {s.tag}
            </Badge>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </Card>
        ))}
      </Stagger>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Logos
// ──────────────────────────────────────────────────────────────────────────

function LogosSection() {
  const names = ['Lupul Politic', 'Capitala Olteniei', 'Băltăreț', 'Strugurel', 'Vinul Boom', 'Cinema 7'];
  return (
    <section id="logos-marquee" className="brr-section">
      <p className="brr-tiny">Ne încred:</p>
      <div className="brr-logos">
        {[...names, ...names].map((n, i) => (
          <span key={i} className="brr-logo-pill">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Final CTA band
// ──────────────────────────────────────────────────────────────────────────

function CtaBand() {
  return (
    <section id="cta-band" className="brr-section brr-cta">
      <SplitReveal as="h2" className="brr-cta-title" type="words" stagger={0.05}>
        Hai să facem ceva memorabil.
      </SplitReveal>
      <p className="brr-cta-sub">
        Alege un template, scrie tu sau lasă Boo să-l facă, plătești când e gata.
      </p>
      <div className="brr-ctas">
        <Button variant="cta" iconBadge leftIcon={<PlayIcon />}>
          Începe acum
        </Button>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Icons
// ──────────────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 1.8L9.2 6L3 10.2V1.8Z" fill="currentColor" />
    </svg>
  );
}
function ShowcaseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="1.5" y="2" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 10h3M6 8.5v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1 9L9 1M9 1H1M9 1V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="20" height="8" viewBox="0 0 24 8" fill="none" aria-hidden>
      <path d="M0 0H14V1.5H0V0Z" fill="currentColor" />
      <path d="M0 6H24V7.5H0V6Z" fill="currentColor" />
    </svg>
  );
}

