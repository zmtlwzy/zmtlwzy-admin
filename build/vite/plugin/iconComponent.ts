import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import path from 'path';

export function configIconComponentPlugin() {
  return Icons({
    autoInstall: true, // expiremental
    scale: 1, // Scale of icons against 1em
    defaultStyle: 'display:inline-block;', // Style apply to icons
    defaultClass: '', // Class names apply to icons
    compiler: 'vue3', // 'vue2', 'vue3', 'jsx'
    jsx: 'react', // 'react' or 'preact',
    customCollections: {
      'my-svg': FileSystemIconLoader(path.resolve(process.cwd(), 'src/assets/icons')),
    },
  });
}
