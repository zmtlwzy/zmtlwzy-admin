<script setup lang="ts">
  import { useCssVar, useBreakpoints } from '@vueuse/core';
  import { kebabCase } from 'lodash-es';
  import { useThemeVars } from 'naive-ui';

  import { createAppProviderContext } from './useAppContext';
  import { prefixCls as _prefixCls } from '/@/settings/designSetting';
  import { useAppStore } from '/@/store/modules/app';

  import initDarkMode from '/@/composables/web/useChaneTheme';
  import { useTitle } from '/@/composables/web/useTitle';
  import { getBreakpoint, sizeEnum } from '/@/enums/breakpointEnum';
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

  const props = defineProps({
    prefixCls: { type: String, default: _prefixCls },
  });

  const el = document.documentElement;
  const prefix = '--app';

  const isMobile = ref(false);
  const isSetState = ref(false);

  const appStore = useAppStore();

  // Monitor screen breakpoint information changes
  const breakpoints = useBreakpoints(getBreakpoint);

  watch(
    breakpoints.smaller(sizeEnum.LG),
    (val) => {
      isMobile.value = val;
      handleRestoreState();
    },
    { immediate: true }
  );

  const { prefixCls } = toRefs(props);
  // Inject variables into the global
  createAppProviderContext({ prefixCls, isMobile });

  const themeVars = useThemeVars();

  const cssVarsMap = new Map();

  const cssVarsList: [string, string?][] = [
    ['primaryColor'],
    ['primaryColorHover'],
    ['primaryColorPressed'],
    ['primaryColorSuppl'],
    ['textColorBase', 'textColor'],
    ['textColor1'],
    ['textColor2'],
    ['textColor3'],
    ['bodyColor'],
    ['borderColor'],
    ['hoverColor'],
    ['pressedColor'],
    ['cubicBezierEaseInOut', 'bezier'],
    ['cubicBezierEaseIn', 'bezier-in'],
    ['cubicBezierEaseOut', 'bezier-out'],
  ];

  useCssVar(`${prefix}-transition-duration`, el).value = '.3s';
  for (const item of cssVarsList) {
    cssVarsMap.set(...genCssVarMapParameters(...item));
  }
  function genCssVarMapParameters(keyName: string, alias?: string) {
    return [useCssVar(`${prefix}-${kebabCase(alias ?? keyName)}`, el), keyName] as const;
  }

  watch(
    themeVars,
    (list) => {
      for (const [key, val] of cssVarsMap) {
        key.value = list[val] ?? val;
      }
    },
    { immediate: true }
  );

  initDarkMode();
  // Listening to page changes and dynamically changing site titles
  useTitle();

  // window.$loadingBar = useLoadingBar();

  function handleRestoreState() {
    if (unref(isMobile)) {
      if (!unref(isSetState)) {
        isSetState.value = true;
        const {
          menuSetting: {
            type: menuType,
            mode: menuMode,
            collapsed: menuCollapsed,
            split: menuSplit,
          },
        } = appStore.getProjectConfig;
        appStore.setProjectConfig({
          menuSetting: {
            type: MenuTypeEnum.SIDEBAR,
            mode: MenuModeEnum.VERTICAL,
            split: false,
          },
        });
        appStore.setBeforeMiniInfo({
          menuMode,
          menuCollapsed,
          menuType,
          menuSplit,
        });
      }
    } else if (unref(isSetState)) {
      isSetState.value = false;
      const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo;
      appStore.setProjectConfig({
        menuSetting: {
          type: menuType,
          mode: menuMode,
          collapsed: menuCollapsed,
          split: menuSplit,
        },
      });
    }
  }
</script>

<template>
  <slot />
</template>
