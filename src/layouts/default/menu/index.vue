<script lang="ts">
import type { PropType, VNodeChild } from 'vue'
import type { MenuInst } from 'naive-ui'

import { useSplitMenu } from './useLayoutMenu'

import type { Menu } from '/@/router/types'
import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnum'

import { useMenuSetting } from '/@/composables/setting/useMenuSetting'
import { useAppInject } from '/@/composables/web/useAppInject'
import { useI18n } from '/@/composables/web/useI18n'

import { getAllParentPath } from '/@/router/helper/menuHelper'
import { getCurrentParentPath } from '/@/router/menus'
import { REDIRECT_NAME } from '/@/router/constant'
import { propTypes } from '/@/utils/propTypes'
import PrefetchLink from '/@/components/Prefetch/PrefetchLink.vue'
import { useGo } from '/@/composables/web/usePage'

import Icon from '/@/components/Icon/Icon.vue'

export default defineComponent({
  name: 'LayoutMenu',
  props: {
    inverted: propTypes.bool,
    parentPath: propTypes.string,
    noCollapsed: propTypes.bool,
    globalSplit: {
      type: Boolean,
      default: undefined,
    },
    splitType: {
      type: Number as PropType<MenuSplitTypeEnum>,
      default: MenuSplitTypeEnum.NONE,
    },
    menuMode: {
      type: [String] as PropType<Nullable<MenuModeEnum>>,
      default: '',
    },
  },
  setup(props) {
    const menuInstRef = ref<MenuInst | null>(null)
    const { splitType, parentPath, globalSplit } = toRefs(props)
    const { menusRef } = useSplitMenu(splitType, parentPath, globalSplit)
    const { getMenuMode, getMenuIndent, getMenuRootIndent, getCollapsed, getAccordion }
        = useMenuSetting()
    const { currentRoute } = useRouter()
    const go = useGo()
    const { t } = useI18n()

    const expandedKeys = ref<string[]>([])
    const menuValue = ref<Menu['key']>()

    const handleUpdateExpandedKeys = (e: string[]) => {
      console.log(e, 'expand')
      expandedKeys.value = e
    }

    const handleUpdateValue = (path: string) => {
      go(path)
    }

    const { getIsMobile } = useAppInject()

    const getRealMenuMode = computed(() =>
      unref(getIsMobile) ? MenuModeEnum.VERTICAL : props.menuMode || unref(getMenuMode),
    )

    const getIsRootType = computed(() => splitType.value === MenuSplitTypeEnum.ROOT)

    watch(
      [currentRoute, menusRef],
      async ([route, menuList]) => {
        const { name, path, meta } = route
        if (name === REDIRECT_NAME)
          return
        menuValue.value = path
        if (getAccordion.value && menuList && menuList.length > 0) {
          const allPath = getAllParentPath(menuList, path)
          if (getIsRootType.value) {
            const parentPath = await getCurrentParentPath(path)
            menuValue.value = parentPath as string
          }
          else if (meta.currentActiveMenu) {
            menuValue.value = meta.currentActiveMenu
            nextTick(() => {
              menuInstRef.value?.showOption(meta.currentActiveMenu)
            })
          }
          else {
            allPath.length >= 2 && allPath.pop()
            expandedKeys.value = allPath
          }
        }
      },
      { immediate: true },
    )

    const getRealCollapsed = computed(() => {
      return props.noCollapsed || getIsRootType.value ? false : getCollapsed.value
    })

    const renderIcon = ({ meta }: Menu): VNodeChild => {
      const icon = meta?.icon
      if (icon) {
        return h(Icon, {
          icon,
        })
      }
      return null
    }

    const renderLabel = (node: Menu) => {
      return h(
        PrefetchLink,
        {
          to: node.path,
          custom: true,
        },
        {
          default: () =>
            h('span', null, {
              default: () => t(node?.label ?? ''),
            }),
        },
      )
    }

    return {
      getRealCollapsed,
      getInverted: toRef(props, 'inverted'),
      menuValue,
      menuInstRef,
      menusRef,
      expandedKeys,
      handleUpdateExpandedKeys,
      handleUpdateValue,
      renderIcon,
      renderLabel,
      getRealMenuMode,
      getMenuIndent,
      getMenuRootIndent,
    }
  },
})
</script>

<template>
  <NMenu
    ref="menuInstRef"
    v-model:value="menuValue"
    :mode="getRealMenuMode"
    key-field="path"
    :collapsed="getRealCollapsed"
    :inverted="getInverted"
    :indent="getMenuIndent"
    :root-indent="getMenuRootIndent"
    :options="menusRef"
    :expanded-keys="expandedKeys"
    :render-icon="renderIcon"
    :render-label="renderLabel"
    @update:expanded-keys="handleUpdateExpandedKeys"
    @update:value="handleUpdateValue"
  />
</template>
