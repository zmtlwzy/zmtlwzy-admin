import { setupWorker } from 'msw';

const modules = import.meta.globEager('./**/*.ts');
// const modules = import.meta.importGlob<Record<string, any>>(['./**/*.ts', '!./**/_*.ts'], { eager: true })

export const handlers = Object.entries(modules)
  .filter(([key]) => {
    return !key.includes('/_');
  })
  .map(([_, value]) => {
    return value.default;
  })
  .flat();

export function createWorker() {
  const worker = setupWorker(...handlers);
  worker.start({ onUnhandledRequest: 'bypass' });
}
