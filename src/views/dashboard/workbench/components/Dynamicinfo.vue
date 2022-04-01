<template>
  <NCard
    title="最新动态"
    :segmented="{
      content: true,
    }"
  >
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
  </NCard>
</template>

<script lang="ts" setup>
  import { dynamicInfoItems } from './data.json';
</script>

<style lang="less" scoped>
  ::v-deep(a) {
    color: var(--app-primary-color);
    cursor: pointer;
    transition: color var(--app-transition-duration) var(--app-bezier);
  }
</style>
