<template>
  <div v-show="getShow">
    <AppLogo
      class="justify-center pl-0 mb-6"
      is-static
      :can-go-home="false"
      logo-size="38"
      title-size="24"
    />
    <n-form
      ref="formRef"
      class="p-4"
      :model="formData"
      :rules="getFormRules"
      :show-label="false"
      label-placement="left"
      :show-require-mark="true"
      @keypress.enter="handleLogin"
    >
      <n-form-item path="username">
        <n-input
          v-model:value="formData.account"
          size="large"
          :placeholder="t('sys.login.accountPlaceholder')"
          :disabled="loading"
        />
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="formData.password"
          size="large"
          type="password"
          show-password-on="mousedown"
          :placeholder="t('sys.login.passwordPlaceholder')"
          :disabled="loading"
        />
      </n-form-item>

      <n-space justify="space-between">
        <n-form-item path="rememberMe">
          <n-checkbox v-model:checked="rememberMe" size="small" :disabled="loading">
            {{ t('sys.login.rememberMe') }}
          </n-checkbox>
        </n-form-item>
        <n-form-item class="text-right">
          <n-button
            tag="a"
            text
            type="primary"
            size="small"
            :disabled="loading"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('sys.login.forgetPassword') }}
          </n-button>
        </n-form-item>
      </n-space>

      <n-form-item>
        <n-button type="primary" size="large" block :loading="loading" :disabled="loading" @click="handleLogin">
          {{ t('sys.login.loginButton') }}
        </n-button>
      </n-form-item>

      <n-grid cols="1" responsive="screen" :x-gap="8" :y-gap="8">
        <n-gi>
          <n-button block :disabled="loading" @click="setLoginState(LoginStateEnum.MOBILE)">
            {{ t('sys.login.mobileSignInFormTitle') }}
            <template #icon>
              <i-akar-icons-mobile-device />
            </template>
          </n-button>
        </n-gi>
        <n-gi>
          <n-button block>
            {{ t('sys.login.qrSignInFormTitle') }}
            <template #icon>
              <i-ci-qr-code />
            </template>
          </n-button>
        </n-gi>
        <n-gi>
          <n-button block :disabled="loading" @click="setLoginState(LoginStateEnum.REGISTER)">
            {{ t('sys.login.registerButton') }}
          </n-button>
        </n-gi>
      </n-grid>

      <n-divider>
        <n-text class="text-12px text-gray-500">
          {{ t('sys.login.otherSignIn') }}
        </n-text>
      </n-divider>

      <div class="flex justify-evenly" :class="`${prefixCls}-sign-in-way`">
        <n-button text class="text-25px text-gray-500 dark:text-gray-400">
          <i-ant-design-github-filled />
        </n-button>
        <n-button text class="text-25px text-gray-500 dark:text-gray-400">
          <i-ant-design-wechat-filled />
        </n-button>
        <n-button text class="text-25px text-gray-500 dark:text-gray-400">
          <i-ant-design-alipay-circle-filled />
        </n-button>
        <n-button text class="text-23px text-gray-500 dark:text-gray-400">
          <i-simple-icons-gitee />
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from '/@/composables/web/useI18n'
import useDiscreteApi from '/@/composables/web/useDiscreteApi'
import { useUserStore } from '/@/store/modules/user'
import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin'
import { useDesign } from '/@/composables/web/useDesign'

const { t } = useI18n()
const { notification, dialog } = useDiscreteApi()
const { prefixCls } = useDesign('login')
const userStore = useUserStore()

const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  account: 'admin',
  password: '123456',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  const { onSuccess } = useFormValid(formRef)!

  onSuccess(async () => {
    try {
      loading.value = true
      const userInfo = await userStore.login(
        toRaw({
          password: formData.password,
          username: formData.account,
          mode: 'none', // 不要默认的错误提示
        }),
      )
      if (userInfo) {
        notification?.success({
          title: t('sys.login.loginSuccessTitle'),
          content: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3000,
        })
      }
    }
    catch (error: any) {
      dialog?.error({
        title: t('sys.api.errorTip'),
        content: error.message || t('sys.api.networkExceptionMsg'),
      })
    }
    finally {
      loading.value = false
    }
  })
}
</script>
