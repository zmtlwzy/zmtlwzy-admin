import { unrefElement, MaybeElementRef } from '@vueuse/core';
import { createLoading } from './createLoading';
import type { LoadingProps } from './type';

export interface UseLoadingOptions {
  target?: any;
  props?: Partial<LoadingProps>;
}

interface Fn {
  (): void;
}

export function useLoading(props: Partial<LoadingProps>): [Fn, Fn, (string) => void];
export function useLoading(opt: Partial<UseLoadingOptions>): [Fn, Fn, (string) => void];

export function useLoading(
  opt: Partial<LoadingProps> | Partial<UseLoadingOptions>
): [Fn, Fn, (string) => void] {
  let props: Partial<LoadingProps>;
  let target: MaybeElementRef = document.body;

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    const options = opt as Partial<UseLoadingOptions>;
    props = options.props || {};
    target = options.target || document.body;
  } else {
    props = opt as Partial<LoadingProps>;
  }

  const instance = createLoading(props, undefined, true);

  const open = (): void => {
    const t = unrefElement(target as MaybeElementRef) as HTMLDivElement;
    if (!t) return;
    instance.open(t);
  };

  const close = (): void => {
    instance.close();
  };

  const setProps = (props: Partial<LoadingProps>) => {
    instance.setProps(props);
  };

  return [open, close, setProps];
}
