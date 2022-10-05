<template>
  <NTooltip trigger="hover" placement="bottom" :delay="300">
    <template #trigger>
      <span class="app-layout-header-anction-icon" @click="toggle">
        <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" viewBox="64 64 896 896" />
        <i-ant-design-fullscreen-outlined v-else viewBox="64 64 896 896" />
      </span>
    </template>
    {{ getTitle }}
  </NTooltip>
</template>

<script lang="ts">
import { useI18n } from '/@/composables/web/useI18n'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const { t } = useI18n()
    const { toggle, isFullscreen } = useFullscreen()

    const getTitle = computed(() =>
      unref(isFullscreen)
        ? t('layout.header.tooltipExitFull')
        : t('layout.header.tooltipEntryFull'),
    )

    return {
      getTitle,
      isFullscreen,
      toggle,
    }
  },
})
</script>
