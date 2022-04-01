import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import GlobPlugin from 'vite-plugin-glob';
// https://github.com/antfu/unocss
// see unocss.config.ts for config
import Unocss from 'unocss/vite';
import { configHtmlPlugin } from './html';
// import { configWindiCSSPlugin } from './windicss';
import { configComponentsPlugin } from './components';
import { configAutoImportPlugin } from './autoImport';
import { configIconComponentPlugin } from './iconComponent';
import { configMswPlugin } from './msw';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    // GlobPlugin(),
    Unocss(),
    configMswPlugin(viteEnv),
  ];

  // vitePlugins.push(configWindiCSSPlugin());
  vitePlugins.push(configComponentsPlugin());
  vitePlugins.push(configAutoImportPlugin());
  vitePlugins.push(configIconComponentPlugin());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
