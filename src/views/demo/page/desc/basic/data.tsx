import type { DataTableBaseColumn } from 'naive-ui'
import { NBadge, NButton, NSpace, NText } from 'naive-ui'

export const data: Record<string, string> = {
  取货单号: '1000000000',
  状态: '已取货',
  销售单号: '1234123421',
  子订单: '3214321432',
}

export const data2: Record<string, string> = {
  用户姓名: '付小小',
  联系电话: '18100000000',
  常用快递: '菜鸟仓储',
  取货地址: '浙江省杭州市西湖区万塘路18号',
  备注: '无',
}

export const tableColumns: DataTableBaseColumn[] = [
  {
    title: '商品编号',
    key: 't1',
    ellipsis: true,
    render: (rowData) => {
      return (
        <NButton text type="info" size="small">
          {() => rowData.t1}
        </NButton>
      )
    },
  },
  {
    title: '商品名称',
    key: 't2',
    ellipsis: true,
  },
  {
    title: '商品条码',
    key: 't3',
    ellipsis: true,
  },
  {
    title: '单价',
    key: 't4',
  },
  {
    title: '数量（件）',
    ellipsis: true,
    key: 't5',
  },
  {
    title: '金额',
    key: 't6',
  },
]

export const tableData = [
  {
    t1: '1234561',
    t2: '矿泉水 550ml',
    t3: '7459721434564521',
    t4: '2.00',
    t5: 5,
    t6: 10.0,
  },
  {
    t1: '1234562',
    t2: '牛奶 250ml',
    t3: '2421432456414321',
    t4: '3.50',
    t5: 2,
    t6: 7.0,
  },
  {
    t1: '1564562',
    t2: '汽水 1L',
    t3: '1242147897214321',
    t4: '3.00',
    t5: 1,
    t6: 3.0,
  },
  {
    t1: '7894562',
    t2: '指甲刀',
    t3: '8416498745498794',
    t4: '9.00',
    t5: 1,
    t6: 9.0,
  },
]

export const tableColumns2: DataTableBaseColumn[] = [
  {
    title: '时间',
    key: 't1',
    ellipsis: true,
  },
  {
    title: '当前进度',
    key: 't2',
    ellipsis: true,
  },
  {
    title: '状态',
    key: 't3',
    render: (rowData) => {
      const isProcess = rowData.t3 === '进行中'
      return (
        <NSpace>
          <NBadge dot type={isProcess ? 'info' : 'success'} processing={isProcess} />
          <NText>{rowData.t3}</NText>
        </NSpace>
      )
    },
  },
  {
    title: '操作员ID',
    key: 't4',
  },
  {
    title: '耗时',
    ellipsis: true,
    key: 't5',
  },
]

export const tableData2 = [
  {
    t1: '2021-8-05 14:10',
    t2: '联系客户',
    t3: '进行中',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2021-7-09 21:10',
    t2: '取货员出发',
    t3: '成功',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2021-2-21 07:10',
    t2: '取货员接单',
    t3: '成功',
    t4: '系统',
    t5: '5mins',
  },
  {
    t1: '2020-9-11 16:10',
    t2: '申请审批通过',
    t3: '成功',
    t4: '用户',
    t5: '1h',
  },
]
