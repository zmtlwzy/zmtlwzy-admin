import type { RouteLocationRaw, Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnum'
import { isString } from '/@/utils/is'
import { REDIRECT_NAME } from '/@/router/constant'
import { useRedirectStore } from '/@/store/modules/redirect'

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }

function handleError(e: Error) {
  console.error(e)
}

// page switch
export function useGo(_router?: Router) {
  let router
  if (!_router)
    router = useRouter()

  const { push, replace } = _router || router
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt)
      return

    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    }
    else {
      const o = opt as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const redirectStore = useRedirectStore()
  const { replace, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  console.log(params, query, name, 'params, query')
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        redirectStore.setPath(String(name))
        redirectStore.setRedirentType('name')
      }
      else {
        redirectStore.setRedirentType('path')
        redirectStore.setPath(fullPath)
      }
      redirectStore.setParams(params)
      const path = redirectStore.getPath.startsWith('/') ? redirectStore.getPath.slice(1) : redirectStore.getPath
      replace({ path: `/redirect/${String(name) || path}`, query }).then(() => resolve(true))
    })
  }
  return redo
}
