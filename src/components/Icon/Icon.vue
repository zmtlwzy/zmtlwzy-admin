<template>
  <n-icon
    :class="[spin && 'animate-spin animate-duration-2000']"
    :size="size"
    :color="color"
    :depth="depth"
  >
    <Iconify :icon="getIconRef" />
  </n-icon>
</template>

<script lang="ts">
  import { Icon as Iconify } from '@iconify/vue';
  import type { Depth } from 'naive-ui/lib/icon/src/Icon';
  import { computed } from 'vue';
  export default {
    name: 'Icon',
  };
</script>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      size?: string | number;
      spin?: boolean;
      color?: string;
      depth?: Depth;
      icon: string;
      prefix?: string;
    }>(),
    {
      prefix: '',
    }
  );

  const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`);
</script>
