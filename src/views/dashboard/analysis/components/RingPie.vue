<template>
  <LoadingCard :loading="isLoading" title="环状饼图">
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

  const [isLoading] = useLoading();

  useECharts(
    { chartRef },
    {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['58%', '85%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    }
  );
</script>
