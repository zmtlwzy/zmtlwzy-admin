<template>
  <n-card :bordered="false">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />

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
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <i-ant-design-plus-outlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <BasicForm :schemas="modelSchemas" @submit="handleSubmit" @reset="handleReset" />

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction, BasicColumn } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { demoListApi } from '/@/api/demo/table';
  import { columns } from './columns';
  import { schemas, modelSchemas } from './data';

  const formRef: any = ref(null);
  const message = useMessage();
  const actionRef = ref();
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });
  const params = ref({
    pageSize: 5,
    name: 'xiaoMa',
  });
  const actionColumn: BasicColumn = {
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    // @ts-ignore
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
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['super'],
          },
          {
            label: '编辑',
            quaternary: true,
            type: 'info',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
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
              return true;
            },
          },
          {
            label: '禁用',
            key: 'disabled',
            ifShow: () => {
              return true;
            },
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  };

  const [register] = useForm({
    gridProps: { cols: '1 sm:2 xl:3', xGap: 24 },
    inline: true,
    schemas,
  });
  function addTable() {
    showModal.value = true;
  }

  const loadDataTable = async (res) => {
    return await demoListApi({ ...formParams, ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('新建成功');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        message.error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }
  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    message.info('点击了编辑');
  }
  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    message.info('点击了删除');
  }
  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }
  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>
