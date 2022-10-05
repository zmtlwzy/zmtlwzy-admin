<template>
  <div class="tableAction">
    <div class="flex items-center justify-center py-1 px-2 space-x-2">
      <PopConfirmWrapper
        v-for="({ icon, label, enable, popConfirm, ...buttonProps }, index) in getActions"
        :key="`${index}-${label}`"
        :is-wrapper="enable"
        v-bind="popConfirm"
      >
        <n-button v-bind="buttonProps">
          <template #default>
            {{ label }}
          </template>
          <template v-if="icon" #icon>
            <Icon :icon="icon as string" />
          </template>
        </n-button>
      </PopConfirmWrapper>
      <n-dropdown
        v-if="dropDownActions && getDropdownList.length"
        trigger="hover"
        :options="getDropdownList"
        @select="select as Fn"
      >
        <slot name="more">
          <i-akar-icons-more-horizontal class="!ml-4" v-bind="getMoreProps" />
        </slot>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { usePermission } from '/@/composables/web/usePermission'
import { isBoolean, isFunction } from '/@/utils/is'
import type { DropdownProps } from 'naive-ui'
import type { ActionItem, dropDownActionItem } from '../../types/tableAction'
import PopConfirmWrapper from './popConfirmWrapper.vue'

export default {
  name: 'TableAction',
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    actions: ActionItem[]
    dropDownActions?: dropDownActionItem[]
    style?: string
    select?: DropdownProps['onSelect']
  }>(),
  {
    style: 'button',
  },
)

const { hasPermission } = usePermission()
const actionType
    = props.style === 'button' ? 'default' : props.style === 'text' ? 'primary' : 'default'
const actionText
    = props.style === 'button' ? undefined : props.style === 'text' ? true : undefined
const getMoreProps = computed(() => {
  return {
    text: actionText,
    type: actionType,
    size: 'small',
  } as const
})
const getDropdownList = computed(() => {
  return (toRaw(props.dropDownActions) || []).filter((action) => {
    return hasPermission(action.auth) && isIfShow(action)
  })
})

const getActions = computed(() => {
  return (toRaw(props.actions) || [])
    .filter((action) => {
      return hasPermission(action.auth) && isIfShow(action)
    })
    .map((action) => {
      const { popConfirm } = action

      return {
        size: 'small',
        text: actionText,
        type: actionType,
        ...action,
        ...(popConfirm || {}),
        enable: !!popConfirm,
      } as const
    })
})

function isIfShow(action) {
  const ifShow = action.ifShow
  let isIfShow = true
  if (isBoolean(ifShow))
    isIfShow = ifShow

  if (isFunction(ifShow))
    isIfShow = ifShow(action)

  return isIfShow
}
</script>
