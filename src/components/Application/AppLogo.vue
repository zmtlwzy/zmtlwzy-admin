<template>
  <div
    ref="wrapperEl"
    class="flex-ac ease-in-out-300"
    :style="getWrapperStyle"
    @click="goHome"
  >
    <i-my-svg-logo :style="getLogoStyle" />
    <div
      v-if="showTitle"
      ref="titleEl"
      class="text-$app-primary-color dark:text-white font-segoe transition-colors ease-in-out-300 ml-3 font-semibold"
      :class="[`${prefixCls}__title`]"
      :style="getTitleStyle"
    >
      {{ getTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { Pausable } from '@vueuse/core'
import {
  type MaybeElementRef,
  unrefElement,
  useEventListener,
  useRafFn,
} from '@vueuse/core'
import { clamp } from 'lodash-es'
import { layoutSiderCollapsedWidth } from '/@/settings/designSetting'
import { formatLength } from '/@/utils/css'
import { useDesign } from '/@/composables/web/useDesign'
import { useMenuSetting } from '/@/composables/setting/useMenuSetting'
import { useGlobSetting } from '/@/composables/setting'
import { useGo } from '/@/composables/web/usePage'
import { useAppInject } from '/@/composables/web/useAppInject'
import { PageEnum } from '/@/enums/pageEnum'
import { useUserStore } from '/@/store/modules/user'
import { propTypes } from '/@/utils/propTypes'

const props = defineProps({
  logoSize: propTypes.stringNumber.def(32),
  showTitle: propTypes.bool.def(true),
  titleSize: propTypes.stringNumber.def(18),
  titleColor: propTypes.string,
  collapsed: propTypes.bool,
  collapsedShowTitle: propTypes.bool.def(false),
  isStatic: propTypes.bool.def(false),
  width: propTypes.stringNumber,
  canGoHome: propTypes.bool.def(true),
})

const { prefixCls } = useDesign('app-logo')
const userStore = useUserStore()
const { title } = useGlobSetting()
const { getMenuWidth, getMobileWidth, getMenuRootIndent, getCollapsed } = useMenuSetting()
const { getIsMobile } = useAppInject()

const wrapperEl = ref() as MaybeElementRef<HTMLDivElement>
const titleEl = ref() as MaybeElementRef<HTMLDivElement>
const clip = ref(`inset(0px ${props.collapsed ? 100 : 0}% 0px 0px)`)

watch([wrapperEl, titleEl, () => props.showTitle], () => {
  handleListener()
})

function handleListener() {
  const wEl = unrefElement(wrapperEl)
  const tEl = unrefElement(titleEl)
  if (!wEl || !tEl || !props.showTitle)
    return
  const fn = clacClipPath(wEl, tEl)
  fn()
  let control: Pausable
  useEventListener(wEl, 'transitionstart', () => {
    if (control) {
      control.resume()
      return
    }
    control = useRafFn(fn)
  })
  useEventListener(wEl, 'transitionend', () => {
    if (!control)
      return
    control.pause()
  })
}

function clacClipPath(...els: HTMLDivElement[]) {
  return () => {
    const [wEl, tEl] = els
    const ww = wEl.offsetWidth
    const tw = tEl.offsetWidth
    const tl = tEl.offsetLeft
    const pr = 16
    const res = tw - ww + tl + pr
    clip.value = `inset(0px ${clamp(res, 0, tw + 1)}px 0px 0px)`
  }
}

const go = useGo()

const getWrapperStyle = computed((): StyleValue => {
  const { collapsed, collapsedShowTitle, isStatic, width, canGoHome } = props
  return Object.assign({ cursor: canGoHome ? 'pointer' : 'unset' },
    isStatic
      ? {}
      : {
          paddingLeft: collapsed ? '7px' : `${getMenuRootIndent.value - 4}px`,
          width: (collapsed ?? getCollapsed.value) && !collapsedShowTitle
            ? formatLength(layoutSiderCollapsedWidth)
            : formatLength(
              width ?? getIsMobile.value ? getMobileWidth.value : getMenuWidth.value,
            ),
        })
})

const getLogoStyle = computed((): StyleValue => {
  return {
    fontSize: formatLength(props.logoSize),
    transition: 'font-size var(--app-transition-duration) var(--app-bezier)',
    minWidth: formatLength(props.logoSize),
    zIndex: 10,
  }
})

const getTitleStyle = computed((): StyleValue => {
  const { titleSize, titleColor } = props
  return {
    fontSize: formatLength(titleSize),
    lineHeight: 1.3,
    ...(props.isStatic ? {} : { clipPath: clip.value }),
    ...(titleColor ? { color: titleColor } : {}),
  }
})

const getTitleWidth = computed(() => (props.collapsed ? 0 : '100%'))

const getTitle = computed(() => title)

function goHome() {
  if (!props.canGoHome)
    return
  go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
}
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    &__title {
      @supports (background-clip: text) or (-webkit-background-clip: text) {
        white-space: nowrap;
        background-clip: text;
        -webkit-background-clip: text;
        background-color: currentColor;
      }
      @supports not (-webkit-background-clip: text) {
        transition-property: width;
        width: v-bind(getTitleWidth);
      }
    }
  }
</style>
