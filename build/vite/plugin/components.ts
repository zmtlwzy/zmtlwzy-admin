import IconsResolver from 'unplugin-icons/resolver';
import ViteComponents from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export function configComponentsPlugin() {
  return ViteComponents({
    dts: 'types/components.d.ts',
    // auto import dirs compontents
    dirs: ['src/components', 'src/layout'],

    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    // auto import Icon & Naive compontents
    resolvers: [
      IconsResolver({
        prefix: 'i',
        customCollections: ['my-svg'],
      }),
      NaiveUiResolver(),
    ],
  });
}
