import { createBlur, type BlurDirection } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export type BlurIntensity = 'subtle' | 'medium' | 'strong';

const INTENSITY_PX: Record<BlurIntensity, number> = {
  subtle: 8,
  medium: 16,
  strong: 28,
};

export const Blur = defineComponent({
  name: 'Blur',
  props: {
    as: { type: String, default: 'div' },
    intensity: { type: String as PropType<BlurIntensity>, default: undefined },
    from: { type: Number, default: undefined },
    to: { type: Number, default: undefined },
    direction: { type: String as PropType<BlurDirection>, default: undefined },
    fade: { type: Boolean, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    scrub: { type: [Boolean, Number], default: undefined },
    once: { type: Boolean, default: undefined },
    delay: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) => {
      const resolvedFrom =
        props.from ?? (props.intensity ? INTENSITY_PX[props.intensity] : undefined);
      return createBlur(node, {
        from: resolvedFrom,
        to: props.to,
        direction: props.direction,
        fade: props.fade,
        duration: props.duration,
        ease: props.ease,
        start: props.start,
        end: props.end,
        scrub: props.scrub,
        once: props.once,
        delay: props.delay,
      });
    });
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});

export type { BlurDirection };
