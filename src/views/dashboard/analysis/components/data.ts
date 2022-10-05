export interface GrowCardItem {
  title: string
  value: number
  total: number
  type: 'default' | 'error' | 'info' | 'success' | 'warning' | 'primary'
  prefix: string
  content: string
  action: string
}

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数',
    value: 2000,
    total: 34878,
    prefix: '',
    content: '日同比78% <b style="color:red">↓</b>',
    type: 'success',
    action: '日',
  },
  {
    title: '成交额',
    value: 1987,
    total: 18986,
    prefix: '¥ ',
    content: '周同比11% <b style="color:green">↑</b>',
    type: 'warning',
    action: '周',
  },
  {
    title: '下载数',
    value: 8000,
    total: 56489,
    prefix: '↓ ',
    content: '月同比98% ~',
    type: 'error',
    action: '月',
  },
  {
    title: '成交数',
    value: 5000,
    total: 48987,
    prefix: '',
    content: '季同比123% <b style="color:green">↑↑</b>',
    type: 'info',
    action: '季',
  },
]
