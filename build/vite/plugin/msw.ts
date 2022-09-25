import type { Plugin } from 'vite';
import { resolve } from 'path';
import pc from 'picocolors';

const targetPath = resolve(process.cwd(), '.', 'src/main.ts').replace(/\\/g, '/');
export function configMswPlugin({ VITE_USE_MOCK }: ViteEnv): Plugin {
  return {
    name: 'remove-msw',
    transform(src, id) {
      if (!VITE_USE_MOCK && id === targetPath) {
        console.log(` 🔹 ${pc.white(pc.bold('Remove msw code in'))}: "${pc.green(id)}"`);
        const res = src
          .replace(/import.+_createMswWorker('|");?/, '')
          .replace(/createWorker\(\);?/, '');
        return {
          code: res,
          map: null,
        };
      }
    },
  };
}
