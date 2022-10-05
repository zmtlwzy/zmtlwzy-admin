import type { HTMLAttributes } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import type { RoleEnum } from '/@/enums/roleEnum'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-expect-error
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta?: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export type Menu = MenuOption & {
  label?: string
  icon?: string
  props?: HTMLAttributes
  path: string
  paramPath?: string
  disabled?: boolean
  children?: Menu[]
  orderNo?: number
  roles?: RoleEnum[]
  meta?: Partial<RouteMeta>
  tag?: MenuTag
  hideMenu?: boolean
  redirect?: string
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw
