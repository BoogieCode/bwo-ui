import { parseArgs } from 'node:util';
import { configExists, DEFAULT_CONFIG, writeConfig, type BwoConfig } from '../util/config';
import { c, log } from '../util/log';
import { confirm, prompt } from '../util/prompt';

export async function runInit(args: string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      yes: { type: 'boolean', short: 'y' },
      'components-dir': { type: 'string' },
      typescript: { type: 'boolean' },
      'no-typescript': { type: 'boolean' },
      styles: { type: 'string' },
    },
    strict: false,
  });

  if (await configExists()) {
    const overwrite = values.yes
      ? true
      : await confirm(`${c.yellow('bwo.json already exists.')} Overwrite?`, false);
    if (!overwrite) {
      log.info('Aborted.');
      return;
    }
  }

  let config: BwoConfig;
  if (values.yes) {
    config = {
      ...DEFAULT_CONFIG,
      componentsDir: (values['components-dir'] as string) ?? DEFAULT_CONFIG.componentsDir,
      typescript: values['no-typescript']
        ? false
        : values.typescript !== undefined
          ? Boolean(values.typescript)
          : DEFAULT_CONFIG.typescript,
      styles: (values.styles as string) ?? DEFAULT_CONFIG.styles,
    };
  } else {
    log.blank();
    log.info(c.bold('bwo-ui setup'));
    log.info(c.dim('Three quick questions. Press enter to accept defaults.'));
    log.blank();
    const componentsDir =
      (values['components-dir'] as string) ??
      (await prompt('Where should components be copied?', DEFAULT_CONFIG.componentsDir));
    const typescript = values['no-typescript']
      ? false
      : values.typescript !== undefined
        ? Boolean(values.typescript)
        : await confirm('Use TypeScript (.tsx)?', DEFAULT_CONFIG.typescript);
    const styles =
      (values.styles as string) ??
      (await prompt('Stylesheet to import once in your app?', DEFAULT_CONFIG.styles));
    config = { componentsDir, typescript, styles };
  }

  await writeConfig(config);

  log.blank();
  log.success('Created bwo.json');
  log.info(`  ${c.gray('components')} → ${c.cyan(config.componentsDir)}`);
  log.info(`  ${c.gray('typescript')} → ${c.cyan(String(config.typescript))}`);
  log.info(`  ${c.gray('styles    ')} → ${c.cyan(config.styles)}`);
  log.blank();
  log.info(`Next: ${c.bold('bwo add button')} ${c.gray('— or any component name')}`);
  log.info(`      ${c.bold('bwo list')}       ${c.gray('— see everything available')}`);
}
