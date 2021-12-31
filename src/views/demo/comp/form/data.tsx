import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '姓名',
    labelMessage: '这是一个提示',
    required: true,
    componentProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
    },
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '类型一',
          value: 1,
        },
        {
          label: '类型二',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'date',
    component: 'NDatePicker',
    label: '预约时间',
    defaultValue: 1663135260000,
  },
  {
    field: 'time',
    component: 'NTimePicker',
    label: '运行时长',
  },
  {
    field: 'project',
    component: 'NCheckbox',
    label: '预约项目',
    giProps: { span: 1 },
    defaultValue: [1, 3],
    componentProps: {
      placeholder: '请选择预约项目',
      options: [
        {
          label: '项目一',
          value: 1,
        },
        {
          label: '项目二',
          value: 2,
        },
        {
          label: '项目三',
          value: 3,
        },
      ],
    },
  },
  {
    field: 'source',
    component: 'NRadioGroup',
    label: '来源',
    subLabel: '(单选)',
    defaultValue: 1,
    giProps: { span: 1 },
    componentProps: {
      options: [
        {
          label: '来源一',
          value: 1,
        },
        {
          label: '来源二',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'dynamic',
    label: '动态表单',
    // 插槽
    slot: 'dynamicSlot',
  },
];
