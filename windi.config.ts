import { defineConfig } from 'vite-plugin-windicss';
import { getWindiBreakpoint } from './src/enums/breakpointEnum';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx,ts,js}', 'public/**/*.{html}', './*.html'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    extend: {
      screens: getWindiBreakpoint,
      fontFamily: {
        segoe: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      outline: {
        primary: [`2px solid var(--app-primary-color)`, '0px'],
      },
    },
  },
  alias: {
    'center-layout': 'flex justify-center items-center',
    'hb-layout': 'flex justify-between items-center',
    'hs-layout': 'flex justify-center',
    'vs-layout': 'flex items-center',
    spin: 'animate-spin animate-ease-[cubic-bezier(0.37,0.35,0.35,0.97)]',
    'n-ease-in-out': 'duration-300 ease-in-out',
  },
  shortcuts: {
    'app-layout-header-anction-icon':
      'cursor-pointer h-full px-2.5 flex justify-between items-center hover:bg-$hover-color',
  },
  variants: {},
  plugins: [],
});
