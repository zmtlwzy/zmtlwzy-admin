<template>
  <NGrid cols="1 250:2 600:4" y-gap="16">
    <NGridItem v-for="(item, index) in team" :key="index">
      <div class="*vs-layout space-x-3 group">
        <component :is="item.icon" class="text-18px" />
        <span class="cursor-pointer group-hover:text-$app-primary-color">{{ item.name }}</span>
      </div>
    </NGridItem>
  </NGrid>
</template>

<script setup lang="ts">
  import { team } from './data';
</script>
