import { NSkeleton } from 'naive-ui'
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

export { default as FullScreen } from './FullScreen.vue'

export const UserDropDown = createAsyncComponent(() => import('./UserDropdown.vue'), {
  loadingComponent: (
    <div class="flex items-center space-x-2">
      <NSkeleton height="24px" circle />
      <NSkeleton text round class="w-60px h-12px" />
    </div>
  ),
})

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'))

export const Notify = createAsyncComponent(() => import('./notify/index.vue'))
