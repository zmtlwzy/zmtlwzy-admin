<template>
  <div :class="[prefixCls, { collapsed }]" @click="onClick">
    <div :class="`${prefixCls}__top`" />
    <div :class="`${prefixCls}__bottom`" />
  </div>
</template>

<script setup lang="ts">
  import { PropType, useCssVars, computed } from 'vue';
  import { useRootSetting } from '/@/composables/setting/useRootSetting';
  import { useDesign } from '/@/composables/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal';

  defineProps({
    collapsed: propTypes.bool.def(false),
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  });

  const { siderToggleBarColor, siderToggleBarColorHover } = getNaiveCssVars('Layout');
  const {
    siderToggleBarColor: dark_siderToggleBarColor,
    siderToggleBarColorHover: dark_siderToggleBarColorHover,
  } = getNaiveCssVars('Layout', true);

  const { getIsDarkMode } = useRootSetting();
  const getColors = computed(() => {
    const isDark = getIsDarkMode.value;
    return {
      color: isDark ? dark_siderToggleBarColor : siderToggleBarColor,
      hoverColor: isDark ? dark_siderToggleBarColorHover : siderToggleBarColorHover,
    };
  });

  useCssVars(() => ({
    'toggle-bar-color': getColors.value.color,
    'toggle-bar-color-hover': getColors.value.hoverColor,
  }));

  const { prefixCls } = useDesign('layout-toggle-bar');
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-toggle-bar';

  .@{prefix-cls} {
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -28px;
    z-index: 100;
    &__top,
    &__bottom {
      position: absolute;
      width: 4px;
      border-radius: 2px;
      height: 38px;
      left: 14px;
      background-color: var(--toggle-bar-color);
      transition: background-color var(--app-transition-duration) var(--app-bezier),
        transform var(--app-transition-duration) var(--app-bezier);
    }
    &__bottom {
      position: absolute;
      top: 34px;
    }
    &:hover & {
      &__top,
      &__bottom {
        background-color: var(--toggle-bar-color-hover);
      }
      &__top {
        transform: rotate(12deg) scale(1.15) translateY(-2px);
      }
      &__bottom {
        transform: rotate(-12deg) scale(1.15) translateY(2px);
      }
    }

    &.collapsed:hover & {
      &__top {
        transform: rotate(-12deg) scale(1.15) translateY(-2px);
      }
      &__bottom {
        transform: rotate(12deg) scale(1.15) translateY(2px);
      }
    }
  }
</style>
