import type { VNode } from 'vue'
import { createVNode, render } from 'vue'
import type { LoadingProps } from './type'

import Loading from './Loading.vue'

export function createLoading(props?: Partial<LoadingProps>, target?: HTMLElement, wait = false) {
  let vm: Nullable<VNode> = null
  const data = ref<Partial<LoadingProps>>({
    show: true,
    ...props,
  })

  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data.value })
    },
  })

  vm = createVNode(LoadingWrap)

  if (wait) {
    setTimeout(() => {
      render(vm, document.createElement('div'))
    }, 0)
  }
  else {
    render(vm, document.createElement('div'))
  }

  function close() {
    if (vm?.el && vm.el.parentNode)
      vm.el.parentNode.removeChild(vm.el)
  }

  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el)
      return

    target.appendChild(vm.el as HTMLElement)
  }

  if (target)
    open(target)

  return {
    vm,
    close,
    open,
    setProps: (opt: Partial<LoadingProps>) => {
      data.value = {
        ...data.value,
        ...opt,
      }
    },
    setLoading: (loading: boolean) => {
      data.value.show = loading
    },
    get loading() {
      return data.value.show
    },
    get $el() {
      return vm?.el as HTMLElement
    },
  }
}
