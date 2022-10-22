<template>
  <n-modal v-model:show="visibleRef" v-bind="getBindValue">
    <template #header>
      <div class="w-full" :class="{ 'cursor-move': !!draggable }">
        {{ getBindValue.title }}
      </div>
    </template>
    <template #default>
      <slot name="default" />
    </template>

    <template v-for="item in ['action', 'footer']" #[item]="data">
      <slot :name="item" v-bind="data || {}">
        <n-space>
          <n-button v-if="getBindValue.showCancelBtn" v-bind="getBindValue.cancelBtnProps" @click="handleCancel">
            {{ attrs.negativeText || '取消' }}
          </n-button>
          <n-button
            v-if="getBindValue.showConfirmBtn"
            type="primary"
            v-bind="getBindValue.confirmBtnProps"
            @click="handleConfirm"
          >
            {{ attrs.positiveText ?? '确认' }}
          </n-button>
        </n-space>
      </slot>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { omit, pick } from 'lodash-es'
import { deepMerge } from '/@/utils'
import { useModalDragMove } from './hooks/useModalDrag'
import type { BasicModalMethods, BasicModalProps } from './types'

const props = withDefaults(defineProps<Props>(), {
  draggable: 'on',
  showConfirmBtn: true,
  showCancelBtn: true,
})

const emit = defineEmits(['visibleChange', 'cancel', 'ok', 'register', 'update:visible'])

defineOptions({
  name: 'BasicModal',
  inheritAttrs: false,
})

interface Props {
  canFullscreen?: boolean
  defaultFullscreen?: boolean
  visible?: boolean
  draggable?: string | false | null
  showConfirmBtn?: boolean
  confirmBtnProps?: Record<string, any>
  showCancelBtn?: boolean
  cancelBtnProps?: Record<string, any>
  loadingTip?: string
  destroyOnClose?: boolean

  onDrag?: (x: number, y: number) => void
}

const attrs = useAttrs() as unknown as BasicModalProps
const propsRef = ref<Partial<BasicModalProps> | null>(null)
const visibleRef = ref(false)

const { destroyOnClose, draggable, onDrag: callback } = toRefs(props)

const modalMethods: BasicModalMethods = {
  setModalProps,
}

const instance = getCurrentInstance()
if (instance)
  emit('register', modalMethods, instance.uid)

useModalDragMove({
  visible: visibleRef,
  destroyOnClose,
  draggable,
  callback,
})

const getMergeProps = computed((): Recordable => {
  return {
    ...props,
    ...(unref(propsRef) as any),
  }
})

function setModalProps(modalProps: Partial<BasicModalProps>): void {
  propsRef.value = deepMerge(unref(propsRef) || {}, modalProps)
  if (Reflect.has(modalProps, 'visible'))
    visibleRef.value = !!modalProps.visible
}

const getBindValue = computed(() => {
  return omit(
    {
      preset: 'dialog',
      maskClosable: false,
      showIcon: false,
      ...attrs,
      ...unref(getMergeProps),
    },
    ['show'],
  ) as BasicModalProps
})

watchEffect(() => {
  visibleRef.value = !!props.visible
  // fullScreenRef.value = !!props.defaultFullscreen;
})

watch(
  () => unref(visibleRef),
  (v) => {
    emit('visibleChange', v)
    emit('update:visible', v)
    instance && modalMethods.emitVisible?.(v, instance.uid)
  },
  {
    immediate: false,
  },
)

function handleConfirm(e: Event) {
  emit('ok', e)
}

function handleCancel(e: Event) {
  visibleRef.value = false
  const closeFunList = pick(unref(getBindValue), ['onClose', 'onAfterLeave'])
  Object.values(closeFunList).forEach((fun: Fn) => {
    fun?.(e)
  })
  emit('cancel', e)
}

// function handleTitleDbClick(e) {
//   if (!props.canFullscreen) return;
//   e.stopPropagation();
//   handleFullScreen(e);
// }
</script>
