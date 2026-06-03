# @bwo-ui/cli

Copy bwo-ui component source straight into your repo — no runtime dependency, you own the code from day one. Ships the full primitive catalogue (Dialog, Popover, Combobox, DataTable, Calendar, Toast, plus the GSAP-backed motion kit) with TypeScript types and internal helpers resolved automatically.

Same workflow you know from shadcn-style installers, except the primitives are written in-house and the motion comes with them.

**Live demos**: [https://ui.boogie.ro](https://ui.boogie.ro)

## Quick start

```bash
# one-time setup
npx @bwo-ui/cli init
# or: pnpm dlx @bwo-ui/cli init
# or: yarn dlx @bwo-ui/cli init
# or: bunx     @bwo-ui/cli init

# add components — copies the source + all internal deps
npx @bwo-ui/cli add button
npx @bwo-ui/cli add dialog calendar combobox

# see everything available
npx @bwo-ui/cli list
```

## How it works

`bwo init` creates a `bwo.json` config:

```json
{
  "componentsDir": "components/ui",
  "typescript": true,
  "styles": "@bwo-ui/core/styles.css"
}
```

`bwo add <name>` looks up the component in the bundled snapshot, resolves every internal dependency it needs (e.g. `Dialog` pulls in `internal/portal`, `internal/presence`, `internal/use-controllable`, `internal/use-dismiss`, `internal/use-focus-trap`, `internal/scroll-lock`), and writes every file into your configured `componentsDir`, preserving the relative folder structure so existing imports keep working.

After install, the files belong to your repo — fork, tweak, restyle, delete what you don't need. There's no `@bwo-ui/react` runtime dependency.

## Catalogue

Every component on the [docs site](https://ui.boogie.ro) is available via `bwo add`. Groups:

- **Layout & display** — AppShell, Container, AspectRatio, Card, Button, IconButton, Badge, Chip, Avatar, Kbd, Code, Stat, Skeleton, Progress, Alert, Banner, Empty, Spinner, DotLoader, Timeline, …
- **Forms** — Input, Textarea, NumberInput, PasswordInput, PinInput, TagInput, Select, Combobox, Checkbox, RadioGroup, Switch, Slider, Rate, ColorPicker, FileUpload, Calendar, DatePicker, TimePicker
- **Overlays** — Dialog, Sheet, Popover, HoverCard, Tooltip, Toast, DropdownMenu, ContextMenu, Portal
- **Navigation** — Tabs, SegmentedControl, Accordion, Collapsible, Breadcrumb, Pagination, BottomNavigation, Carousel, StepIndicator, Stepper, Command
- **Data** — DataTable, Command
- **Motion** — SplitReveal, Reveal, ScrollReveal, Blur, Stagger, ScrollProgress, ScrollMask, ScrollVelocity, ScrollSnap, CircleReveal, PageIris, Parallax, Pin, Typewriter, ScrambleText, TextDecode, TextShimmer, TextGlitch, GradientText, CountUp, Spin, Pulse, Shake, Confetti, Marquee, FlipList, Magnetic, MagneticCursor, Tilt, Lean, Spotlight, Ripple, MediaZoom, Squircle, Preanimate, BootScreen

## Styles

Components reference CSS classes (`bwo-button`, `bwo-dialog-overlay`, etc.) that live in `@bwo-ui/core/styles.css`. Import it once in your app:

```ts
import '@bwo-ui/core/styles.css';
```

Or copy that file into your project too and detach completely from npm.

## Examples

```bash
# Non-interactive init with custom paths
bwo init --yes --components-dir src/components/ui

# Preview without writing
bwo add data-table --dry

# Force-overwrite existing files
bwo add button --overwrite
```

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
