<template>
  <n-card :title="loading ? undefined : title">
    <n-space v-if="loading" vertical>
      <slot name="head-skeleton">
        <n-skeleton v-if="head" :animated="animated" text width="60%" />
      </slot>
      <n-grid v-bind="getLayoutWrapperProps">
        <n-gi v-for="idx in repeat" :key="idx">
          <slot name="child-skeleton" :idx="idx">
            <n-skeleton
              v-bind="getContentSkeletonProps"
              :animated="animated"
              :height="childSkeletonHeight"
            />
          </slot>
        </n-gi>
      </n-grid>
    </n-space>
    <template v-for="item in getCardSlots" :key="item" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { omit } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    head?: boolean
    loading?: boolean
    title?: string
    xGap?: string | number
    yGap?: string | number
    cols?: string | number
    childSkeletonHeight?: string | number
    repeat?: number
    sharp?: boolean
    round?: boolean
    circle?: boolean
    animated?: boolean
  }>(),
  {
    head: true,
    loading: true,
    repeat: 6,
    animated: true,
    xGap: 12,
    yGap: 12,
    cols: 1,
  },
)

const slots = useSlots()
const getCardSlots = computed(() =>
  props.loading ? [] : Object.keys(omit(slots, ['head-skeleton', 'child-skeleton'])),
)

const getLayoutWrapperProps = reactivePick(props, 'xGap', 'yGap', 'cols')
const getContentSkeletonProps = reactivePick(
  props,
  'childSkeletonHeight',
  'sharp',
  'round',
  'circle',
)
</script>
