import { defineComponent, h, type CSSProperties, type PropType } from 'vue';
import { cn } from './utils';

export type AppShellAlign = 'left' | 'center' | 'right';

/**
 * Three-row vertical frame: header (slot) + scrollable content + footer (slot).
 * Mirrors the boogie-next `container-shell` pattern.
 */
export const AppShell = defineComponent({
  name: 'AppShell',
  inheritAttrs: true,
  props: {
    /** Constrain the shell width. */
    maxWidth: { type: [Number, String], default: undefined },
    /** Horizontal alignment inside the parent. Default: `'center'`. */
    align: { type: String as PropType<AppShellAlign>, default: 'center' },
    /** Adds an id to the scrollable content container. */
    contentId: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const maxWidthCss =
        typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth;
      const inline: CSSProperties = {};
      if (maxWidthCss) {
        (inline as Record<string, string>)['--bwo-app-shell-max'] = maxWidthCss;
      }
      return h(
        'div',
        {
          ...attrs,
          'data-align': props.align,
          class: cn(
            'bwo-app-shell',
            `bwo-app-shell--${props.align}`,
            attrs.class as string | undefined,
          ),
          style: { ...inline, ...((attrs.style as Record<string, string>) ?? {}) },
        },
        [
          slots.header
            ? h('header', { class: 'bwo-app-shell-header' }, slots.header())
            : null,
          h(
            'div',
            { class: 'bwo-app-shell-content', id: props.contentId },
            slots.default?.(),
          ),
          slots.footer
            ? h('footer', { class: 'bwo-app-shell-footer' }, slots.footer())
            : null,
        ],
      );
    };
  },
});

export const BrandMark = defineComponent({
  name: 'BrandMark',
  inheritAttrs: true,
  props: {
    brand: { type: String, default: '' },
    accent: { type: String, default: '' },
    tld: { type: String, default: '' },
    href: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          href: props.href,
          class: cn('bwo-brandmark', attrs.class as string | undefined),
        },
        [
          h('span', props.brand),
          props.accent
            ? h('span', { class: 'bwo-brandmark-accent' }, props.accent)
            : null,
          props.tld ? h('span', { class: 'bwo-brandmark-tld' }, props.tld) : null,
        ],
      );
  },
});
