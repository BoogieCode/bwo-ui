import { componentNames, loadRegistry } from '../util/registry';
import { c, log } from '../util/log';

export async function runList(): Promise<void> {
  const registry = await loadRegistry();
  const names = componentNames(registry);

  log.blank();
  log.info(`${c.bold(`${names.length} components`)} available:`);
  log.blank();

  const cols = 3;
  const width = Math.max(...names.map((n) => n.length)) + 4;
  const lines: string[] = [];
  for (let i = 0; i < names.length; i += cols) {
    const row = names
      .slice(i, i + cols)
      .map((n) => n.padEnd(width))
      .join('');
    lines.push(`  ${row}`);
  }
  console.log(lines.join('\n'));

  log.blank();
  log.info(`Install one with ${c.bold('bwo add <name>')}.`);
}
