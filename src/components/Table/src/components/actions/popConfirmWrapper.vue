<template>
  <n-popconfirm v-if="isWrapper" v-bind="getProps">
    <template #trigger>
      <slot />
    </template>
    <template #icon v-if="attrs.icon">
      <Icon :icon="attrs.icon!" />
    </template>
    {{ attrs.title }}
  </n-popconfirm>
  <slot v-else />
</template>

<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { omit } from 'lodash-es';
  import type { PopConfirm } from '../../types/tableAction';
  defineProps({
    isWrapper: Boolean,
  });

  const attrs = useAttrs() as unknown as PopConfirm;

  const getProps = computed(() => {
    return omit(
      {
        showIcon: true,
        ...attrs,
      },
      ['title', 'icon']
    );
  });
</script>
