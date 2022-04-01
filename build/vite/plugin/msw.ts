import type { Plugin } from 'vite';
import { resolve } from 'path';

const targetPath = resolve(process.cwd(), '.', 'src/main.ts').replaceAll('\\', '/');
export function configMswPlugin({ VITE_USE_MOCK }: ViteEnv): Plugin {
  return {
    name: 'remove-msw',
    transform(src, id) {
      if (!VITE_USE_MOCK && id === targetPath) {
        console.log(` 🔹 Remove msw code in '${id}`);
        return {
          code: src
            .replace(`import { createWorker } from 'root/mock/_createMswWorker';`, '')
            .replace(`createWorker();`, ''),
          map: null,
        };
      }
    },
  };
}
