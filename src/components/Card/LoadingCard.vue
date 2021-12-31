<template>
  <NCard :title="loading ? undefined : title">
    <NSpace v-if="loading" vertical>
      <NSkeleton text width="60%" />
      <NSkeleton text :repeat="repeat" />
    </NSpace>
    <slot v-else />
  </NCard>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      loading?: boolean;
      title?: string;
      repeat?: number;
    }>(),
    {
      loading: true,
      repeat: 6,
    }
  );
</script>
