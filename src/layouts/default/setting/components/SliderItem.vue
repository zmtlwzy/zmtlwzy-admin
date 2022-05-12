<template>
  <Wrapper :class="prefixCls" :title="title">
    <NSlider v-model:value="valRef" v-bind="$attrs" class="w-110px" @update-value="handleUpdate" />
  </Wrapper>
</template>

<script setup lang="ts">
  import { useDebounceFn } from '@vueuse/core';

  import { useDesign } from '/@/composables/web/useDesign';
  import { toWritableRef } from '/@/composables/utilities/toWritableRef';
  import Wrapper from './Wrapper.vue';

  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enum';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    title: {
      type: String,
    },
    val: {
      type: [Number, Array] as PropType<number | [number, number]>,
    },
  });

  const { prefixCls } = useDesign('setting-slider-item');
  const valRef = toWritableRef(props, 'val');

  const handleUpdate = useDebounceFn((val: number) => {
    props.event && baseHandler(props.event, val);
  }, 200);
</script>
