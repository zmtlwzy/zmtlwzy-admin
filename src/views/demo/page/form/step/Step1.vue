<template>
  <div>
    <div class="mx-auto max-w-450px">
      <BasicForm @register="register">
        <template #money="{ model, field }">
          <n-input v-model:value="model[field]" #prefix> ￥ </n-input>
        </template>
      </BasicForm>
    </div>
    <n-divider />
    <n-h3 class="text-2xl fw600">说明</n-h3>
    <n-h4 class="fw600">转账到支付宝账户</n-h4>
    <p class="text-sm op70">
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>

    <n-h4 class="fw600">转账到银行卡</n-h4>
    <p class="text-sm op70">
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>
  </div>
</template>
<script setup lang="ts">
  import { step1Schemas } from './data';
  import { useForm } from '/@/components/Form';

  const emit = defineEmits(['next']);

  const [register, { validate }] = useForm({
    labelWidth: 100,
    schemas: step1Schemas,
    showResetButton: false,
    gridProps: { cols: 1 },
    submitButtonText: '下一步',
    submitFunc: customSubmitFunc,
  });

  async function customSubmitFunc() {
    try {
      const values = await validate();
      emit('next', values);
    } catch (error) {}
  }
</script>
