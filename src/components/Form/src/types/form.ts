import type { StyleValue } from 'vue'
import type { FormItemRule } from 'naive-ui'
import type { GridItemProps, GridProps } from 'naive-ui/lib/grid'
import type { FormItemProps } from 'naive-ui/lib/form'
import type { ButtonProps } from 'naive-ui/lib/button'
import type { ComponentType } from './index'

export interface RenderCallbackParams {
  schema?: FormSchema
  model: Recordable
}

export interface FormSchema {
  field: string | string[]
  label?: string
  subLabel?: string
  labelMessage?: string
  labelMessageStyle?: object | string
  rulesMessageJoinLabel?: boolean
  defaultValue?: any
  defaultSlot?: any
  component?: ComponentType
  componentProps?: Recordable
  formItemProps?: FormItemProps
  slot?: string
  rules?: FormItemRule | FormItemRule[]
  required?: boolean
  giProps?: GridItemProps
  isFull?: boolean
  suffix?: string
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  disabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  childrens?: FormSchema[]
}

export interface FormProps {
  model?: Recordable
  labelWidth?: number | string
  schemas?: FormSchema[]
  inline: boolean
  layout?: string
  size: string
  labelPlacement?: string
  isFull: boolean
  rulesMessageJoinLabel?: boolean
  showActionButtonGroup?: boolean
  showResetButton?: boolean
  resetButtonOptions?: Partial<ButtonProps>
  showSubmitButton?: boolean
  showAdvancedButton?: boolean
  submitButtonOptions?: Partial<ButtonProps>
  submitButtonText?: string
  resetButtonText?: string
  gridProps?: GridProps
  giProps?: GridItemProps
  resetFunc?: () => Promise<void>
  submitFunc?: (...args: any) => Promise<void>
  submitOnReset?: boolean
  baseGridStyle?: StyleValue
  disabled?: boolean
}

export interface FormActionType {
  submit: () => Promise<any>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  clearValidate: (name?: string | string[]) => Promise<void>
  getFieldsValue: () => Recordable
  resetFields: () => Promise<void>
  validate: (nameList?: any[]) => Promise<any>
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]
