<template>
  <n-card :size="size" v-bind="$attrs" :segmented="segmented">
    <template #header-extra>
      <slot v-if="$slots['header-extra']" name="header-extra" />
      <n-switch v-else v-model:value="show" />
    </template>
    <template v-for="item in getSlots" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
    <template #default>
      <n-collapse-transition :show="show" :appear="appear">
        <slot />
      </n-collapse-transition>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import type { CardProps } from 'naive-ui'
import { omit } from 'lodash-es'

withDefaults(
  defineProps<{
    size?: CardProps['size']
    segmented?: CardProps['segmented']
    appear?: boolean
  }>(),
  {
    size: 'small',
    segmented: true,
    appear: false,
  },
)
const slots = useSlots()
const show = ref(true)
const getSlots = computed(() => Object.keys(omit(slots, ['header-extra', 'default'])))
</script>
