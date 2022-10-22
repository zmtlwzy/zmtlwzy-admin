<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useModalInner } from '/@/components/Modal'

// const emit = defineEmits(['refreshList', 'register'])

const [register, { setModalProps, closeModal }] = useModalInner()

function handleOk() {
  closeModal()
}

function handleSetTitle() {
  setModalProps({
    title: '内部定义的标题',
  })
}
</script>

<template>
  <BasicModal @register="register" @ok="handleOk">
    <n-button @click="handleSetTitle">
      修改标题
    </n-button>
  </BasicModal>
</template>

