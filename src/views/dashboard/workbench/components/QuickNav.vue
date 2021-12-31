<template>
  <NCard title="快捷导航" content-style="padding:0;">
    <CardGrid cols="1 210:2 320:3">
      <CardGridItem v-for="(item, index) in navItems" :key="index">
        <span class="flex flex-col items-center">
          <Icon :icon="item.icon as string" :color="item.color" size="20" />
          <span class="text-md mt-2">{{ item.title }}</span>
        </span>
      </CardGridItem>
    </CardGrid>
  </NCard>
</template>

<script setup lang="ts">
  import { navItems } from './data';
</script>
