import type { EventBusKey } from '@vueuse/core'
import { tryOnScopeDispose, useDebounceFn, useEventBus } from '@vueuse/core'

type Fn = (...args: any[]) => any
interface Opitons {
  wait?: number
  immediate?: boolean
  isPassPars?: boolean
}
const key: EventBusKey<any> = Symbol()

export const useLayoutContentResize = (_key?: string | number | symbol, autoOff = true) => {
  const { on: _on, off: _off, reset, emit } = useEventBus(_key ?? key)
  let debounceFn: Fn
  let WrapDebounceFn: Fn

  function on(callback: Fn, { wait = 150, immediate = false, isPassPars = true }: Opitons = {}) {
    debounceFn = useDebounceFn(callback, wait)
    WrapDebounceFn = () => {
      debounceFn()
    }
    if (isPassPars) {
      _on(debounceFn)
    }
    else {
      _on(() => {
        debounceFn()
      })
    }
    immediate && emit()
  }

  function off(fun?: Fn) {
    const fn = fun || debounceFn || WrapDebounceFn
    fn && _off(fn)
  }

  tryOnScopeDispose(() => {
    autoOff && off()
  })

  return { on, off, reset, emit }
}
