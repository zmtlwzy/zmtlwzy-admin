<script setup lang="ts">
  import { computed, unref } from 'vue';

  import {
    ThemeModePicker,
    LayoutModePicker,
    ThemeColorPicker,
    SettingFooter,
    SliderItem,
    SwitchItem,
    SelectItem,
    // InputNumberItem,
  } from './components';

  import { useRootSetting } from '/@/composables/setting/useRootSetting';
  import { useHeaderSetting } from '/@/composables/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { useMultipleTabSetting } from '/@/composables/setting/useMultipleTabSetting';
  import { useTransitionSetting } from '/@/composables/setting/useTransitionSetting';

  import { MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
  import { HandlerEnum, routerTransitionOptions, getMenuTriggerOptions } from './enum';

  import { useI18n } from '/@/composables/web/useI18n';
  import { useDrawer, useDrawerEnum } from '/@/composables/component/useDrawer';

  import { APP_PRESET_COLOR_LIST } from '/@/settings/designSetting';

  const { t } = useI18n();
  const [state] = useDrawer(useDrawerEnum.AppConfigDrawer);

  const { getShowFooter, getShowBreadCrumb, getShowBreadCrumbIcon, getThemeColor } =
    useRootSetting();

  const {
    getIsHorizontal,
    getIsMixSidebar,
    getShowMenu,
    getMenuType,
    getSplit,
    getMenuWidth,
    getTrigger,
  } = useMenuSetting();

  const {
    getShowHeader,
    // getFixed: getHeaderFixed,
  } = useHeaderSetting();

  const { getShowMultipleTab } = useMultipleTabSetting();

  const getShowMenuRef = computed(() => {
    return unref(getShowMenu) && !unref(getIsHorizontal);
  });

  const { getOpenPageLoading, getBasicTransition, getEnableTransition, getOpenNProgress } =
    useTransitionSetting();

  const getDeftrigger = computed(() => (getSplit.value ? TriggerEnum.HEADER : TriggerEnum.BAR));

  const triggerOptions = computed(() => {
    return getMenuTriggerOptions(unref(getSplit));
  });
</script>

<template>
  <NDrawer v-model:show="state" :width="330">
    <NDrawer-content :native-scrollbar="false" closable>
      <template #header>
        <NText>{{ t('layout.setting.drawerTitle') }}</NText>
      </template>
      <NDivider>{{ t('layout.setting.darkMode') }}</NDivider>
      <ThemeModePicker />

      <NDivider>{{ t('layout.setting.navMode') }}</NDivider>
      <LayoutModePicker />
      <NDivider>{{ t('layout.setting.color') }}</NDivider>
      <ThemeColorPicker
        :title="t('layout.setting.primaryColor')"
        :event="HandlerEnum.CHANGE_THEME_COLOR"
        :val="getThemeColor"
        :swatches="APP_PRESET_COLOR_LIST"
        :show-alpha="false"
      />
      <NDivider>{{ t('layout.setting.interfaceFunction') }}</NDivider>
      <SwitchItem
        :title="t('layout.setting.splitMenu')"
        :event="HandlerEnum.MENU_SPLIT"
        :val="getSplit"
        :disabled="!getShowMenuRef || getMenuType !== MenuTypeEnum.MIX"
      />

      <SliderItem
        :title="t('layout.setting.expandedMenuWidth')"
        :max="600"
        :min="100"
        :step="1"
        :format-tooltip="(val) => `${val}px`"
        :event="HandlerEnum.MENU_WIDTH"
        :disabled="false"
        :val="getMenuWidth"
      />

      <SelectItem
        :title="t('layout.setting.menuCollapseButton')"
        :event="HandlerEnum.MENU_TRIGGER"
        :val="getTrigger"
        :default-value="getDeftrigger"
        :options="triggerOptions"
        :disabled="!getShowMenuRef || getIsMixSidebar"
      />
      <NDivider>{{ t('layout.setting.interfaceDisplay') }}</NDivider>
      <SwitchItem
        :title="t('layout.setting.breadcrumb')"
        :event="HandlerEnum.SHOW_BREADCRUMB"
        :val="getShowBreadCrumb"
        :disabled="!getShowHeader"
      />
      <SwitchItem
        :title="t('layout.setting.breadcrumbIcon')"
        :event="HandlerEnum.SHOW_BREADCRUMB_ICON"
        :val="getShowBreadCrumbIcon"
        :disabled="!getShowHeader"
      />
      <SwitchItem
        :title="t('layout.setting.tabs')"
        :event="HandlerEnum.TABS_SHOW"
        :val="getShowMultipleTab"
      />
      <SwitchItem
        :title="t('layout.setting.footer')"
        :event="HandlerEnum.SHOW_FOOTER"
        :val="getShowFooter"
      />
      <NDivider>{{ t('layout.setting.animation') }}</NDivider>

      <SwitchItem
        :title="t('layout.setting.progress')"
        :event="HandlerEnum.OPEN_PROGRESS"
        :val="getOpenNProgress"
      />
      <SwitchItem
        :title="t('layout.setting.switchLoading')"
        :event="HandlerEnum.OPEN_PAGE_LOADING"
        :val="getOpenPageLoading"
      />

      <SwitchItem
        :title="t('layout.setting.switchAnimation')"
        :event="HandlerEnum.OPEN_ROUTE_TRANSITION"
        :val="getEnableTransition"
      />

      <SelectItem
        :title="t('layout.setting.animationType')"
        :event="HandlerEnum.ROUTER_TRANSITION"
        :val="getBasicTransition"
        :options="routerTransitionOptions"
        :disabled="!getEnableTransition"
      />

      <NDivider />

      <SettingFooter />
    </NDrawer-content>
  </NDrawer>
</template>
