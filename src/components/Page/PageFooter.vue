<template>
  <div class="overflow-hidden fixed bottom-0 left-0 w-full z-1000">
    <transition name="page-footer-fade" appear>
      <div v-show="getShow" :class="[prefixCls]">
        <div :class="`${prefixCls}__left`">
          <slot name="left" />
        </div>
        <slot />
        <div :class="`${prefixCls}__right`">
          <slot name="right" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Tiny from 'tinycolor2'
import { asyncComputed, promiseTimeout } from '@vueuse/core'

import { useRootSetting } from '/@/composables/setting/useRootSetting'
import { useTransitionSetting } from '/@/composables/setting/useTransitionSetting'
import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal'
import { useDesign } from '/@/composables/web/useDesign'
import { usePageTransitionInject } from '/@/composables/web/useAppInject'

const { prefixCls } = useDesign('page-footer')
const { getIsDarkMode } = useRootSetting()
const { getEnableTransition } = useTransitionSetting()

const { headerColor: fc, footerBorderColor: fbc } = getNaiveCssVars('Layout')
const { footerColor: dark_fc, footerBorderColor: dark_fbc } = getNaiveCssVars('Layout', true)

const getColors = computed(() => {
  const isDark = getIsDarkMode.value
  return {
    color: isDark ? dark_fc : fc,
    backdropColor: Tiny(isDark ? dark_fc : fc)
      .setAlpha(0.25)
      .toRgbString(),
    borderColor: isDark ? dark_fbc : fbc,
  }
})

useCssVars(() => {
  const prefix = 'page-footer'
  const { color, backdropColor, borderColor } = getColors.value
  return {
    [`${prefix}-color`]: color,
    [`${prefix}-backdrop-color`]: backdropColor,
    [`${prefix}-border-color`]: borderColor,
  }
})

const { getPageTranstionState, getPageTranstionName } = usePageTransitionInject()

const getShow = asyncComputed(async () => {
  if (!unref(getEnableTransition) || !unref(getPageTranstionName)) {
    await promiseTimeout(100)
    return true
  }
  if (unref(getPageTranstionState) !== 'running')
    return true
})
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-page-footer';
  @blur: blur(3px);

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 5px 24px;
    line-height: 44px;
    border-top: 1px solid var(--page-footer-border-color);
    transition: background-color var(--app-transition-duration) var(--app-bezier),
      border-color var(--app-transition-duration) var(--app-bezier);

    &__left {
      flex: 1 1;
    }
  }

  @supports (backdrop-filter: @blur) or (-webkit-backdrop-filter: @blur) {
    .@{prefix-cls} {
      background-color: var(--page-footer-backdrop-color);
      -webkit-backdrop-filter: @blur;
      backdrop-filter: @blur;
    }
  }

  @supports not (backdrop-filter: @blur) {
    .@{prefix-cls} {
      background-color: var(--page-footer-color);
    }
  }

  .page-footer-fade-enter-from,
  .page-footer-fade-leave-to {
    opacity: 0;
    transform: translateY(65%);
  }

  .page-footer-fade-enter-active {
    transition: all 0.38s cubic-bezier(0.17, 0.44, 0.23, 0.99);
  }
</style>
