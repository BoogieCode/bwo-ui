/**
 * Tiny ANSI color helper — zero dep, works on Win/Mac/Linux terminals that
 * support 256-color sequences. Honors NO_COLOR / FORCE_COLOR env vars.
 */

const supportsColor =
  process.env.NO_COLOR === undefined &&
  (process.env.FORCE_COLOR !== undefined || process.stdout.isTTY === true);

const wrap = (code: string) => (text: string) =>
  supportsColor ? `\x1b[${code}m${text}\x1b[0m` : text;

export const c = {
  bold: wrap('1'),
  dim: wrap('2'),
  red: wrap('31'),
  green: wrap('32'),
  yellow: wrap('33'),
  blue: wrap('34'),
  magenta: wrap('35'),
  cyan: wrap('36'),
  gray: wrap('90'),
};

export const log = {
  info: (msg: string) => console.log(msg),
  success: (msg: string) => console.log(`${c.green('✓')} ${msg}`),
  warn: (msg: string) => console.log(`${c.yellow('!')} ${msg}`),
  error: (msg: string) => console.error(`${c.red('✗')} ${msg}`),
  step: (msg: string) => console.log(`${c.cyan('›')} ${msg}`),
  blank: () => console.log(''),
};
