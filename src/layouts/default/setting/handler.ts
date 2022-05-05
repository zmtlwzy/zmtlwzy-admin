import { HandlerEnum } from './enum';
import { useAppStore } from '/@/store/modules/app';
import { ProjectConfig } from '/#/config';

export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  console.log(config, 'config');
  appStore.setProjectConfig(config);
}

export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const appStore = useAppStore();

  switch (event) {
    case HandlerEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value;

      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...(split !== undefined ? { split } : {}),
        },
      };

    case HandlerEnum.CHANGE_THEME_COLOR:
      appStore.setThemeColorIsFirstChange(false);
      appStore.setThemeColorIsManualChange(true);
      return { themeColor: value };

    case HandlerEnum.MENU_ACCORDION:
      return { menuSetting: { accordion: value } };

    case HandlerEnum.MENU_TRIGGER:
      return { menuSetting: { trigger: value } };

    case HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return { menuSetting: { mixSideTrigger: value } };

    // case HandlerEnum.MENU_COLLAPSED:
    //   return { menuSetting: { collapsed: value } };

    case HandlerEnum.MENU_WIDTH:
      return { menuSetting: { menuWidth: value } };

    case HandlerEnum.MENU_ROOT_INDENT:
      return { menuSetting: { menuRootIndent: value } };

    case HandlerEnum.MENU_INDENT:
      return { menuSetting: { menuIndent: value } };

    case HandlerEnum.MENU_SHOW_SIDEBAR:
      return { menuSetting: { show: value } };

    case HandlerEnum.MENU_SPLIT:
      return { menuSetting: { split: value } };

    // ============transition==================
    case HandlerEnum.OPEN_PAGE_LOADING:
      appStore.setPageLoading(false);
      return { transitionSetting: { openPageLoading: value } };

    case HandlerEnum.ROUTER_TRANSITION:
      return { transitionSetting: { basicTransition: value } };

    case HandlerEnum.OPEN_ROUTE_TRANSITION:
      return { transitionSetting: { enable: value } };

    case HandlerEnum.OPEN_PROGRESS:
      return { transitionSetting: { openNProgress: value } };
    // ============root==================

    case HandlerEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value };

    case HandlerEnum.SHOW_BREADCRUMB_ICON:
      return { showBreadCrumbIcon: value };

    case HandlerEnum.SHOW_FOOTER:
      return { showFooter: value };

    case HandlerEnum.SHOW_LOGO:
      return { showLogo: value };

    // ============tabs==================

    case HandlerEnum.TABS_SHOW:
      return { multiTabsSetting: { show: value } };

    // ============header==================
    case HandlerEnum.HEADER_SHOW:
      return { headerSetting: { show: value } };
    default:
      return {};
  }
}
