<template>
  <Wrapper :class="prefixCls" :title="title">
    <NSlider v-model:value="valRef" v-bind="$attrs" class="w-110px" @update-value="handleUpdate" />
  </Wrapper>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

import { useDesign } from '/@/composables/web/useDesign'
import { toWritableRef } from '/@/composables/utilities/toWritableRef'

import { baseHandler } from '../handler'
import type { HandlerEnum } from '../enum'
import Wrapper from './Wrapper.vue'

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
})

defineOptions({
  inheritAttrs: false,
})

const { prefixCls } = useDesign('setting-slider-item')
const valRef = toWritableRef(props, 'val')

const handleUpdate = useDebounceFn((val: number) => {
  props.event && baseHandler(props.event, val)
}, 200)
</script>
