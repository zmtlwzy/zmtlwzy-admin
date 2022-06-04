<template>
  <div :class="[prefixCls]" class="app-mtabs-anction-btn-wrapper group" @click="handleFold">
    <span v-if="getIsUnFold" class="app-mtabs-anction-btn i-radix-icons-exit-full-screen" />
    <span v-else class="app-mtabs-anction-btn i-radix-icons-enter-full-screen" />
  </div>
</template>
<script setup lang="ts">
  import { and, not } from '@vueuse/core';

  import { useDesign } from '/@/composables/web/useDesign';
  import { useHeaderSetting } from '/@/composables/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';

  const { prefixCls } = useDesign('multiple-tabs-content');
  const { getShowMenu, setMenuSetting } = useMenuSetting();
  const { getShowHeader, setHeaderSetting } = useHeaderSetting();

  const getIsUnFold = and(not(getShowMenu), not(getShowHeader));

  function handleFold() {
    const isUnFold = getIsUnFold.value;
    setMenuSetting({
      show: isUnFold,
      hidden: !isUnFold,
    });
    setHeaderSetting({ show: isUnFold });
  }
</script>
