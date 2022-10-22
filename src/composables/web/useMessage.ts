// Legacy

import { useDialog, useMessage, useNotification } from 'naive-ui'
import type {
  DialogApi,
  DialogOptions,
  MessageApi,
  NotificationApi,
  NotificationOptions,
  // NotificationReactive,
} from 'naive-ui'
import { omit } from 'lodash-es'
import { useI18n } from '/@/composables/web/useI18n'
// import { noop } from '/@/utils';

// interface NotificationApi extends _NotificationApi {
//   destroyAll: () => void;
// }

interface MessageOpt {
  createMessage: MessageApi
  notification: NotificationApi
  createDialog: DialogApi
  createConfirm: DialogApi
  destroyAllDialog: () => void
  destroyAllNotification: () => void
}

const typeMap = ['create', 'error', 'info', 'success', 'warning']
// const notificationStack: Set<NotificationReactive> = new Set();
let state: Partial<MessageOpt> = {}
let isInitialization = false

/**
 * @description: message used outside the setup
 */
export default function useWrapperMessage() {
  if (getCurrentInstance() && !isInitialization) {
    const { t } = useI18n()
    const dialog = useDialog()
    const notificatio = useNotification()
    try {
      state = {
        createMessage: useMessage(),
        notification: createNotification({ duration: 3000 }),
        createDialog: createDialog({ positiveText: t('common.okText') }),
        createConfirm: createDialog({
          positiveText: t('common.okText'),
          negativeText: t('common.cancelText'),
        }),
        destroyAllDialog: dialog.destroyAll,
        destroyAllNotification: notificatio.destroyAll,
      }
      isInitialization = true
    }
    catch (error) {
      console.warn(`useWrapperMessage init failed: ${error}`)
    }

    function createDialog(opt: DialogOptions) {
      return new Proxy(dialog, {
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

    function createNotification(opt: NotificationOptions) {
      return new Proxy(notificatio as NotificationApi, {
        get(target, propKey) {
          if (typeMap.includes(propKey as string)) {
            return new Proxy(target[propKey], {
              apply(funTarget, ctx, args) {
                const res = Reflect.apply(funTarget, ctx, [
                  {
                    ...opt,
                    ...omit(args[0], ['onAfterEnter', 'onAfterLeave']),
                    onAfterEnter() {
                      args[0]?.onAfterEnter?.()
                      // !notificationStack.has(res) && notificationStack.add(res);
                    },
                    onAfterLeave() {
                      args[0]?.onAfterLeave?.()
                      // notificationStack.has(res) && notificationStack.delete(res);
                    },
                  },
                ])

                return res
              },
            })
          }
          // else if (propKey === 'destroyAll') {
          //   for (let i of notificationStack) {
          //     i?.destroy();
          //   }
          //   notificationStack.clear();
          //   return noop;
          // }

          return Reflect.get(target, propKey)
        },
      })
    }
  }

  return state
}
