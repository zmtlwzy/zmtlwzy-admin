import { getCurrentInstance, computed } from 'vue';
import { darkTheme, GlobalTheme } from 'naive-ui';
import { lightTheme } from 'naive-ui/es/themes/light';
import { useRootSetting } from '../setting/useRootSetting';

export function getNaiveCssVars(keyName: keyof GlobalTheme, isDark = false) {
  const _theme = isDark ? darkTheme : lightTheme;
  return _theme[keyName].self(_theme.common);
}

export function getAllNaiveCssVars(keyName: keyof GlobalTheme): Record<string, string> {
  const lightList = getNaiveCssVars(keyName);
  const darkList = getNaiveCssVars(keyName, true);

  const all = new Proxy(
    {},
    {
      get(_, propKey: string) {
        const match = propKey.match(/^(d_|dark_)(.+)$/);
        if (match) {
          return darkList[match[2]];
        }
        return lightList[propKey];
      },
    }
  );

  return Object.create(all);
}

export function getNaiveCssVarsRef(keyName: keyof GlobalTheme, propKey: string) {
  if (!getCurrentInstance()) return;
  const { getIsDarkMode } = useRootSetting();
  const lightList = getNaiveCssVars(keyName);
  const darkList = getNaiveCssVars(keyName, true);
  const cssVarRef = computed((): string => {
    return getIsDarkMode.value ? darkList[propKey] : lightList[propKey];
  });

  return cssVarRef;
}
