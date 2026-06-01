import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Lean = defineComponent({
  name: 'Lean',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'div' },
    strength: { type: Number, default: 12 },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const onMove = (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * props.strength}deg) rotateX(${-y * props.strength}deg)`;
      };
      const onLeave = (e: MouseEvent) => {
        (e.currentTarget as HTMLElement).style.transform = '';
      };
      return h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-lean', attrs.class as string | undefined),
          style: {
            ...((attrs.style as Record<string, string>) ?? {}),
            transition: 'transform 0.18s ease',
            willChange: 'transform',
          },
          onMousemove: onMove,
          onMouseleave: onLeave,
        },
        slots.default?.(),
      );
    };
  },
});
