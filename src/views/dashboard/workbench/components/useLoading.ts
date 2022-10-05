import type { Ref } from 'vue'
import { autoResetRef, createSharedComposable } from '@vueuse/core'

export const useLoading = createSharedComposable(
  autoResetRef.bind(null, false, Math.random() * 1000 + 1000),
) as () => Ref<boolean>
