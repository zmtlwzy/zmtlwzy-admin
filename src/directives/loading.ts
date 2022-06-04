import { createLoading, Loading, LoadingProps } from '/@/components/Loading';
import { omit } from 'lodash-es';
import { isNullOrUnDef } from '/@/utils/is';
import type { Directive, App } from 'vue';

function getAllAttribute(el: HTMLElement) {
  if (!el) return {};
  const prefix = 'loading';
  // @ts-ignore
  const propsMap = Object.keys(omit(Loading.props, 'show'));
  const res: Partial<LoadingProps> = {};
  for (const keyName of propsMap) {
    const attrVal = el.getAttribute(`${prefix}-${keyName}`);
    if (!isNullOrUnDef(attrVal)) {
      res[keyName] = attrVal;
    }
  }
  return res;
}

const loadingDirective: Directive = {
  mounted(el, binding) {
    const { size, ...otherProps } = getAllAttribute(el);
    const fullscreen = !!binding.modifiers.fullscreen;
    console.log(otherProps, 'otherProps');
    const instance = createLoading(
      {
        ...otherProps,
        size: size || 'large',
        show: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el
    );
    el.instance = instance;
  },
  updated(el, binding) {
    const { instance } = el;
    if (!instance) return;
    instance.setProps(getAllAttribute(el));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;
