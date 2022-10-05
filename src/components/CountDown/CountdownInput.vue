<template>
  <NGrid cols="12" :x-gap="12">
    <NGi span="8">
      <NInput v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
        <template v-for="item in Object.keys($slots)" #[item]="data">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </NInput>
    </NGi>
    <NGi span="4">
      <CountButton :size="size" :count="count" :value="state" :before-start-func="sendCodeApi" />
    </NGi>
  </NGrid>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { InputProps } from 'naive-ui'
import CountButton from './CountButton.vue'
import { useDesign } from '/@/composables/web/useDesign'
import { useRuleFormItem } from '/@/composables/component/useFormItem'

const props = defineProps({
  value: String,
  size: String as PropType<InputProps['size']>,
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
})

defineOptions({
  name: 'CountdownInput',
  inheritAttrs: false,
})

const { prefixCls } = useDesign('countdown-input')
const [state] = useRuleFormItem(props)
</script>
