<template>
  <LoadingCard
    title="项目"
    :content-style="getContentStyle"
    child-skeleton-height="48px"
    :y-gap="16"
    :x-gap="16"
    :cols="2"
    :loading="isLoading"
  >
    <template #head-skeleton>
      <n-skeleton width="70%" height="22px" class="mb-4" />
    </template>
    <CardGrid cols="1 210:2 320:3">
      <CardGridItem v-for="(item, index) in navItems" :key="index">
        <div class="flex-ac-col">
          <span :class="item.icon" :style="{ color: item.color, fontSize: '20px' }" />
          <span class="mt-2">{{ item.title }}</span>
        </div>
      </CardGridItem>
    </CardGrid>
  </LoadingCard>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'

import { navItems } from './data.json'
import { useLoading } from './useLoading'

const isLoading = useLoading()
const getContentStyle = computed(
  (): StyleValue => ({
    ...(isLoading.value
      ? {}
      : {
          padding: 0,
        }),
  }),
)
</script>
