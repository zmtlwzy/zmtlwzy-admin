<template>
  <LoadingCard :loading="isLoading" :content-style="getContentStyle">
    <NTabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
      <NTabPane name="增长趋势">
        <VisitAnalysis />
      </NTabPane>
      <NTabPane name="访问量">
        <VisitAnalysisBar />
      </NTabPane>
    </NTabs>
  </LoadingCard>
</template>

<script setup lang="ts">
  import { CSSProperties, computed } from 'vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';
  import { useLoading } from './useLoading';

  const [isLoading] = useLoading();
  const getContentStyle = computed(
    (): CSSProperties => ({
      ...(isLoading.value
        ? {}
        : {
            padding: 0,
          }),
    })
  );
</script>
