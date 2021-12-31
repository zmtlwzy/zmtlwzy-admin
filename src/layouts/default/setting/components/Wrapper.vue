<template>
  <NSpace justify="space-between" align="center" class="py-2 min-h-52px">
    <NText> {{ title }}</NText>
    <slot />
  </NSpace>
</template>

<script setup lang="ts">
  defineProps({
    title: String,
  });
</script>
