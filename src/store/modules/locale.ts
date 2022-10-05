import type { LocaleSetting } from '/#/config'

import { defineStore } from 'pinia'
import { store } from '/@/store'
import type { NDateLocale, NLocale } from 'naive-ui'
import { dateZhCN, zhCN } from 'naive-ui'

import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { createLocalStorage } from '/@/utils/cache'
import { localeSetting } from '/@/settings/localeSetting'

const ls = createLocalStorage()

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

interface NaiveLocale {
  locale: NLocale
  dateLocale: NDateLocale
}

export const useLocaleStore = defineStore('app-locale', () => {
  const state = reactive<LocaleState>({
    localInfo: lsLocaleSetting,
  })

  const getShowPicker = computed(() => !!state.localInfo?.showPicker)
  const getLocale = computed(() => state.localInfo?.locale ?? 'zh_CN')
  const getNaiveLocale = computed<NaiveLocale | null>(() =>
    getLocale.value === 'zh_CN'
      ? {
          locale: zhCN,
          dateLocale: dateZhCN,
        }
      : null,
  )

  /**
   * Set up multilingual information and cache
   * @param info multilingual info
   */
  function setLocaleInfo(info: Partial<LocaleSetting>) {
    state.localInfo = { ...state.localInfo, ...info }
    ls.set(LOCALE_KEY, state.localInfo)
  }

  /**
   * Initialize multilingual information and load the existing configuration from the local cache
   */
  function initLocale() {
    setLocaleInfo({
      ...localeSetting,
      ...state.localInfo,
    })
  }

  return {
    getShowPicker,
    getLocale,
    getNaiveLocale,

    setLocaleInfo,
    initLocale,
  }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
