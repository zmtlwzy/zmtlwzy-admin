import type { MenuSetting } from '/#/config';

import { clamp } from 'lodash-es';
import { useAppStore } from '/@/store/modules/app';

import {
  MenuModeEnum,
  MenuTypeEnum,
  TriggerEnum,
  MixSidebarEnum,
  MobileSiderWidthLimits,
} from '/@/enums/menuEnum';
import { useFullContent } from '/@/composables/web/useFullContent';

const tabsAnima = ref(true);
const mixSideHasChildrenRef = ref(false);

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent();
  const appStore = useAppStore();

  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
    );
  });

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  const getMenuType = computed(() => appStore.getMenuSetting.type);

  const getMenuMode = computed(() => appStore.getMenuSetting.mode);

  const getShowMenu = computed(() => {
    const { show } = appStore.getMenuSetting;
    !show
      ? (tabsAnima.value = show)
      : nextTick(() => {
          tabsAnima.value = show;
        });
    return show;
  });

  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  const getMenuRootIndent = computed(() => appStore.getMenuSetting.menuRootIndent);

  const getMenuIndent = computed(() => appStore.getMenuSetting.menuIndent);

  const getTrigger = computed(() => appStore.getMenuSetting.trigger);

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  const getMenuInverted = computed(() => appStore.getMenuSetting.inverted);

  const getSplit = computed(() => appStore.getMenuSetting.split);

  const getMixSideTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger);

  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

  const getCloseMixSidebarOnChange = computed(
    () => appStore.getMenuSetting.closeMixSidebarOnChange
  );

  const getAccordion = computed(() => appStore.getMenuSetting.accordion);

  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle);

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
  });

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false;
    }
    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
  });

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.VERTICAL && unref(getMenuType) === MenuTypeEnum.MIX;
  });

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
  });

  const getMobileWidth = computed(() =>
    clamp(getMenuWidth.value, MobileSiderWidthLimits.MIN, MobileSiderWidthLimits.MAX)
  );

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting;
    return collapsedShowTitle ? MixSidebarEnum.WIDTH : MixSidebarEnum.COLLAPSED_WIDTH;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    tabsAnima,
    mixSideHasChildrenRef,

    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getMenuWidth,
    getRealWidth,
    getMobileWidth,
    getMenuRootIndent,
    getMenuIndent,
    getTrigger,
    getSplit,
    getMixSideFixed,
    getMixSideTrigger,
    getCloseMixSidebarOnChange,
    getMenuTheme,
    getMenuInverted,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getMenuHidden,
    getIsTopMenu,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,

    setMenuSetting,
    toggleCollapsed,
  };
}
