export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Radius scale. See @bwo-ui/core styles for the data-radius mapping. */
export type Radius = 'none' | 'light' | 'sm' | 'md' | 'lg' | 'pill';
