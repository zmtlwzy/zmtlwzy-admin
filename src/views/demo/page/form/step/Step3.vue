<template>
  <div class="mx-auto flex flex-col items-center">
    <n-result status="success" title="操作成功" description="预计两小时内到账">
      <template #footer>
        <div class="flex-jc space-x-4">
          <n-button type="primary" @click="redo">再转一笔</n-button>
          <n-button>查看账单</n-button>
        </div>
      </template>
    </n-result>
    <div class="px-12 py-6 mt-6 bg-$n-action-color w-2/5 rounded-md">
      <n-descriptions :column="1" class="mt-5" label-placement="left">
        <n-descriptions-item label="付款账户">test@example.com</n-descriptions-item>
        <n-descriptions-item label="收款账户">zmtlwzy@example.com</n-descriptions-item>
        <n-descriptions-item label="收款人姓名">Zmtlwzy</n-descriptions-item>
        <n-descriptions-item label="转账金额">XXX元</n-descriptions-item>
      </n-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emits = defineEmits(['redo']);
  const redo = () => {
    emits('redo');
  };
</script>
