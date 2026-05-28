/**
 * Lightweight className joiner. Skips falsy values so callers can write
 * `cn('bwo-btn', variant && `bwo-btn--${variant}`, className)`.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
