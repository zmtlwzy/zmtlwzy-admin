<template>
  <PageWrapper>
    <n-card>
      <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-6 gap-y-4">
        <n-menu
          v-model:value="val"
          :options="menuOptions"
          :mode="getMode"
          :class="[
            getIsMobile
              ? 'justify-center'
              : 'w-200px border-r justify-center border-$app-border-color transition-all ease-in-out-300',
          ]"
        />

        <component :is="compsMap[val]" #title>
          <div class="text-xl mt-2 mb-4">
            {{ getTitle }}
          </div>
        </component>
      </div>
    </n-card>
  </PageWrapper>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { useAppInject } from '/@/composables/web/useAppInject'
import BaseSetting from './components/BaseSetting.vue'
import SecureSetting from './components/SecureSetting.vue'
import AccountBind from './components/AccountBind.vue'
import MsgNotify from './components/MsgNotify.vue'

const compsMap = {
  BaseSetting,
  SecureSetting,
  AccountBind,
  MsgNotify,
}
const menuOptions: MenuOption[] = [
  {
    label: '基础设置',
    key: 'BaseSetting',
  },
  {
    label: '安全设置',
    key: 'SecureSetting',
  },
  {
    label: '账号绑定',
    key: 'AccountBind',
  },
  {
    label: '新消息通知',
    key: 'MsgNotify',
  },
]

const val = ref('BaseSetting')
const { getIsMobile } = useAppInject()
const getMode = computed(() => (getIsMobile.value ? 'horizontal' : 'vertical'))
const getTitle = computed(() => menuOptions.find(item => item.key === val.value)?.label)
</script>
