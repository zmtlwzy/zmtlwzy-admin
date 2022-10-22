<script lang="ts" setup>
import type { FormItemInst } from 'naive-ui'
import { useI18n } from '/@/composables/web/useI18n'
import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin'
import TheFormHeader from './TheFormHeader.vue'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const loading = ref(false)

const formData = ref({
  username: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  smsCode: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const { onSuccess } = useFormValid(formRef)!
  onSuccess(() => {
    console.log(formData, 'formData')
  })
}

function handlePasswordInput() {
  if (formData.value.confirmPassword)
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
}
</script>

<template>
  <template v-if="getShow">
    <!-- 表单头部 -->
    <TheFormHeader :title="t('sys.login.signUpFormTitle')" @back="handleBackLogin" />
    <!-- 表单 -->
    <n-form ref="formRef" class="p-4" :show-label="false" :model="formData" :rules="getFormRules">
      <n-form-item path="username">
        <n-input v-model:value="formData.username" size="large" :placeholder="t('sys.login.accountPlaceholder')" />
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="formData.password"
          size="large"
          type="password"
          show-password-on="mousedown"
          :placeholder="t('sys.login.passwordPlaceholder')"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item ref="rPasswordFormItemRef" first path="confirmPassword">
        <n-input
          v-model:value="formData.confirmPassword"
          size="large"
          type="password"
          :placeholder="t('sys.login.confirmPassword')"
          :disabled="!formData.password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="mobile">
        <n-input v-model:value="formData.mobile" size="large" :placeholder="t('sys.login.mobile')" />
      </n-form-item>
      <n-form-item path="smsCode">
        <CountdownInput
          v-model:value="formData.smsCode"
          size="large"
          :placeholder="t('sys.login.smsCode')"
        />
      </n-form-item>
      <n-grid x-gap="12" :cols="24">
        <n-gi span="24">
          <n-button type="primary" size="large" block :loading="loading" @click="handleRegister">
            {{ t('sys.login.registerButton') }}
          </n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </template>
</template>
