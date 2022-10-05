<template>
  <PageWrapper title="基础详情页">
    <NCard>
      <n-descriptions label-placement="left" title="退款申请">
        <n-descriptions-item v-for="[key, val] of Object.entries(data)" :key="key" :label="key">
          {{ val }}
        </n-descriptions-item>
      </n-descriptions>
      <n-divider />
      <n-descriptions label-placement="left" title="用户信息">
        <n-descriptions-item v-for="[key, val] of Object.entries(data2)" :key="key" :label="key">
          {{ val }}
        </n-descriptions-item>
      </n-descriptions>
      <n-divider />

      <n-h3>退货商品</n-h3>
      <n-data-table :columns="tableColumns" :data="tableData" :summary="summary" />

      <n-h3>退货进度</n-h3>
      <n-data-table :columns="tableColumns2" :data="tableData2" />
    </NCard>
  </PageWrapper>
</template>

<script setup lang="ts">
import type { DataTableCreateSummary } from 'naive-ui'
import { data, data2, tableColumns, tableColumns2, tableData, tableData2 } from './data'

const summary: DataTableCreateSummary<typeof tableData[number]> = (rowData) => {
  return {
    t1: {
      colSpan: 4,
      value: '总计',
    },
    t5: {
      value: rowData.reduce((prevValue, row) => prevValue + row.t5, 0),
    },
    t6: {
      value: rowData.reduce((prevValue, row) => prevValue + row.t6, 0),
    },
  }
}
</script>
