<template>
  <PageWrapper title="标准列表">
    <n-card :bordered="false" content-style="padding:0;">
      <DemoList />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import DemoList from './components/DemoList.vue'
</script>
