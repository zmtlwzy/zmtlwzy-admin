import { Plugin, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import defineOptions from 'unplugin-vue-define-options/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://github.com/antfu/unocss
// see unocss.config.ts for config
import unocss from 'unocss/vite';

import { configHtmlPlugin } from './html';
import { configComponentsPlugin } from './components';
import { configAutoImportPlugin } from './autoImport';
import { configIconComponentPlugin } from './iconComponent';
import { configMswPlugin } from './msw';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    defineOptions(),
    splitVendorChunkPlugin(),
    vueJsx(),
    unocss(),
    configMswPlugin(viteEnv),
    configComponentsPlugin(),
    configAutoImportPlugin(),
    configIconComponentPlugin(),
    configHtmlPlugin(viteEnv, isBuild),
  ];

  return vitePlugins;
}
