<script setup lang="ts">
import {
  InputNumberItem,
  LayoutModePicker,
  SelectItem,
  SettingFooter,
  SliderItem,
  SwitchItem,
  ThemeColorPicker,
  ThemeModePicker,
} from './components'

import { darkTheme } from 'naive-ui'
import { useAppStore } from '/@/store/modules/app'

import { useRootSetting } from '/@/composables/setting/useRootSetting'
import { useHeaderSetting } from '/@/composables/setting/useHeaderSetting'
import { useMenuSetting } from '/@/composables/setting/useMenuSetting'
import { useMultipleTabSetting } from '/@/composables/setting/useMultipleTabSetting'
import { useTransitionSetting } from '/@/composables/setting/useTransitionSetting'

import { MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum'
import {
  HandlerEnum,
  getMenuTriggerOptions,
  getMixSidebarTriggerOptions,
  routerTransitionOptions,
} from './enum'

import { useI18n } from '/@/composables/web/useI18n'
import { useDrawer, useDrawerEnum } from '/@/composables/component/useDrawer'

import { APP_PRESET_COLOR_LIST } from '/@/settings/designSetting'

const { t } = useI18n()
const [state] = useDrawer(useDrawerEnum.AppConfigDrawer)

const appStore = useAppStore()
const { getShowFooter, getShowBreadCrumb, getShowBreadCrumbIcon, getThemeColor }
    = useRootSetting()

const {
  getIsHorizontal,
  getIsMixSidebar,
  getShowMenu,
  getMenuType,
  getSplit,
  getMenuWidth,
  getMenuRootIndent,
  getMenuIndent,
  getTrigger,
  getMixSideTrigger,
} = useMenuSetting()

const { getShowHeader } = useHeaderSetting()

const { getShowMultipleTab } = useMultipleTabSetting()

const getShowMenuRef = computed(() => {
  return unref(getShowMenu) && !unref(getIsHorizontal)
})

const { getOpenPageLoading, getBasicTransition, getEnableTransition, getOpenNProgress }
    = useTransitionSetting()

const getDeftrigger = computed(() => (getSplit.value ? TriggerEnum.HEADER : TriggerEnum.BAR))

const triggerOptions = computed(() => {
  return getMenuTriggerOptions(unref(getSplit))
})

const getColorPickerVal = computed(() => {
  return !appStore.getThemeColorIsManualChange && appStore.getThemeColorIsFirstChange
    ? darkTheme.common.primaryColor
    : getThemeColor.value
})

// const getRandomPer = (length: number) => {
//   return Array.from({ length }).map(() => {
//     return `${Math.random() * 90 + 10}%`;
//   });
// };

// const skeletonWidthList = getRandomPer(7);
</script>

<template>
  <NDrawer v-model:show="state" :width="330">
    <NDrawer-content :native-scrollbar="false" closable>
      <template #header>
        <NText>{{ t('layout.setting.drawerTitle') }}</NText>
      </template>
      <!-- <Suspense> -->
      <!-- <div> -->
      <NDivider>{{ t('layout.setting.darkMode') }}</NDivider>
      <ThemeModePicker />

      <NDivider>{{ t('layout.setting.navMode') }}</NDivider>
      <LayoutModePicker />
      <NDivider>{{ t('layout.setting.color') }}</NDivider>
      <ThemeColorPicker
        :title="t('layout.setting.primaryColor')"
        :event="HandlerEnum.CHANGE_THEME_COLOR"
        :val="getColorPickerVal"
        :swatches="APP_PRESET_COLOR_LIST"
        :show-alpha="false"
        :modes="['hex']"
      />
      <!-- </div> -->
      <!-- <template #fallback>
          <div class="flex flex-col gap-8 mt-12">
            <div class="flex-ja gap-4 px-4">
              <n-skeleton height="48px" width="56px" :sharp="false" v-for="i in 3" :key="i" />
            </div>
            <div class="flex-ja gap-4 px-4">
              <n-skeleton height="48px" width="56px" :sharp="false" v-for="i in 4" :key="i" />
            </div>
            <div class="flex-jb-ac px-4">
              <div class="w-80px">
                <n-skeleton text height="6px" :repeat="2" />
              </div>
              <n-skeleton width="100px" height="36px" :sharp="false" />
            </div>
          </div>
        </template> -->
      <!-- </Suspense> -->
      <!-- <Suspense> -->
      <!-- <div> -->
      <NDivider>{{ t('layout.setting.interfaceFunction') }}</NDivider>
      <SwitchItem
        :title="t('layout.setting.splitMenu')"
        :event="HandlerEnum.MENU_SPLIT"
        :val="getSplit"
        :disabled="!getShowMenuRef || getMenuType !== MenuTypeEnum.MIX"
      />

      <InputNumberItem
        :title="t('layout.setting.expandedMenuWidth')"
        :max="600"
        :min="100"
        :event="HandlerEnum.MENU_WIDTH"
        :disabled="false"
        :val="getMenuWidth"
      />

      <SliderItem
        :title="t('layout.setting.menuRootIndent')"
        :max="64"
        :min="16"
        :step="1"
        :format-tooltip="(val) => `${val}px`"
        :event="HandlerEnum.MENU_ROOT_INDENT"
        :disabled="false"
        :val="getMenuRootIndent"
      />

      <SliderItem
        :title="t('layout.setting.menuIndent')"
        :max="64"
        :min="16"
        :step="1"
        :format-tooltip="(val) => `${val}px`"
        :event="HandlerEnum.MENU_INDENT"
        :disabled="false"
        :val="getMenuIndent"
      />

      <SelectItem
        :title="t('layout.setting.menuCollapseButton')"
        :event="HandlerEnum.MENU_TRIGGER"
        :val="getTrigger"
        :default-value="getDeftrigger"
        :options="triggerOptions"
        :disabled="!getShowMenuRef"
      />

      <SelectItem
        :title="t('layout.setting.mixSidebarTrigger')"
        :event="HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR"
        :val="getMixSideTrigger"
        :options="getMixSidebarTriggerOptions"
        :disabled="!getIsMixSidebar"
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
      <!-- </div> -->
      <!-- <template #fallback>
          <div class="flex flex-col gap-6 mt-16">
            <div class="flex-jb-ac px-4" v-for="(val, idx) in skeletonWidthList" :key="idx">
              <div class="w-80px">
                <n-skeleton text height="6px" />
                <n-skeleton text height="6px" :width="val" />
              </div>
              <n-skeleton width="100px" height="36px" :sharp="false" />
            </div>
          </div>
        </template> -->
      <!-- </Suspense> -->

      <SettingFooter />
    </NDrawer-content>
  </NDrawer>
</template>
