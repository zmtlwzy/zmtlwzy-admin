import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting,
} from '/#/config';

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
import { APP_PRESET_COLOR_LIST } from '/@/settings/designSetting';
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

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getNaiveThemeProps(): any {
      const ThemeColor = this.projectConfig?.themeColor || projectSetting.themeColor;
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
      if (this.darkMode === ThemeEnum.DARK) {
        const themeColor = this.projectConfig?.themeColor;
        if (
          themeColor &&
          APP_PRESET_COLOR_LIST.some((item) => {
            return Tiny.equals(item, themeColor);
          }) &&
          !Tiny(themeColor).isLight()
        ) {
          result = {
            theme: darkTheme,
          };
        } else {
          result = {
            theme: darkTheme,
            themeOverrides,
          };
        }
      }
      return result;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },

    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
