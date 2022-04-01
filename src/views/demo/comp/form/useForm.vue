<template>
  <PageWrapper title="useForm操作示例">
    <template #headerContent>
      <div class="mb-4">
        <n-button class="mr-2" @click="setProps({ labelWidth: 150 })"> 更改labelWidth </n-button>
        <n-button class="mr-2" @click="setProps({ labelWidth: 120 })"> 还原labelWidth </n-button>
        <n-button class="mr-2" @click="setProps({ size: 'large' })"> 更改Size </n-button>
        <n-button class="mr-2" @click="setProps({ size: 'medium' })"> 还原Size </n-button>
        <n-button class="mr-2" @click="setProps({ disabled: true })"> 禁用表单 </n-button>
        <n-button class="mr-2" @click="setProps({ disabled: false })"> 解除禁用 </n-button>
      </div>
    </template>

    <CollapseCard title="useForm示例">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #dynamicSlot="{ model, field }">
          <n-dynamic-input v-model:value="model[field]" :on-create="onCreate" #="{ index, value }">
            <div grid="~ gap-x-4 cols-[auto_1fr]" w-full>
              <n-checkbox
                class="items-center"
                v-model:checked="value.isCheck"
                :label="`第${index + 1}项 :`"
              />
              <n-input-number v-model:value="value.number" />
            </div>
          </n-dynamic-input>
        </template>
      </BasicForm>
    </CollapseCard>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { useMessage } from 'naive-ui';
  import { schemas } from './data';
  import { useForm } from '/@/components/Form';

  const [register, { setProps }] = useForm({
    submitButtonText: '提交',
    gridProps: { cols: 2, xGap: 24 },
    giProps: { span: 2 },
    schemas,
  });

  const { info } = useMessage();
  const handleSubmit = (e) => {
    info(JSON.stringify(e, null, 2));
  };

  const onCreate = (index: number) => {
    return {
      isCheck: false,
      number: index,
    };
  };
</script>
