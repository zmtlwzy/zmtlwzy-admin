<script setup lang="ts">
  import AppSearchModal from './components/AppSearchModal.vue';
  import { useToggle } from '@vueuse/core';

  defineOptions({
    name: 'AppSearch',
  });

  const [showModal, toggle] = useToggle();
</script>

<template>
  <div class="h-full">
    <NTooltip trigger="hover" placement="bottom" :delay="300">
      <template #trigger>
        <span class="app-layout-header-anction-icon" @click="toggle(true)">
          <i-ic:round-search class="text-20px" />
        </span>
      </template>
      菜单搜索
    </NTooltip>
    <AppSearchModal @close="toggle(false)" :visible="showModal" />
  </div>
</template>
