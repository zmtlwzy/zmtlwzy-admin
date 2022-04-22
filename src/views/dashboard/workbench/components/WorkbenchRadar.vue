<template>
  <LoadingCard title="数据统计" :loading="isLoading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </LoadingCard>
</template>

<script lang="ts" setup>
  import { MaybeElementRef } from '@vueuse/core';
  import { propTypes } from '/@/utils/propTypes';
  import { useECharts } from '/@/composables/web/useECharts';
  import { useLoading } from './useLoading';

  defineProps({
    width: propTypes.string.def('100%'),
    height: propTypes.string.def('350px'),
  });

  const isLoading = useLoading();

  const chartRef: MaybeElementRef = ref();
  useECharts(
    { chartRef },
    {
      tooltip: {},
      radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: [
          {
            name: '一月',
            max: 160,
          },
          {
            name: '二月',
            max: 160,
          },
          {
            name: '三月',
            max: 160,
          },
          {
            name: '四月',
            max: 160,
          },
          {
            name: '五月',
            max: 160,
          },
          {
            name: '六月',
            max: 160,
          },
        ],
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 3,
            shadowColor: 'rgba(0,0,0,.15)',
            shadowOffsetX: 3,
            shadowOffsetY: 5,
            opacity: 0.75,
          },
          data: [
            {
              value: [78, 32, 120, 64, 40, 29],
              name: '点赞',
              itemStyle: {
                color: '#00d8ff',
              },
            },
            {
              value: [98, 87, 63, 46, 112, 101],
              name: '评论数',
              itemStyle: {
                color: '#1fdaca',
              },
            },
          ],
        },
      ],
    }
  );
</script>
