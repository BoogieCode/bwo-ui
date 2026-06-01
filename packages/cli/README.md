# @bwo-ui/cli

Copy bwo-ui component source straight into your project. No runtime dep, you own the code.

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

`bwo add <name>` looks up the component in the bundled snapshot, resolves its
internal dependencies (e.g. `Dialog` pulls in `internal/portal`,
`internal/presence`, `internal/use-controllable`, `internal/use-dismiss`,
`internal/use-focus-trap`, `internal/scroll-lock`), and writes every file into
your configured `componentsDir`, preserving the relative folder structure so
existing imports keep working.

After install, the files belong to your repo — fork, tweak, restyle, delete what
you don't need. There's no `@bwo-ui/react` runtime dep.

## Styles

Components reference CSS classes (`bwo-button`, `bwo-dialog-overlay`, etc.)
that live in `@bwo-ui/core/styles.css`. Import it once in your app:

```ts
import '@bwo-ui/core/styles.css';
```

Or copy that file into your project too and detach completely.

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
