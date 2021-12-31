import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configWindiCSSPlugin } from './windicss';
import { configComponentsPlugin } from './components';
import { configIconComponentPlugin } from './iconComponent';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue({
      reactivityTransform: ['src/views/sys/**/*.vue'],
    }),
    vueJsx() as Plugin,
  ];

  vitePlugins.push(configWindiCSSPlugin());
  vitePlugins.push(configComponentsPlugin());
  vitePlugins.push(configIconComponentPlugin());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}
