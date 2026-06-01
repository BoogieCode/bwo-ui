import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'nav',
        {
          ...attrs,
          'aria-label': 'Breadcrumb',
          class: cn('bwo-breadcrumb', attrs.class as string | undefined),
        },
        h('ol', { class: 'bwo-breadcrumb-list' }, slots.default?.()),
      );
  },
});

export const BreadcrumbItem = defineComponent({
  name: 'BreadcrumbItem',
  inheritAttrs: true,
  props: { current: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'li',
        {
          ...attrs,
          'aria-current': props.current ? 'page' : undefined,
          class: cn('bwo-breadcrumb-item', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const BreadcrumbLink = defineComponent({
  name: 'BreadcrumbLink',
  inheritAttrs: true,
  props: { href: { type: String, default: undefined } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          href: props.href,
          class: cn('bwo-breadcrumb-link', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const BreadcrumbSeparator = defineComponent({
  name: 'BreadcrumbSeparator',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'li',
        {
          ...attrs,
          role: 'presentation',
          'aria-hidden': 'true',
          class: cn('bwo-breadcrumb-sep', attrs.class as string | undefined),
        },
        slots.default?.() ??
          h(
            'svg',
            { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none' },
            h('path', {
              d: 'M9 6l6 6-6 6',
              stroke: 'currentColor',
              'stroke-width': 2,
              'stroke-linecap': 'round',
            }),
          ),
      );
  },
});
