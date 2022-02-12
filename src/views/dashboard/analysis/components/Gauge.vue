<template>
  <LoadingCard :loading="isLoading" title="仪表盘">
    <div ref="chartRef" :style="{ width, height }"></div>
  </LoadingCard>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useECharts } from '/@/composables/web/useECharts';
  import { basicProps } from './chartProps';
  import { useLoading } from './useLoading';

  defineProps({
    ...basicProps('250px'),
  });

  const chartRef = ref<HTMLDivElement>();

  const isLoading = useLoading();

  useECharts(
    { chartRef },
    {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}',
            fontSize: '20',
          },
          data: [
            {
              value: 50,
              name: 'SCORE',
            },
          ],
        },
      ],
    }
  );
</script>
