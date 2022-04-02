<template>
  <footer v-if="show || getShowLayoutFooter" :class="prefixCls">
    <i-ant-design-github-filled :class="`${prefixCls}__icon`" @click="openWindow(GITHUB_URL)" />
    <div :class="`${prefixCls}__text`">Copyright &copy;2021 Zmtlwzy Admin</div>
  </footer>
</template>

<script lang="ts">
  import { GITHUB_URL } from '/@/settings/siteSetting';
  import { openWindow } from '/@/utils';

  import { useRootSetting } from '/@/composables/setting/useRootSetting';

  import { useDesign } from '/@/composables/web/useDesign';

  export default defineComponent({
    name: 'LayoutFooter',
    props: {
      show: Boolean,
    },
    setup() {
      const { getShowFooter } = useRootSetting();
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-footer');

      const getShowLayoutFooter = computed(() => {
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
      });

      return {
        getShowLayoutFooter,
        prefixCls,
        GITHUB_URL,
        openWindow,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-footer';
  .@{prefix-cls} {
    @apply text-center my-6 space-x-2 flex-jc;

    &__icon {
      @apply cursor-pointer text-18px text-gray-400 hover:text-gray-800 dark:(text-gray-600 hover:text-gray-400);
    }

    &__text {
      @apply text-gray-400 dark:text-gray-600;
    }
  }
</style>
