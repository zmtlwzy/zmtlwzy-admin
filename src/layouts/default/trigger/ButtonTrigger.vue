<template>
  <div :class="[prefixCls, { collapsed }]" @click="onClick">
    <i class="icon">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z"
          fill="currentColor"
        />
      </svg>
    </i>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
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

  const {
    siderToggleButtonColor: bg_color,
    siderToggleButtonIconColor: icon_color,
    siderToggleButtonBorder: border,
  } = getNaiveCssVars('Layout');
  const {
    siderToggleBarColor: dark_bg_color,
    siderToggleButtonIconColor: dark_icon_color,
    siderToggleButtonBorder: dark_border,
  } = getNaiveCssVars('Layout', true);

  const { getIsDarkMode } = useRootSetting();

  const getVars = computed(() => {
    const isDark = getIsDarkMode.value;
    return {
      bgColor: isDark ? dark_bg_color : bg_color,
      iconColor: isDark ? dark_icon_color : icon_color,
      border: isDark ? dark_border : border,
    };
  });

  useCssVars(() => {
    const obj = getVars.value;
    return {
      'toggle-button-color': obj.bgColor,
      'toggle-button-icon-color': obj.iconColor,
      'toggle-button-border': obj.border,
    };
  });

  const { prefixCls } = useDesign('layout-toggle-button');
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-toggle-button';

  .@{prefix-cls} {
    transition: color var(--app-transition-duration) var(--app-bezier),
      right var(--app-transition-duration) var(--app-bezier),
      left var(--app-transition-duration) var(--app-bezier),
      border-color var(--app-transition-duration) var(--app-bezier),
      background-color var(--app-transition-duration) var(--app-bezier);
    z-index: 100;
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--toggle-button-icon-color);
    border: var(--toggle-button-border);
    background-color: var(--toggle-button-color);
    box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.06);
    transform: translateX(50%) translateY(-50%);
    .icon {
      transition: transform var(--app-transition-duration) var(--app-bezier);
      transform: rotate(180deg);
    }
    &.collapsed .icon {
      transform: rotate(0);
    }
  }
</style>
