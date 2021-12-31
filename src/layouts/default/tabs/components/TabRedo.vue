<template>
  <span :class="wrapperClass" @click="handleRedo">
    <i-codicon-refresh :class="[iconClass, loading ? '*spin animate-duration-1200' : '']" />
  </span>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { promiseTimeout } from '@vueuse/core';
  import { useTabs } from '/@/composables/web/useTabs';
  import getCommonCls from './useExtra';

  const loading = ref(false);
  const { refreshPage } = useTabs();
  const { wrapperClass, iconClass } = getCommonCls();

  async function handleRedo() {
    const currentTime = Date.now();
    loading.value = true;
    await refreshPage();
    // Animation execution time
    await promiseTimeout(1200 - ((Date.now() - currentTime) % 1200));
    loading.value = false;
  }
</script>
