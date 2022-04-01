import AutoImport from 'unplugin-auto-import/vite';

// https://github.com/antfu/unplugin-auto-import
export function configAutoImportPlugin() {
  return AutoImport({
    dts: 'types/auto-import.d.ts',
    imports: ['vue', 'vue-router'],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
  });
}
