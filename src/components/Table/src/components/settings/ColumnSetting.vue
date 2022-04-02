<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <div class="cursor-pointer table-toolbar-right-icon">
        <n-popover trigger="click" :width="230" class="toolbar-popover" placement="bottom-end">
          <template #trigger>
            <n-icon size="18">
              <i-ant-design-setting-outlined />
            </n-icon>
          </template>
          <template #header>
            <div class="table-toolbar-inner-popover-title">
              <n-space>
                <n-checkbox v-model:checked="checkAll" @update:checked="onCheckAll"
                  >列展示</n-checkbox
                >
                <n-checkbox v-model:checked="selection" @update:checked="onSelection"
                  >勾选列</n-checkbox
                >
                <n-button text type="primary" size="small" class="mt-1" @click="resetColumns"
                  >重置</n-button
                >
              </n-space>
            </div>
          </template>
          <div class="table-toolbar-inner">
            <n-checkbox-group v-model:value="checkList" @update:value="onChange">
              <SlickList
                v-model:list="columnsList"
                use-drag-handle
                lock-to-container-edges
                :lock-offset="[8, 8]"
                axis="y"
                lock-axis="y"
                helper-class="shadow"
                :dragged-settling-duration="150"
                @sort-start="dragStart"
                @update:list="dragEnd"
              >
                <SlickItem
                  v-for="(item, i) in columnsList"
                  :key="item.key"
                  :index="i"
                  class="table-toolbar-inner-checkbox"
                >
                  <span v-handle class="drag-icon">
                    <i-mdi-drag class="text-18px text-$app-text-color-3" />
                  </span>
                  <n-checkbox :value="item.key" :label="item.title" />
                </SlickItem>
              </SlickList>
            </n-checkbox-group>
          </div>
        </n-popover>
      </div>
    </template>
    <span>列设置</span>
  </n-tooltip>
</template>

<script lang="ts">
  import {
    ref,
    defineComponent,
    reactive,
    unref,
    toRaw,
    toRefs,
    watchEffect,
    onUnmounted,
  } from 'vue';
  import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';
  import { cloneDeep } from 'lodash-es';
  import { useTableContext } from '../../hooks/useTableContext';

  interface Options {
    title: string;
    key: string;
  }
  export default defineComponent({
    name: 'ColumnSetting',
    components: { SlickList, SlickItem },
    directives: { handle: HandleDirective },
    setup() {
      const table: any = useTableContext();
      const columnsList = ref<Options[]>([]);
      const cacheColumnsList = ref<Options[]>([]);
      const state = reactive({
        selection: false,
        checkAll: true,
        checkList: [],
        defaultCheckList: [],
      });
      // const getSelection = computed(() => {
      //   return state.selection;
      // });
      watchEffect(() => {
        const columns = table.getColumns();
        if (columns.length) {
          init();
        }
      });
      // 初始化
      function init() {
        const columns: any[] = getColumns();
        const checkList: any = columns.map((item) => item.key);
        state.checkList = checkList;
        state.defaultCheckList = checkList;
        const newColumns = columns.filter((item) => item.key != 'action' && item.title != '操作');
        if (!columnsList.value.length) {
          columnsList.value = cloneDeep(newColumns);
          cacheColumnsList.value = cloneDeep(newColumns);
        }
      }
      // 切换
      function onChange(checkList) {
        if (state.selection) {
          checkList.unshift('selection');
        }
        setColumns(checkList);
      }
      // 设置
      function setColumns(columns) {
        table.setColumns(columns);
      }
      // 获取
      function getColumns() {
        const newRet: any[] = [];
        table.getColumns().forEach((item) => {
          newRet.push({ ...item });
        });
        return newRet;
      }
      // 重置
      function resetColumns() {
        state.checkList = [...state.defaultCheckList];
        state.checkAll = true;
        const cacheColumnsKeys: any[] = table.getCacheColumns();
        const newColumns = cacheColumnsKeys.map((item) => {
          return {
            ...item,
          };
        });
        setColumns(newColumns);
        columnsList.value = newColumns;
      }
      // 全选
      function onCheckAll(e) {
        const checkList = table.getCacheColumns(true);
        if (e) {
          setColumns(checkList);
          state.checkList = checkList;
        } else {
          setColumns([]);
          state.checkList = [];
        }
      }
      // 拖拽排序
      function dragStart() {
        document.body.style.cursor = 'move';
      }
      function dragEnd() {
        const newColumns = toRaw(unref(columnsList));
        columnsList.value = newColumns;
        setColumns(newColumns);
        document.body.style.cursor = '';
      }
      onUnmounted(() => {
        document.body.style.cursor = '';
      });
      // 勾选列
      function onSelection(e) {
        const checkList = table.getCacheColumns();
        if (e) {
          checkList.unshift({ type: 'selection', key: 'selection' });
          setColumns(checkList);
        } else {
          checkList.splice(0, 1);
          setColumns(checkList);
        }
      }

      return {
        ...toRefs(state),
        columnsList,
        onChange,
        onCheckAll,
        onSelection,
        resetColumns,
        dragEnd,
        dragStart,
      };
    },
  });
</script>

<style lang="less">
  .table-toolbar {
    &-inner-popover-title {
      padding: 3px 0;
    }

    &-right {
      &-icon {
        margin-left: 12px;
        font-size: 16px;
        color: var(--text-color);
        cursor: pointer;

        :hover {
          color: var(--app-primary-color);
        }
      }
    }
  }

  .shadow {
    box-shadow: 1px 0 8px rgba(0, 0, 0, 0.1);
  }

  .table-toolbar-inner {
    &-checkbox {
      display: flex;
      align-items: center;
      padding: 10px 14px;
      z-index: 9999;

      &:hover {
        background-color: var(--app-hover-color);
      }

      .drag-icon {
        cursor: move;
        display: inline-flex;
        margin-right: 8px;
      }
    }
  }

  .toolbar-popover {
    .n-popover__content {
      padding: 0;
    }
  }
</style>
