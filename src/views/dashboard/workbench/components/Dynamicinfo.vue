<template>
  <LoadingCard
    title="最新动态"
    :segmented="{
      content: true,
    }"
    :loading="isLoading"
  >
    <template #head-skeleton>
      <div class="flex-jb mb-8">
        <n-skeleton width="20%" height="22px" />
        <n-skeleton width="36px" height="10px" />
      </div>
    </template>
    <template #child-skeleton="{ idx }">
      <div class="flex gap-6">
        <n-skeleton :sharp="false" height="36px" width="36px" />
        <div class="flex flex-col gap-2 mb-4 flex-1">
          <n-skeleton round height="12px" :width="`${60 - Math.random() * 30}%`" />
          <n-skeleton round height="12px" :width="`${Math.random() * 20 + idx * 2}%`" />
        </div>
      </div>
    </template>
    <template #header-extra>
      <i-akar-icons-more-vertical class="text-18px cursor-pointer" />
    </template>
    <NList>
      <NListItem v-for="(item, index) in dynamicInfoItems" :key="index">
        <NThing>
          <template #avatar>
            <NAvatar :size="28">
              <i-bx-bxs-user />
            </NAvatar>
          </template>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <template #header> {{ item.name }} <span v-html="item.desc" /></template>
          <template #description>
            <span class="text-$app-text-color-3">{{ item.date }}</span>
          </template>
        </NThing>
      </NListItem>
    </NList>
  </LoadingCard>
</template>

<script lang="ts" setup>
  import { dynamicInfoItems } from './data.json';
  import { useLoading } from './useLoading';

  const isLoading = useLoading();
</script>

<style lang="less" scoped>
  ::v-deep(a) {
    color: var(--app-primary-color);
    cursor: pointer;
    transition: color var(--app-transition-duration) var(--app-bezier);
  }
</style>
