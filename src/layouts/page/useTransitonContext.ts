import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/composables/core/useContext';

export type PageTranstionState = 'readly' | 'running' | 'finshed';

export interface PageTransitionContextProps {
  pageTranstionName: Ref<string | undefined>;
  pageTranstionState: Ref<PageTranstionState>;
}

const key: InjectionKey<PageTransitionContextProps> = Symbol();

export function createPageTransitionContext(context: PageTransitionContextProps) {
  return createContext<PageTransitionContextProps>(context, key);
}

export function usePageTransitionContext() {
  return useContext<PageTransitionContextProps>(key);
}
