import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'email',
    component: 'NInput',
    label: '邮箱',
    required: true,
  },
  {
    field: 'nickName',
    component: 'NInput',
    label: '昵称',
    required: true,
  },
  {
    field: 'signature',
    component: 'NInputTextarea',
    label: '个人描述',
  },
  {
    field: 'Country/Region',
    component: 'NSelect',
    label: '国家/地区',
    componentProps: {
      options: [{ label: '中国', value: 0 }],
    },
  },
  {
    field: ['Adress', 'Provincey'],
    component: 'NSelect',
    label: '省市',
    rules: [{ message: '请选择省份' }],
    giProps: {
      span: 1,
    },
    componentProps: {
      options: [
        { value: '11', label: '北京市' },
        { value: '12', label: '天津市' },
        { value: '13', label: '河北省' },
        { value: '14', label: '山西省' },
        { value: '15', label: '内蒙古自治区' },
        { value: '21', label: '辽宁省' },
        { value: '22', label: '吉林省' },
        { value: '23', label: '黑龙江省' },
        { value: '31', label: '上海市' },
        { value: '32', label: '江苏省' },
        { value: '33', label: '浙江省' },
        { value: '34', label: '安徽省' },
        { value: '35', label: '福建省' },
        { value: '36', label: '江西省' },
        { value: '37', label: '山东省' },
        { value: '41', label: '河南省' },
        { value: '42', label: '湖北省' },
        { value: '43', label: '湖南省' },
        { value: '44', label: '广东省' },
        { value: '45', label: '广西壮族自治区' },
        { value: '46', label: '海南省' },
        { value: '50', label: '重庆市' },
        { value: '51', label: '四川省' },
        { value: '52', label: '贵州省' },
        { value: '53', label: '云南省' },
        { value: '54', label: '西藏自治区' },
        { value: '61', label: '陕西省' },
        { value: '62', label: '甘肃省' },
        { value: '63', label: '青海省' },
        { value: '64', label: '宁夏回族自治区' },
        { value: '65', label: '新疆维吾尔自治区' },
        { value: '66', label: '台湾省' },
        { value: '67', label: '香港特别行政区' },
        { value: '68', label: '澳门特别行政区' },
      ],
    },
  },
  {
    field: ['Adress', 'City'],
    label: '',
    component: 'NSelect',
    rules: [{ message: '请选择市区' }],
    giProps: {
      span: 1,
    },
    componentProps: {
      placeholder: '请选择市区',
      options: [{ value: '0', label: '市辖区' }],
    },
  },
  {
    field: ['Adress', 'Street'],
    label: '街道地址',
    component: 'NInput',
  },
  {
    field: 'phone',
    label: '电话号码',
    component: 'NInput',
  },
];

export const SecureList = [
  {
    title: '账户密码',
    description: '当前密码强度: 强',
  },
  {
    title: '密保手机',
    description: '已绑定手机: 181****4793',
  },
  {
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
  },
  {
    title: '备用邮箱',
    description: '已绑定邮箱: zmt***mple.com',
  },
  {
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认m',
  },
];

export const bindList = [
  {
    icon: <i-ant-design-taobao-outlined />,
    iconColor: 'rgb(255, 64, 0)',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
  },
  {
    icon: <i-ion-logo-github />,
    title: '绑定Github',
    description: '当前未绑定Github账号',
  },
  {
    icon: <i-ant-design-alipay-square-filled />,
    iconColor: 'rgb(46, 171, 255)',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
  },
];

export const msgList = [
  {
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];
