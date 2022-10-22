<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useModalInner } from '/@/components/Modal'

// const emit = defineEmits(['refreshList', 'register'])

const [register, { setConfirmLoading, closeModal }] = useModalInner()

async function handleOk() {
  setConfirmLoading(true)
  await promiseTimeout(1500)
  setConfirmLoading(false)
  closeModal()
}

function handleDrag(...args) {
  console.log(...args)
}
</script>

<template>
  <BasicModal @register="register" @ok="handleOk" @drag="handleDrag">
    <Time :step="1000" />
  </BasicModal>
</template>

