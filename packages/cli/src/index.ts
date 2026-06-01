import { runAdd } from './commands/add';
import { runInit } from './commands/init';
import { runList } from './commands/list';
import { c, log } from './util/log';

const VERSION = '0.3.0';

function printUsage(): void {
  console.log(
    `${c.bold('bwo')} ${c.gray(`v${VERSION}`)}

${c.bold('Usage:')}
  bwo ${c.cyan('init')}                  Create bwo.json in the current directory
  bwo ${c.cyan('add <component>')}       Copy a component (and its deps) into your project
  bwo ${c.cyan('list')}                  Show every available component
  bwo ${c.cyan('--help')}                Print this message

${c.bold('Examples:')}
  ${c.gray('# Set up once')}
  bwo init
  bwo init --yes

  ${c.gray('# Install components')}
  bwo add button
  bwo add dialog calendar combobox
  bwo add --dry data-table

${c.bold('Options for add:')}
  -y, --yes              Skip overwrite confirmations
  -o, --overwrite        Overwrite without asking
      --dry              Print the plan, don't write anything
`,
  );
}

export async function run(args: string[]): Promise<void> {
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h' || args[0] === 'help') {
    printUsage();
    return;
  }
  if (args[0] === '--version' || args[0] === '-v') {
    console.log(VERSION);
    return;
  }
  const [cmd, ...rest] = args;
  try {
    switch (cmd) {
      case 'init':
        await runInit(rest);
        break;
      case 'add':
        await runAdd(rest);
        break;
      case 'list':
      case 'ls':
        await runList();
        break;
      default:
        log.error(`Unknown command: ${c.bold(cmd ?? '')}`);
        log.info(`Run ${c.bold('bwo --help')} for usage.`);
        process.exit(1);
    }
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message);
    } else {
      log.error(String(err));
    }
    process.exit(1);
  }
}
