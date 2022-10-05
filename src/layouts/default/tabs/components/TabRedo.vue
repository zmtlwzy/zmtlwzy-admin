<template>
  <div class="app-mtabs-anction-btn-wrapper group" @click="handleRedo">
    <span
      class="i-codicon-refresh app-mtabs-anction-btn"
      :class="{ 'app-ease-spin animate-duration-1200': loading }"
    />
  </div>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useTabs } from '/@/composables/web/useTabs'

const loading = ref(false)
const { refreshPage } = useTabs()

async function handleRedo() {
  const currentTime = Date.now()
  loading.value = true
  await refreshPage()
  // Animation execution time
  await promiseTimeout(1200 - ((Date.now() - currentTime) % 1200))
  loading.value = false
}
</script>
