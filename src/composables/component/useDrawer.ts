import type { Ref } from 'vue'
import { tryOnScopeDispose } from '@vueuse/core'
import { isNumber, isString, isSymbol } from '/@/utils/is'

type Key = string | number | Symbol
type Id = Key | Ref<boolean>
const drawerMap: Map<Id, Ref<boolean>> = new Map()
const countMap: Map<Id, number> = new Map()

export function useDrawer(value: Ref<boolean>): (value?: boolean) => boolean
export function useDrawer(
  id: Id,
  initialState?: boolean
): [Ref<boolean>, (value?: boolean) => boolean]
export function useDrawer(id?: Id, initialState?: boolean) {
  let count = 0

  const dispose = () => {
    count -= 1
    if (id && countMap.has(id) && count <= 0)
      drawerMap.delete(id)
  }

  tryOnScopeDispose(dispose)

  if (isRef(id)) {
    return (value?: boolean) => {
      id.value = typeof value === 'boolean' ? value : !id.value
    }
  }

  let boolean = ref(initialState ?? false)
  if (isNumber(id) || isString(id) || isSymbol(id)) {
    count++
    if (drawerMap.has(id)) {
      boolean = drawerMap.get(id)!
    }
    else {
      drawerMap.set(id, boolean)
      countMap.set(id, count)
    }
  }
  const toggle = (value?: boolean) => {
    boolean.value = typeof value === 'boolean' ? value : !boolean.value
  }

  return [boolean, toggle] as const
}

export enum useDrawerEnum {
  AppConfigDrawer,
}
