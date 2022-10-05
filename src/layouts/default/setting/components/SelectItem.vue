<template>
  <Wrapper :class="prefixCls" :title="title">
    <NSelect
      v-model:value="valRef"
      class="min-w-110px"
      size="small"
      v-bind="$attrs"
      :options="getOptions"
      @update-value="handleChange"
    />
  </Wrapper>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { useDesign } from '/@/composables/web/useDesign'
import { useI18n } from '/@/composables/web/useI18n'
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
    type: [String, Number] as PropType<string | number>,
  },
  options: {
    type: Array as PropType<LabelValueOptions>,
    default: () => [],
  },
})

defineOptions({
  inheritAttrs: false,
})

const { prefixCls } = useDesign('setting-select-item')
const { t } = useI18n()

const valRef = toWritableRef(props, 'val')

const getOptions = computed(() => {
  return props.options.map((item) => {
    return {
      ...item,
      label: t(item.label),
    }
  })
})

watch(
  () => props.options,
  (val) => {
    const _list = val.map(item => item.value)
    if (!_list.includes(valRef.value))
      valRef.value = _list.length > 0 ? _list[0] : undefined

    handleChange(valRef.value)
  },
)

function handleChange(e) {
  props.event && baseHandler(props.event, e)
}
</script>
