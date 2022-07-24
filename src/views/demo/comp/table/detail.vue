<template>
  <PageWrapper
    :title="`表单详情(${isEdit ? '编辑' : '创建'})`"
    content="该页面一般创建或编辑的复杂表单页面，需要在路由中额外添加此页面，唯一不同的是需要配置一些路由meta属性使其菜单激活状态依然在上级页面。"
  >
    <NCard>
      <div class="mx-auto max-w-600px my-4">
        <BasicForm submit-button-text="提交" @register="register" />
      </div>
    </NCard>

    <template #leftFooter>
      <div class="flex-ac">
        <n-button strong quaternary @click="router.go(-1)">
          <template #icon>
            <n-icon :size="14" class="mb-2px">
              <i-material-symbols:arrow-back-ios-rounded />
            </n-icon>
          </template>
          返回
        </n-button>
      </div>
    </template>
    <template #rightFooter>
      <div class="flex-ac space-x-2 py-2">
        <n-button @click="resetFields">
          <template #icon>
            <n-icon :size="16" class="mb-4px">
              <i-tabler:refresh />
            </n-icon>
          </template>
          重置
        </n-button>
        <n-button type="primary" @click="handleSubmit"> 提交 </n-button>
      </div>
    </template>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import useDiscreteApi from '/@/composables/web/useDiscreteApi';
  import { FormSchema } from '/@/components/Form';
  import { useForm } from '/@/components/Form/index';

  const router = useRouter();
  const route = useRoute();
  const { message } = useDiscreteApi();

  const id = computed(() => route.params.id);
  const isEdit = computed(() => !!id.value);

  const actionName = computed(() => {
    return isEdit.value ? '编辑' : '创建';
  });

  const schemas: FormSchema[] = [
    {
      field: 'id',
      component: 'NInput',
      label: 'ID',
      show: () => {
        return isEdit.value;
      },
      componentProps: {
        disabled: true,
        placeholder: '',
      },
    },
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
      field: 'title2',
      component: 'NInput',
      label: '副标题',
      componentProps: {
        placeholder: '给目标起个名字2',
      },
    },
    {
      field: 'title3',
      component: 'NInput',
      label: '次要标题',
      componentProps: {
        placeholder: '给目标起个名字3',
      },
    },
    {
      field: 'dateRange',
      component: 'NDateRangePicker',
      label: '起止日期',
      required: true,
      componentProps: {
        actions: ['clear', 'confirm'],
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

  const [register, { setFieldsValue, submit, validate, resetFields }] = useForm({
    schemas,
    labelWidth: 120,
    showActionButtonGroup: false,
    submitFunc: async (e) => {
      const res = toRaw(e);
      message.info(JSON.stringify(res));
      message.success(`${actionName.value}成功`);
      router.push('/comp/table/basic-table');
    },
  });

  onMounted(async () => {
    const data = {
      id: id.value,
      title: 'heihei',
      title2: 'sdfsdf',
      title3: '78979',
    };
    setFieldsValue(isEdit.value ? data : {});
  });

  async function handleSubmit() {
    try {
      await validate();
      submit();
    } catch (error) {}
  }
</script>
