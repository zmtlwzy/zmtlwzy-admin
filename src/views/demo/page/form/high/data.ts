import { FormSchema } from '/@/components/Form';

const basicOptions: LabelValueOptions = [
  {
    label: '张三',
    value: '1',
  },
  {
    label: '李四',
    value: '2',
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'f1',
    component: 'NInput',
    label: '仓库名',
  },
  {
    field: 'f2',
    component: 'NInputGroup',
    label: '仓库域名',
    childrens: [
      {
        field: 'f2',
        component: 'NInputGroupLabel',
        isFull: false,
        defaultSlot: 'http://',
      },
      {
        field: 'f2',
        component: 'NInput',
      },
      {
        field: 'f2',
        component: 'NInputGroupLabel',
        isFull: false,
        defaultSlot: '.com',
      },
    ],
  },
  {
    field: 'f3',
    component: 'NSelect',
    label: '仓库管理员',
    componentProps: {
      options: basicOptions,
    },
  },
  {
    field: 'f4',
    component: 'NSelect',
    label: '审批人',
    componentProps: {
      options: basicOptions,
    },
  },
  {
    field: 'f5',
    component: 'NDateRangePicker',
    label: '生效日期',
    componentProps: {
      type: 'daterange',
    },
  },
  {
    field: 'f6',
    component: 'NSelect',
    label: '仓库类型',
    required: true,
    componentProps: {
      options: storeTypeOptions,
    },
  },
  {
    field: 'f7',
    component: 'NInputGroup',
    label: '结束时间',
    childrens: [
      {
        field: ['f7', 'date'],
        component: 'NDatePicker',
      },
      {
        field: ['f7', 'time'],
        component: 'NTimePicker',
      },
    ],
  },
  {
    field: 'f8',
    component: 'NInput',
    label: '仓库描述',
    giProps: {
      span: 2,
    },
    componentProps: {
      type: 'textarea',
      placeholder: '自动调整尺寸',
      autosize: {
        minRows: 2,
        maxRows: 5,
      },
      size: 'small',
    },
  },
];

export const taskSchemas: FormSchema[] = [
  {
    field: 't1',
    component: 'NInput',
    label: '任务名',
  },
  {
    field: 't2',
    component: 'NInput',
    label: '任务描述',
  },
  {
    field: 't3',
    component: 'NSelect',
    label: '执行人',
    componentProps: {
      options: basicOptions,
    },
  },
  {
    field: 't4',
    component: 'NSelect',
    label: '责任人',
    // required: true,
    componentProps: {
      options: basicOptions,
    },
  },
  {
    field: 't5',
    component: 'NTimePicker',
    label: '生效日期',
    // required: true,
  },
  {
    field: 't6',
    component: 'NSelect',
    label: '任务类型',
    // required: true,
    componentProps: {
      options: storeTypeOptions,
    },
  },
];
