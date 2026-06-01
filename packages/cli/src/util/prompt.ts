import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

/** Minimal readline-based prompt — no external deps. */
export async function prompt(question: string, defaultValue?: string): Promise<string> {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const hint = defaultValue !== undefined ? ` (${defaultValue})` : '';
    const answer = (await rl.question(`${question}${hint}: `)).trim();
    return answer === '' && defaultValue !== undefined ? defaultValue : answer;
  } finally {
    rl.close();
  }
}

export async function confirm(question: string, defaultValue = true): Promise<boolean> {
  const hint = defaultValue ? 'Y/n' : 'y/N';
  const raw = await prompt(`${question} (${hint})`);
  if (raw === '') return defaultValue;
  const v = raw.toLowerCase();
  return v === 'y' || v === 'yes';
}
