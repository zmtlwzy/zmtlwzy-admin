<template>
  <div>
    <BasicTable
      :columns="columns"
      :show-advanced="false"
      :data="dataRef"
      :pagination="false"
      :can-resize="false"
      :action-column="actionColumn"
      @edit-change="onEditChange"
    >
    </BasicTable>
    <n-button block class="mt-5" dashed @click="handleAdd"> ＋ 新增成员 </n-button>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, TableAction, BasicColumn } from '/@/components/Table';

  const columns: BasicColumn[] = [
    {
      title: '成员姓名',
      key: 'name',
      editComponent: 'NInput',
      editRow: true,
      edit: true,
    },
    {
      title: '工号',
      key: 'no',
      editComponent: 'NInput',
      editRow: true,
      edit: true,
    },
    {
      title: '所属部门',
      key: 'dept',
      editComponent: 'NInput',
      editRow: true,
      edit: true,
    },
  ];

  const actionColumn: BasicColumn = {
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: createActions(record),
      });
    },
  };

  const dataRef = ref([
    {
      name: 'John Brown',
      no: '00001',
      dept: 'New York No. 1 Lake Park',
    },
    {
      name: 'John Brown2',
      no: '00002',
      dept: 'New York No. 2 Lake Park',
    },
    {
      name: 'John Brown3',
      no: '00003',
      dept: 'New York No. 3Lake Park',
    },
  ]);

  const currentEditKeyRef = ref('');

  function createActions(record) {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        onClick: handleCancel.bind(null, record),
      },
    ];
  }

  function handleEdit(record) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }
  function handleCancel(record) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }
  function onEditChange({ column, value, record }) {
    if (column.key === 'id') {
      record.editValueRefs.name4.value = `${value}`;
    }
  }
  async function handleSave(record) {
    const pass = await record.onEdit?.(false, true);
    if (pass) {
      currentEditKeyRef.value = '';
    }
  }

  function handleAdd() {
    const data = dataRef.value;
    const addRow = {
      name: '',
      no: '',
      dept: '',
    };
    data.push(addRow);
  }
</script>
