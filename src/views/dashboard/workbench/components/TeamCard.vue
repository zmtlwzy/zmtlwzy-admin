<template>
  <LoadingCard
    title="团队"
    :loading="isLoading"
    :segmented="{
      content: true,
    }"
  >
    <Team />
  </LoadingCard>
</template>

<script setup lang="ts">
import { useLoading } from './useLoading'
import Team from './Team.vue'

const isLoading = useLoading()
</script>
