import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

export type ProgressVariant = 'primary' | 'green' | 'yellow' | 'red';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressShape = 'linear' | 'circular';

const CIRCULAR_DIM: Record<ProgressSize, { size: number; stroke: number }> = {
  sm: { size: 40, stroke: 4 },
  md: { size: 64, stroke: 6 },
  lg: { size: 96, stroke: 8 },
};

export const Progress = defineComponent({
  name: 'Progress',
  inheritAttrs: true,
  props: {
    value: { type: Number, default: undefined },
    max: { type: Number, default: 100 },
    variant: { type: String as PropType<ProgressVariant>, default: 'primary' },
    size: { type: String as PropType<ProgressSize>, default: 'md' },
    shape: { type: String as PropType<ProgressShape>, default: 'linear' },
    striped: { type: Boolean, default: false },
    radius: { type: String as PropType<Radius>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const indeterminate = props.value === undefined;
      const clamped = indeterminate ? 0 : Math.max(0, Math.min(props.max, props.value as number));
      const pct = indeterminate ? 0 : (clamped / props.max) * 100;
      const state = indeterminate ? 'indeterminate' : 'loading';

      if (props.shape === 'circular') {
        const { size: dim, stroke } = CIRCULAR_DIM[props.size];
        const r = (dim - stroke) / 2;
        const circumference = 2 * Math.PI * r;
        const offset = indeterminate ? circumference * 0.7 : circumference * (1 - pct / 100);
        return h(
          'div',
          {
            ...attrs,
            role: 'progressbar',
            'aria-valuemin': 0,
            'aria-valuemax': props.max,
            'aria-valuenow': indeterminate ? undefined : clamped,
            'data-state': state,
            class: cn(
              'bwo-progress-circle',
              props.variant !== 'primary' && `bwo-progress-circle--${props.variant}`,
              props.size !== 'md' && `bwo-progress-circle--${props.size}`,
              attrs.class as string | undefined,
            ),
            style: { width: `${dim}px`, height: `${dim}px` },
          },
          [
            h(
              'svg',
              {
                width: dim,
                height: dim,
                viewBox: `0 0 ${dim} ${dim}`,
                'aria-hidden': true,
                focusable: false,
              },
              [
                h('circle', {
                  class: 'bwo-progress-circle-track',
                  cx: dim / 2,
                  cy: dim / 2,
                  r,
                  fill: 'none',
                  'stroke-width': stroke,
                }),
                h('circle', {
                  class: 'bwo-progress-circle-indicator',
                  cx: dim / 2,
                  cy: dim / 2,
                  r,
                  fill: 'none',
                  'stroke-width': stroke,
                  'stroke-dasharray': circumference,
                  'stroke-dashoffset': offset,
                  'stroke-linecap': 'round',
                  transform: `rotate(-90 ${dim / 2} ${dim / 2})`,
                }),
              ],
            ),
            slots.default
              ? h('span', { class: 'bwo-progress-circle-label' }, slots.default())
              : null,
          ],
        );
      }

      return h(
        'div',
        {
          ...attrs,
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': props.max,
          'aria-valuenow': indeterminate ? undefined : clamped,
          'data-state': state,
          'data-radius': props.radius,
          class: cn(
            'bwo-progress',
            props.variant !== 'primary' && `bwo-progress--${props.variant}`,
            props.size !== 'md' && `bwo-progress--${props.size}`,
            props.striped && 'bwo-progress--striped',
            attrs.class as string | undefined,
          ),
        },
        h('div', {
          class: 'bwo-progress-indicator',
          'data-state': state,
          style: indeterminate ? undefined : { transform: `translateX(-${100 - pct}%)` },
        }),
      );
    };
  },
});
