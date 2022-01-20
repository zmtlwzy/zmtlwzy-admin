import type { Menu } from '/@/router/types';
import type { Ref } from 'vue';
import { watch, unref, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { isBoolean } from 'lodash-es';
import { MenuSplitTypeEnum } from '/@/enums/menuEnum';
import { useThrottleFn } from '@vueuse/core';
import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
import { getChildrenMenus, getCurrentParentPath, getMenus, getShallowMenus } from '/@/router/menus';
import { usePermissionStore } from '/@/store/modules/permission';
import { useAppInject } from '/@/composables/web/useAppInject';

export function useSplitMenu(
  splitType?: Ref<MenuSplitTypeEnum>,
  parentPath?: Ref<string | undefined>,
  globalSplit?: Ref<boolean | undefined>
) {
  // Menu array
  const menusRef = ref<Menu[]>();
  const { currentRoute } = useRouter();
  const { getIsMobile } = useAppInject();
  const permissionStore = usePermissionStore();
  const { setMenuSetting, getIsHorizontal, getSplit } = useMenuSetting();

  const throttleHandleSplitSecMenu = useThrottleFn(handleSplitSecMenu, 50);

  const splitNotSec = computed(
    () => unref(splitType) !== MenuSplitTypeEnum.SECONDARY && !unref(getIsHorizontal)
  );

  const getSplitSec = computed(() => {
    let isSplit = unref(getSplit);
    const gSplit = unref(globalSplit);
    if (isBoolean(gSplit)) isSplit = gSplit;
    return !isSplit || unref(splitType) !== MenuSplitTypeEnum.SECONDARY;
  });

  const getSpiltRoot = computed(() => unref(splitType) === MenuSplitTypeEnum.ROOT);

  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTypeEnum.NONE || !unref(getSplit);
  });

  watch(
    [() => unref(currentRoute).path, () => unref(parentPath), () => unref(splitType)],
    async ([path, _parentPath]) => {
      if (unref(splitNotSec) || unref(getIsMobile)) return;
      const { meta } = unref(currentRoute);
      const currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath: string;
      if (_parentPath) {
        parentPath = _parentPath;
      } else {
        parentPath = await getCurrentParentPath(path);
        if (!parentPath) {
          parentPath = await getCurrentParentPath(currentActiveMenu);
        }
      }
      parentPath && throttleHandleSplitSecMenu(parentPath);
    },
    {
      immediate: true,
    }
  );

  // Menu changes
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus();
    },
    {
      immediate: true,
    }
  );

  // split Menu changes
  watch(
    () => getSplit.value,
    () => {
      if (unref(splitNotSec)) return;
      genMenus();
    }
  );

  // Handle secondary menu split
  async function handleSplitSecMenu(parentPath: string) {
    if (unref(getSplitSec) || unref(getIsMobile)) return;

    const children = await getChildrenMenus(parentPath);

    if (!children || !children.length) {
      setMenuSetting({ hidden: true });
      menusRef.value = [];
      return;
    }

    setMenuSetting({ hidden: false });
    menusRef.value = children;
  }

  // get menus
  async function genMenus() {
    // normal mode
    if (unref(normalType) || unref(getIsMobile)) {
      menusRef.value = await getMenus();
      return;
    }

    // split-top
    if (unref(getSpiltRoot)) {
      const shallowMenus = await getShallowMenus();

      menusRef.value = shallowMenus;
    }
  }

  return { menusRef };
}
