<template>
  <div class="step2">
    <div class="mx-auto max-w-400px">
      <n-alert type="info"> 确认转账后，资金将直接打入对方账户，无法退回。 </n-alert>
      <n-descriptions :column="1" class="mt-5 ml-4">
        <n-descriptions-item label="付款账户"> test@example.com </n-descriptions-item>
        <n-descriptions-item label="收款账户"> zmtlwzy@example.com </n-descriptions-item>
        <n-descriptions-item label="收款人姓名"> Zmtlwzy </n-descriptions-item>
        <n-descriptions-item label="转账金额"> XXX元 </n-descriptions-item>
      </n-descriptions>
      <n-divider />
      <BasicForm @register="register" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useForm } from '/@/components/Form';
  import { step2Schemas } from './data';

  const emits = defineEmits(['next', 'prev']);
  const [register, { validate, setProps }] = useForm({
    labelWidth: 100,
    schemas: step2Schemas,
    gridProps: { cols: 1 },
    resetButtonText: '上一步',
    submitButtonText: '提交',
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });

  async function customResetFunc() {
    emits('prev');
  }

  async function customSubmitFunc() {
    console.log('提交');
    try {
      const values = await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      setTimeout(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
        emits('next', values);
      }, 1500);
    } catch (error) {}
  }
</script>
