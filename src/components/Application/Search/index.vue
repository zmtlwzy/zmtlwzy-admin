<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import AppSearchModal from './components/AppSearchModal.vue'

defineOptions({
  name: 'AppSearch',
})

const [showModal, toggle] = useToggle()
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
    <AppSearchModal :visible="showModal" @close="toggle(false)" />
  </div>
</template>
