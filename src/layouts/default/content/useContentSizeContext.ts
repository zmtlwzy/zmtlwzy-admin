import type { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/composables/core/useContext';

export interface ContentSizeContextProps {
  width: Ref<number>;
  height: Ref<number>;
}

const key: InjectionKey<ContentSizeContextProps> = Symbol();

export function createContentSizeContext(context: ContentSizeContextProps) {
  return createContext<ContentSizeContextProps>(context, key);
}

export function useContentSizeContext() {
  return useContext<ContentSizeContextProps>(key);
}
