# @bwo-ui/vue

## 0.7.1

### Patch Changes

- Updated dependencies
  - @bwo-ui/core@0.7.1

## 0.5.0

### Minor Changes

- # 0.5.0 — component depth pass + bento docs overhaul

  A wide sweep across the kit: every "display" primitive now ships with the variant / size / tone axes a serious UI library needs, the docs site got 13 comprehensive component pages (with full props tables, recipes, and a11y notes), and several latent bugs were squashed (Popover infinite update loop, Timeline broken connector lines, Select listbox behind dialog, hydration mismatch on dates).

  ## New components / features

  - **AvatarGroup** with `max`, cascading `size` / `shape`, `+N` overflow pill, and a hover-lift micro-interaction.
  - **StatGroup** companion to Stat, with optional `divided` vertical separators.
  - **Dialog.Header / Dialog.Footer** subcomponents — matches Card's anatomy. Dialog also got `size: 'sm' | 'md' | 'lg' | 'xl' | 'full'`, `position: 'center' | 'top'`, `unpadded`, `closeOnOverlayClick`, `closeOnEscape`.
  - **Stat delta indicator** — `delta` / `deltaSuffix` / `deltaLabel` / `goodWhen: 'up' | 'down'` plus auto-coloured ▲ ▼ → arrows.
  - **Progress** got `variant`, `size`, `shape: 'linear' | 'circular'`, `striped`, `radius` and a working **indeterminate animation** (was emitting `data-state="indeterminate"` with no CSS behind it).
  - **Separator** got `variant: 'solid' | 'dashed' | 'dotted'`, `size`, `tone`, `spacing`, plus a labelled mode (`label`, `labelAlign`) with auto-ARIA flip.
  - **Skeleton** got `variant: 'rect' | 'circle' | 'text'`, `animation: 'shimmer' | 'pulse' | 'none'`, `lines` (auto-shortened last line), and respects `prefers-reduced-motion` at the CSS layer.
  - **Badge** got `size: 'sm' | 'md' | 'lg'` and `dot` (status indicator) — paired with `currentColor` so the dot inherits the variant.
  - **IconButton** brought to parity with Button (`primary` / `green` / `yellow` / `ghost` / `outline` / `solid`).
  - **Alert** got `appearance: 'soft' | 'solid' | 'outline'`, `actions`, smart ARIA (status / alert) based on urgency, and `Alert.Header` / `Alert.Footer`. Vue Alert's `'danger'` renamed to `'error'` (parity).
  - **Blur** factory got `direction: 'in' | 'out'`, `intensity: 'subtle' | 'medium' | 'strong'` shorthand, and respects `prefers-reduced-motion`.
  - **Timeline** rebuilt with a `::before` pseudo-element connector so the line is continuous from one marker to the next (no padding-gap break). Added `size`, `connectorStyle`, `align`, and a pulsing active marker.
  - **Avatar** sizes expanded to `xs / sm / md / lg / xl` and got `shape: 'circle' | 'rounded' | 'square'`.
  - **Card** is now a flex column with `margin-top: auto` on `CardFooter` — pricing rows and stat grids auto-align without extra wrappers.

  ## Critical bug fixes

  - **Popover infinite update loop** — `PopoverTrigger.setRef` read `anchorEl` from closure; React's ref-swap (old(null) + new(el)) had the stale closure null the state right after the new one set it, looping forever. Replaced with a `useRef` guard.
  - **Nested floating UI dismissal** — clicking a Select item or Popover inside a Dialog was dismissing the Dialog because the listbox is portaled out of the Dialog's DOM subtree. `useDismiss` now skips clicks landing inside any element with `[data-bwo-floating]`. Every portaled overlay (Select / Popover / Tooltip / Dropdown / Combobox / Toast) opts in.
  - **Select listbox stacking** — was `z-index: 50`, below the Dialog content's `z-index: 51`. Bumped to `z-index: 60` (matches the rest of the floating UI tier).
  - **Timeline connector breaks** — the inline `.bwo-timeline-connector` div ended at the item's content edge, leaving a `padding-bottom` gap before the next marker. Refactored to a `::before` pseudo-element that spans marker-bottom to item-bottom (the next marker's top). Lines are now continuous edge-to-edge.
  - **Vue Alert drift fixed** — Vue Alert was missing `icon`, `onDismiss`, `radius`, `appearance`, `actions`, used `'danger'` instead of `'error'`, and never applied the urgent-vs-polite ARIA logic. Brought to full React parity. Note: **`variant="danger"` → `variant="error"` is a breaking rename** in Vue.

  ## Docs overhaul

  Comprehensive rewrites for 13 component pages — each now has structured demos, recipes, props tables, and accessibility notes:
  Alert, Avatar (+ AvatarGroup), Badge, Blur, Button, Card, Dialog, IconButton, Progress, Separator, Skeleton, Stat (+ StatGroup), Timeline.

  Homepage redesigned: 9-tile irregular hero bento, expanded 12-tile component gallery with blur-into-focus reveal, new FAQ + Framework strip sections, constant 24 px lateral gutter on every viewport, dark-mode polish across inline code and pre blocks.

### Patch Changes

- Updated dependencies
  - @bwo-ui/core@0.5.0

## 0.4.0

### Minor Changes

- ## New components

  - **`Rate`** — Star rating with half-step support, four built-in symbols (`star` / `heart` / `thumb` / `bolt`), custom icon slot, size + color presets, keyboard nav. React + Vue.

  ## New Select modes

  - **`multiple`** — Items toggle on click, listbox stays open, footer shows count + clear-all, hidden inputs emitted as `name[]` for form submission.
  - **`searchable`** — Filter input renders at the top of the listbox, items auto-hide when their string children (or new `searchText` prop) don't match the query. Composes with `multiple`.
  - New `formatMultiple` prop on `SelectValue` for customizing how the trigger renders multi-select state (default: comma-joined labels).

  ## New `@bwo-ui/cli` package

  Copy bwo-ui component source straight into a user's project — no runtime dep, they own the code. Three commands:

  - `bwo init` — interactive setup, writes `bwo.json`
  - `bwo add <name>` — resolves a component + its transitive internal dependencies (e.g. `dialog` pulls in `internal/portal`, `internal/presence`, `internal/use-dismiss`, …) and writes them under the configured `componentsDir`
  - `bwo list` — three-column listing of every available component

  Zero runtime deps (only Node built-ins). Includes Levenshtein "did you mean?" on typos and a `--dry` flag for previewing.

  ## Vue parity (~80% of React surface)

  40 new/rewritten Vue components and 7 shared internal helpers (`Portal`, `useControllable`, `useDismiss`, `useFocusTrap`, `useScrollLock`, `floating`, `date`). Dropped `reka-ui` from `dependencies` — Vue now also owns its primitives end-to-end.

  Ported: Avatar, Skeleton, Progress, Alert, Stat, Separator, FormField, AppShell + BrandMark, Reveal, CountUp, TextGlitch, Spin/Pulse, Glow, Lean, MediaZoom, Breadcrumb, Pagination, Stepper, Timeline, SimpleGrid, Grid + GridItem, FAB, BottomNavigation, Carousel, NumberInput, Rate, Checkbox, Switch, Slider, RadioGroup, Select, Dialog, Popover, Tooltip, Sheet, Tabs, Accordion.

  ## Component additions

  - **`AppShell.align`** — `'left' | 'center' | 'right'`, default `'center'`. Controls horizontal placement within the parent. React + Vue.

  ## Bug fixes

  - **Critical Select bug** — listbox stayed at `visibility: hidden` because `useFloatingSize` / `useAnchorRect` used a `RefObject` that wasn't reactive to `.current` being set after the portaled listbox mounted. Refactored both hooks to accept the DOM element directly via state-backed callback refs; all callers (Select, Popover, Tooltip, Combobox, DropdownMenu, ContextMenu) updated.
  - **`undefined48undefined` bug across 17 GSAP effects** — `{ ...DEFAULTS, ...options }` let an `undefined` option override an empty-string default, producing the literal text "undefined" in count-up output and equivalent breakage elsewhere. Replaced with a `mergeOptions` helper that skips `undefined` overrides.
  - **`SelectValue` showed placeholder when `defaultValue` was set** — labels were registered into a mutable `useRef` Map that never triggered re-renders. Now state-backed.

  ## Docs / homepage

  - New tabbed install widget (`InstallTabs`) with npm / pnpm / yarn / bun across the installation page; remembers the user's choice in `localStorage`. READMEs default to `npm i` with the other three listed as alternates.
  - Homepage redesigned as a Bento layout (built with the library's own `Grid` + `GridItem`) — Stat / Calendar / Command / DataTable / Forms / Theme tiles, each gated behind `<Preanimate>` with bespoke skeleton placeholders and a staggered cascade reveal.
  - Headline, subhead, and CTAs also wrapped in `<Preanimate>` so `SplitReveal` fires fresh on swap.
  - 8 docs Usage code blocks updated so they reflect what the demo above actually renders (Button, Badge, Alert, Accordion, Dialog, RadioGroup, Select, Tabs).
  - Glow demo replaced (dark `#0c0c12` base, bright tri-color blobs, hero copy on top) — old version was invisible against the docs' own gradient.
  - SimpleGrid demo cards now properly centered (flex centering, equal track heights).
  - Every remaining mention of "Radix" / "Reka UI" scrubbed from CSS, CHANGELOGs, READMEs, docs pages.
  - Tagline: "Your shortcut to a beautiful UI."

### Patch Changes

- Updated dependencies
  - @bwo-ui/core@0.4.0

## 0.3.0

### Minor Changes

- Rewrite the React package from scratch — bwo-ui now owns every primitive. Zero external UI dependencies. 16 previously-wrapped components are reimplemented on top of a shared internal stack: `Portal`, `Presence`, `useControllable`, `useDismiss`, `useFocusTrap`, `useScrollLock`. Public APIs (component names, props, sub-components, namespaced exports) and CSS hooks (`data-state`, `data-orientation`, `data-disabled`, `data-highlighted`, `data-side`) are preserved.

  Adds 18 new components: Breadcrumb, Pagination, Stepper, Sheet, DropdownMenu, ContextMenu, Combobox, Command, Calendar, DatePicker, DataTable, Timeline, SimpleGrid, Grid, FloatingActionButton (FAB), BottomNavigation, Carousel, NumberInput.

  `@bwo-ui/core`: fix `UNUSED_EXTERNAL_IMPORT` warnings by removing the re-export of GSAP/plugins through `register.ts`; each effect now imports its plugins directly from `gsap`.

  Tagline updated to "Your shortcut to a beautiful UI."

### Patch Changes

- Updated dependencies
  - @bwo-ui/core@0.3.0

## 0.2.1

### Patch Changes

- chore: point repository URLs at github.com/BoogieCode/bwo-ui so npm package pages link to the correct source.
- Updated dependencies
  - @bwo-ui/core@0.2.1
