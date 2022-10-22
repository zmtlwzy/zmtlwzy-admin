import type { ComputedRef } from 'vue'
import { type MaybeElementRef } from '@vueuse/core'
import type { BasicTableProps, TableActionType } from '../types/table'
const key = Symbol('s-table')

type Instance = TableActionType & {
  wrapRef: MaybeElementRef<HTMLDivElement>
  getBindValues: ComputedRef<Recordable>
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>
}

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
