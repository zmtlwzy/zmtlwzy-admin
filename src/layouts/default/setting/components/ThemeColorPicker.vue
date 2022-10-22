<template>
  <Wrapper :class="prefixCls" :title="title">
    <NColorPicker
      v-model:value="valRef"
      v-bind="$attrs"
      class="w-110px"
      @update-value="handleUpdate"
    />
  </Wrapper>
</template>

<script setup lang="ts">
import { useDesign } from '/@/composables/web/useDesign'
import { toWritableRef } from '/@/composables/utilities/toWritableRef'
import { useDebounceFn } from '@vueuse/core'
import Wrapper from './Wrapper.vue'
import { baseHandler } from '../handler'
import type { HandlerEnum } from '../enum'

const props = defineProps({
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  title: {
    type: String,
  },
  val: {
    type: String,
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
