<template>
  <div>
    <slot name="title" />
    <n-list>
      <n-list-item v-for="{ icon, iconColor, title, description } in bindList" :key="title">
        <n-thing>
          <template #avatar>
            <n-icon :size="42" :color="iconColor">
              <component :is="icon" />
            </n-icon>
          </template>
          <template #header> {{ title }} </template>
          <template #description>
            <span class="text-$app-text-color-3">
              {{ description }}
            </span>
          </template>
          <template #header-extra>
            <n-button text type="primary">绑定</n-button>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
  import { bindList } from './data';
</script>
