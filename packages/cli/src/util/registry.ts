import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface RegistryFile {
  deps: string[];
}

export interface RegistryComponent {
  file: string;
  name: string;
}

export interface Registry {
  files: Record<string, RegistryFile>;
  components: Record<string, RegistryComponent>;
}

let cached: Registry | null = null;

/** Where the bundled snapshot lives once @bwo-ui/cli is installed. */
export function snapshotRoot(): string {
  // __dirname at runtime is <pkg>/dist — snapshot sits one level up.
  return join(__dirname, '..', 'snapshot');
}

export async function loadRegistry(): Promise<Registry> {
  if (cached) return cached;
  const path = join(snapshotRoot(), 'registry.json');
  const raw = await readFile(path, 'utf8');
  cached = JSON.parse(raw) as Registry;
  return cached;
}

export async function loadFile(rel: string): Promise<string> {
  return readFile(join(snapshotRoot(), 'files', rel), 'utf8');
}

/**
 * Resolve a component to the full list of files (component + transitive deps)
 * that need to land in the user's project.
 */
export function resolveAllDeps(
  registry: Registry,
  rootFile: string,
): string[] {
  const seen = new Set<string>();
  const queue = [rootFile];
  while (queue.length > 0) {
    const next = queue.shift()!;
    if (seen.has(next)) continue;
    seen.add(next);
    const entry = registry.files[next];
    if (!entry) continue;
    for (const dep of entry.deps) {
      if (!seen.has(dep)) queue.push(dep);
    }
  }
  return [...seen];
}

export function componentNames(registry: Registry): string[] {
  return Object.keys(registry.components).sort();
}
