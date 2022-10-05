<template>
  <n-modal v-model:show="visible" v-bind="getBindValue">
    <template #header>
      <div class="w-full cursor-move">
        {{ getBindValue.title }}
      </div>
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template #action>
      <slot name="action">
        <n-space>
          <n-button @click="closeModal">
            取消
          </n-button>
          <n-button type="primary" :loading="subLoading" @click="handleSubmit">
            {{
              subBtuText
            }}
          </n-button>
        </n-space>
      </slot>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { omit } from 'lodash-es'
import { useModalDragMove } from './hooks/useModalDrag'
import { deepMerge } from '/@/utils'
import type { BasicModalMethods, BasicModalProps } from './types'

const props = withDefaults(
  defineProps<{
    draggable?: string
    subBtuText?: string
    destroyOnClose?: boolean
    onOk?: () => void
    onDrag?: (x: number, y: number) => void
  }>(),
  {
    draggable: 'on',
    subBtuText: '确认',
  },
)

const emit = defineEmits(['register'])

defineOptions({
  name: 'BasicModal',
})

const attrs = useAttrs() as BasicModalProps
const propsRef = ref<Partial<BasicModalProps> | null>(null)
const visible = ref(false)
const subLoading = ref(false)
const { destroyOnClose, draggable, onDrag: callback } = toRefs(props)
useModalDragMove({
  visible,
  destroyOnClose,
  draggable,
  callback,
})

const getProps = computed(() => {
  return { ...props, ...unref(propsRef) } as BasicModalProps
})

const subBtuText = computed(() => unref(propsRef)?.subBtuText || props.subBtuText)

async function setProps(modalProps: Partial<BasicModalProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || {}, modalProps)
}
const getBindValue = computed(() => {
  return omit(
    {
      title: '',
      preset: 'dialog',
      maskClosable: false,
      ...attrs,
      ...unref(getProps),
    },
    ['show'],
  ) as BasicModalProps
})

function setSubLoading(status?: boolean) {
  subLoading.value = status ?? false
}

function openModal() {
  visible.value = true
}
function closeModal() {
  visible.value = false
  subLoading.value = false
  attrs?.onClose?.()
}

function handleSubmit() {
  unref(getProps)?.onOk?.()
}
const modalMethods: BasicModalMethods = {
  setProps,
  openModal,
  closeModal,
  setSubLoading,
}
const instance = getCurrentInstance()
if (instance)
  emit('register', modalMethods)
</script>
