import { isArray, isFunction, isNullOrUnDef, isObject, isString } from '/@/utils/is'
import type { ComputedRef, Ref } from 'vue'
import type { FormSchema } from '../types/form'
import { set } from 'lodash-es'

interface UseFormValuesContext {
  defaultFormModel: Ref<any>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Recordable
}
export function useFormValues({ defaultFormModel, getSchema, formModel }: UseFormValuesContext) {
  // 加工 form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values))
      return {}

    const res: Recordable = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (
        !key
        || (isArray(value) && value.length === 0)
        || isFunction(value)
        || isNullOrUnDef(value)
      )
        continue

      // 删除空格
      if (isString(value))
        value = value.trim()

      set(res, key, value)
    }
    return res
  }

  // 初始化默认值
  function initDefault() {
    const schemas = unref(getSchema)
    const obj: Recordable = {}
    const handle = (schemas: FormSchema[]) => {
      schemas.forEach((item) => {
        const { defaultValue, childrens } = item
        if (!isNullOrUnDef(defaultValue)) {
          set(obj, item.field, defaultValue)
          set(formModel, item.field, defaultValue)
        }
        if (childrens && childrens?.length > 0)
          handle(childrens)
      })
    }
    handle(schemas)
    defaultFormModel.value = obj
  }

  return { handleFormValues, initDefault }
}
