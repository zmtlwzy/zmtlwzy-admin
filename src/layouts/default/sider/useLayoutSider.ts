import type { Ref } from 'vue';
import { computed, unref } from 'vue';

import { TriggerEnum } from '/@/enums/menuEnum';

import { useMenuSetting } from '/@/composables/setting/useMenuSetting';

/**
 * Handle related operations of menu folding
 */
export function useTrigger(getIsMobile: Ref<boolean>) {
  const { getTrigger, getSplit } = useMenuSetting();

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger);

    return (trigger !== TriggerEnum.HEADER && !unref(getIsMobile)) || unref(getSplit);
  });

  return { getShowTrigger };
}
