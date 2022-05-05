<template>
  <template v-if="getShowSidebar || getIsMobile">
    <NDrawer
      v-if="getIsMobile"
      placement="left"
      :class="prefixCls"
      :width="getMobileWidth"
      :show="!getCollapsed"
      @update:show="handleChange"
    >
      <NDrawerContent body-content-style="padding:0;">
        <Sider />
      </NDrawerContent>
    </NDrawer>
    <MixSider v-else-if="getIsMixSidebar" />
    <Sider v-else />
  </template>
</template>

<script lang="ts">
  import { useAppInject } from '/@/composables/web/useAppInject';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { useDesign } from '/@/composables/web/useDesign';

  import Sider from './LayoutSider.vue';
  import MixSider from './MixSider.vue';

  export default defineComponent({
    name: 'SiderWrapper',
    components: {
      Sider,
      MixSider,
    },

    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper');
      const { getIsMobile } = useAppInject();
      const { setMenuSetting, getShowSidebar, getIsMixSidebar, getMobileWidth, getCollapsed } =
        useMenuSetting();

      function handleChange(show: boolean) {
        setMenuSetting({
          collapsed: !show,
        });
      }

      return {
        prefixCls,
        getMobileWidth,
        getShowSidebar,
        getIsMobile,
        getIsMixSidebar,
        getCollapsed,
        handleChange,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider-wrapper';
</style>
