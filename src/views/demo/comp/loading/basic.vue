<template>
  <PageWrapper title="Loading组件示例">
    <n-card
      ref="target"
      v-loading="loading2"
      loading-description="使用v-loading生成"
      loading-background="#55555566"
    >
      <n-space vertical :size="32">
        <n-alert type="info">
          组件方式
        </n-alert>
        <n-space>
          <n-button @click="compOpen()">
            component
          </n-button>
          <n-button @click="compOpen(true)">
            component(全屏)
          </n-button>
        </n-space>
        <n-alert type="info">
          函数方式
        </n-alert>
        <n-space>
          <n-button @click="fnOpen">
            全屏Loading
          </n-button>
          <n-button @click="fnOpen2">
            指定Element Loading
          </n-button>
        </n-space>
        <n-alert type="info">
          指令方式
        </n-alert>
        <n-button @click="directiveOpen">
          useDirctive
        </n-button>
      </n-space>
    </n-card>
    <teleport to="body" :disabled="!isFull">
      <Loading #icon :show="loading" :absolute="isFull" background="rgb(125 165 123 / 50%)">
        <i-logos-vue />
      </Loading>
    </teleport>
  </PageWrapper>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useLoading } from '/@/components/Loading'

const initConfig = {
  description: undefined,
  background: '#ffbbcc55',
}

const target = ref<HTMLDivElement>()
const loading = ref(false)
const loading2 = ref(false)
const isFull = ref(false)

const [show, close, setProps] = useLoading(initConfig)
const [show2, close2] = useLoading({ target, props: initConfig })

async function compOpen(bool = false) {
  isFull.value = bool
  loading.value = true
  await promiseTimeout(1000)
  loading.value = false
}
async function fnOpen() {
  setProps(initConfig)
  show()
  await promiseTimeout(1000)
  setProps({
    background: 'rgb(125 165 123 / 50%)',
    description: '1秒后关闭',
  })
  await promiseTimeout(1000)
  close()
}
async function fnOpen2() {
  setProps(initConfig)
  show2()
  await promiseTimeout(1000)
  setProps({
    background: 'rgb(145 115 143 / 50%)',
  })
  await promiseTimeout(1000)
  close2()
}
async function directiveOpen() {
  loading2.value = true
  await promiseTimeout(1000)
  loading2.value = false
  await promiseTimeout(1000)
}
</script>
