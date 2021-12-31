import { computed, watchEffect, unref } from 'vue';
import { useRoute } from 'vue-router';
import type { Ref } from 'vue';

import { useRootSetting } from '/@/composables/setting/useRootSetting';
import { useTransitionSetting } from '/@/composables/setting/useTransitionSetting';
import { useMultipleTabSetting } from '/@/composables/setting/useMultipleTabSetting';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

import { RouterTransitionEnum } from '/@/enums/appEnum';

export function useTransition(nameRef: Ref<string | undefined>) {
  const { getBasicTransition, getEnableTransition } = useTransitionSetting();
  const { getShowMultipleTab } = useMultipleTabSetting();
  const tabStore = useMultipleTabStore();
  const { getOpenKeepAlive } = useRootSetting();
  const route = useRoute();

  const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));
  const getCaches = computed((): string[] => {
    if (!unref(getOpenKeepAlive)) {
      return [];
    }
    return tabStore.getCachedTabList;
  });
  const getKey = computed(() => route.fullPath);

  watchEffect(() => {
    if (!unref(getEnableTransition)) {
      nameRef.value = undefined;
      return;
    }

    if (unref(openCache)) {
      nameRef.value = route.meta.hidePageTransition
        ? undefined
        : route.meta.transitionName ||
          unref(getBasicTransition) ||
          RouterTransitionEnum.FADE_SIDE_RIGHT;
    }
  });

  return {
    openCache,
    getCaches,
    getKey,
  };
}
