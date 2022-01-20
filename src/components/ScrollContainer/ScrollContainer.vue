<template>
  <n-scrollbar :builtin-theme-overrides="scrollBarThemeOverrides">
    <slot />
  </n-scrollbar>
</template>

<script lang="ts">
  export default {
    name: 'ScrollContainer',
  };
</script>

<script setup lang="ts">
  import { computed } from 'vue';
  import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal';

  const props = defineProps<{
    inverted?: boolean;
  }>();

  const { color, colorHover } = getNaiveCssVars('Scrollbar', true);
  const scrollBarThemeOverrides = computed(() => {
    return props.inverted ? { color, colorHover } : undefined;
  });
</script>
