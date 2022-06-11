import type { DropdownOption } from 'naive-ui';
import type { TabContentProps } from './types';
import type { ComputedRef } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import { MenuEventEnum } from './types';

import { and, not } from '@vueuse/core';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useTabs } from '/@/composables/web/useTabs';
import { useI18n } from '/@/composables/web/useI18n';
import { useHeaderSetting } from '/@/composables/setting/useHeaderSetting';
import { useMenuSetting } from '/@/composables/setting/useMenuSetting';

export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  });

  const { t } = useI18n();
  const tabStore = useMultipleTabStore();
  const { currentRoute } = useRouter();
  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();

  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute);
  });

  const { getShowMenu, setMenuSetting } = useMenuSetting();
  const { getShowHeader, setHeaderSetting } = useHeaderSetting();

  const getIsUnFold = and(not(getShowMenu), not(getShowHeader));

  function handleFold() {
    const isUnFold = getIsUnFold.value;
    setMenuSetting({
      show: isUnFold,
      hidden: !isUnFold,
    });
    setHeaderSetting({ show: isUnFold });
  }

  /**
   * @description: drop-down list
   */
  const getDropMenuList = computed(() => {
    if (!unref(getTargetTab)) {
      return;
    }
    // const { meta } = unref(getTargetTab);
    const { path } = unref(currentRoute);

    const curItem = state.current;

    const isCurItem = curItem ? curItem.path === path : false;

    // Refresh button
    const index = state.currentIndex;
    // const refreshDisabled = !isCurItem;
    // Close left
    const closeLeftDisabled = index === 0 || !isCurItem;

    const disabled = tabStore.getTabList.length === 1;

    // Close right
    const closeRightDisabled =
      !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);

    const dropMenuList: DropdownOption[] = [
      {
        key: MenuEventEnum.TOGGLE_FULL_SCREEN,
        label: t('layout.multipleTab.toggleFullScreen'),
        iconName: getIsUnFold.value
          ? 'i-radix-icons-exit-full-screen'
          : 'i-radix-icons-enter-full-screen',
      },
      {
        type: 'divider',
        key: 'd2',
      },
      {
        key: MenuEventEnum.CLOSE_LEFT,
        label: t('layout.multipleTab.closeLeft'),
        disabled: closeLeftDisabled,
        iconName: 'i-ph:arrow-line-left-bold',
      },
      {
        key: MenuEventEnum.CLOSE_RIGHT,
        label: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        iconName: 'i-ph:arrow-line-right-bold',
      },
      {
        key: MenuEventEnum.CLOSE_OTHER,
        label: t('layout.multipleTab.closeOther'),
        disabled: disabled || !isCurItem,
        iconName: 'i-dashicons:align-center',
      },
      {
        key: MenuEventEnum.CLOSE_ALL,
        label: t('layout.multipleTab.closeAll'),
        disabled,
        iconName: 'i-clarity:minus-line',
      },
    ];

    return getIsTabs.value ? dropMenuList.slice(2) : dropMenuList;
  });

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return;
      }
      e?.preventDefault();
      const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }

  // Handle right click event
  function handleMenuEvent(event: MenuEventEnum): void {
    switch (event) {
      case MenuEventEnum.REFRESH_PAGE:
        // refresh page
        refreshPage();
        break;
      case MenuEventEnum.TOGGLE_FULL_SCREEN:
        handleFold();
        break;
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem);
        break;
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        closeAll();
        break;
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu };
}
