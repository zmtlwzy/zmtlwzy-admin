<template>
  <div v-show="getShowSideBar" :class="prefixCls" :style="getSiderStyle">
    <div class="flex flex-col h-full">
      <AppLogo
        v-if="getIsSidebarType"
        class="*vs-layout h-64px"
        :collapsed="getCollapsed"
        :title-color="getMenuInverted ? 'white' : undefined"
      />
      <div ref="scrollEl" class="flex-1">
        <NScrollbar
          :builtin-theme-overrides="scrollBarThemeOverrides"
          :style="getSideBarSrollStyle"
        >
          <LayoutMenu :menu-mode="getMode" :split-type="getSplitType" :inverted="getInverted" />
        </NScrollbar>
      </div>
    </div>
    <Trigger v-if="getShowTrigger" :collapsed="getCollapsed" :type="getTrigger" />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, CSSProperties } from 'vue';
  import { useElementSize, MaybeElementRef } from '@vueuse/core';
  import { useTrigger } from './useLayoutSider';
  import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

  import LayoutMenu from '../menu/index.vue';
  import Trigger from '../trigger/index.vue';

  import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal';

  import { useDesign } from '/@/composables/web/useDesign';
  import { useAppInject } from '/@/composables/web/useAppInject';
  import { useRootSetting } from '/@/composables/setting/useRootSetting';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';

  const { prefixCls } = useDesign('layout-sideBar');
  const { getIsMobile } = useAppInject();
  const { getShowTrigger } = useTrigger(getIsMobile);

  const { getIsDarkMode } = useRootSetting();
  const {
    getTrigger,
    getCollapsed,
    getRealWidth,
    getMenuHidden,
    getMenuInverted,
    getIsSidebarType,
    getSplit,
  } = useMenuSetting();

  const scrollEl: MaybeElementRef = ref();

  const { height } = useElementSize(scrollEl);
  const getSideBarSrollStyle = computed(() => ({
    maxHeight: `${height.value}px`,
  }));

  const { color, colorHover } = getNaiveCssVars('Scrollbar', true);
  const scrollBarThemeOverrides = computed(() => {
    return getMenuInverted.value ? { color, colorHover } : undefined;
  });

  const getSplitType = computed(() => {
    return getSplit.value ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
  });

  const getMode = computed(() => {
    return getSplit.value ? MenuModeEnum.VERTICAL : null;
  });

  const getShowSideBar = computed(() => {
    return getSplit.value ? !getMenuHidden.value : true;
  });

  const getInverted = computed(() => getMenuInverted.value && !getSplit.value);

  const {
    siderColor: sc,
    siderColorInverted: sci,
    siderBorderColor: sbc,
    siderBorderColorInverted: sbci,
  } = getNaiveCssVars('Layout');
  const { siderColor: dark_sc, siderBorderColor: dark_sbc } = getNaiveCssVars('Layout', true);
  const getSiderStyle = computed((): CSSProperties => {
    let colorObj: CSSProperties = {};
    if (getIsDarkMode.value) {
      colorObj = {
        backgroundColor: dark_sc,
        borderColor: dark_sbc,
      };
    } else if (!getIsDarkMode.value && getInverted.value) {
      colorObj = {
        backgroundColor: sci,
        borderColor: sbci,
      };
    } else {
      colorObj = {
        backgroundColor: sc,
        borderColor: sbc,
      };
    }
    return {
      width: `${getIsMobile.value ? '240' : getRealWidth.value}px`,
      ...colorObj,
    };
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sideBar';

  .@{prefix-cls} {
    grid-area: sider;
    height: 100%;
    position: relative;
    border-right-width: 1px;
    transition: all var(--app-transition-duration) var(--app-bezier);
  }
</style>
