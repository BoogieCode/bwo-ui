# @bwo-ui/core

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

## 0.3.0

### Minor Changes

- Rewrite the React package from scratch — bwo-ui now owns every primitive. Zero external UI dependencies. 16 previously-wrapped components are reimplemented on top of a shared internal stack: `Portal`, `Presence`, `useControllable`, `useDismiss`, `useFocusTrap`, `useScrollLock`. Public APIs (component names, props, sub-components, namespaced exports) and CSS hooks (`data-state`, `data-orientation`, `data-disabled`, `data-highlighted`, `data-side`) are preserved.

  Adds 18 new components: Breadcrumb, Pagination, Stepper, Sheet, DropdownMenu, ContextMenu, Combobox, Command, Calendar, DatePicker, DataTable, Timeline, SimpleGrid, Grid, FloatingActionButton (FAB), BottomNavigation, Carousel, NumberInput.

  `@bwo-ui/core`: fix `UNUSED_EXTERNAL_IMPORT` warnings by removing the re-export of GSAP/plugins through `register.ts`; each effect now imports its plugins directly from `gsap`.

  Tagline updated to "Your shortcut to a beautiful UI."

## 0.2.1

### Patch Changes

- chore: point repository URLs at github.com/BoogieCode/bwo-ui so npm package pages link to the correct source.
