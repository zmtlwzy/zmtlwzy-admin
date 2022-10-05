import type { Ref } from 'vue'
import type { FormRules } from 'naive-ui'
import type { FormItemRuleValidator } from 'naive-ui/lib/form/src/interface'

import { createEventHook } from '@vueuse/core'
import { useI18n } from '/@/composables/web/useI18n'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormValid(formRef: Ref<any>) {
  const form = unref(formRef)
  if (!form)
    return
  const resHook = createEventHook()
  const errHook = createEventHook()

  form.validate((err) => {
    if (err)
      errHook.trigger(err)
    else
      resHook.trigger(err)
  })

  return { onSuccess: resHook.on, onError: errHook.on }
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n()

  const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')))
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')))
  const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')))
  const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')))

  const validatePolicy: FormItemRuleValidator = (_, value: boolean) => {
    return !value ? new Error(t('sys.login.policyPlaceholder')) : true
  }

  const validatePasswordStartWith: FormItemRuleValidator = (_, value: string) => {
    const password = formData?.password
    return !!password && password.startsWith(value) && password.length >= value.length
  }

  const validatePasswordSame: FormItemRuleValidator = (_, value: string) => {
    return formData?.password === value
  }

  const getFormRules = computed((): FormRules => {
    const accountFormRule = unref(getAccountFormRule)
    const passwordFormRule = unref(getPasswordFormRule)
    const smsFormRule = unref(getSmsFormRule)
    const mobileFormRule = unref(getMobileFormRule)

    const mobileRule = {
      sms: smsFormRule,
      mobile: mobileFormRule,
    }
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: ['input', 'blur'] },
            { validator: validatePasswordStartWith, trigger: 'input' },
            { validator: validatePasswordSame, trigger: ['blur', 'password-input'] },
          ],
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          ...mobileRule,
        }

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          account: accountFormRule,
          ...mobileRule,
        }

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule

      // login form rules
      default:
        return {
          account: accountFormRule,
          password: passwordFormRule,
        }
    }
  })
  return { getFormRules }
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ]
}
