# bwo — Claude Code plugin

A Claude Code plugin that teaches Claude to install **Beautiful Web Objects** (`@bwo-ui`) into any project — a motion-first React / Vue / Svelte component kit shipped via shadcn-style copy-paste.

Docs: https://ui.boogie.ro

## Install

Inside Claude Code:

```
/plugin marketplace add BoogieCode/bwo-ui
/plugin install bwo@bwo-ui
```

Or install from a local clone of this repo (point the marketplace command at the cloned repo root — that's where `.claude-plugin/marketplace.json` lives):

```
git clone https://github.com/BoogieCode/bwo-ui
/plugin marketplace add ./bwo-ui
/plugin install bwo@bwo-ui
```

After install, run `/reload-plugins` (or restart Claude Code) to pick up the new skill.

## What you get

One skill: **`/bwo:add-beautiful-web-objects`** (also auto-invoked when Claude detects intent that matches the skill description).

When invoked, the skill:

1. Detects whether the project already has `bwo.json` — runs `npx @bwo-ui/cli init` if not.
2. Installs the framework adapter (`@bwo-ui/react` / `@bwo-ui/vue` / `@bwo-ui/svelte`), `@bwo-ui/core`, and the `gsap` peer dep.
3. Maps your request (e.g. "I need a date picker", "add a magnetic button") to one or more components from the catalogue.
4. Runs `npx @bwo-ui/cli add <names>` so the component sources land in your repo (CLI resolves internal deps automatically).
5. Ensures `@bwo-ui/core/styles.css` is imported once in your app entry.
6. Shows a minimal usage snippet using your actual import path.

## Why a plugin, not just a CLI

The `@bwo-ui/cli` already exists. The plugin layer adds:

- **Catalogue awareness** — Claude knows what's available without you scrolling docs
- **Intent matching** — "add a confirmation modal" maps to `dialog`, not a hand-rolled re-implementation
- **Post-install wiring** — stylesheet import + usage snippet without you asking
- **Stack respect** — the skill explicitly steps back when you're committed to a different kit

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
