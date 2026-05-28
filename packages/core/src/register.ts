import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { isBrowser } from './types';

let registered = false;

/**
 * Lazily register every GSAP plugin bwo-ui needs.
 * Safe to call repeatedly; no-op after first invocation.
 * No-op in non-browser environments.
 */
export function registerPlugins(): void {
  if (registered || !isBrowser()) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Observer, Flip);
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin, Observer, Flip };
