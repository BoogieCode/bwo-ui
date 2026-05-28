export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** 5-state radius scale. See @bwo-ui/core styles for the data-radius mapping. */
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'pill';
