<template>
  <RouterView>
    <template #default="{ Component }">
      <transition
        :name="pageTranstionName"
        mode="out-in"
        appear
        @before-enter="handleStart"
        @enter="handleEnter"
        @after-enter="handleEnd"
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="getKey" />
        </keep-alive>
        <component :is="Component" v-else :key="getKey" />
      </transition>
    </template>
  </RouterView>
  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>

<script lang="ts">
import FrameLayout from '/@/layouts/iframe/index.vue'
import { useRootSetting } from '/@/composables/setting/useRootSetting'
import { useTransition } from './useTransition'
import type { PageTranstionState } from './useTransitonContext'
import { createPageTransitionContext } from './useTransitonContext'

export default defineComponent({
  name: 'PageLayout',
  components: { FrameLayout },
  setup() {
    const pageTranstionState = ref<PageTranstionState>('readly')
    const pageTranstionName = ref('fade-slide')

    const { getCanEmbedIFramePage } = useRootSetting()

    createPageTransitionContext({ pageTranstionName, pageTranstionState })

    const { openCache, getCaches, getKey } = useTransition(pageTranstionName)

    const handleStart = () => {
      pageTranstionState.value = 'readly'
    }
    const handleEnter = () => {
      pageTranstionState.value = 'running'
    }
    const handleEnd = () => {
      pageTranstionState.value = 'finshed'
    }

    return {
      openCache,
      getCaches,
      getKey,
      pageTranstionName,
      handleStart,
      handleEnter,
      handleEnd,
      getCanEmbedIFramePage,
    }
  },
})
</script>
