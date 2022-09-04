import path from 'path';

import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { getWindiBreakpoint } from './src/enums/breakpointEnum';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

export default defineConfig({
  include: [
    /src\/(.+\/)*.+\.(vue|html|jsx|tsx|ts|js|json)$/,
    /public\/(.+\/)*.+\.html$/,
    /index.html$/,
  ],
  exclude: ['node_modules', '.git'],
  shortcuts: [
    [
      'app-ease-spin',
      'animate-name-spin-rotate animate-count-infinite animate-ease-[cubic-bezier(0.37,0.35,0.35,0.97)]',
    ],
    [
      'app-layout-header-anction-icon',
      'cursor-pointer h-full px-2.5 flex justify-between items-center hover:bg-$hover-color',
    ],
    [
      'app-mtabs-anction-btn-wrapper',
      'flex-1 border-l border-$app-border-color cursor-pointer transition-property-colors ease-in-out-300 flex-jc-ac text-$app-text-color',
    ],
    ['app-mtabs-anction-btn', 'op60 group-hover:op100 text-18px'],
  ],
  theme: {
    screen: getWindiBreakpoint,
    fontFamily: {
      segoe: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
    },
    outline: {
      primary: ['2px solid var(--app-primary-color)', '0px'],
    },
  },
  rules: [
    [
      /^flex((-(js|je|jc|jb|ja|jev|as|ae|ac|ab|ast|row|rowr|col|colr)){1,3})$/,
      ([, keyStr]) => {
        return {
          display: 'flex',
          ...Object.fromEntries(
            keyStr
              .split('-')
              .slice(1)
              .map((item) => {
                return handleShortKeys(item);
              })
          ),
        };
      },
    ],
    [
      /^ease-(?:(in|out|in-out)-)(\d+)$/,
      ([, timingFun, duration]) => {
        return {
          'transition-timing-function': `var(--app-bezier${
            ['in', 'out'].includes(timingFun) ? `-${timingFun}` : ''
          })`,
          'transition-duration': `${duration}ms`,
        };
      },
    ],
  ],
  presets: [
    presetUno(),
    // presetAttributify({
    //   prefix: 'u:',
    //   prefixedOnly: false,
    // }),
    presetWind(),
    presetIcons({
      warn: true,
      // mode: 'background-img',
      collections: {
        'my-svg': FileSystemIconLoader(path.resolve(process.cwd(), 'src/assets/icons')),
      },
      extraProperties: {
        display: 'inline-block',
      },
      customizations: {
        customize(props) {
          props.width = '1em';
          props.height = '1em';
          return props;
        },
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        'dm-sans': 'DM Sans',
        'dm-serif': 'DM Serif Display',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});

function handleShortKeys(key: string): string[] {
  const J = 'justify-content';
  const A = 'align-items';
  const D = 'flex-direction';
  switch (key) {
    case 'js':
      return [J, 'flex-start'];
    case 'je':
      return [J, 'flex-end'];
    case 'jc':
      return [J, 'center'];
    case 'jb':
      return [J, 'space-between'];
    case 'ja':
      return [J, 'space-around'];
    case 'jev':
      return [J, 'space-evenly'];
    case 'as':
      return [A, 'flex-start'];
    case 'ae':
      return [A, 'flex-end'];
    case 'ac':
      return [A, 'center'];
    case 'ab':
      return [A, 'baseline'];
    case 'ast':
      return [A, 'stretch'];
    case 'row':
      return [D, 'row'];
    case 'rowr':
      return [D, 'row-reverse'];
    case 'col':
      return [D, 'column'];
    case 'colr':
      return [D, 'column-reverse'];
    default:
      return [];
  }
}
