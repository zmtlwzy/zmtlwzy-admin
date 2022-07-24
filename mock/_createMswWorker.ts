import { setupWorker } from 'msw';

const modules = import.meta.glob('./**/*.ts', { eager: true });

export const handlers = Object.entries(modules)
  .filter(([key]) => {
    return !key.includes('/_');
  })
  .map((entrie: any) => {
    return entrie[1].default;
  })
  .flat();

export function createWorker() {
  const worker = setupWorker(...handlers);
  worker.start({ onUnhandledRequest: 'bypass' });
}
