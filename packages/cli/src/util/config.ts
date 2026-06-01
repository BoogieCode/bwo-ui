import { access, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface BwoConfig {
  /** Where to write copied component files. Default: 'components/ui'. */
  componentsDir: string;
  /** Use .tsx (true) or .jsx (false). Default: true. */
  typescript: boolean;
  /** Stylesheet import the user is expected to load once. */
  styles: string;
}

export const DEFAULT_CONFIG: BwoConfig = {
  componentsDir: 'components/ui',
  typescript: true,
  styles: '@bwo-ui/core/styles.css',
};

export const CONFIG_FILE = 'bwo.json';

export function configPath(cwd = process.cwd()): string {
  return resolve(cwd, CONFIG_FILE);
}

export async function readConfig(cwd = process.cwd()): Promise<BwoConfig | null> {
  try {
    const raw = await readFile(configPath(cwd), 'utf8');
    const parsed = JSON.parse(raw) as Partial<BwoConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return null;
  }
}

export async function writeConfig(config: BwoConfig, cwd = process.cwd()): Promise<void> {
  await writeFile(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`, 'utf8');
}

export async function configExists(cwd = process.cwd()): Promise<boolean> {
  try {
    await access(configPath(cwd));
    return true;
  } catch {
    return false;
  }
}
