<template>
  <main ref="contentEl" class="transform-gpu transform" :class="[prefixCls]">
    <Loading :show="getShowLoading" />
    <NLayout embedded class="h-full" position="absolute">
      <NScrollbar ref="scrollBarEl" :style="{ maxHeight: `${height}px` }">
        <NBackTop :right="40" :bottom="60" />
        <div class="flex flex-col" :style="{ minHeight: `${height}px` }">
          <div class="flex-1">
            <PageLayout />
          </div>
          <slot name="footer" />
        </div>
      </NScrollbar>
    </NLayout>
  </main>
</template>

<script setup lang="ts">
import type { MaybeElementRef } from '@vueuse/core'
import { promiseTimeout, useElementSize, useResizeObserver } from '@vueuse/core'
import type { ScrollbarInst } from 'naive-ui'
import PageLayout from '/@/layouts/page/index.vue'
import { useDesign } from '/@/composables/web/useDesign'
import { useRootSetting } from '/@/composables/setting/useRootSetting'
import { useTransitionSetting } from '/@/composables/setting/useTransitionSetting'
import { listenerAfterRouteChange } from '/@/logics/mitt/routeChange'
import { useLayoutContentResize } from '/@/logics/mitt/layoutContentResize'
import { createContentSizeContext } from './useContentSizeContext'

defineOptions({
  name: 'LayoutContent',
})

const scrollBarEl = ref<ScrollbarInst>()
const contentEl: MaybeElementRef = ref()

const route = useRoute()
const { prefixCls } = useDesign('layout-content')
const { getOpenPageLoading } = useTransitionSetting()
const { getPageLoading } = useRootSetting()
const { width, height } = useElementSize(contentEl)
const { emit } = useLayoutContentResize()
useResizeObserver(contentEl, emit)
createContentSizeContext({ width, height })

const getShowLoading = computed(() => {
  return getOpenPageLoading.value && !route.meta?.hideLoading && getPageLoading.value
})

listenerAfterRouteChange(async () => {
  const el = scrollBarEl.value
  if (el) {
    await promiseTimeout(300)
    el.scrollTo({ left: 0, top: 0 })
  }
})
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    grid-area: content;
    position: relative;
  }
</style>
