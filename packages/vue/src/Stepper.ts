import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  type InjectionKey,
  type PropType,
} from 'vue';
import { cn } from './utils';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

interface StepperContext {
  activeStep: () => number;
  orientation: StepperOrientation;
  linear: boolean;
}

const StepperKey: InjectionKey<StepperContext> = Symbol('Stepper');

export const Stepper = defineComponent({
  name: 'Stepper',
  inheritAttrs: true,
  props: {
    activeStep: { type: Number, required: true },
    orientation: { type: String as PropType<StepperOrientation>, default: 'horizontal' },
    linear: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    provide(StepperKey, {
      activeStep: () => props.activeStep,
      orientation: props.orientation,
      linear: props.linear,
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-orientation': props.orientation,
          class: cn(
            'bwo-stepper',
            `bwo-stepper--${props.orientation}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});

export const Step = defineComponent({
  name: 'Step',
  inheritAttrs: true,
  props: {
    index: { type: Number, required: true },
    label: { type: String, default: undefined },
    description: { type: String, default: undefined },
    status: { type: String as PropType<StepStatus>, default: undefined },
    clickable: { type: Boolean, default: false },
  },
  emits: ['activate'],
  setup(props, { attrs, slots, emit }) {
    const ctx = inject(StepperKey);
    if (!ctx) throw new Error('Step must be inside <Stepper>.');

    const status = computed<StepStatus>(() => {
      if (props.status) return props.status;
      const active = ctx.activeStep();
      return props.index < active ? 'completed' : props.index === active ? 'active' : 'pending';
    });
    const canActivate = computed(
      () => props.clickable && (!ctx.linear || status.value !== 'pending'),
    );

    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-status': status.value,
          'data-step': props.index,
          class: cn(
            'bwo-step',
            `bwo-step--${status.value}`,
            attrs.class as string | undefined,
          ),
        },
        [
          h(
            canActivate.value ? 'button' : 'div',
            {
              type: canActivate.value ? 'button' : undefined,
              class: 'bwo-step-indicator',
              'aria-current': status.value === 'active' ? 'step' : undefined,
              onClick: canActivate.value ? () => emit('activate', props.index) : undefined,
            },
            slots.icon?.() ??
              (status.value === 'completed'
                ? h(
                    'svg',
                    { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none' },
                    h('path', {
                      d: 'M5 12l5 5L20 7',
                      stroke: 'currentColor',
                      'stroke-width': 2.5,
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                    }),
                  )
                : h('span', props.index + 1)),
          ),
          (props.label || props.description || slots.default)
            ? h('div', { class: 'bwo-step-content' }, [
                props.label ? h('div', { class: 'bwo-step-label' }, props.label) : null,
                props.description
                  ? h('div', { class: 'bwo-step-desc' }, props.description)
                  : null,
                slots.default?.(),
              ])
            : null,
        ],
      );
  },
});

export const StepConnector = defineComponent({
  name: 'StepConnector',
  inheritAttrs: true,
  setup(_, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        'aria-hidden': 'true',
        class: cn('bwo-step-connector', attrs.class as string | undefined),
      });
  },
});
