<template>
  <PageWrapper
    title="modal组件使用示例"
    content="使用 useModal 进行弹窗操作，默认可以拖动，可以通过 draggable 参数进行控制是否可以拖动"
  >
    <n-card>
      <n-button @click="handleOpen">open</n-button>
      <BasicModal @register="modalRegister" @ok="okModal" @drag="handleDrag">
        <Time :step="1000" />
      </BasicModal>
    </n-card>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { promiseTimeout } from '@vueuse/core';
  import { useModal } from '/@/components/Modal';

  const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
    title: '确认对话框',
    showIcon: true,
    type: 'warning',
    maskClosable: true,
  });

  async function handleOpen() {
    openModal();
  }

  async function okModal() {
    setSubLoading(true);
    await promiseTimeout(1500);
    setSubLoading(false);
    closeModal();
  }

  function handleDrag() {
    console.log(...arguments);
  }
</script>
