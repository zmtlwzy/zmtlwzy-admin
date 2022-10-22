import type { AppRouteRecordRaw, Menu } from '/@/router/types'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { useI18n } from '/@/composables/web/useI18n'
import useDiscreteApi from '/@/composables/web/useDiscreteApi'
import { useUserStore } from './user'
import { useAppStoreWithOut } from './app'
import { flatMultiLevelRoutes, transformObjToRoute } from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'
import projectSetting from '/@/settings/projectSetting'
import { PermissionModeEnum } from '/@/enums/appEnum'
import { asyncRoutes } from '/@/router/routes'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { filter } from '/@/utils/helper/treeHelper'
import { getMenuList } from '/@/api/sys/menu'
import { getPermCode } from '/@/api/sys/user'
import { PageEnum } from '/@/enums/pageEnum'

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[]
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean
  // To trigger a menu update
  lastBuildMenuTime: number
  // Backstage menu list
  backMenuList: Menu[]
  frontMenuList: Menu[]
}
export const usePermissionStore = defineStore('app-permission', () => {
  const state = reactive<PermissionState>({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
  })

  const { message } = useDiscreteApi()

  const getPermCodeList = computed(() => state.permCodeList)
  const getBackMenuList = computed(() => state.backMenuList)
  const getFrontMenuList = computed(() => state.frontMenuList)
  const getLastBuildMenuTime = computed(() => state.lastBuildMenuTime)
  const getIsDynamicAddedRoute = computed(() => state.isDynamicAddedRoute)

  function setPermCodeList(codeList: string[]) {
    state.permCodeList = codeList
  }

  function setBackMenuList(list: Menu[]) {
    // @ts-expect-error deep
    state.backMenuList = list
    list?.length > 0 && setLastBuildMenuTime()
  }

  function setFrontMenuList(list: Menu[]) {
    state.frontMenuList = list
  }

  function setLastBuildMenuTime() {
    state.lastBuildMenuTime = new Date().getTime()
  }

  function setDynamicAddedRoute(added: boolean) {
    state.isDynamicAddedRoute = added
  }

  function resetState() {
    state.isDynamicAddedRoute = false
    state.permCodeList = []
    state.backMenuList = []
    state.lastBuildMenuTime = 0
  }

  async function changePermissionCode() {
    const codeList = await getPermCode()
    setPermCodeList(codeList)
  }

  async function buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
    const { t } = useI18n()
    const userStore = useUserStore()
    const appStore = useAppStoreWithOut()

    let routes: AppRouteRecordRaw[] = []
    const roleList = toRaw(userStore.getRoleList) || []
    const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig

    const routeFilter = (route: AppRouteRecordRaw) => {
      const { meta } = route
      const { roles } = meta || {}
      if (!roles)
        return true
      return roleList.some(role => roles.includes(role))
    }

    const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
      const { meta } = route
      const { ignoreRoute } = meta || {}
      return !ignoreRoute
    }

    /**
     * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
     * */
    const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
      if (!routes || routes.length === 0)
        return
      let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME
      function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
        if (parentPath)
          parentPath += '/'
        routes.some((route: AppRouteRecordRaw) => {
          const { path, children, redirect } = route
          const currentPath = path.startsWith('/') ? path : parentPath + path
          if (currentPath === homePath) {
            if (redirect) {
              homePath = route.redirect! as string
            }
            else {
              route.meta = Object.assign({}, route.meta, { affix: true })
              return true
            }
          }
          children && children.length > 0 && patcher(children, currentPath)
          return false
        })
      }
      patcher(routes)
    }
    let routeList: AppRouteRecordRaw[] = []
    const backMenuList = transformRouteToMenu(routeList)
    switch (permissionMode) {
      case PermissionModeEnum.ROLE:
        routes = filter(asyncRoutes, routeFilter)
        routes = routes.filter(routeFilter)
        // Convert multi-level routing to level 2 routing
        routes = flatMultiLevelRoutes(routes)
        break

      case PermissionModeEnum.ROUTE_MAPPING:
        routes = filter(asyncRoutes, routeFilter)
        routes = routes.filter(routeFilter)

        const menuList = transformRouteToMenu(routes, true)
        routes = filter(routes, routeRemoveIgnoreFilter)
        routes = routes.filter(routeRemoveIgnoreFilter)
        menuList.sort((a, b) => {
          return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
        })

        setFrontMenuList(menuList)
        // Convert multi-level routing to level 2 routing
        routes = flatMultiLevelRoutes(routes)
        break

      //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
      case PermissionModeEnum.BACK:
        message?.loading(t('sys.app.menuLoading'), {
          duration: 1000,
        })

        // !Simulate to obtain permission codes from the background,
        // this function may only need to be executed once, and the actual project can be put at the right time by itself
        try {
          changePermissionCode()
          routeList = (await getMenuList()) as AppRouteRecordRaw[]
        }
        catch (error) {
          console.error(error)
        }

        // Dynamically introduce components
        routeList = transformObjToRoute(routeList)

        //  Background routing to menu structure
        setBackMenuList(backMenuList)

        // remove meta.ignoreRoute item
        routeList = filter(routeList, routeRemoveIgnoreFilter)
        routeList = routeList.filter(routeRemoveIgnoreFilter)

        routeList = flatMultiLevelRoutes(routeList)
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
        break
    }

    // routes.push(ERROR_LOG_ROUTE);
    patchHomeAffix(routes)
    return routes
  }

  return {
    getPermCodeList,
    getBackMenuList,
    getFrontMenuList,
    getLastBuildMenuTime,
    getIsDynamicAddedRoute,

    setPermCodeList,
    setBackMenuList,
    setFrontMenuList,
    setLastBuildMenuTime,
    setDynamicAddedRoute,
    resetState,
    changePermissionCode,
    buildRoutesAction,
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
