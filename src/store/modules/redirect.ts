import { defineStore } from 'pinia'
import { store } from '/@/store'

interface RedirectState {
  redirentType: 'name' | 'path'
  path: string
  params: Recordable
}
export const useRedirectStore = defineStore('app-redirect', () => {
  const state = reactive<RedirectState>({
    redirentType: 'path',
    path: '',
    params: {},
  })

  const getRedirentType = computed(() => state.redirentType)
  const getPath = computed(() => state.path)
  const getParams = computed(() => state.params)

  function setRedirentType(type: RedirectState['redirentType']) {
    state.redirentType = type
  }

  function setParams(obj: RedirectState['params']) {
    state.params = obj
  }

  function setPath(path: RedirectState['path']) {
    state.path = path
  }

  return {
    getRedirentType,
    getPath,
    getParams,

    setRedirentType,
    setPath,
    setParams,
  }
})

// Need to be used outside the setup
export function useRedirectStoreWithOut() {
  return useRedirectStore(store)
}
