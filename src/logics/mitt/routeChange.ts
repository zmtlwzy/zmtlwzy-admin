/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import type { EventBusKey } from '@vueuse/core'
import { useEventBus } from '@vueuse/core'
import type { RouteLocationNormalized } from 'vue-router'
import { getRawRoute } from '/@/utils'

const beforeKey: EventBusKey<RouteLocationNormalized> = Symbol()
const afterKey: EventBusKey<RouteLocationNormalized> = Symbol()

const beforeMethods = useEventBus(beforeKey)
const afterMethods = useEventBus(afterKey)

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  beforeMethods.emit(r)
  lastChangeTab = r
}

export function setAfterRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  afterMethods.emit(r)
}

export const listenerRouteChange = handleRouteChange(beforeMethods.on)

export const listenerAfterRouteChange = handleRouteChange(afterMethods.on)

function handleRouteChange(on: Fn) {
  return (callback: (route: RouteLocationNormalized) => void, immediate = true) => {
    on(callback)
    immediate && lastChangeTab && callback(lastChangeTab)
  }
}

export function removeTabChangeListener() {
  // reset();
  beforeMethods.reset()
  afterMethods.reset()
}
