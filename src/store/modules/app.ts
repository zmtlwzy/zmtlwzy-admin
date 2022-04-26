import type { ProjectConfig } from '/#/config';

import type { BeforeMiniState } from '/#/store';

import { ThemeEnum } from '/@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { darkMode } from '/@/settings/designSetting';
import projectSetting from '/@/settings/projectSetting';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { darkTheme } from 'naive-ui';
import { deepMerge } from '/@/utils';
import { resetRouter } from '/@/router';
import Tiny from 'tinycolor2';

let timeId: TimeoutHandle;

interface NaiveThemeProps {
  theme: typeof darkTheme | null;
  themeOverrides?: Record<string, unknown>;
}

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

export const useAppStore = defineStore('app', () => {
  const state = reactive<AppState>({
    darkMode: undefined,
    pageLoading: false,
    beforeMiniInfo: {},
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  });

  const themeColorState = reactive({
    isManualChange: false,
    isFirstChange: true,
  });

  const getPageLoading = computed(() => state.pageLoading);
  const getDarkMode = computed(
    () => state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
  );
  const getBeforeMiniInfo = computed(() => state.beforeMiniInfo);

  const getThemeColorIsManualChange = computed(() => themeColorState.isManualChange);
  const getThemeColorIsFirstChange = computed(() => themeColorState.isFirstChange);

  const getNaiveThemeProps = computed(() => {
    const ThemeColor = state.projectConfig?.themeColor || projectSetting.themeColor;
    const themeOverrides = {
      common: {
        primaryColor: Tiny(ThemeColor).toHex8String(),
        primaryColorHover: Tiny(ThemeColor)
          .lighten(7.5)
          .brighten(1)
          .desaturate(20)
          .spin(-2)
          .toHex8String(),
        primaryColorPressed: Tiny(ThemeColor).darken(10).saturate(8).spin(2).toHex8String(),
        primaryColorSuppl: Tiny(ThemeColor)
          .lighten(7.5)
          .brighten(1)
          .desaturate(20)
          .spin(-2)
          .toHex8String(),
      },
    };
    let result: NaiveThemeProps = {
      theme: null,
      themeOverrides,
    };
    if (state.darkMode === ThemeEnum.DARK) {
      if (
        themeColorState.isFirstChange &&
        !themeColorState.isManualChange &&
        Tiny.equals(projectSetting.themeColor, ThemeColor)
      ) {
        return {
          theme: darkTheme,
        };
      } else {
        result = {
          theme: darkTheme,
          themeOverrides,
        };
      }
    }
    setThemeColorIsManualChange(true);
    return result;
  });
  const getProjectConfig = computed(() => {
    return state.projectConfig || ({} as ProjectConfig);
  });
  const getHeaderSetting = computed(() => {
    return getProjectConfig.value.headerSetting;
  });
  const getMenuSetting = computed(() => {
    return getProjectConfig.value.menuSetting;
  });
  const getTransitionSetting = computed(() => {
    return getProjectConfig.value.transitionSetting;
  });
  const getMultiTabsSetting = computed(() => {
    return getProjectConfig.value.multiTabsSetting;
  });

  function setPageLoading(loading: boolean) {
    state.pageLoading = loading;
  }

  function setDarkMode(mode: ThemeEnum) {
    state.darkMode = mode;
    localStorage.setItem(APP_DARK_MODE_KEY_, mode);
  }

  function setThemeColorIsManualChange(bool: boolean) {
    themeColorState.isManualChange = bool;
  }
  function setThemeColorIsFirstChange(bool: boolean) {
    themeColorState.isFirstChange = bool;
  }

  function setBeforeMiniInfo(miniSstate: BeforeMiniState) {
    state.beforeMiniInfo = miniSstate;
  }

  function setProjectConfig(config: DeepPartial<ProjectConfig>) {
    state.projectConfig = deepMerge(state.projectConfig || {}, config);
    Persistent.setLocal(PROJ_CFG_KEY, state.projectConfig);
  }

  async function resetAllState() {
    resetRouter();
    Persistent.clearAll();
  }

  async function setPageLoadingAction(loading: boolean) {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker
      timeId = setTimeout(() => {
        setPageLoading(loading);
      }, 50);
    } else {
      setPageLoading(loading);
      clearTimeout(timeId);
    }
  }

  return {
    getPageLoading,
    getDarkMode,
    getBeforeMiniInfo,
    getNaiveThemeProps,
    getProjectConfig,
    getHeaderSetting,
    getMenuSetting,
    getTransitionSetting,
    getMultiTabsSetting,
    getThemeColorIsFirstChange,
    getThemeColorIsManualChange,

    setPageLoading,
    setDarkMode,
    setBeforeMiniInfo,
    setProjectConfig,
    resetAllState,
    setPageLoadingAction,
    setThemeColorIsFirstChange,
    setThemeColorIsManualChange,
  };
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
