import type { ComputedRef } from 'vue'
import type { ButtonProps, ModalProps } from 'naive-ui'

/**
 * @description: 弹窗对外暴露的方法
 */
export interface BasicModalMethods {
  setModalProps: (props: Partial<BasicModalProps>) => void
  emitVisible?: (visible: boolean, uid: number) => void
  redoModalHeight?: () => void
}

export type RegisterFn = (modalMethods: BasicModalMethods, uuid?: string) => void

export interface ReturnMethods extends BasicModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  closeModal: () => void
  getVisible?: ComputedRef<boolean>
}

export type UseModalReturnType = [RegisterFn, ReturnMethods]

export interface ReturnInnerMethods extends BasicModalMethods {
  closeModal: () => void
  setLoading: (loading: boolean) => void
  setConfirmLoading: (loading: boolean) => void
  getVisible?: ComputedRef<boolean>
  redoModalHeight: () => void
}

export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods]

export interface BasicModalProps extends ModalProps {
  canFullscreen?: boolean
  defaultFullscreen?: boolean
  visible?: boolean
  draggable?: string | false | null
  showConfirmBtn: boolean
  confirmBtnProps?: ButtonProps
  showCancelBtn: boolean
  cancelBtnProps?: ButtonProps
  loadingTip?: string
  destroyOnClose?: boolean

  onDrag: (x: number, y: number) => void
}
