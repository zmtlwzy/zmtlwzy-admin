<script setup lang="ts">
import { isDevMode } from '/@/utils/env'
import { formatLength } from '/@/utils/css'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

interface Props {
  data: unknown
  btnText?: string
  containerHeight?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  btnText: 'Data',
  containerHeight: '60vh',
})

defineOptions({
  name: 'DataPopover',
  inheritAttrs: false,
})

const isShow = ref(false)

onDeactivated(() => isShow.value = false)
</script>

<template>
  <div v-if="isDevMode()" class="log-view">
    <n-popover
      :show="isShow"
      v-bind="$attrs"
      trigger="manual"
    >
      <template #trigger>
        <n-button @click="isShow = !isShow">
          {{ props.btnText }}
        </n-button>
      </template>
      <n-scrollbar :style="{ 'max-height': formatLength(props.containerHeight) }">
        <VueJsonPretty :data="data" show-icon show-length />
      </n-scrollbar>
    </n-popover>
  </div>
</template>
