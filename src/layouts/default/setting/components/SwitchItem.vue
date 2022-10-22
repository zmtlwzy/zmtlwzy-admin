<template>
  <Wrapper :class="prefixCls" :title="title">
    <NSwitch v-model:value="valRef" v-bind="$attrs" @update-value="handleChange">
      <template #checked>
        {{ t('layout.setting.on') }}
      </template>
      <template #unchecked>
        {{ t('layout.setting.off') }}
      </template>
    </NSwitch>
  </Wrapper>
</template>

<script setup lang="ts">
import { toWritableRef } from '/@/composables/utilities/toWritableRef'
import { useDesign } from '/@/composables/web/useDesign'
import { useI18n } from '/@/composables/web/useI18n'
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
    type: Boolean,
  },
})

defineOptions({
  inheritAttrs: false,
})

const { prefixCls } = useDesign('setting-switch-item')
const { t } = useI18n()

const valRef = toWritableRef(props, 'val')

function handleChange(val: boolean) {
  props.event && baseHandler(props.event, val)
}
</script>
