import type {
  BasicModalMethods,
  BasicModalProps,
  ReturnMethods,
  UseModalInnerReturnType,
  UseModalReturnType,
} from '../types'
import { isProdMode } from '/@/utils/env'
import { isFunction } from '/@/utils/is'
import { isEqual } from 'lodash-es'
import { tryOnUnmounted } from '@vueuse/core'
import { error } from '/@/utils/log'

const dataTransfer = reactive<any>({})

const visibleData = reactive<{ [key: number]: boolean }>({})

/**
 * @description: Applicable to independent modal and call outside
 */
export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<BasicModalMethods>>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')

  function register(modalMethod: BasicModalMethods, uuid: string) {
    if (!getCurrentInstance())
      throw new Error('useModal() can only be used inside setup() or functional components!')

    uid.value = uuid
    isProdMode()
      && onUnmounted(() => {
        modal.value = null
        loaded.value = false
        dataTransfer[unref(uid)] = null
      })
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal))
      return

    modal.value = modalMethod
    loaded.value = true
    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }
  }

  const getInstance = () => {
    const instance = unref(modal)
    if (!instance)
      error('useModal instance is undefined!')

    return instance
  }

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<BasicModalProps>): void => {
      getInstance()?.setModalProps(props)
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.()
    },

    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        visible,
      })

      if (!data)
        return
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal)
        dataTransfer[id] = toRaw(data)
    },

    closeModal: () => {
      getInstance()?.setModalProps({ visible: false })
    },
  }
  return [register, methods]
}

export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<BasicModalMethods>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')

  const getInstance = () => {
    const instance = unref(modalInstanceRef)
    if (!instance)
      error('useModalInner instance is undefined!')

    return instance
  }

  const register = (modalInstance: BasicModalMethods, uuid: string) => {
    isProdMode()
      && tryOnUnmounted(() => {
        modalInstanceRef.value = null
      })
    uidRef.value = uuid
    modalInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if (!data)
      return
    if (!callbackFn || !isFunction(callbackFn))
      return
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [
    register,
    {
      setLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading })
      },

      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)]
      }),

      setConfirmLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmBtnProps: { loading } })
      },

      closeModal: () => {
        getInstance()?.setModalProps({ visible: false })
      },

      setModalProps: (props: Partial<BasicModalProps>) => {
        getInstance()?.setModalProps(props)
      },

      redoModalHeight: () => {
        const callRedo = getInstance()?.redoModalHeight
        callRedo && callRedo()
      },
    },
  ]
}
