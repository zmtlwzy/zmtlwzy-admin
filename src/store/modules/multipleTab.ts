import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { useGo, useRedo } from '/@/composables/web/usePage'
import { Persistent } from '/@/utils/cache/persistent'
import { PageEnum } from '/@/enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic'
import { getRawRoute } from '/@/utils'
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/projectSetting'
import { useUserStore } from '/@/store/modules/user'

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}

function handleGotoPage(router: Router) {
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {},
  }
}

const cacheTab = projectSetting.multiTabsSetting.cache

export const useMultipleTabStore = defineStore('app-multiple-tab', () => {
  const state = reactive<MultipleTabState>({
    // Tabs that need to be cached
    cacheTabList: new Set(),
    // multiple tab list
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    // Index of the last moved tab
    lastDragEndIndex: 0,
  })

  const getTabList = computed(() => state.tabList)
  const getCachedTabList = computed(() => Array.from(state.cacheTabList))
  const getLastDragEndIndex = computed(() => state.lastDragEndIndex)

  async function updateCacheTab() {
    const cacheMap: Set<string> = new Set()

    for (const tab of state.tabList) {
      const item = getRawRoute(tab)
      // Ignore the cache
      const needCache = !item.meta?.ignoreKeepAlive
      if (!needCache)
        continue

      const name = item.name as string
      cacheMap.add(name)
    }
    state.cacheTabList = cacheMap
  }

  /**
   * Refresh tabs
   */
  async function refreshPage(router: Router) {
    const { currentRoute } = router
    const route = unref(currentRoute)
    const { name } = route

    const findTab = getCachedTabList.value.find(item => item === name)
    if (findTab)
      state.cacheTabList.delete(findTab)

    const redo = useRedo(router)
    await redo()
  }

  function clearCacheTabs() {
    state.cacheTabList = new Set()
  }

  function resetState() {
    state.tabList = []
    clearCacheTabs()
  }

  function goToPage(router: Router) {
    const go = useGo(router)
    const len = state.tabList.length
    const { path } = unref(router.currentRoute)

    let toPath: PageEnum | string = PageEnum.BASE_HOME

    if (len > 0) {
      const page = state.tabList[len - 1]
      const p = page.fullPath || page.path
      if (p)
        toPath = p
    }
    // Jump to the current page and report an error
    path !== toPath && go(toPath as PageEnum, true)
  }

  async function addTab(route: RouteLocationNormalized) {
    const { path, name, fullPath, params, query } = getRawRoute(route)
    // 404  The page does not need to add a tab
    if (
      path === PageEnum.ERROR_PAGE
      || path === PageEnum.BASE_LOGIN
      || !name
      || [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
    )
      return

    let updateIndex = -1
    // Existing pages, do not add tabs repeatedly
    const tabHasExits = state.tabList.some((tab, index) => {
      updateIndex = index
      return (tab.fullPath || tab.path) === (fullPath || path)
    })

    // If the tab already exists, perform the update operation
    if (tabHasExits) {
      const curTab = toRaw(state.tabList)[updateIndex]
      if (!curTab)
        return

      curTab.params = params || curTab.params
      curTab.query = query || curTab.query
      curTab.fullPath = fullPath || curTab.fullPath
      state.tabList.splice(updateIndex, 1, curTab)
    }
    else {
      // Add tab
      state.tabList.push(route)
    }
    updateCacheTab()
    cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, state.tabList)
  }

  async function closeTab(tab: RouteLocationNormalized, router: Router) {
    const close = (route: RouteLocationNormalized) => {
      const { fullPath, meta: { affix } = {} } = route
      if (affix)
        return

      const index = state.tabList.findIndex(item => item.fullPath === fullPath)
      index !== -1 && state.tabList.splice(index, 1)
    }

    const { currentRoute, replace } = router

    const { path } = unref(currentRoute)
    if (path !== tab.path) {
      // Closed is not the activation tab
      close(tab)
      return
    }

    // Closed is activated atb
    let toTarget: RouteLocationRaw = {}

    const index = state.tabList.findIndex(item => item.path === path)

    // If the current is the leftmost tab
    if (index === 0) {
      // There is only one tab, then jump to the homepage, otherwise jump to the right tab
      if (state.tabList.length === 1) {
        const userStore = useUserStore()
        toTarget = userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        // toTarget = PageEnum.BASE_HOME;
      }
      else {
        //  Jump to the right tab
        const page = state.tabList[index + 1]
        toTarget = getToTarget(page)
      }
    }
    else {
      // Close the current tab
      const page = state.tabList[index - 1]
      toTarget = getToTarget(page)
    }
    close(currentRoute.value)
    await replace(toTarget)
  }

  // Close according to key
  async function closeTabByKey(key: string, router: Router) {
    const index = state.tabList.findIndex(item => (item.fullPath || item.path) === key)
    if (index !== -1) {
      await closeTab(state.tabList[index], router)
      const { currentRoute, replace } = router
      // 检查当前路由是否存在于tabList中
      const isActivated = state.tabList.findIndex((item) => {
        return item.fullPath === currentRoute.value.fullPath
      })
      // 如果当前路由不存在于TabList中，尝试切换到其它路由
      if (isActivated === -1) {
        let pageIndex
        if (index > 0)
          pageIndex = index - 1
        else if (index < state.tabList.length - 1)
          pageIndex = index + 1
        else
          pageIndex = -1

        if (pageIndex >= 0) {
          const page = state.tabList[index - 1]
          const toTarget = getToTarget(page)
          await replace(toTarget)
        }
      }
    }
  }

  /* // Sort the tabs
  async function sortTabs(oldIndex: number, newIndex: number) {
    const currentTab = state.tabList[oldIndex];
    state.tabList.splice(oldIndex, 1);
    state.tabList.splice(newIndex, 0, currentTab);
    state.lastDragEndIndex = state.lastDragEndIndex + 1;
  } */

  // Close the tab on the right and jump
  async function closeLeftTabs(route: RouteLocationNormalized, router: Router) {
    const index = state.tabList.findIndex(item => item.path === route.path)
    console.log('close')
    if (index > 0) {
      const leftTabs = state.tabList.slice(0, index)
      const pathList: string[] = []
      for (const item of leftTabs) {
        const affix = item?.meta?.affix ?? false
        if (!affix)
          pathList.push(item.fullPath)
      }
      bulkCloseTabs(pathList)
    }
    updateCacheTab()
    handleGotoPage(router)
  }

  // Close the tab on the left and jump
  async function closeRightTabs(route: RouteLocationNormalized, router: Router) {
    const index = state.tabList.findIndex(item => item.fullPath === route.fullPath)

    if (index >= 0 && index < state.tabList.length - 1) {
      const rightTabs = state.tabList.slice(index + 1, state.tabList.length)

      const pathList: string[] = []
      for (const item of rightTabs) {
        const affix = item?.meta?.affix ?? false
        if (!affix)
          pathList.push(item.fullPath)
      }
      bulkCloseTabs(pathList)
    }
    updateCacheTab()
    handleGotoPage(router)
  }

  async function closeAllTab(router: Router) {
    state.tabList = state.tabList.filter(item => item?.meta?.affix ?? false)
    clearCacheTabs()
    goToPage(router)
  }

  async function closeOtherTabs(route: RouteLocationNormalized, router: Router) {
    const closePathList = state.tabList.map(item => item.fullPath)

    const pathList: string[] = []

    for (const path of closePathList) {
      if (path !== route.fullPath) {
        const closeItem = state.tabList.find(item => item.path === path)
        if (!closeItem)
          continue

        const affix = closeItem?.meta?.affix ?? false
        if (!affix)
          pathList.push(closeItem.fullPath)
      }
    }
    bulkCloseTabs(pathList)
    updateCacheTab()
    handleGotoPage(router)
  }

  /**
   * Close tabs in bulk
   */
  async function bulkCloseTabs(pathList: string[]) {
    state.tabList = state.tabList.filter(item => !pathList.includes(item.fullPath))
  }

  // async function setTabTitle(title: string, route: RouteLocationNormalized) {
  //   const findTab = getTabList.value.find((item) => item === route);
  //   if (findTab) {
  //     findTab.meta.title = title;
  //     await updateCacheTab();
  //   }
  // }

  async function updateTabPath(fullPath: string, route: RouteLocationNormalized) {
    const findTab = getTabList.value.find(item => item === route)
    if (findTab) {
      findTab.fullPath = fullPath
      findTab.path = fullPath
      await updateCacheTab()
    }
  }

  return {
    getTabList,
    getCachedTabList,
    getLastDragEndIndex,

    updateCacheTab,
    refreshPage,
    resetState,
    goToPage,
    addTab,
    closeTab,
    closeTabByKey,
    closeLeftTabs,
    closeRightTabs,
    closeAllTab,
    closeOtherTabs,
    clearCacheTabs,
    updateTabPath,
  }
})

// Need to be used outside the setup
export function useMultipleTabStoreWithOut() {
  return useMultipleTabStore(store)
}
