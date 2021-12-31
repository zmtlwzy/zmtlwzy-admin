<script lang="ts">
  import { defineComponent, ref, unref, watch, PropType, toRef, computed } from 'vue';
  import { useRouter } from 'vue-router';

  import { useSplitMenu, useRender } from './useLayoutMenu';

  import type { Menu } from '/@/router/types';
  import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { useAppInject } from '/@/composables/web/useAppInject';

  import { getAllParentPath } from '/@/router/helper/menuHelper';
  import { getCurrentParentPath } from '/@/router/menus';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { propTypes } from '/@/utils/propTypes';
  import { useGo } from '/@/composables/web/usePage';

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      inverted: propTypes.bool,
      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE,
      },
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
    },
    setup(props) {
      const splitType = toRef(props, 'splitType');
      const { menusRef } = useSplitMenu(splitType);
      const { renderIcon, renderLabel } = useRender();
      const { getMenuMode, getCollapsed, getAccordion } = useMenuSetting();
      const { currentRoute } = useRouter();
      const go = useGo();

      const expandedKeys = ref<string[]>([]);
      const menuValue = ref<Menu['key']>();

      const handleUpdateExpandedKeys = (e: string[]) => {
        expandedKeys.value = e;
      };

      const handleUpdateValue = (path: string) => {
        go(path);
      };

      const { getIsMobile } = useAppInject();

      const getRealMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.VERTICAL : props.menuMode || unref(getMenuMode)
      );

      const getIsTopType = computed(() => splitType.value === MenuSplitTyeEnum.TOP);
      watch(
        [currentRoute, menusRef],
        async ([route, menuList]) => {
          if (route.name === REDIRECT_NAME) return;
          menuValue.value = route.path;
          if (getAccordion.value && menuList && menuList.length > 0) {
            const allPath = getAllParentPath(menuList, route.path);
            if (getIsTopType.value) {
              console.log(menuList, 'menuList');
              const parentPath = await getCurrentParentPath(route.path);
              menuValue.value = parentPath as string;
            } else {
              allPath.length >= 2 && allPath.pop();
              expandedKeys.value = allPath as string[];
            }
          }
        },
        { immediate: true }
      );

      return {
        getRealCollapsed: computed(() => (getIsTopType.value ? false : getCollapsed.value)),
        getInverted: toRef(props, 'inverted'),
        menuValue,
        menusRef,
        expandedKeys,
        handleUpdateExpandedKeys,
        handleUpdateValue,
        renderIcon,
        renderLabel,
        getRealMenuMode,
      };
    },
  });
</script>

<template>
  <NMenu
    v-model:value="menuValue"
    :mode="getRealMenuMode"
    key-field="path"
    :collapsed="getRealCollapsed"
    :inverted="getInverted"
    :options="menusRef"
    :expanded-keys="expandedKeys"
    :render-icon="renderIcon"
    :render-label="renderLabel"
    @update:expanded-keys="handleUpdateExpandedKeys"
    @update:value="handleUpdateValue"
  />
</template>
