<template>
  <PageWrapper
    title="基础表单"
    content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
  >
    <NCard>
      <div class="mx-auto max-w-600px my-4">
        <BasicForm
          submit-button-text="提交"
          :schemas="schemas"
          :label-width="120"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </div>
    </NCard>
  </PageWrapper>
</template>

<script setup lang="ts">
  import useDiscreteApi from '/@/composables/web/useDiscreteApi';
  import { FormSchema } from '/@/components/Form';

  defineOptions({
    name: 'BaseFromPage',
  });

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'NInput',
      label: '标题',
      required: true,
      componentProps: {
        placeholder: '给目标起个名字',
      },
    },
    {
      field: 'dateRange',
      component: 'NDateRangePicker',
      label: '起止日期',
      componentProps: {
        actions: null,
        updateValueOnClose: true,
      },
    },
    {
      field: 'target',
      component: 'NInputTextarea',
      label: '目标描述',
      componentProps: {
        placeholder: '请输入你的阶段性工作目标',
        rows: 4,
      },
    },
    {
      field: 'metrics',
      component: 'NInputTextarea',
      label: '衡量标准',
      componentProps: {
        rows: 3,
      },
    },
    {
      field: 'client',
      component: 'NInput',
      label: '客户',
      labelMessage: '目标的服务对象',
      subLabel: '( 选填 )',
      componentProps: {
        placeholder: '请描述你服务的客户，内部客户直接 @姓名／工号',
      },
    },
    {
      field: 'inviteer',
      component: 'NInput',
      label: '邀评人',
      subLabel: '( 选填 )',
      componentProps: {
        placeholder: '请直接 @姓名／工号，最多可邀请 5 人',
      },
    },
    {
      field: 'weights',
      component: 'NInputNumber',
      label: '权重',
      subLabel: '( 选填 )',
    },
    {
      field: 'disclosure',
      component: 'NRadioGroup',
      label: '目标公开',
      labelMessage: '客户、邀评人默认被分享',
      defaultValue: '1',
      componentProps: {
        options: [
          {
            label: '公开',
            value: '1',
          },
          {
            label: '部分公开',
            value: '2',
          },
          {
            label: '不公开',
            value: '3',
          },
        ],
      },
    },
    {
      field: 'disclosurer',
      component: 'NSelect',
      label: ' ',
      show: ({ model }) => {
        return model.disclosure === '2';
      },
      componentProps: {
        placeholder: '公开给',
        multiple: true,
        options: [
          {
            label: '同事1',
            value: '1',
          },
          {
            label: '同事2',
            value: '2',
          },
          {
            label: '同事3',
            value: '3',
          },
        ],
      },
    },
  ];

  const { message } = useDiscreteApi();

  function handleSubmit(values: Recordable) {
    console.log(values);
    message?.success(JSON.stringify(values));
  }
  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>
