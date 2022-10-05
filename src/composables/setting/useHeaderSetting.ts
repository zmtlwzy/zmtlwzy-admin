import type { HeaderSetting } from '/#/config'

import { useAppStore } from '/@/store/modules/app'

import { useMenuSetting } from '/@/composables/setting/useMenuSetting'
import { useRootSetting } from '/@/composables/setting/useRootSetting'
import { MenuModeEnum } from '/@/enums/menuEnum'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const {
    getMenuMode,
    getSplit,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsMixSidebar,
    //   getIsTopMenu,
  } = useMenuSetting()
  const { getShowBreadCrumb, getShowLogo } = useRootSetting()

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  const getHeaderHeight = computed(() => appStore.getHeaderSetting.height)

  const getShowBread = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
    )
  })

  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar)
  })

  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger)
  })

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting })
  }
  return {
    setHeaderSetting,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getHeaderHeight,
  }
}
