import { useLocalStorage } from '@vueuse/core';
import { useAppStore } from '/@/store/modules/app';
import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
import { ThemeEnum, ThemeStateEnum } from '/@/enums/appEnum';
import { APP_THEME_STATE_KEY_ } from '/@/enums/cacheEnum';
import { themeState } from '/@/settings/designSetting';

export const themeModeList = <const>['light', 'menuDark', 'dark'];
type Theme = ThemeEnum | ThemeStateEnum;

const currentMode = ref<Theme>();
const localTheme = useLocalStorage<Theme>(APP_THEME_STATE_KEY_, themeState);

export default function useChangeTheme() {
  const { MENU_DARK } = ThemeStateEnum;
  const { DARK, LIGHT } = ThemeEnum;

  const appStore = useAppStore();

  const { setMenuSetting, getMenuInverted } = useMenuSetting();

  watch(
    localTheme,
    (val) => {
      currentMode.value = val;
      const isInv = getMenuInverted.value;
      switch (val) {
        case LIGHT:
          isInv && setMenuSetting({ inverted: false });
          changeTheme(LIGHT);
          break;
        case DARK:
          !isInv && setMenuSetting({ inverted: true });
          appStore.setThemeColorIsManualChange(false);
          changeTheme(DARK);
          break;
        case MENU_DARK:
          !isInv && setMenuSetting({ inverted: true });
          changeTheme(LIGHT);
          break;
      }
    },
    { immediate: true }
  );

  function changeTheme(str: ThemeEnum) {
    const toClassName = str;
    const fromClassName = str === LIGHT ? DARK : str === DARK ? LIGHT : DARK;
    const classList = document.documentElement.classList as DomClassList;
    appStore.setDarkMode(toClassName);
    if (classList.replace(fromClassName, toClassName) === false) {
      classList.add(toClassName);
    }
  }

  function setLocalTheme(str?: Theme) {
    const res = str || themeState;
    localTheme.value = res;
  }

  return [readonly(currentMode), setLocalTheme] as const;
}
