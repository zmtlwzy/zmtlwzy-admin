<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useECharts } from '/@/composables/web/useECharts';
  import { basicProps } from './chartProps';

  defineProps({
    ...basicProps('280px'),
  });
  const chartRef = ref<HTMLDivElement>();
  useECharts(
    { chartRef },
    {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '6:00',
          '7:00',
          '8:00',
          '9:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          max: 80000,
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(0,0,0,0.03)', 'rgba(226,226,226,0.02)'],
            },
          },
        },
      ],
      grid: {
        left: '1%',
        right: '1%',
        top: '2  %',
        bottom: 0,
        containLabel: true,
      },
      series: [
        {
          smooth: true,
          data: [
            111, 222, 4000, 18000, 33333, 55555, 63468, 43333, 31000, 25400, 18706, 15644, 13222,
            11111, 4000, 2000, 500, 333, 222, 111,
          ],
          type: 'line',
          areaStyle: {},
          itemStyle: {},
        },
        {
          smooth: true,
          data: [
            33, 66, 88, 333, 3333, 5000, 68000, 3000, 1200, 13000, 43000, 32000, 22221, 11201, 390,
            198, 60, 30, 22, 11,
          ],
          type: 'line',
          areaStyle: {},
          itemStyle: {},
        },
      ],
    }
  );
</script>
