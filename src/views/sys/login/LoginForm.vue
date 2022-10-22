<template>
  <NForm
    v-show="getShow"
    ref="formRef"
    class="p-4"
    :model="formData"
    :rules="getFormRules"
    :show-label="false"
    @keypress.enter="handleLogin"
  >
    <NFormItem label="account" path="account">
      <NInput
        v-model:value="formData.account"
        size="large"
        :placeholder="t('sys.login.userName')"
      />
    </NFormItem>
    <NFormItem label="password" path="password">
      <NInput
        v-model:value="formData.password"
        size="large"
        type="password"
        show-password-on="mousedown"
        :placeholder="t('sys.login.password')"
      />
    </NFormItem>

    <NSpace justify="space-between">
      <NFormItem path="rememberMe">
        <NCheckbox v-model:checked="rememberMe" size="small">
          {{ t('sys.login.rememberMe') }}
        </NCheckbox>
      </NFormItem>
      <NFormItem class="text-right">
        <NButton
          tag="a"
          text
          type="primary"
          size="small"
          @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
        >
          {{ t('sys.login.forgetPassword') }}
        </NButton>
      </NFormItem>
    </NSpace>

    <NFormItem>
      <NButton type="primary" size="large" block :loading="loading" @click="handleLogin">
        {{ t('sys.login.loginButton') }}
      </NButton>
    </NFormItem>

    <NGrid cols="1 sm:3" responsive="screen" :x-gap="8" :y-gap="8">
      <NGi>
        <NButton block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
          <template #icon>
            <i-akar-icons-mobile-device />
          </template>
        </NButton>
      </NGi>
      <NGi>
        <NButton block>
          {{ t('sys.login.qrSignInFormTitle') }}
          <template #icon>
            <i-ci-qr-code />
          </template>
        </NButton>
      </NGi>
      <NGi>
        <NButton block>
          {{ t('sys.login.registerButton') }}
        </NButton>
      </NGi>
    </NGrid>

    <NDivider>
      <NText class="text-12px text-gray-500">
        {{ t('sys.login.otherSignIn') }}
      </NText>
    </NDivider>

    <div class="flex justify-evenly" :class="`${prefixCls}-sign-in-way`">
      <NButton text class="text-25px text-gray-500 dark:text-gray-400">
        <i-ant-design-github-filled />
      </NButton>
      <NButton text class="text-25px text-gray-500 dark:text-gray-400">
        <i-ant-design-wechat-filled />
      </NButton>
      <NButton text class="text-25px text-gray-500 dark:text-gray-400">
        <i-ant-design-alipay-circle-filled />
      </NButton>
      <NButton text class="text-23px text-gray-500 dark:text-gray-400">
        <i-simple-icons-gitee />
      </NButton>
    </div>
  </NForm>
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
