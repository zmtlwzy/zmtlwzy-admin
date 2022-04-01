<template>
  <NCard title="项目" content-style="padding:0;">
    <template #header-extra>
      <i-akar-icons-more-vertical class="text-18px cursor-pointer" />
    </template>
    <CardGrid cols="400:1 600:2 820:3">
      <CardGridItem v-for="(item, index) in groupItems" :key="index">
        <div flex>
          <span :class="item.icon" :style="{ color: item.color, fontSize: '30px' }" />
          <span class="text-lg ml-4">{{ item.title }}</span>
        </div>
        <span class="text-$app-text-color-3 flex mt-2 mb-5">{{ item.desc }}</span>
        <div class="flex justify-between text-$app-text-color-3">
          <span>{{ item.group }}</span>
          <span>{{ item.date }}</span>
        </div>
      </CardGridItem>
    </CardGrid>
  </NCard>
</template>

<script setup lang="ts">
  import { groupItems } from './data.json';
</script>
