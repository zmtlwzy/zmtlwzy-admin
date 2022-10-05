<template>
  <span class="app-layout-header-anction-icon" @click="onClick">
    <i-ant-design-menu-unfold-outlined v-if="collapsed" viewBox="64 64 896 896" />
    <i-ant-design-menu-fold-outlined v-else viewBox="64 64 896 896" />
  </span>
</template>

<script setup lang="ts">
import { propTypes } from '/@/utils/propTypes'

defineProps({
  collapsed: propTypes.bool.def(false),
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
})
</script>
