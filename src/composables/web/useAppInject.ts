import { useAppProviderContext } from '/@/components/Application/useAppContext';
import { useContentSizeContext } from '/@/layouts/default/content/useContentSizeContext';
import { usePageTransitionContext } from '/@/layouts/page/useTransitonContext';
import { computed, unref } from 'vue';

export function useAppInject() {
  const values = useAppProviderContext();

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}

export function useContentSizeInject() {
  const values = useContentSizeContext();

  return {
    width: computed(() => unref(values.width)),
    height: computed(() => unref(values.height)),
  };
}

export function usePageTransitionInject() {
  const values = usePageTransitionContext();

  return {
    getPageTranstionState: computed(() => unref(values.pageTranstionState)),
    getPageTranstionName: computed(() => unref(values.pageTranstionName)),
  };
}
