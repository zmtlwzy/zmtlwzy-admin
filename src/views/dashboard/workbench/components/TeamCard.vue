<template>
  <NCard
    title="团队"
    :segmented="{
      content: true,
    }"
  >
    <Team />
  </NCard>
</template>

<script setup lang="ts">
  import Team from './Team.vue';
</script>
