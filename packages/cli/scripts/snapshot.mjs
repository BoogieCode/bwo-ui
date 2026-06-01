#!/usr/bin/env node
/**
 * Snapshot script — runs as part of `pnpm build` in @bwo-ui/cli.
 *
 * Reads every component source file from packages/react/src/*, parses imports
 * to find local dependencies (./internal/*, sibling components), and writes:
 *
 *   packages/cli/snapshot/files/<rel>           — verbatim source copies
 *   packages/cli/snapshot/registry.json         — { files: { rel → { deps } },
 *                                                   components: { kebab → { file, exports } } }
 *
 * The CLI reads these at runtime to know what to copy into a user's project.
 */

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, '..');
const SRC = resolve(__dirname, '../../react/src');
const OUT = resolve(PKG_ROOT, 'snapshot');

async function walk(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    const rel = (base ? `${base}/${entry.name}` : entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      out.push(...(await walk(full, rel)));
    } else if (/\.tsx?$/.test(entry.name)) {
      out.push({ full, rel });
    }
  }
  return out;
}

function parseImports(source) {
  const re = /import\s+(?:type\s+)?(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const found = [];
  let m;
  while ((m = re.exec(source))) found.push(m[1]);
  // also catch `export { x } from 'foo'`
  const re2 = /export\s+\*?\s*(?:\{[^}]*\}\s+)?from\s+['"]([^'"]+)['"]/g;
  while ((m = re2.exec(source))) found.push(m[1]);
  return [...new Set(found)];
}

function resolveLocal(spec, fromRel, allFiles) {
  if (!spec.startsWith('.')) return null;
  const fromDir = dirname(fromRel);
  let resolved = join(fromDir, spec).replace(/\\/g, '/');
  resolved = resolved.replace(/^\.\//, '');
  const candidates = [`${resolved}.ts`, `${resolved}.tsx`, `${resolved}/index.ts`, `${resolved}/index.tsx`];
  for (const c of candidates) {
    if (allFiles.has(c)) return c;
  }
  return null;
}

function kebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(join(OUT, 'files'), { recursive: true });

  const files = await walk(SRC);
  const allRels = new Set(files.map((f) => f.rel));

  const fileEntries = {};
  for (const { full, rel } of files) {
    const body = await readFile(full, 'utf8');
    const imports = parseImports(body);
    const deps = [];
    for (const imp of imports) {
      const local = resolveLocal(imp, rel, allRels);
      if (local && local !== rel) deps.push(local);
    }
    fileEntries[rel] = { deps: [...new Set(deps)] };
    const outPath = join(OUT, 'files', rel);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, body);
  }

  // Build the components map (excluding internals + index)
  const components = {};
  for (const rel of Object.keys(fileEntries)) {
    if (rel === 'index.ts' || rel === 'utils.ts') continue;
    if (rel.startsWith('internal/')) continue;
    if (rel.startsWith('use-')) continue;
    const base = basename(rel, extname(rel));
    components[kebab(base)] = { file: rel, name: base };
  }

  await writeFile(
    join(OUT, 'registry.json'),
    JSON.stringify({ files: fileEntries, components }, null, 2),
  );

  console.log(
    `✓ Snapshot: ${Object.keys(components).length} components, ${Object.keys(fileEntries).length} source files`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
