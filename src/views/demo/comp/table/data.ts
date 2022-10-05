import type { FormSchema } from '/@/components/Form/index'

export const schemas: FormSchema[] = [
  {
    field: 'name',
    labelMessage: '这是一个提示',
    component: 'NInput',
    label: '姓名',
    required: true,
    componentProps: {
      onInput: (e: any) => {
        console.log(e)
      },
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
    field: 'makeDate',
    component: 'NDatePicker',
    label: '预约时间',
    defaultValue: 1643135260000,
  },
  {
    field: 'makeTime',
    component: 'NTimePicker',
    label: '停留时间',
  },
  {
    field: 'makeSource',
    component: 'NRadioGroup',
    label: '来源',
    defaultValue: 1,
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
]

export const modelSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '名称',
    required: true,
  },
  {
    field: 'address',
    component: 'NInputTextarea',
    label: '地址',
    required: true,
  },
  {
    field: 'date',
    component: 'NDatePicker',
    label: '日期',
    required: true,
  },
]
