<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>
<script setup lang="ts">
  import { computed, unref, watch } from 'vue';
  import { useTransition, TransitionPresets } from '@vueuse/core';
  import { toWritableRef } from '/@/composables/utilities/toWritableRef';
  import { isNumber } from '/@/utils/is';

  import { propTypes } from '/@/utils/propTypes';

  const props = defineProps({
    startVal: propTypes.number.def(0),
    endVal: propTypes.number.def(9999),
    duration: propTypes.number.def(1200),
    isPlay: propTypes.bool.def(true),
    decimals: propTypes.number.def(0).validate((val: number) => val >= 0),
    prefix: propTypes.string.def(''),
    suffix: propTypes.string.def(''),
    separator: propTypes.string.def(','),
    decimal: propTypes.string.def('.'),
    delay: propTypes.number.def(0),
    color: propTypes.string,
    useEasing: propTypes.bool.def(true),
    transition: propTypes.string.def('easeOutExpo'),
  });

  const emit = defineEmits(['started', 'finished']);

  const source = toWritableRef(props, 'startVal');
  let outputValue = useTransition(source);

  const value = computed(() => formatNumber(unref(outputValue)));

  watch([() => props.startVal, () => props.endVal], () => {
    if (props.isPlay) {
      start();
    }
  });

  watch(
    () => props.isPlay,
    (val) => {
      val && start();
    },
    {
      immediate: true,
    }
  );

  function start() {
    run();
    source.value = props.endVal;
  }

  function run() {
    outputValue = useTransition(source, {
      delay: props.delay,
      duration: props.duration,
      onFinished: () => emit('finished'),
      onStarted: () => emit('started'),
      ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
    });
  }

  function formatNumber(num: number | string) {
    if (!num && num !== 0) {
      return '';
    }
    const { decimals, decimal, separator, suffix, prefix } = props;
    num = Number(num).toFixed(decimals);
    num += '';

    const x = num.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? decimal + x[1] : '';

    const rgx = /(\d+)(\d{3})/;
    if (separator && !isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, `$1${separator}$2`);
      }
    }
    return prefix + x1 + x2 + suffix;
  }
</script>
