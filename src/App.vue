<template>
  <NConfigProvider v-bind="getConfigProviderProps">
    <AppConfigure>
      <RouterView />
    </AppConfigure>
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { type ConfigProviderProps } from 'naive-ui';
  import { useAppStore } from '/@/store/modules/app';
  import { useLocaleStore } from '/@/store/modules/locale';
  import initDiscreteApi from '/@/composables/web/useDiscreteApi';
  import { getBreakpoint } from '/@/enums/breakpointEnum';
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import json from 'highlight.js/lib/languages/json';

  defineOptions({
    name: 'AppProvider',
  });

  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('json', json);

  const appStore = useAppStore();
  const localeStore = useLocaleStore();
  // const theme = computed(() => appStore.getNaiveThemeProps);
  // const locale = computed(() => localeStore.getNaiveLocale);

  const getConfigProviderProps = computed(() => {
    return {
      hljs,
      abstract: true,
      breakpoints: getBreakpoint,
      ...appStore.getNaiveThemeProps,
      ...localeStore.getNaiveLocale,
    };
  });

  initDiscreteApi(getConfigProviderProps as ConfigProviderProps);
</script>
