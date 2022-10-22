<template>
  <n-card :bordered="false">
    <BasicForm @register="registerFilterForm" @submit="handleSubmit" @reset="handleReset" />

    <BasicTable
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      :pagination="{ pageSizes: [5, 10, 15] }"
      :can-resize="true"
      :action-column="actionColumn"
      :scroll-x="1090"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #tableTitle>
        <n-button type="primary" class="mr-2" @click="handleOpenModal()">
          <template #icon>
            <n-icon>
              <i-ant-design-plus-outlined />
            </n-icon>
          </template>
          弹窗创建
        </n-button>
        <n-button type="primary" @click="router.push('/comp/table/basic-table-detail')">
          <template #icon>
            <n-icon>
              <i-ant-design-plus-outlined />
            </n-icon>
          </template>
          页面创建
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">
          刷新数据
        </n-button>
      </template>
    </BasicTable>

    <TheModal @register="modalRegister" @refresh-list="loadDataTable" />
  </n-card>
</template>

<script lang="ts" setup>
import useDiscreteApi from '/@/composables/web/useDiscreteApi'
import type { BasicColumn } from '/@/components/Table'
import { useForm } from '/@/components/Form'
import { BasicTable, TableAction } from '/@/components/Table'
import { useModal } from '/@/components/Modal'
import { demoListApi } from '/@/api/demo/table'
import { columns } from './columns'
import { filterSchemas } from './schemas'
import TheModal from './modal.vue'

const router = useRouter()
const { message } = useDiscreteApi()
const actionRef = ref()
const formParams = reactive({
  name: '',
  address: '',
  date: null,
})
const params = ref({
  pageSize: 5,
  name: 'xiaoMa',
})
const actionColumn: BasicColumn = {
  width: 300,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction, {
      style: 'button',
      actions: [
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          quaternary: true,
          type: 'error',
          popConfirm: {
            title: '真的要删除吗？',
            icon: 'ic:outline-delete-outline',
            onPositiveClick: handleDelete.bind(null, record),
          },
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['super'],
        },
        {
          label: '弹窗编辑',
          quaternary: true,
          type: 'info',
          onClick: handleDialogEdit.bind(null, record),
        },
        {
          label: '编辑',
          quaternary: true,
          type: 'info',
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true
          },
          auth: ['super'],
        },
      ],
      dropDownActions: [
        {
          label: '启用',
          key: 'enabled',
          // 根据业务控制是否显示: 非enable状态的不显示启用按钮
          ifShow: () => {
            return true
          },
        },
        {
          label: '禁用',
          key: 'disabled',
          ifShow: () => {
            return true
          },
        },
      ],
      select: (key) => {
        message?.info(`您点击了，${key} 按钮`)
      },
    })
  },
}

const [modalRegister, { openModal, setModalProps }] = useModal()

const [registerFilterForm] = useForm({
  gridProps: { cols: '1 sm:2 xl:3', xGap: 24 },
  inline: true,
  schemas: filterSchemas,
})

function handleOpenModal(rowData?: any) {
  openModal(true, rowData)
  setModalProps({
    title: `${rowData ? '编辑' : '创建'}数据`,
  })
}

const loadDataTable = async (res) => {
  return await demoListApi({ ...formParams, ...params.value, ...res })
}

function onCheckedRow(rowKeys) {
  console.log(rowKeys)
}

function reloadTable() {
  actionRef.value.reload()
}

function handleDialogEdit(record: Recordable) {
  console.log(record, 'record')
  handleOpenModal(record)
}
function handleEdit(record: Recordable) {
  console.log('点击了编辑', record)
  // message.info('点击了编辑');
  router.push(`/comp/table/basic-table-detail/${record.id}`)
}
function handleDelete(record: Recordable) {
  console.log('点击了删除', record)
  message.info('点击了删除')
}
function handleSubmit(values: Recordable) {
  console.log(values)
  reloadTable()
}
function handleReset(values: Recordable) {
  console.log(values)
}
</script>
