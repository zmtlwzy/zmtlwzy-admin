<template>
  <div :class="[prefixCls, getLayoutCls]">
    <LayoutHeader />
    <LayoutSider />
    <MTabs />
    <LayoutContent #footer>
      <LayoutFooter />
    </LayoutContent>
  </div>
</template>

<script lang="ts">
import { LayoutClsEnum, MenuTypeEnum } from '/@/enums/menuEnum'
import { useDesign } from '/@/composables/web/useDesign'
import { useMenuSetting } from '/@/composables/setting/useMenuSetting'
import LayoutHeader from './header/index.vue'
import LayoutSider from './sider/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'
import MTabs from './tabs/index.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
    MTabs,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout')
    const { getMenuType } = useMenuSetting()

    const getLayoutCls = computed(() => {
      let layout = ''
      switch (getMenuType.value) {
        case MenuTypeEnum.SIDEBAR:
          layout = LayoutClsEnum.SIDEBAR
          break
        case MenuTypeEnum.MIX_SIDEBAR:
          layout = LayoutClsEnum.MIX_SIDEBAR
          break
        case MenuTypeEnum.MIX:
          layout = LayoutClsEnum.MIX
          break
        case MenuTypeEnum.TOP_MENU:
          layout = LayoutClsEnum.TOP_MENU
          break
      }
      return `${layout}`
    })

    return {
      getLayoutCls,
      prefixCls,
    }
  },
})
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: grid;
    height: 100vh;

    &.sider-layout,
    &.mix-sider-layout {
      grid-template-areas:
        'sider header'
        'sider multipletab'
        'sider content';
      grid-template-rows: minmax(0, auto) minmax(0, auto) 1fr;
      grid-template-columns: minmax(0, auto) 1fr;
    }

    &.mix-layout {
      grid-template-areas:
        'header header'
        'sider multipletab'
        'sider content';
      grid-template-rows: minmax(0, auto) minmax(0, auto) 1fr;
      grid-template-columns: minmax(0, auto) 1fr;
    }

    &.top-menu-layout {
      grid-template-areas:
        'header'
        'multipletab'
        'content';
      grid-template-rows: minmax(0, auto) minmax(0, auto) 1fr;
      grid-template-columns: 1fr;
    }
  }
</style>
