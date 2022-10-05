<template>
  <PageWrapper>
    <n-grid :cols="12" :x-gap="24" :y-gap="24" item-responsive>
      <n-gi span="12 600:4">
        <LeftCard />
      </n-gi>
      <n-gi span="12 600:8">
        <RightCard />
      </n-gi>
    </n-grid>
  </PageWrapper>
</template>

<script setup lang="ts">
import LeftCard from './components/LeftCard.vue'
import RightCard from './components/RightCard.vue'
</script>
