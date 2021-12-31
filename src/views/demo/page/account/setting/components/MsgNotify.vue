<template>
  <div>
    <slot name="title" />
    <n-list>
      <n-list-item v-for="{ title, description } in msgList" :key="title">
        <n-thing>
          <template #header> {{ title }} </template>
          <template #description>
            <span class="text-$app-text-color-3">
              {{ description }}
            </span>
          </template>
          <template #header-extra>
            <n-switch />
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
  import { msgList } from './data';
</script>
