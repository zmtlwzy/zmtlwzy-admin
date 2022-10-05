<template>
  <NGrid cols="1 250:2 600:4" y-gap="16">
    <NGridItem v-for="(item, index) in team" :key="index">
      <div class="flex-ac space-x-3 group">
        <span :class="item.icon" style="font-size: 18px" />
        <span class="cursor-pointer group-hover:text-$app-primary-color">{{ item.name }}</span>
      </div>
    </NGridItem>
  </NGrid>
</template>

<script setup lang="ts">
import { team } from './data.json'
</script>
