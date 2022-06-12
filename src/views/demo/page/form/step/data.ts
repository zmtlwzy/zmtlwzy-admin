import { FormSchema } from '/@/components/Form';

export const step1Schemas: FormSchema[] = [
  {
    field: 'account',
    component: 'NSelect',
    label: '付款账户',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: 'zmtlwzy@example.com',
          value: '1',
        },
      ],
    },
    rules: [{ required: true }],
  },
  {
    component: 'NInputGroup',
    field: 'fac',
    label: '收款账户',
    childrens: [
      {
        field: 'pay',
        component: 'NSelect',
        defaultValue: 'zfb',
        componentProps: {
          style: { flex: 3 },
          clearable: false,
          options: [
            {
              label: '支付宝',
              value: 'zfb',
            },
            {
              label: '微信',
              value: 'wechat',
            },
          ],
        },
      },
      {
        field: 'fac',
        component: 'NInput',
        defaultValue: 'test@example.com',
        componentProps: {
          style: { flex: 7 },
        },
      },
    ],
    rules: [{ required: true }],
  },

  {
    field: 'payeeName',
    component: 'NInput',
    label: '收款人姓名',
    defaultValue: 'Zmtlwzy',
    rules: [{ required: true }],
  },
  {
    field: 'money',
    component: 'NInput',
    label: '转账金额',
    defaultValue: '500',
    slot: 'money',
    rules: [{ required: true, message: '请输入转账金额' }],
  },
];

export const step2Schemas: FormSchema[] = [
  {
    field: 'pwd',
    component: 'NInput',
    label: '支付密码',
    defaultValue: '123456',
    componentProps: {
      type: 'password',
      'show-password-on': 'mousedown',
    },
    rules: [{ required: true, message: '请输入密码' }],
  },
];
