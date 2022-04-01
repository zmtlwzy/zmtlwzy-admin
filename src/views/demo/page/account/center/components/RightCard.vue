<template>
  <n-card>
    <n-tabs default-value="1" type="line" @before-leave="handleBeforeLeave">
      <n-tab-pane name="1" tab="文章">
        <n-spin :show="loadingRef">
          <n-empty v-if="loadingRef" class="h-50vh justify-center items-center" />
          <DemoList v-else :bordered="false" :num="9" class="mt-4" />
        </n-spin>
      </n-tab-pane>
      <n-tab-pane name="2" tab="项目">
        <n-spin :show="loadingRef">
          <n-empty v-if="loadingRef" class="h-50vh justify-center items-center" />
          <DemoCard v-else class="mt-4" />
        </n-spin>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
  import DemoList from '/@/views/demo/page/list/components/DemoList.vue';
  import DemoCard from '/@/views/demo/page/list/components/DemoCard.vue';

  const loadingRef = ref(false);
  function handleBeforeLeave() {
    loadingRef.value = true;
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        loadingRef.value = false;
        resolve(true);
      }, 1000);
    });
  }
</script>
