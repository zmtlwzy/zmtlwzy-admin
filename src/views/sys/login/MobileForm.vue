<template>
  <template v-if="getShow">
    <NForm ref="formRef" class="p-4" :show-label="false" :model="formData" :rules="getFormRules">
      <NFormItem label="mobile" path="mobile">
        <NInput v-model:value="formData.mobile" size="large" :placeholder="t('sys.login.mobile')" />
      </NFormItem>
      <NFormItem label="sms" path="sms">
        <CountdownInput
          v-model:value="formData.sms"
          size="large"
          :placeholder="t('sys.login.smsCode')"
        />
      </NFormItem>
      <NSpace vertical>
        <NButton type="primary" size="large" block :loading="loading" @click="handleLogin">
          {{ t('sys.login.loginButton') }}
        </NButton>
        <NButton size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </NButton>
      </NSpace>
    </NForm>
  </template>
</template>

<script lang="ts" setup>
import { useI18n } from '/@/composables/web/useI18n'
import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const { onSuccess } = useFormValid(formRef)!
  onSuccess(() => {
    console.log(formData, 'formData')
  })
}
</script>
