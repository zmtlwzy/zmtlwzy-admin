<template>
  <PageWrapper
    class="pb-12"
    title="高级表单"
    content=" 高级表单常见于一次性输入和提交大批量数据的场景。"
  >
    <n-card title="仓库管理">
      <BasicForm class="max-w-1200px mx-auto" @register="register" />
    </n-card>
    <n-card title="任务管理" :bordered="false" class="!mt-5">
      <BasicForm class="max-w-1200px mx-auto" @register="registerTask" />
    </n-card>
    <n-card title="成员管理" :bordered="false">
      <PersonTable />
    </n-card>

    <template #rightFooter>
      <n-button type="primary" @click="submitAll"> 提交 </n-button>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { useForm } from '/@/components/Form';
  import useDiscreteApi from '/@/composables/web/useDiscreteApi';
  import PersonTable from './PersonTable.vue';
  import { schemas, taskSchemas } from './data';

  defineOptions({
    name: 'HighFormPage',
  });

  const { message } = useDiscreteApi();

  const [register, { submit, validate }] = useForm({
    gridProps: {
      cols: '1 550:2 800:3',
      xGap: 48,
      yGap: 16,
      responsive: 'self',
    },
    labelPlacement: 'top',
    schemas,
    showActionButtonGroup: false,
    submitFunc: handleSubmit,
  });

  const [registerTask, { submit: submitTaskForm, validate: validateTaskForm }] = useForm({
    gridProps: {
      cols: '1 550:2 800:3',
      xGap: 48,
      yGap: 16,
      responsive: 'self',
    },
    labelPlacement: 'top',
    schemas: taskSchemas,
    showActionButtonGroup: false,
    submitFunc: handleSubmit,
  });

  async function handleSubmit(val: any) {
    message?.info(JSON.stringify(val));
  }

  async function submitAll() {
    try {
      await Promise.all([validate(), validateTaskForm()]);
      submit();
      submitTaskForm();
    } catch (error) {}
  }
</script>
