<template>
  <n-layout-header
    v-if="getShowHeader"
    bordered
    :class="[prefixCls, { inverted: getInverted }]"
    :inverted="getInverted"
  >
    <div class="*hb-layout h-full text-1.2em">
      <div class="*hb-layout h-full">
        <div v-if="!getIsSidebarType" class="*vs-layout h-full">
          <AppLogo
            :collapsed="getCollapsed"
            collapsed-show-title
            :title-color="getInverted ? 'white' : undefined"
          />
        </div>
        <Trigger v-if="getShowTrigger || getIsMobile" :type="TriggerEnum.HEADER" />
        <LayoutBreadcrumb v-if="getShowContent && getShowBread && !getIsMobile" class="ml-3" />
      </div>
      <div v-if="getShowTopMenu && !getIsMobile" class="flex-1 px-2">
        <LayoutMenu :menu-mode="getMenuMode" :split-type="getSplitType" :inverted="getInverted" />
      </div>
      <div class="*vs-layout h-full">
        <Notify v-if="!getIs2xs" />
        <AppLocalePicker v-if="getShowLocalePicker" trigger-cls="app-layout-header-anction-icon" />
        <FullScreen v-if="!getIs2xs" />
        <UserDropDown v-if="!getIs2xs" />
        <SettingDrawer />
      </div>
    </div>
  </n-layout-header>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { propTypes } from '/@/utils/propTypes';
  import { LayoutBreadcrumb, FullScreen, Notify, UserDropDown } from './components';
  import Trigger from '../trigger/index.vue';
  import LayoutMenu from '../menu/index.vue';

  import { useHeaderSetting } from '/@/composables/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { useDesign } from '/@/composables/web/useDesign';
  import { useAppInject } from '/@/composables/web/useAppInject';
  import { useBreakpoint } from '/@/composables/event/useBreakpoint';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useLocale } from '/@/locales/useLocale';

  import { MenuModeEnum, MenuSplitTyeEnum, TriggerEnum } from '/@/enums/menuEnum';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Trigger,
      LayoutBreadcrumb,
      LayoutMenu,
      FullScreen,
      Notify,
      UserDropDown,
      SettingDrawer: createAsyncComponent(() => import('/@/layouts/default/setting/index.vue'), {
        loading: true,
        size: 16,
      }),
    },
    props: {
      fixed: propTypes.bool,
    },
    setup() {
      const { prefixCls } = useDesign('layout-header');
      const { getIsMobile } = useAppInject();
      const { smaller, sizeEnum } = useBreakpoint();
      const getIs2xs = smaller(sizeEnum.XXS);

      const {
        getSplit,
        getCollapsed,
        getMenuInverted,
        getShowTopMenu,
        getIsSidebarType,
        getIsTopMenu,
        getTrigger,
      } = useMenuSetting();
      const { getShowBread, getShowContent, getShowHeader } = useHeaderSetting();

      const getShowTrigger = computed(() => {
        return (
          getTrigger.value === TriggerEnum.HEADER &&
          !getIsTopMenu.value &&
          getShowContent.value &&
          !getSplit.value
        );
      });

      const { getShowLocalePicker } = useLocale();

      const getSplitType = computed(() => {
        return getSplit.value ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
      });

      const getMenuMode = computed(() => {
        return MenuModeEnum.HORIZONTAL;
      });

      const getInverted = computed(
        () => getMenuInverted.value && (getSplit.value || getIsTopMenu.value)
      );

      return {
        getShowHeader,
        getIsMobile,
        getShowLocalePicker,
        prefixCls,
        getShowBread,
        getShowContent,
        getCollapsed,
        getShowTopMenu,
        getIsSidebarType,
        getShowTrigger,
        TriggerEnum,
        getSplitType,
        getMenuMode,
        getInverted,
        getIs2xs,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-header';

  .@{prefix-cls} {
    grid-area: header;
    height: @header-height;
    --hover-color: var(--app-hover-color);
    &.inverted {
      --hover-color: rgba(255, 255, 255, 0.09);
    }
  }
</style>
