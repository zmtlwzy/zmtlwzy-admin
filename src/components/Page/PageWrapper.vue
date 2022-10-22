<template>
  <div :class="[prefixCls, $attrs.class ?? {}]">
    <NPageHeader
      v-if="content || $slots.headerContent || title || getHeaderSlots.length"
      v-bind="omit($attrs, 'class')"
      :style="getHeaderStyle"
    >
      <template v-if="content || $slots.headerContent" #default>
        <div v-if="content">
          {{ content }}
        </div>
        <slot v-else name="headerContent" />
      </template>
      <template #title>
        <span v-if="title" class="font-bold text-xl">{{ title }}</span>
        <slot v-else name="title" />
      </template>

      <template v-for="item in getHeaderSlots" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </NPageHeader>

    <div ref="contentRef" class="overflow-hidden" :class="getContentClass" :style="getContentStyle">
      <slot />
    </div>

    <PageFooter v-if="getShowFooter">
      <template #left>
        <slot name="leftFooter" />
      </template>
      <template #right>
        <slot name="rightFooter" />
      </template>
    </PageFooter>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties, PropType, StyleValue } from 'vue'
import { omit } from 'lodash-es'
import PageFooter from './PageFooter.vue'
import { useDesign } from '/@/composables/web/useDesign'
import { useRootSetting } from '/@/composables/setting/useRootSetting'
import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal'
import { propTypes } from '/@/utils/propTypes'

const props = defineProps({
  title: propTypes.string,
  ghost: propTypes.bool.def(false),
  content: propTypes.string,
  contentStyle: {
    type: Object as PropType<CSSProperties>,
  },
  contentBackground: propTypes.bool,
  contentClass: propTypes.string,
})

const slots = useSlots()

const { prefixCls } = useDesign('page-wrapper')
const { getIsDarkMode } = useRootSetting()

const { headerColor: c, headerBorderColor: bc } = getNaiveCssVars('Layout')
const { headerColor: dark_c, headerBorderColor: dark_bc } = getNaiveCssVars('Layout', true)

const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter)

const getHeaderSlots = computed(() => {
  return Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'))
})

const getHeaderStyle = computed((): StyleValue => {
  return {
    padding: '16px 24px',
    transition:
        'background-color var(--app-transition-duration) var(--app-bezier), border-color var(--app-transition-duration) var(--app-bezier)',
    borderBottom: `1px solid ${getIsDarkMode.value ? dark_bc : bc}`,
    ...(props.ghost ? {} : { backgroundColor: getIsDarkMode.value ? dark_c : c }),
  }
})

const getContentStyle = computed((): CSSProperties => ({ ...props.contentStyle }))

const getContentClass = computed(() => {
  const { contentBackground, contentClass } = props
  return [
      `${prefixCls}-content`,
      contentClass,
      {
        [`${prefixCls}-content-bg`]: contentBackground,
      },
  ]
})
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-page-wrapper';

  .@{prefix-cls} {
    position: relative;

    .@{prefix-cls}-content {
      margin: 24px;
    }
  }
</style>
