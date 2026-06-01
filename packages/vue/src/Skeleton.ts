import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type SkeletonVariant = 'rect' | 'circle' | 'text';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

function formatSize(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export const Skeleton = defineComponent({
  name: 'Skeleton',
  inheritAttrs: true,
  props: {
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined },
    radius: { type: String, default: undefined },
    variant: { type: String as PropType<SkeletonVariant>, default: 'rect' },
    animation: { type: String as PropType<SkeletonAnimation>, default: 'shimmer' },
    lines: { type: Number, default: undefined },
  },
  setup(props, { attrs }) {
    return () => {
      const animationAttr = props.animation !== 'shimmer' ? props.animation : undefined;
      const widthCss = formatSize(props.width);
      const heightCss = formatSize(props.height);

      if (props.variant === 'text' && props.lines && props.lines > 1) {
        return h(
          'span',
          {
            ...attrs,
            class: cn('bwo-skeleton-text-group', attrs.class as string | undefined),
            style: { width: widthCss, ...((attrs.style as Record<string, string>) ?? {}) },
          },
          Array.from({ length: props.lines }, (_, i) =>
            h('span', {
              key: i,
              'data-animation': animationAttr,
              class: cn('bwo-skeleton', 'bwo-skeleton--text'),
              style: {
                width: i === props.lines! - 1 ? '70%' : '100%',
                height: heightCss,
                borderRadius: props.radius,
              },
            }),
          ),
        );
      }

      return h('span', {
        ...attrs,
        'data-animation': animationAttr,
        class: cn(
          'bwo-skeleton',
          props.variant !== 'rect' && `bwo-skeleton--${props.variant}`,
          attrs.class as string | undefined,
        ),
        style: {
          width: widthCss,
          height: heightCss,
          borderRadius: props.radius,
        },
      });
    };
  },
});
