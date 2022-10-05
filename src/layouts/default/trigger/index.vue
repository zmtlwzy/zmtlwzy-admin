<template>
  <Component :is="componentMap.get(type)" v-if="type" @click="handleClick" />
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { TriggerEnum } from '/@/enums/menuEnum'
import { useMenuSetting } from '/@/composables/setting/useMenuSetting'
import { isFunction } from 'lodash-es'

import BarTrigger from './BarTrigger.vue'
import ButtonTrigger from './ButtonTrigger.vue'
import HeaderTrigger from './HeaderTrigger.vue'

const props = withDefaults(
  defineProps<{
    type?: TriggerEnum
    onClick?: Fn
  }>(),
  {
    type: TriggerEnum.BAR,
  },
)

defineOptions({
  name: 'Trigger',
})

const componentMap = new Map<TriggerEnum, Component>()
componentMap.set(TriggerEnum.BAR, BarTrigger)
componentMap.set(TriggerEnum.BUTTON, ButtonTrigger)
componentMap.set(TriggerEnum.HEADER, HeaderTrigger)

const { toggleCollapsed } = useMenuSetting()
const handleClick = () => {
  if (props?.onClick && isFunction(props.onClick))
    props.onClick()
  else
    toggleCollapsed()
}
</script>
