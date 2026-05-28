/**
 * Lightweight className joiner. Skips falsy values so callers can write
 * `cn('bwo-btn', variant && `bwo-btn--${variant}`, className)`.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/**
 * Shared 5-state radius scale. Applied via `data-radius` on the rendered
 * element so the CSS variable `--bwo-radius-current` cascades to descendants.
 *
 *   none → 0
 *   sm   → 4px
 *   md   → 6px (the default; matches --bwo-radius-current)
 *   lg   → 12px
 *   pill → 9999px
 */
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'pill';
