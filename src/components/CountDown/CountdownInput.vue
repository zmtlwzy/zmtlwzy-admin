<template>
  <n-input-group>
    <n-input v-bind="$attrs" :class="prefixCls" :style="{ width: `${inputWidth} !important` }" :size="size" :value="state">
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </n-input>
    <CountButton
      class="flex-grow-1"
      :size="size"
      type="primary"
      :count="count"
      :value="state"
      :before-start-func="sendCodeApi"
    />
  </n-input-group>
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
  inputWidth: { type: [String, Number], default: '65%' },
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
