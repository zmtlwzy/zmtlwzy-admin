<script setup lang="ts">
import useDiscreteApi from '/@/composables/web/useDiscreteApi'
import { useModalInner } from '/@/components/Modal'
import { useForm } from '/@/components/Form'
import { modalSchemas } from './schemas'

const emit = defineEmits(['refreshList', 'register'])

const formDataRef = ref({})

const { message } = useDiscreteApi()
const [register, { closeModal }] = useModalInner((data) => {
  if (data)
    onDataReceive(data)
})
const [registerForm, { submit, validate }] = useForm({
  schemas: modalSchemas,
  labelPlacement: 'left',
  labelWidth: 120,
  showActionButtonGroup: false,
  submitFunc,
})

function onDataReceive(data) {
  formDataRef.value = data
}

async function submitFunc(val) {
  try {
    await Promise.all([validate()])
    handleSubmit(val)
  }
  catch (error) {}
}

function handleClose() {
  formDataRef.value = {}
}

async function handleSubmit(e) {
  Object.assign(formDataRef.value, e)
  message.success(JSON.stringify(formDataRef.value))
  closeModal()
  emit('refreshList')
}
</script>

<template>
  <BasicModal class="!w-600px" @register="register" @ok="submit" @close="handleClose">
    <BasicForm class="mt-4" :model="formDataRef" @register="registerForm" />
  </BasicModal>
</template>

