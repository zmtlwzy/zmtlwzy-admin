<template>
  <NCard title="快捷导航" content-style="padding:0;">
    <CardGrid cols="1 210:2 320:3">
      <CardGridItem v-for="(item, index) in navItems" :key="index">
        <div class="flex-ac-col">
          <span :class="item.icon" :style="{ color: item.color, fontSize: '20px' }" />
          <span class="mt-2">{{ item.title }}</span>
        </div>
      </CardGridItem>
    </CardGrid>
  </NCard>
</template>

<script setup lang="ts">
  import { navItems } from './data.json';
</script>
