<template>
  <template v-if="getShowSidebar || getIsMobile">
    <NDrawer
      v-if="getIsMobile"
      placement="left"
      :class="prefixCls"
      width="240"
      :show="!getCollapsed"
      @update:show="handleChange"
    >
      <NDrawerContent body-content-style="padding:0;">
        <Sider />
      </NDrawerContent>
    </NDrawer>
    <!-- <MixSider v-else-if="getIsMixSidebar" /> -->
    <Sider v-else />
  </template>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Sider from './LayoutSider.vue';

  import { useAppInject } from '/@/composables/web/useAppInject';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';

  import { useDesign } from '/@/composables/web/useDesign';

  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider },

    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper');
      const { getIsMobile } = useAppInject();
      const { setMenuSetting, getShowSidebar, getCollapsed } = useMenuSetting();

      function handleChange(show: boolean) {
        setMenuSetting({
          collapsed: !show,
        });
      }

      return {
        prefixCls,
        getShowSidebar,
        getIsMobile,
        getCollapsed,
        handleChange,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider-wrapper';
</style>
