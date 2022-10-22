<template>
  <PageWrapper
    title="modal组件使用示例"
  >
    <n-card>
      <n-space vertical :size="32">
        <n-space vertical :size="16">
          <n-alert title="默认" type="info" />
          <n-button @click="handleOpen1">
            open
          </n-button>
        </n-space>

        <n-space vertical :size="16">
          <n-alert title="组件内修改属性" type="info" />
          <n-button @click="handleOpen2">
            open
          </n-button>
        </n-space>
      </n-space>
    </n-card>
    <TheModal1 @register="modalRegister1" />
    <TheModal2 @register="modalRegister2" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { useModal } from '/@/components/Modal'
import TheModal1 from './components/TheModal1.vue'
import TheModal2 from './components/TheModal2.vue'

const [modalRegister1, { openModal, setModalProps }] = useModal()
const [modalRegister2, { openModal: openModal2, setModalProps: setModalProps2 }] = useModal()

function handleOpen1() {
  openModal()
  setModalProps({
    title: '确认对话框',
    showIcon: true,
    type: 'warning',
    maskClosable: true,
  })
}

function handleOpen2() {
  openModal2()
  setModalProps2({
    title: '默认标题',
    showIcon: false,
    maskClosable: false,
  })
}
</script>
