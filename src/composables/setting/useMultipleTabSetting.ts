import type { MultiTabsSetting } from '/#/config'

import { useAppStore } from '/@/store/modules/app'

export function useMultipleTabSetting() {
  const appStore = useAppStore()

  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show)

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting })
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
  }
}
