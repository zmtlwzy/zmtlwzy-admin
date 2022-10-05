<script lang="ts">
import type {
  MaybeElement,
  MaybeElementRef,
} from '@vueuse/core'
import {
  promiseTimeout,
  unrefElement,
  useIntersectionObserver,
  whenever,
} from '@vueuse/core'
import { isSymbol } from '/@/utils/is'
import type { RouteLocation } from 'vue-router'
import { RouterLink, useLink } from 'vue-router'
import { omit } from 'lodash-es'
import prefetch from './prefetch'
import { canPrefetch } from './utils'

export default defineComponent({
  name: 'PrefetchLink',
  props: {
    // @ts-expect-error
    ...RouterLink.props,
    prefetch: {
      type: Boolean,
      default: true,
    },
    prefetchFiles: {
      type: Array,
    },
    timeout: {
      type: Number,
      default: 1000,
    },
  },
  setup(props, { slots }) {
    const linkContext = useLink({ to: props.to })
    const target = ref<MaybeElement>()

    const linkObserved = ref(false)
    const getRouterProps = computed(() => {
      return omit(props, ['prefetch', 'prefetchFiles', 'timeout'])
    })

    const { stop, isSupported } = useIntersectionObserver(
      target,
      async ([{ isIntersecting }]) => {
        if (isIntersecting) {
          await promiseTimeout(props.timeout)
          linkPrefetch()
        }
      },
    )

    whenever(target, () => {
      if (props.prefetch && unref(isSupported) && canPrefetch)
        linkObserved.value = true
    })

    onUnmounted(() => {
      linkObserved.value = false
    })

    function getRouteComponents<T extends RouteLocation>(route: T) {
      return route.matched
        .map((record) => {
          return Object.values(record.components)
        })
        .flat()
        .filter((Component) => {
          return typeof Component === 'function'
        })
    }

    function linkPrefetch() {
      const route = linkContext.route.value

      if (route.meta.__prefetched)
        return

      route.meta.__prefetched = true

      const metaPrefetch = route.meta.prefetch
      if (metaPrefetch) {
        // Prefetch route component
        const components = getRouteComponents(route)
        for (const Component of components) {
          // @ts-expect-error
          Component()
        }
        if (typeof metaPrefetch === 'function')
          metaPrefetch(route)
      }

      // Prefetch addtional files
      const prefetchFiles = [...(props.prefetchFiles || []), ...(route.meta.prefetchFiles || [])]
      if (prefetchFiles.length > 0) {
        for (const file of prefetchFiles)
          prefetch(file)
      }

      stop()
    }

    return () => {
      const children = slots.default && slots.default(linkContext)
      if (props.custom) {
        nextTick(() => {
          if (children) {
            const firstChild = children[0]
            if (isSymbol(firstChild.type)) {
              throw new Error(
                '[PrefetchLink Component] when "props.custom" is true, slot content must not be plain text',
              )
            }
            target.value = unrefElement(firstChild.el as MaybeElementRef)
          }
          else {
            console.warn(
              '[PrefetchLink Component] when "props.custom" is true, must exist default slot',
            )
          }
        })
        return children
      }
      else {
        return h(
          // @ts-expect-error
          RouterLink,
          {
            ref: (el: MaybeElement) => {
              target.value = el
            },
            ...getRouterProps.value,
          },
          () => children,
        )
      }
    }
  },
})
</script>
