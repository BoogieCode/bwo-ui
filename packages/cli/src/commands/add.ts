import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { readConfig, type BwoConfig } from '../util/config';
import { c, log } from '../util/log';
import { confirm } from '../util/prompt';
import { componentNames, loadFile, loadRegistry, resolveAllDeps } from '../util/registry';

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const prev = new Array(n + 1);
  const curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

function suggestSimilar(name: string, all: string[]): string[] {
  const lower = name.toLowerCase();
  const scored = all
    .map((n) => ({ n, d: editDistance(lower, n) }))
    .filter((x) => x.d <= Math.max(2, Math.floor(lower.length / 3)))
    .sort((a, b) => a.d - b.d);
  return scored.slice(0, 5).map((s) => s.n);
}

function targetFor(rel: string, config: BwoConfig): string {
  // Optionally convert .tsx → .jsx / .ts → .js when typescript is off.
  if (config.typescript) return rel;
  return rel.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
}

export async function runAdd(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      yes: { type: 'boolean', short: 'y' },
      overwrite: { type: 'boolean', short: 'o' },
      dry: { type: 'boolean' },
      cwd: { type: 'string' },
    },
    allowPositionals: true,
    strict: false,
  });

  const cwd = (values.cwd as string) ? resolve(values.cwd as string) : process.cwd();
  const config = await readConfig(cwd);
  if (!config) {
    log.error('No bwo.json found. Run `bwo init` first.');
    process.exit(1);
  }

  const names = positionals;
  if (names.length === 0) {
    log.error('Specify at least one component. Try: `bwo add button`');
    process.exit(1);
  }

  const registry = await loadRegistry();
  const allNames = componentNames(registry);

  // Resolve each requested name to a starting file; collect all deps across them.
  const filesToWrite = new Set<string>();
  for (const name of names) {
    const entry = registry.components[name.toLowerCase()];
    if (!entry) {
      log.error(`Unknown component: ${c.bold(name)}`);
      const similar = suggestSimilar(name, allNames);
      if (similar.length > 0) {
        log.info(`Did you mean: ${similar.map((s) => c.cyan(s)).join(', ')}?`);
      }
      process.exit(1);
    }
    for (const f of resolveAllDeps(registry, entry.file)) filesToWrite.add(f);
  }

  // Plan output
  const outDir = resolve(cwd, config.componentsDir);
  const plan: Array<{ rel: string; out: string; exists: boolean }> = [];
  for (const rel of filesToWrite) {
    const out = join(outDir, targetFor(rel, config));
    plan.push({ rel, out, exists: await fileExists(out) });
  }

  // Show plan
  log.blank();
  log.info(`${c.bold(`Adding ${names.length} component(s):`)} ${names.map(c.cyan).join(', ')}`);
  log.info(`${c.gray('Resolving')} → ${plan.length} files`);
  log.blank();
  for (const { rel, exists } of plan) {
    const status = exists ? c.yellow('overwrite') : c.green('new      ');
    log.info(`  ${status}  ${c.gray(config.componentsDir)}/${rel}`);
  }
  log.blank();

  if (values.dry) {
    log.info('(dry run — nothing written)');
    return;
  }

  // Confirm overwrites
  const overwrites = plan.filter((p) => p.exists);
  if (overwrites.length > 0 && !values.overwrite && !values.yes) {
    const ok = await confirm(
      `${overwrites.length} file(s) will be overwritten. Continue?`,
      false,
    );
    if (!ok) {
      log.info('Aborted.');
      return;
    }
  }

  // Write
  for (const { rel, out, exists } of plan) {
    const body = await loadFile(rel);
    if (exists && !values.overwrite && !values.yes && overwrites.length === 0) {
      continue; // shouldn't reach but defensive
    }
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, body, 'utf8');
  }

  log.blank();
  log.success(`Wrote ${plan.length} file(s) to ${c.cyan(config.componentsDir)}`);
  log.info(`  ${c.gray('then make sure your app imports:')} ${c.cyan(config.styles)}`);
}
