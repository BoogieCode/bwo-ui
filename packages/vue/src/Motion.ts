import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export const Spin = defineComponent({
  name: 'Spin',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'span' },
    duration: { type: Number, default: 1.6 },
    reverse: { type: Boolean, default: false },
    paused: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-spin', attrs.class as string | undefined),
          'data-paused': props.paused || undefined,
          style: {
            ...((attrs.style as Record<string, string>) ?? {}),
            animationDuration: `${props.duration}s`,
            animationDirection: props.reverse ? 'reverse' : 'normal',
            animationPlayState: props.paused ? 'paused' : 'running',
          },
        },
        slots.default?.(),
      );
  },
});

export const Pulse = defineComponent({
  name: 'Pulse',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'span' },
    duration: { type: Number, default: 1.6 },
    scale: { type: Number, default: 1.06 },
    paused: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-pulse', attrs.class as string | undefined),
          'data-paused': props.paused || undefined,
          style: {
            ...((attrs.style as Record<string, string>) ?? {}),
            ['--bwo-pulse-scale' as string]: String(props.scale),
            animationDuration: `${props.duration}s`,
            animationPlayState: props.paused ? 'paused' : 'running',
          },
        },
        slots.default?.(),
      );
  },
});
