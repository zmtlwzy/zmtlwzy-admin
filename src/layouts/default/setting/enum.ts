import { ContentEnum, RouterTransitionEnum, ThemeStateEnum } from '/@/enums/appEnum';
import {
  MenuModeEnum,
  MenuTypeEnum,
  TopMenuAlignEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@/enums/menuEnum';

import { t } from '/@/composables/web/useI18n';

export enum HandlerEnum {
  CHANGE_LAYOUT,
  CHANGE_THEME_COLOR,
  CHANGE_THEME,
  // menu
  MENU_HAS_DRAG,
  MENU_ACCORDION,
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_ROOT_INDENT,
  MENU_INDENT,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  MENU_SPLIT,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,

  // header
  HEADER_SHOW,
  HEADER_THEME,
  HEADER_FIXED,

  HEADER_SEARCH,

  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,

  LOCK_TIME,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  COLOR_WEAK,
  SHOW_LOGO,
  SHOW_FOOTER,

  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION,
}

export const contentModeOptions = [
  {
    value: ContentEnum.FULL,
    label: t('layout.setting.contentModeFull'),
  },
  {
    value: ContentEnum.FIXED,
    label: t('layout.setting.contentModeFixed'),
  },
];

export const topMenuAlignOptions = [
  {
    value: TopMenuAlignEnum.CENTER,
    label: t('layout.setting.topMenuAlignRight'),
  },
  {
    value: TopMenuAlignEnum.START,
    label: t('layout.setting.topMenuAlignLeft'),
  },
  {
    value: TopMenuAlignEnum.END,
    label: t('layout.setting.topMenuAlignCenter'),
  },
];

export const getMenuTriggerOptions = (hideTop: boolean) => {
  return [
    {
      value: TriggerEnum.BAR,
      label: t('layout.setting.menuTriggerBar'),
    },
    {
      value: TriggerEnum.BUTTON,
      label: t('layout.setting.menuTriggerButton'),
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: t('layout.setting.menuTriggerTop'),
          },
        ]),
  ];
};

export const getMixSidebarTriggerOptions = [
  {
    value: MixSidebarTriggerEnum.CLICK,
    label: t('layout.setting.triggerClick'),
  },
  {
    value: MixSidebarTriggerEnum.HOVER,
    label: t('layout.setting.triggerHover'),
  },
];

export const routerTransitionOptions = [
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.FADE_SIDE_RIGHT,
  RouterTransitionEnum.FADE_SIDE_LEFT,
  RouterTransitionEnum.FADE_TOP,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.ZOOM_OUT,
].map((item) => {
  return {
    label: item,
    value: item,
  };
});

export const menuTypeList = [
  {
    title: t('layout.setting.menuTypeSidebar'),
    mode: MenuModeEnum.VERTICAL,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: t('layout.setting.menuTypeMix'),
    mode: MenuModeEnum.VERTICAL,
    type: MenuTypeEnum.MIX,
  },

  {
    title: t('layout.setting.menuTypeTopMenu'),
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU,
  },
  {
    title: t('layout.setting.menuTypeMixSidebar'),
    mode: MenuModeEnum.VERTICAL,
    type: MenuTypeEnum.MIX_SIDEBAR,
  },
];

export const themeModeList = [
  {
    title: t('common.light'),
    mode: ThemeStateEnum.LIGHT,
  },
  {
    title: t('common.menuDark'),
    mode: ThemeStateEnum.MENU_DARK,
  },
  {
    title: t('common.dark'),
    mode: ThemeStateEnum.DARK,
  },
];

export const mixSidebarTriggerOptions = [
  {
    value: MixSidebarTriggerEnum.HOVER,
    label: t('layout.setting.triggerHover'),
  },
  {
    value: MixSidebarTriggerEnum.CLICK,
    label: t('layout.setting.triggerClick'),
  },
];
