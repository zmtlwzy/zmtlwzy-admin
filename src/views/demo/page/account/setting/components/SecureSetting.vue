<template>
  <div>
    <slot name="title" />
    <n-list>
      <n-list-item v-for="{ title, description } in SecureList" :key="title">
        <n-thing>
          <template #header>
            {{ title }}
          </template>
          <template #description>
            <span class="text-$app-text-color-3">
              {{ description }}
            </span>
          </template>
          <template #header-extra>
            <n-button text type="primary">
              修改
            </n-button>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
import { SecureList } from './data'
</script>
