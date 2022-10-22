import { createDiscreteApi } from 'naive-ui'
import { useI18n } from '/@/composables/web/useI18n'
import type {
  ConfigProviderProps,
  DialogApi,
  DialogOptions,
  LoadingBarApi,
  MessageApi,
  NotificationApi,
  NotificationOptions,
} from 'naive-ui'

interface MessageOpt {
  loadingBar: LoadingBarApi
  message: MessageApi
  notification: NotificationApi
  dialog: DialogApi
  confirm: DialogApi
  destroyAllDialog: () => void
  destroyAllNotification: () => void
}

const typeMap = ['create', 'error', 'info', 'success', 'warning']

let state = {} as MessageOpt
let isInitialization = false

/**
 * @description: [message, notification, dialog, loadingBar] used outside the setup
 */
export default function useDiscreteApi(props?: ConfigProviderProps) {
  if (!isInitialization && props) {
    const { message, notification, dialog, loadingBar } = createDiscreteApi(
      ['message', 'dialog', 'notification', 'loadingBar'],
      {
        configProviderProps: props,
      },
    )

    const { t } = useI18n()
    try {
      state = {
        loadingBar,
        message,
        notification: createNotification(notification, { duration: 3000 }),
        dialog: createDialog(dialog, { positiveText: t('common.okText') }),
        confirm: createDialog(dialog, {
          positiveText: t('common.okText'),
          negativeText: t('common.cancelText'),
        }),
        destroyAllDialog: dialog.destroyAll,
        destroyAllNotification: notification.destroyAll,
      }
      isInitialization = true
    }
    catch (error) {
      console.warn(`useDiscreteApi init failed: ${error}`)
    }
  }
  return state
}

function createDialog(dialog: DialogApi, opt: DialogOptions) {
  return createApi(dialog, opt)
}

function createNotification(notification: NotificationApi, opt: NotificationOptions) {
  return createApi(notification, opt)
}

function createApi<T extends object, O>(coreApi: T, opt: O) {
  return new Proxy(coreApi, {
    get(target, propKey) {
      if (typeMap.includes(propKey as string)) {
        return new Proxy(target[propKey], {
          apply(funTarget, ctx, args) {
            return Reflect.apply(funTarget, ctx, [{ ...opt, ...args[0] }])
          },
        })
      }
      return Reflect.get(target, propKey)
    },
  })
}
