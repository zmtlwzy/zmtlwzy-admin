<template>
  <div class="md:flex">
    <NGrid cols="1 500:2 800:3 1000:4" x-gap="16" y-gap="16">
      <NGridItem v-for="item in growCardList" :key="item.title">
        <NCard
          size="small"
          :title="item.title"
          :segmented="{
            content: true,
          }"
        >
          <template #header-extra>
            <NTag :type="item.type">{{ item.action }}</NTag>
          </template>

          <div class="py-4 px-4 flex justify-between items-center">
            <CountTo
              :autoplay="true"
              :is-play="!isLoading"
              :prefix="item.prefix"
              :end-val="item.value"
              class="text-2xl"
            />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="text-$app-text-color-3" v-html="item.content" />
          </div>

          <div class="p-2 px-4 flex justify-between">
            <span>总{{ item.title }}</span>
            <CountTo :is-play="!isLoading" :prefix="item.prefix" :end-val="item.total" />
          </div>
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>
<script lang="ts" setup>
  import CountTo from '/@/components/CountTo/CountTo.vue';
  import { growCardList } from './data';
  import { useLoading } from './useLoading';

  const [isLoading] = useLoading();
</script>
