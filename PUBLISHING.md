# Publishing bwo-ui

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing. All four packages are kept on the same version (see `fixed` in `.changeset/config.json`).

## One-time setup

### 1. Register the npm scope

You need an npm account and the `@bwo-ui` scope. The scope is free as long as packages stay public.

```bash
# Log in once
npm login

# Register the scope (only required the first time)
npm access list packages || true   # noop, just confirms login

# Optional: create an org for the scope
# (npm scopes can also belong to a personal account — `bwo-ui` would simply be
#  reserved by your first publish under `@bwo-ui/…`)
```

If the `@bwo-ui` scope is already taken on npm, you'll need to either:

- Rename to a different scope across all four `package.json` files and the docs/links, or
- Publish under your username scope (`@<yourname>/bwo-ui-core` etc.)

### 2. Add NPM_TOKEN as a repo secret (when you wire up CI)

For CI publishing, generate an automation token from npmjs.com → Access Tokens → Generate New Token → Automation, then add it as `NPM_TOKEN` in your GitHub repo secrets.

## Releasing locally

```bash
# 1. Describe what changed (creates a markdown file under .changeset/)
pnpm changeset

# 2. Apply the changesets — bumps versions and writes CHANGELOGs
pnpm version-packages

# 3. Build + publish to npm
pnpm release
```

The `release` script runs `turbo run build --filter=./packages/*` first to ensure every package is freshly built before publish.

## Dry-run a single package

To inspect what would be published without actually publishing:

```bash
cd packages/core
npm pack --dry-run
```

This prints the file list and a tarball summary.

## Versioning policy

- All four packages move together (configured under `fixed` in `.changeset/config.json`).
- Use `patch` for bug fixes, `minor` for new features, `major` for breaking API changes.
- The docs app (`apps/docs`) is excluded from publishing (see `ignore` in `.changeset/config.json`).

## What gets shipped

Only `dist/` and `README.md` from each package — controlled by the `files` field in each `package.json`. Source files are not published.
