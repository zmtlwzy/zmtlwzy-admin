<template>
  <n-scrollbar :builtin-theme-overrides="scrollBarThemeOverrides">
    <slot />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal'

const props = defineProps<{
  inverted?: boolean
}>()

defineOptions({
  name: 'ScrollContainer',
})

const { color, colorHover } = getNaiveCssVars('Scrollbar', true)
const scrollBarThemeOverrides = computed(() => {
  return props.inverted ? { color, colorHover } : undefined
})
</script>
