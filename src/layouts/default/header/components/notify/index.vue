<template>
  <div :class="prefixCls" class="h-full">
    <n-popover trigger="click" class="!p-0" placement="bottom">
      <template #trigger>
        <span class="app-layout-header-anction-icon mr-1 relative">
          <i-ant-design-bell-outlined class="text-$n-text-color" :class="{ 'mt-1': count > 0 }" />
          <n-badge
            :value="count"
            :show="count > 0"
            class="absolute top-1.5"
            :style="getBadgeStyle"
            :max="99"
          />
        </span>
      </template>

      <template #default>
        <NTabs
          v-model:value="nameRef"
          :tab-style="getTabStyle"
          type="line"
          justify-content="space-evenly"
          class="w-20rem"
        >
          <template v-for="(item, index) in listDataRef" :key="item.key">
            <NTabPane :name="index">
              <template #tab>
                <n-space :size="3">
                  <div class="mt-1px">{{ item.name }}</div>
                  <n-badge
                    :value="item.list.filter((i) => !i.read).length"
                    :type="item.badgeType"
                    :max="99"
                    :show="item.list.length !== 0"
                  />
                </n-space>
              </template>
              <NoticeList :list="item.list" :loading="loadingRef" />
            </NTabPane>
          </template>
        </NTabs>
        <div
          v-if="listDataRef[nameRef].list.length > 0"
          class="flex border-t border-$n-divider-color"
        >
          <div class="py-3 text-center cursor-pointer flex-1" @click="handleClear(nameRef)"
            >清空</div
          >
          <div
            v-if="nameRef !== 2"
            class="py-3 text-center cursor-pointer flex-1 border-l border-$n-divider-color"
            @click="handleLoadMore(nameRef)"
            >查看更多</div
          >
        </div>
      </template>
    </n-popover>
  </div>
</template>
<script setup lang="ts">
  import type { CSSProperties } from 'vue';
  import { promiseTimeout } from '@vueuse/core';
  import { cloneDeep } from 'lodash-es';
  import { tabListData } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/composables/web/useDesign';

  const { prefixCls } = useDesign('header-notify');
  const listDataRef = ref(cloneDeep(tabListData));
  const loadingRef = ref(false);
  const nameRef = ref(0);

  const count = computed(() => {
    return listDataRef.value.reduce((pre, cur) => {
      return pre + cur.list.filter((item) => !item.read).length;
    }, 0);
  });

  const getTabStyle = computed((): CSSProperties => {
    return {
      display: 'flex',
      justifyContent: 'center',
      minWidth: '6rem',
    };
  });

  const getBadgeStyle = computed((): CSSProperties => {
    return {
      right: `-${count.value > 9 ? 6 : 1}px`,
    };
  });

  const handleClear = (index: number) => {
    listDataRef.value[index].list = [];
  };

  const handleLoadMore = async (index: number) => {
    const raw = listDataRef.value[index];
    if (raw.list.length > 99) return;
    loadingRef.value = true;
    await promiseTimeout(1000);
    raw.list.push(...tabListData[index].list);
    loadingRef.value = false;
  };
</script>
